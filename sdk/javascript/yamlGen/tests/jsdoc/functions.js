/**
 * testTypes ...
 *
 * @param {object} options
 * @param {number} options.b
 * @param {string} options.c
 * @param {boolean} options.d
 * @param {object} options.e
 * @returns {object}
 */
function testTypes({ b, c, d, e }) {
  return null;
}

/**
 * testOptional ...
 *
 * @param {object} options
 * @param {number} [options.o]
 * @returns {object}
 */
async function testOptional({ o }) {
  return null;
}

/**
 * testDefault ...
 *
 * @param {object} options
 * @param {number} [options.d=1]
 * @returns {object}
 */
function testDefault({ d }) {
  return null;
}

/**
 * testPromise ...
 *
 * @param {object} options
 * @param {number} options.p
 * @returns {Promise<object>}
 */
function testPromise({ p }) {
  return null;
}

/**
 * testNull ...
 *
 * @param {object} options
 * @param {number} options.n
 * @returns {?object}
 */
function testNull({ n }) {
  return null;
}

/**
 * invalidParameterType ...
 *
 * @param {object} options
 * @param {invalidParameterType} options.pt
 * @returns {object}
 */
function invalidParameterType({ pt }) {
  return null;
}

/**
 * invalidReturnType ...
 *
 * @param {object} options
 * @param {number} options.rt
 * @returns {invalidReturnType}
 */
function invalidReturnType({ rt }) {
  return null;
}
