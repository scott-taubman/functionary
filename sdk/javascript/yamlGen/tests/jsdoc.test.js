const { generate_yaml } = require("../yamlGen");
const fs = require("fs");
const yaml = require("js-yaml");

const allParams = [
  {
    name: "b",
    type: "float",
    required: true,
  },
  {
    name: "c",
    type: "string",
    required: true,
  },
  {
    name: "d",
    type: "boolean",
    required: true,
  },
  {
    name: "e",
    type: "json",
    required: true,
  },
];

describe("jsdoc tests", () => {
  const yamlContent = generate_yaml({
    directory: "./jsdoc/",
    JSDoc: true,
    writeFile: false,
  });
  const jsonData = yaml.load(yamlContent);

  const functions = jsonData.package.functions;

  test("All Parameter Types (json, string, boolean, etc)", () => {
    expect(functions[0].parameters).toEqual(allParams);
  });

  test("Optional parameter", () => {
    expect(functions[1].parameters[0].required).toEqual(false);
  });

  test("Default parameter", () => {
    expect(functions[2].parameters[0].default).toEqual(1);
  });

  test("Promise return type", () => {
    expect(functions[3].return_type).toEqual("json");
  });

  test("Potentially null return type", () => {
    expect(functions[4].return_type).toEqual("json");
  });

  test("Invalid parameter type", () => {
    expect(functions[5].parameters[0].type).toEqual("__enterValue__");
  });

  test("Invalid return type", () => {
    expect(functions[6].return_type).toEqual("__enterValue__");
  });
});
