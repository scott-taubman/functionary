const HTTPClient = require("./httpClient");
const FunctionClient = require("./functionClient");
const TaskClient = require("./taskClient");
const utilities = require("./utilities");

/**
 * Represents the Functionary SDK to interact with functions, tasks, workflows, etc.
 * @class
 */
class FunctionarySDK {
  /**
   * Create a new instance of FunctionarySDK.
   * @param {Object} config - Configuration options for the SDK.
   * @param {string} config.host - The host address of the API server.
   * @param {number} config.port - The port number of the API server.
   * @param {string} config.environment - The environment ID.
   * @param {string} config.token - The authentication token for API requests (available on Functionary UI).
   */
  constructor({ host, port, environment, token }) {
    /**
     * The HTTP client to make API requests.
     * @type {HTTPClient}
     */
    this.http = new HTTPClient(host, port, environment, token);

    /**
     * The function client to interact with functions.
     * @type {FunctionClient}
     */
    this.functionClient = new FunctionClient(this.http);

    /**
     * The task client to interact with tasks.
     * @type {TaskClient}
     */
    this.taskClient = new TaskClient(this.http);
  }

  /**
   * Get a Func object by its ID.
   * @async
   * @param {string} id - The ID of the function to retrieve.
   * @returns {Promise} - A promise that resolves to the Func object.
   */
  async getFunction(id) {
    return await this.functionClient.get(id);
  }

  /**
   * Find Func objects based on specified criteria.
   * @async
   * @param {Object} criteria - The criteria used to find the functions.
   * @returns {Promise} - A promise that resolves to an array of Func objects that match the criteria.
   */
  async findFunction(criteria = {}) {
    return await this.functionClient.find(criteria);
  }

  /**
   * Get a Task object by its ID.
   * @async
   * @param {string} id - The ID of the task to retrieve.
   * @returns {Promise} - A promise that resolves to the Task object.
   */
  async getTask(id) {
    return await this.taskClient.get(id, true);
  }

  /**
   * Set the environment for the SDK.
   * @async
   * @param {Object} options - The options to set the environment.
   * @param {string} options.team - The team name.
   * @param {string} options.environment - The environment name.
   * @returns {Promise} - A promise that resolves when the environment is set.
   */
  async setEnvironment({ team, environment }) {
    return await this.http.setEnvironment({ team, environment });
  }
}

module.exports = FunctionarySDK;
