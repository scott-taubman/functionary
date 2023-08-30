const utilities = require("./utilities.js");

/**
 * Represents a task with methods to refresh the task status and get the result
 * @class
 */
class Task {
  /**
   * Create a new instance of Task.
   * @param {Object} taskInfo - The information about the task.
   * @param {TaskClient} taskClient - The task client used to interact with the task.
   */
  constructor(taskInfo, taskClient) {
    /**
     * The task ID.
     * @type {string}
     */
    this.id = taskInfo.id;

    /**
     * The current status of the task (e.g "IN_PROGRESS", "COMPLETE").
     * @type {string}
     */
    this.status = taskInfo.status;

    /**
     * The client used to interact with the task.
     * @type {TaskClient}
     */
    this.taskClient = taskClient;
  }

  /**
   * Refreshes the task status (and all other fields) by fetching the latest information using the task client.
   * @async
   */
  async refresh() {
    const taskInfo = await this.taskClient.get(this.id, false);
    this.updateProps(taskInfo);
  }

  /**
   * Updates the task instance with the provided task information.
   * @param {Object} taskInfo - The updated information about the task.
   */
  updateProps(taskInfo) {
    for (const propertyName in taskInfo) {
      this[propertyName] = taskInfo[propertyName];
    }
  }

  /**
   * Retrieves the result of the task from the task client.
   * @async
   * @returns {Promise<any>} - A promise that resolves to the result of the task.
   */
  async getResult() {
    return await this.taskClient.getResult(this.id);
  }

  /**
   * Waits for the task to complete by periodically refreshing its status and returns the result.
   * @async
   * @param {number} refreshDelay - The delay between each status refresh in milliseconds.
   * @param {number} [timeout=31536000000] - The maximum time to wait for the task to complete in milliseconds. Default is 1 year.
   * @returns {Promise<any>} - A promise that resolves to the result of the completed task.
   */
  async waitForResult(refreshDelay, timeout = 31536000000) {
    const stopTimeMs = Date.now() + timeout;
    await this.refresh();
    while (this.status !== "COMPLETE" && Date.now() < stopTimeMs) {
      await this.refresh();
      await utilities.wait(refreshDelay);
    }
    return await this.getResult();
  }
}

module.exports = Task;
