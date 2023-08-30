const toWords = require("split-camelcase-to-words");

const classes = ["json", "float", "string", "boolean"];
const json = "json";
const float = "float";
const string = "string";
const boolean = "boolean";

const clues = {
  obj: json,
  json: json,
  is: boolean,
  has: boolean,
  valid: boolean,
  found: boolean,
  not: boolean,
  count: float,
  age: float,
  quantity: float,
  num: float,
  length: float,
  height: float,
  width: float,
  size: float,
  ratio: float,
  percent: float,
  rate: float,
  speed: float,
  val: float,
  index: float,
  name: string,
  message: string,
  title: string,
  label: string,
  text: string,
  url: string,
  description: string,
  color: string,
  str: string,
};

/**
 * Gets the corresponding type for a given clue.
 * @param {string} name - The clue name.
 * @returns {?string} The corresponding type or null if not found.
 */
const getType = (name) => {
  const tokenizedList = toWords(name).toLowerCase().split(" ");
  const potentialTypes = tokenizedList.filter((token) => clues[token]);
  if (potentialTypes?.length === 1) {
    return clues[potentialTypes[0]];
  } else {
    return null;
  }
};

module.exports = { getType };
