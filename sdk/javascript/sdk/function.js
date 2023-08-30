const Task = require("./task");

/**
 * Represents a function entity with its information (description, parameters, package, etc)
 * and an associated function client.
 * @class
 */
class Func {
  /**
   * Create a new instance of Func.
   * @param {Object} functionInfo - An object containing the information of the function.
   * @param {Object} functionClient - The function client associated with this function.
   */
  constructor(functionInfo, functionClient) {
    for (const propertyName in functionInfo) {
      this[propertyName] = functionInfo[propertyName];
    }
    this.functionClient = functionClient;
  }

  /**
   * Execute the function with the given parameters.
   * @async
   * @param {Object} parameters - The parameters required for the function execution.
   * @returns {Promise<Task>} - A promise that resolves to the created task.
   */
  async execute(parameters) {
    return await this.functionClient.taskClient.create(this.id, parameters);
  }
}

module.exports = Func;
