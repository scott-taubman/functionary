function noParams() {
  return null;
}

function testNames({ a, b }) {
  return null;
}

function testNumber({ a = 1 }) {
  return null;
}

function testBoolean({ a = false }) {
  return null;
}

function testString({ a = "test" }) {
  return null;
}

function testObject({ a = { p1: 1, p2: 2 } }) {
  return null;
}
