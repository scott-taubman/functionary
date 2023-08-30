/**
 * Module containing utility functions for handling HTTP error responses.
 * @module error
 */

/**
 * Represents a Bad Request HTTP error response.
 * @function
 * @param {string} [additionalInfo=""] - Additional information about the error.
 * @returns {Object} - An object containing the error message and error code.
 */
const badRequest = (additionalInfo = "") => ({
  message: "Bad Request" + additionalInfo,
  code: 400,
});

/**
 * Represents an Unauthorized HTTP error response.
 * @function
 * @param {string} [additionalInfo=""] - Additional information about the error.
 * @returns {Object} - An object containing the error message and error code.
 */
const unauthorized = (additionalInfo = "") => ({
  message: "Unauthorized" + additionalInfo,
  code: 401,
});

/**
 * Represents a Forbidden HTTP error response.
 * @function
 * @param {string} [additionalInfo=""] - Additional information about the error.
 * @returns {Object} - An object containing the error message and error code.
 */
const forbidden = (additionalInfo = "") => ({
  message: "forbidden: you don't have access" + additionalInfo,
  code: 404,
});

/**
 * Represents a Not Found HTTP error response.
 * @function
 * @param {string} [additionalInfo=""] - Additional information about the error.
 * @returns {Object} - An object containing the error message and error code.
 */
const notFound = (additionalInfo = "") => ({
  message: "Not Found" + additionalInfo,
  code: 404,
});

/**
 * Represents an Internal Server Error HTTP error response.
 * @function
 * @param {string} [additionalInfo=""] - Additional information about the error.
 * @returns {Object} - An object containing the error message and error code.
 */
const internalServerError = (additionalInfo = "") => ({
  message: "Internal Server Error" + additionalInfo,
  code: 500,
});

/**
 * Represents a Bad Gateway HTTP error response.
 * @function
 * @param {string} [additionalInfo=""] - Additional information about the error.
 * @returns {Object} - An object containing the error message and error code.
 */
const badGateway = (additionalInfo = "") => ({
  message: "Bad Gateway" + additionalInfo,
  code: 502,
});

/**
 * Represents an unknown error response (does not match normal HTTP errors).
 * @function
 * @param {string} [additionalInfo=""] - Additional information about the error.
 * @returns {Object} - An object containing the error message.
 */
const unknown = (additionalInfo = "") => ({
  message:
    "An unknown error occurred (does not match normal http errors)" +
    additionalInfo,
});

/**
 * An object mapping HTTP error codes to their corresponding error response functions.
 * @type {Object.<string, function>}
 */
const exceptionMap = {
  400: badRequest,
  401: unauthorized,
  403: forbidden,
  404: notFound,
  500: internalServerError,
  502: badGateway,
};

module.exports = {
  badRequest,
  unauthorized,
  notFound,
  internalServerError,
  badGateway,
  unknown,
  forbidden,
  exceptionMap,
};
