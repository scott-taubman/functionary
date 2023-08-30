const Task = require("./task.js");
const utilities = require("./utilities.js");

/**
 * Represents a client to make HTTP request on behalf of tasks.
 */
class TaskClient {
  /**
   * Create a new TaskClient instance.
   * @param {HTTPClient} http - The HTTP client to make requests.
   */
  constructor(http) {
    this.http = http;
  }

  /**
   * Get a task by its ID.
   * @async
   * @param {string} taskId - The ID of the task to retrieve.
   * @param {boolean} [object=true] - Whether to return the task as a Task object (true) or just the task data (false).
   * @returns {Promise<Task|Object>} - A promise that resolves to the Task object or the task data.
   */
  async get(taskId, object = true) {
    const response = await this.http.request("GET", `/tasks/${taskId}`);
    if (object) {
      return new Task(response, this);
    } else {
      return response;
    }
  }

  /**
   * Create a new task with the given function ID and parameters.
   * @async
   * @param {string} functionId - The ID of the function to execute in the task.
   * @param {Object} parameters - The parameters to pass to the function.
   * @returns {Promise<Task>} - A promise that resolves to the created Task object.
   */
  async create(functionId, parameters) {
    const data = {
      function: functionId,
      parameters,
    };
    const response = await this.http.request("POST", `/tasks/`, null, data);
    const refreshedResponse = await this.http.request(
      "GET",
      `/tasks/${response.id}`
    );
    return new Task(refreshedResponse, this);
  }

  /**
   * Get the result of a task by its ID.
   * @async
   * @param {string} taskId - The ID of the task to retrieve the result for.
   * @returns {Promise<any>} - A promise that resolves to the result of the task.
   */
  async getResult(taskId) {
    const response = await this.http.request("GET", `/tasks/${taskId}/result`);
    return response.result;
  }
}

module.exports = TaskClient;
