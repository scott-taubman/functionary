const SDK = require("../functionarySDK.js");
const utilities = require("../utilities.js");
const outputJSONID = "e9c964ad-ae03-411f-b019-4dce34c2377e";
const environment = "3764e110-2e14-4ab6-a8be-ee7b5b6345d6";
const token = "f041ba0b98bd3b1362d0a3bc8589db542c11500c";

// main functionary SDK tests
describe("Functionary SDK", () => {
  test("Example sequence 1 (exampleUser.js)", async () => {
    // data to be passed to output_text function (it's both input and output)
    const inputOutput = "This is a test";

    // initialize client with connection information
    const client = new SDK({
      host: "localhost",
      port: 8000,
      token,
    });

    // All of the functions live an in environment. Find these on the top left of the UI
    await client.setEnvironment({
      team: "FunctionFoundry",
      environment: "dev",
    });

    // Get the Func object by its name
    const outputTextFunction = await client.findFunction({
      name: "output_text",
    });

    // Execute the function with parameters and get back the Task object
    const outputTextFunctionTask = await outputTextFunction[0].execute({
      input: inputOutput,
    });

    // Repeatedly query the API every 800 ms until the status is "COMPLETE"; then get result
    // Stop querying after 15000 ms and return a 404 error
    const taskResult = await outputTextFunctionTask.waitForResult(800, 10000);

    expect(taskResult).toEqual(inputOutput);
  }, 15000);

  test("Example sequence 2", async () => {
    const inputOutput = { param1: "p1" };

    const client = new SDK({
      host: "localhost",
      port: 8000,
      environment,
      token,
    });

    const outputJSONFunction = await client.getFunction(outputJSONID);

    const outputJSONFunctionTask = await outputJSONFunction.execute({
      input: inputOutput,
    });

    await utilities.wait(5000);
    await outputJSONFunctionTask.refresh(); // although this isn't necessary
    const result = await outputJSONFunctionTask.getResult();
    await utilities.wait(200);

    expect(result).toEqual(inputOutput);
  }, 15000);
});
