const acorn = require("acorn");
const yaml = require("js-yaml");
const jsdoc = require("jsdoc-api");
const Func = require("./func.js");
const fs = require("fs");
const path = require("path");
const caller = require("caller");
const { getType } = require("./keywordClassifier.js");

const version = 1;
const missing = "__enterValue__"; // Placeholder for missing values
const types = ["json", "float", "string", "boolean"]; // effectively valid data types
/**
 * Processes a string containing Promises or an optional return type
 * @param {string} str - The input string to process.
 * @returns {string} The processed string.
 */
const processPromiseOptional = (str) => {
  const regex = /^promise\.?<(.+)>$/; // Extract type inside "<>"
  const match = str.match(regex);

  if (match?.length == 2) {
    str = match[1];
  }
  return str[0] == "?" ? str.split("").splice(1).join("") : str; // Remove leading "?" if present
};

/**
 * Performs post-processing on an input string
 * @param {string} str - The input string to process.
 * @returns {string} The processed string.
 */
const postProcess = (str) => {
  if (!str) return str;
  str = str.toLowerCase();
  str = processPromiseOptional(str);
  if (str == "number") str = "float";
  else if (str == "object") str = "json";
  return str;
};

/**
 * Generates a YAML file based on specified parameters.
 * @param {Object} options - Generation options.
 * @param {string} options.directory - The directory to process.
 * @param {boolean} options.JSDoc - Whether to use JSDoc.
 * @param {boolean} options.guessTypes - Whether to guess types.
 * @param {boolean} options.writeFile - Whether to write the yaml to package.yaml
 * @returns {boolean} -Whether the YAML was succesfully generated and written
 */
const generate_yaml = ({
  directory,
  JSDoc = true,
  guessTypes = false,
  writeFile = true,
}) => {
  let data;
  try {
    if (!path.isAbsolute(directory))
      directory = path.resolve(path.dirname(caller()), directory);

    data = fs.readFileSync(path.join(directory, "functions.js"), "utf8");
  } catch (error) {
    console.error("Error reading the file:", error);
  }

  let ast;
  let comments = [];
  try {
    ast = acorn.parse(data, {
      sourceType: "module",
      ecmaVersion: "latest",
    });
  } catch (error) {
    console.error("Error creating AST from source code: ", error.message);
  }

  try {
    comments = jsdoc.explainSync({ source: data }); // Extract JSDoc comments from the source
  } catch (error) {
    console.error("Error parsing jsdoc from source code: ", error.message);
  }

  const final_json = {
    version: version.toFixed(1),
    package: {
      name: path.basename(directory),
      description: comments.find((comment) => comment.kind == "file")
        ?.description,

      language: "javascript",
      functions: [],
    },
  };

  const sourceFunctions = ast.body;
  for (let f = 0; f < sourceFunctions.length; f++) {
    if (sourceFunctions[f].type == "FunctionDeclaration") {
      const functionName = sourceFunctions[f].id.name;

      let foundJSDoc;
      if (JSDoc) {
        foundJSDoc = comments.find(
          (comment) => comment.name == functionName && comment.comment != ""
        );
      }

      const processedReturnType = postProcess(
        foundJSDoc?.returns[0]?.type?.names[0]
      );
      let func = new Func({
        name: functionName,
        description: foundJSDoc?.description,
        return_type: types.includes(processedReturnType)
          ? processedReturnType
          : null,
      });

      for (let p = 0; p < sourceFunctions[f].params.length; p++) {
        const paramObj = sourceFunctions[f].params[p];
        if (paramObj.type == "ObjectPattern") {
          for (let props = 0; props < paramObj.properties.length; props++) {
            // there is only one parameter since all functions must take in exactly one json
            // paramProperty is a particular property in the json parameter
            const paramProperty = paramObj.properties[props];
            const paramJson = {
              name: paramProperty.value.name || paramProperty.key.name,
              def: paramProperty?.value?.right?.raw,
            };

            if (paramProperty?.value?.right?.type == "ObjectExpression")
              paramJson.type = "json";

            if (paramJson.def === "true") paramJson.def = true;
            else if (paramJson.def === "false") paramJson.def = false;

            //remove the exra set of quotes around a string if there is one
            if (paramJson.def?.length > 2) {
              if (
                (paramJson?.def[0] == '"' &&
                  paramJson?.def[paramJson?.def?.length - 1] == '"') ||
                (paramJson?.def[0] == "'" &&
                  paramJson?.def[paramJson?.def?.length - 1] == "'")
              ) {
                paramJson.def = paramJson.def.slice(1, -1);
              }
            }

            // convert number in string form to number
            if (!isNaN(parseFloat(paramJson?.def)))
              paramJson.def = parseFloat(paramJson.def);

            // jsdocParamObj represents the parameter that the jsdoc parser found
            const jsdocParamObj = foundJSDoc?.params[props + 1];
            if (jsdocParamObj) {
              paramJson.type = postProcess(jsdocParamObj?.type?.names[0]);
              paramJson.required = !jsdocParamObj?.optional;
              if (paramJson.def === undefined)
                paramJson.def = jsdocParamObj?.defaultvalue;
            } else if (guessTypes) {
              // type inference
              paramJson.type = getType(paramJson.name);
            } else if (paramJson.def) {
              paramJson.type = types.includes(postProcess(typeof paramJson.def))
                ? postProcess(typeof paramJson.def)
                : null;
            }

            // remove types outside of the allowed ones
            if (!types.includes(paramJson.type)) paramJson.type = null;
            func.add_param(paramJson);
          }
        }
      }
      final_json.package.functions.push(func.get_json());
    }
  }

  try {
    let final_yaml = yaml.dump(final_json, {
      quotingType: '"',
    });
    final_yaml = final_yaml.replace(/"/, ""); // remove first quote around version
    final_yaml = final_yaml.replace(/"/, ""); // remove second quote around version

    if (writeFile) {
      fs.writeFileSync("package.yaml", final_yaml, "utf8");
      return true;
    } else {
      return final_yaml;
    }
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

module.exports = { generate_yaml };
