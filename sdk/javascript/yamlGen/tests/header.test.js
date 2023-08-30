const exp = require("constants");
const { generate_yaml } = require("../yamlGen");
const fs = require("fs");
const yaml = require("js-yaml");

const header = {
  version: 1,
  package: {
    name: "header",
    description: "This is a simple calculator in node js",
    language: "javascript",
    functions: [],
  },
};

describe("jsdoc tests", () => {
  const yamlContent = generate_yaml({
    directory: "./header/",
    JSDoc: true,
    writeFile: false,
  });
  const jsonData = yaml.load(yamlContent);

  test("Header (version, package, name, etc)", () => {
    expect(jsonData).toEqual(header);
  });
});
