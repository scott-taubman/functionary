const utilities = require("./utilities.js");
const util = require("util");

const { notFound, unknown, exceptionMap } = require("./error.js");

/**
 * Represents an HTTP client for making API requests.
 * @class
 */
class HTTPClient {
  /**
   * Create a new instance of HTTPClient.
   * @param {string} host - The hostname or IP address of the API server.
   * @param {number} port - The port number of the API server.
   * @param {string} environment - The environment UUID
   * @param {string} token - The authorization token to be used for API requests.
   */
  constructor(host, port, environment, token) {
    /**
     * The hostname or IP address of the API server.
     * @type {string}
     */
    this.host = host;

    /**
     * The port number of the API server.
     * @type {number}
     */
    this.port = port;

    /**
     * The environment ID.
     * @type {string}
     */
    this.environment = environment || "";

    /**
     * The authorization token to be used for API requests.
     * @type {string}
     */
    this.token = token;
  }

  /**
   * Send an HTTP request to the specified endpoint.
   * @async
   * @param {string} verb - The HTTP verb/method (e.g., GET, POST, PUT, DELETE).
   * @param {string} endpointUrl - The endpoint URL to send the request to.
   * @param {Object} [extraHeaders] - Additional headers to include in the request.
   * @param {Object} [body] - The request body data (if applicable).
   * @returns {Promise<Object>} - A promise that resolves to the response data from the server.
   * @throws {Error} - If an error occurs during the request or the response status code is not successful.
   */

  async request(verb, endpointUrl, extraHeaders, body) {
    const baseHeaders = {
      accept: "application/json",
      "X-Environment-Id": this.environment,
      Authorization: `Token ${this.token}`,
    };
    extraHeaders = extraHeaders || {};
    body = body || {};
    let url = `http://${this.host}:${this.port}/api/v1${endpointUrl}`;

    const requestOptions = {
      method: verb,
      headers: { ...baseHeaders, ...extraHeaders },
    };

    if (verb === "GET" || verb === "HEAD") {
      // For GET and HEAD requests, we'll add query parameters to the URL
      const queryParams = new URLSearchParams(body);
      url += `?${queryParams.toString()}`;
    } else {
      // For other request types (POST, PUT, DELETE), we'll set the request body
      requestOptions.headers["Content-Type"] = "application/json";
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      if (Object.keys(exceptionMap).includes(String(response.status))) {
        throw exceptionMap[response.status]();
      } else {
        throw unknown();
      }
    }

    const responseData = await response.json();
    return responseData;
  }

  /**
   * Sets the environment ID based on the provided team and environment names.
   *
   * @async
   * @param {Object} options - The options object containing the team and environment names.
   * @param {string} options.team - The name of the team to search for.
   * @param {string} options.environment - The name of the environment to search for within the team.
   * @throws {Error} Throws an error if the team or environment is not found.
   */
  async setEnvironment({ team, environment }) {
    const response = await this.request("GET", "/teams/");
    console.log(util.inspect(response, false, null, true /* enable colors */));
    const teamObject = response.results.find(
      (teamData) => teamData.name == team
    );
    if (!teamObject) {
      throw notFound(": The team wasn't found");
    } else {
      const environmentObject = teamObject.environments.find(
        (env) => env.name == environment
      );
      if (!environmentObject) {
        throw notFound(": The environment wasn't found");
      } else {
        this.environment = environmentObject.id;
      }
    }
  }
}

module.exports = HTTPClient;
