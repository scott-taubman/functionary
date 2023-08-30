/**
 * Represents a function's metadata and parameters.
 */
class Func {
  /**
   * Creates an instance of Func.
   * @param {Object} options - Function options.
   * @param {string} options.name - The name of the function.
   * @param {string} [options.summary] - A summary of the function's purpose.
   * @param {string} [options.description] - A detailed description of the function.
   * @param {string} [options.return_type] - The expected return type of the function.
   */
  constructor({ name, summary, description, return_type }) {
    this.missing = "__enterValue__";
    if (name == undefined) throw new Error("Name undefined");

    description = description || this.missing;
    return_type = return_type || this.missing;
    if (summary === undefined) {
      this.info = { name, description, return_type };
    } else {
      summary = summary || this.missing;
      this.info = { name, summary, description, return_type };
    }
    this.params = [];
  }

  /**
   * Adds a parameter to the function.
   * @param {Object} paramOptions - Parameter options.
   * @param {string} paramOptions.name - The name of the parameter.
   * @param {string} [paramOptions.type] - The data type of the parameter.
   * @param {any} [paramOptions.def] - The default value of the parameter.
   * @param {boolean} [paramOptions.required] - Whether the parameter is required.
   */
  add_param({ name, type, def, required }) {
    if (name == undefined) throw new Error("Name undefined");
    if (required === undefined) required = this.missing;
    type = type || this.missing;
    if (def === undefined) {
      this.params.push({
        name,
        type,
        required,
      });
    } else {
      this.params.push({
        name,
        type,
        default: def,
        required,
      });
    }
  }

  /**
   * Generates a JSON representation of the function.
   * @returns {Object} - The function's metadata and parameters.
   */
  get_json() {
    return { ...this.info, parameters: [...this.params] };
  }
}

module.exports = Func;
