# FunctionarySDK Readme

The FunctionarySDK is a powerful tool that allows you to interact with the
Functionary natively in Javasscript. This SDK abstracts API calls, error
handling, and other configuration steps. This readme will provide an overview of
the SDK and how to use it effectively.

## Purpose

The FunctionarySDK serves as a bridge between your application and the
Functionary tool, enabling you to run functions remotely and retrieve their
results. It simplifies the process of integrating and executing functions in
your code, providing an intuitive interface to interact with the platform's
capabilities.

## Installation

To use the FunctionarySDK, you need to have Node.js installed. If you haven't
installed it yet, you can download it from the official website:
https://nodejs.org/

After ensuring you have Node.js installed, you can follow these steps to install
and set up the FunctionarySDK:

1. Clone the repository or download the SDK files to your local project
   directory.

2. Make sure you have the required dependencies (e.g., `utilities.js`) available
   in your project (run `npm install`).

3. Include the necessary SDK and function files in your application using
   `require`. Note that the SDK will be formally packaged in a future version.

```javascript
const SDK = require("./functionarySDK");
const Func = require("./function");
const utilities = require("./utilities.js");
```

## Getting Started

The SDK provides a straightforward way to execute functions on the Function
Foundry platform. Below is an example of how to execute a function using the
SDK:

```javascript
// Initialize client
const client = new SDK({
  host: "localhost",
  port: 8000,
  token: "f041ba0b98bd3b1362d0a3bc8589db542c11500c",
});

// Set the environment to execute functions
await client.setEnvironment({
  team: "FunctionFoundry",
  environment: "dev",
});

// Find the function to be executed
const outputTextFunction = await client.findFunction({ name: "output_text" });

// Execute the function with input data
const outputTextFunctionTask = await outputTextFunction.execute({
  input: "This is a test",
});

// Wait for the function execution to complete and get the result
// Refresh the call every 1000 ms until throwing an error at 20000 ms
const taskResult = await outputTextFunctionTask.waitForResult(1000, 20000);

console.log("Result: " + taskResult);
```

## Understanding the Code

1. **SDK Initialization**: The first step is to initialize the SDK client by
   providing the necessary connection details, such as the host, port, and
   authentication token.

2. **Set Environment**: Before executing any functions, please specify the
   environment where the functions will be executed. This is necessary to find
   your functions.

3. **Find and Execute Function**: Use `client.findFunction(criteria_json)` to
   locate the desired function. Then, execute the function with the provided
   input data using the `execute(parameters_json)` method.

4. **Get Function Execution Result**: There are two options to get the
   function's result. In the example,
   `waitForResult(refresh_delay, timeout_limit)` is used, which waits for the
   function to complete execution and returns the result. Alternatively, you can
   use the `getResult()` method on the function task object (which you can also
   get via `getTask(id)`).

## Conclusion

The FunctionarySDK simplifies the process of interacting with Functionary. By
following the steps outlined in this readme, you can seamlessly integrate and
interact with functions in your applications.

Happy coding!
