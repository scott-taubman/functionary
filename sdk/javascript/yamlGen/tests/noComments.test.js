const exp = require("constants");
const { generate_yaml } = require("../yamlGen");
const fs = require("fs");
const yaml = require("js-yaml");

describe("jsdoc tests", () => {
  const yamlContent = generate_yaml({
    directory: "./noComments/",
    JSDoc: false,
    writeFile: false,
  });
  const jsonData = yaml.load(yamlContent);

  const functions = jsonData.package.functions;

  test("No Parameters", () => {
    expect(functions[0].parameters).toEqual([]);
  });

  test("Test Names", () => {
    const params = functions[1].parameters;
    expect(params[0].name).toEqual("a");
    expect(params[1].name).toEqual("b");
  });

  test("Test Number", () => {
    const param = functions[2].parameters[0];
    expect(param.name).toEqual("a");
    expect(param.type).toEqual("float");
    expect(param.default).toEqual(1);
    expect(param.required).toEqual("__enterValue__");
  });

  test("Test Boolean", () => {
    const param = functions[3].parameters[0];
    expect(param.name).toEqual("a");
    expect(param.type).toEqual("__enterValue__");
    expect(param.default).toEqual(false);
    expect(param.required).toEqual("__enterValue__");
  });

  test("Test String", () => {
    const param = functions[4].parameters[0];
    expect(param.name).toEqual("a");
    expect(param.type).toEqual("string");
    expect(param.default).toEqual("test");
    expect(param.required).toEqual("__enterValue__");
  });

  test("Test Object", () => {
    const param = functions[5].parameters[0];
    expect(param.name).toEqual("a");
    expect(param.type).toEqual("json");
    expect(param.required).toEqual("__enterValue__");
  });
});
