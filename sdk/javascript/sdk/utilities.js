/**
 * Waits for the specified duration in milliseconds.
 * @async
 * @param {number} ms - The number of milliseconds to wait.
 * @returns {Promise<void>} - A promise that resolves after the specified duration.
 */
async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  // exampleFunctionUUID,
  // exampleHost,
  // exampleToken,
  // exampleCurrentEnvId,
  wait,
};
