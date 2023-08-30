const exp = require("constants");
const { generate_yaml } = require("../yamlGen");
const fs = require("fs");
const yaml = require("js-yaml");

describe("jsdoc tests", () => {
  const yamlContent = generate_yaml({
    directory: "./guessParams/",
    JSDoc: false,
    writeFile: false,
    guessTypes: true,
  });
  const jsonData = yaml.load(yamlContent);

  const functions = jsonData.package.functions;

  test("Guess parameter that resembles a float", () => {
    expect(functions[0].parameters[0].type).toEqual("float");
  });

  test("Guess parameter that resembles a boolean", () => {
    expect(functions[1].parameters[0].type).toEqual("boolean");
  });

  test("Guess parameter that resembles a string", () => {
    expect(functions[2].parameters[0].type).toEqual("string");
  });

  test("Guess parameter that resembles a JSON object", () => {
    expect(functions[3].parameters[0].type).toEqual("json");
  });
});
