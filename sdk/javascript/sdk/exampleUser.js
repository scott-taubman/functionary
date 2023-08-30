const SDK = require("./functionarySDK.js");
const Func = require("./function.js");
const utilities = require("./utilities.js");

// SDK Demo
async function example() {
  // initialize client
  const client = new SDK({
    host: "localhost",
    port: 8000,
    token: "f041ba0b98bd3b1362d0a3bc8589db542c11500c",
  });

  // All of the functions live an in environment. Find these on the top left of the UI
  await client.setEnvironment({
    team: "FunctionFoundry",
    environment: "dev",
  });

  //
  const outputTextFunction = await client.findFunction({ name: "output_text" });

  const outputTextFunctionTask = await outputTextFunction[0].execute({
    input: "This is a test",
  });

  // 2 ways to get the result

  // Option 1
  // console.log("start waiting");
  // await utilities.wait(2000);
  // console.log("after waiting");
  // console.log("Result: " + (await outputTextFunctionTaskObj.getResult()));

  // Option 2
  const taskResult = await outputTextFunctionTask.waitForResult(1000, 20000);

  console.log("Result 1: " + taskResult);

  // Alternate way of getting task: If you only know the taskId, use the following function
  const outputTextFuncTaskObj2 = await client.getTask(
    outputTextFunctionTask.id
  );

  await utilities.wait(2000);

  const taskResult2 = await outputTextFuncTaskObj2.getResult();

  console.log("Result 2: " + taskResult2);
}

example();
