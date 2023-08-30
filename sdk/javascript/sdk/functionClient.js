const utilities = require("./utilities.js");
const TaskClient = require("./taskClient.js");
const Func = require("./function.js");

/**
 * Represents a client for making HTTP requests on behalf of functions (Func objects)
 * @class
 */
class FunctionClient {
  /**
   * Create a new instance of FunctionClient.
   * @param {HTTPClient} http - The HTTP client used to make API requests.
   */
  constructor(http) {
    /**
     * The HTTP client used to make API requests.
     * @type {HTTPClient}
     */
    this.http = http;

    /**
     * The task client to interact with tasks associated with functions.
     * @type {TaskClient}
     */
    this.taskClient = new TaskClient(this.http);
  }

  /**
   * Get a Func object by its ID.
   * @async
   * @param {string} id - The ID of the function to retrieve.
   * @returns {Promise<Func>} - A promise that resolves to the Func object.
   */
  async get(id) {
    const response = await this.http.request("GET", `/functions/${id}/`);
    return new Func(response, this);
  }

  // const outputJSONFunction = client.findFunction({
  //   parameters: [{ name: "input" }],
  // });

  /**
   * Find Func objects based on specified criteria.
   * @async
   * @param {Object} criteria - Criteria to filter functions.
   * @param {Object} criteria.parameters - The parameters of the function.
   * @param {string} criteria.parameters.name - The name of the parameter.
   * @returns {Promise<Func[]>} - A promise that resolves to an array of Func objects matching the criteria.
   */
  async find(criteria) {
    const response = await this.http.request("GET", `/functions/`);

    const filteredData = this.findMatchingFunctions(response.results, criteria);

    /**
     * Represents an array of function entities.
     * @typedef {Func[]} FuncArray
     */

    const funcs = filteredData.map((funcData) => new Func(funcData, this));
    return funcs;
  }

  /**
   * Find matching functions from an array of functions based on specified criteria.
   * @param {Object[]} functionsArray - Array of function entities.
   * @param {Object} criteria - Criteria to filter functions.
   * @returns {Object[]} - Array of function entities matching the criteria.
   * @private
   */
  findMatchingFunctions(functionsArray, criteria) {
    return functionsArray.filter((func) => {
      for (const key in criteria) {
        if (Array.isArray(criteria[key]) && Array.isArray(func[key])) {
          for (let n = 0; n < criteria[key].length; n++) {
            const matches = this.findMatchingFunctions(
              func[key],
              criteria[key][n]
            );
            if (matches.length == 0) return false;
          }
        } else {
          if (func[key] === undefined || func[key] != criteria[key])
            return false;
        }
      }
      return true;
    });
  }
}

module.exports = FunctionClient;
