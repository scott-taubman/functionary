const SDK = require("../functionarySDK.js");
const Task = require("../task.js");
const utilities = require("../utilities.js");
const outputJSONID = "someFunctionIDjson";
const numCharsID = "someFunctionIDchars";
const outputTextID = "someFunctionIDtext";
const someTaskID = "someTaskID";
const inProgress = "IN PROGRESS";
const environment = "someFunctionIDenv";
const token = "someFunctionIDtoken";

const envData = {
  count: 2,
  next: null,
  previous: null,
  results: [
    {
      id: "29f146e9-4fd0-4cd1-b02d-68c75679c144",
      name: "someTeam",
      environments: [
        { id: "2d113b21-bf1f-4c74-ba12-e37d8f34b72a", name: "prod" },
        { id: environment, name: "someEnv" },
      ],
    },
    {
      id: "87bce48d-529a-4578-bbea-fd96d1de91f4",
      name: "ScriptSanctuary",
      environments: [
        { id: "9b999837-9de0-451f-8875-d8da5936b271", name: "default" },
      ],
    },
  ],
};

const getChars = {
  id: numCharsID,
  parameters: {
    0: {
      name: "input",
      description: "The JSON blob to render",
      type: "json",
      default: null,
      required: true,
    },
  },
  name: "output_json",
  display_name: "Output JSON",
  summary: "Demonstrates JSON output rendering",
  description:
    'Takes in a JSON blob and then simply returns that to demonstrate how the JSON rendering works in the UI. To see table rendering, the input should be a list formatted something like: [ { "param1": "value1", "param2": "value2" }, { "param1": "value3", "param2": "value4" } ]',
  variables: {},
  return_type: "json",
  active: true,
  package: "60957785-0cc6-47d2-94d4-bd1b283daded",
  environment: "3764e110-2e14-4ab6-a8be-ee7b5b6345d6",
};

const functionData = {
  count: 7,
  next: null,
  previous: null,
  results: [
    {
      id: "e9c964ad-ae03-411f-b019-4dce34c2377e",
      parameters: [
        {
          name: "input",
          description: "The JSON blob to render",
          type: "json",
          default: null,
          required: true,
        },
      ],
      name: "output_json",
      display_name: "Output JSON",
      summary: "Demonstrates JSON output rendering",
      description:
        'Takes in a JSON blob and then simply returns that to demonstrate how the JSON rendering works in the UI. To see table rendering, the input should be a list formatted something like: [ { "param1": "value1", "param2": "value2" }, { "param1": "value3", "param2": "value4" } ]',
      variables: [],
      return_type: "json",
      active: true,
      package: "60957785-0cc6-47d2-94d4-bd1b283daded",
      environment: "3764e110-2e14-4ab6-a8be-ee7b5b6345d6",
    },
    {
      id: outputTextID,
      parameters: [
        {
          name: "input",
          description: "The text to render",
          type: "text",
          default: null,
          required: true,
        },
      ],
      name: "output_text",
      display_name: "Output Text",
      summary: "Demonstrates text output rendering",
      description:
        "Takes in a string and then simply returns that to demonstrate how string results rendering works in the UI. CSV formatted text will provide the option to be rendered as a table.",
      variables: [],
      return_type: "string",
      active: true,
      package: "60957785-0cc6-47d2-94d4-bd1b283daded",
      environment: "3764e110-2e14-4ab6-a8be-ee7b5b6345d6",
    },
    {
      id: "a65406c5-4c72-4157-b21b-f8454f869409",
      parameters: [
        {
          name: "duration",
          description: "How long, in seconds, that the function should run for",
          type: "integer",
          default: "60",
          required: false,
        },
      ],
      name: "long_running_process",
      display_name: "Long Running Process",
      summary: "Simulate a long running process",
      description:
        "Sleeps for the specified duration to simulate a long running process",
      variables: [],
      return_type: null,
      active: true,
      package: "60957785-0cc6-47d2-94d4-bd1b283daded",
      environment: "3764e110-2e14-4ab6-a8be-ee7b5b6345d6",
    },
    {
      id: "9612b4bd-094c-487e-ba6f-ad544ad340c0",
      parameters: [],
      name: "variables",
      display_name: "Display Variables",
      summary: "Displays environment variables at runtime",
      description:
        "Displays all the environment variables that are available to the function at runtime",
      variables: ["HOME", "USER"],
      return_type: null,
      active: true,
      package: "60957785-0cc6-47d2-94d4-bd1b283daded",
      environment: "3764e110-2e14-4ab6-a8be-ee7b5b6345d6",
    },
    {
      id: "36d7c970-8572-48ad-b627-23cb4206976a",
      parameters: [
        {
          name: "file",
          description: "File to measure",
          type: "file",
          default: null,
          required: true,
        },
        {
          name: "other_param",
          description: "Non-file parameter for test purposes",
          type: "text",
          default: null,
          required: true,
        },
      ],
      name: "num_chars",
      display_name: "Number of Characters",
      summary: "Returns the number of characters in given file",
      description: "Returns the number of characters in given file",
      variables: [],
      return_type: "integer",
      active: true,
      package: "60957785-0cc6-47d2-94d4-bd1b283daded",
      environment: "3764e110-2e14-4ab6-a8be-ee7b5b6345d6",
    },
    {
      id: "27286d57-cd3f-44e5-8f4b-8586f0279ace",
      parameters: [
        {
          name: "boolean",
          description: null,
          type: "boolean",
          default: null,
          required: false,
        },
        {
          name: "date",
          description: null,
          type: "date",
          default: null,
          required: false,
        },
        {
          name: "datetime",
          description: null,
          type: "datetime",
          default: null,
          required: false,
        },
        {
          name: "file",
          description: null,
          type: "file",
          default: null,
          required: false,
        },
        {
          name: "float",
          description: null,
          type: "float",
          default: null,
          required: false,
        },
        {
          name: "integer",
          description: null,
          type: "integer",
          default: null,
          required: false,
        },
        {
          name: "json",
          description: null,
          type: "json",
          default: null,
          required: false,
        },
        {
          name: "string",
          description: null,
          type: "string",
          default: null,
          required: false,
        },
        {
          name: "text",
          description: null,
          type: "text",
          default: null,
          required: false,
        },
      ],
      name: "parameter_types",
      display_name: "Parameter Types",
      summary: "Test for parameter type form rendering and passthrough values",
      description:
        "Function to test all of the supported parameter types. Intended to test the UI form rendering for the different types, as well as what data types and values get received by the underlying function.",
      variables: [],
      return_type: null,
      active: true,
      package: "60957785-0cc6-47d2-94d4-bd1b283daded",
      environment: "3764e110-2e14-4ab6-a8be-ee7b5b6345d6",
    },
    {
      id: "516e512c-4477-491d-9c0d-48672c2ec809",
      parameters: [
        {
          name: "url",
          description: "The URL to download",
          type: "string",
          default: null,
          required: true,
        },
      ],
      name: "download_url",
      display_name: "Download URL",
      summary: "Download content from a URL",
      description: "Downloads the supplied URL",
      variables: [],
      return_type: null,
      active: true,
      package: "60957785-0cc6-47d2-94d4-bd1b283daded",
      environment: "3764e110-2e14-4ab6-a8be-ee7b5b6345d6",
    },
  ],
};

const taskData = {
  id: someTaskID,
  tasked_id: outputTextID,
  parameters: {
    additionalProp1: "string",
    additionalProp2: "string",
    additionalProp3: "string",
  },
  return_type: "string",
  status: "PENDING",
  created_at: "2023-08-02T13:47:39.990Z",
  updated_at: "2023-08-02T13:47:39.990Z",
  tasked_type: 0,
  environment: environment,
  creator: environment,
  scheduled_task: environment,
};

// main functionary SDK tests
describe("Functionary SDK", () => {
  const client = new SDK({
    host: "localhost",
    port: 8000,
    token,
  });

  const fetchSpy = jest.spyOn(global, "fetch");

  test("client.getFunction() succeed (1)", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(getChars),
    });
    const mockFunction = await client.getFunction(numCharsID);
    expect(mockFunction.id).toEqual(numCharsID);
  }, 15000);

  test("client.getFunction() fail (1)", async () => {
    try {
      fetchSpy.mockResolvedValueOnce({
        ok: false,
        status: 401,
      });
      const fakeFunction = await client.getFunction("nonexisting-uuid-12345");
      expect(true).toEqual(false);
    } catch (error) {
      console.error("Error: " + error.message);
      expect(error.code).toEqual(401);
    }
  }, 15000);

  test("client.findFunction() succeed (1)", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(functionData),
    });
    const [outputTextFunction] = await client.findFunction({
      name: "output_text",
    });
    expect(outputTextFunction.id).toEqual(outputTextID);
  }, 15000);

  test("client.findFunction() fail (1)", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(functionData),
    });
    const fakeFunctionArray = await client.findFunction({
      name: "nonexisting_function",
    });

    expect(fakeFunctionArray.length).toEqual(0);
  }, 15000);

  test("client.getTask() succeed (1)", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(taskData),
    });
    const taskObject = await client.getTask(someTaskID);
    expect(taskObject.id).toEqual(someTaskID);
  }, 10000);

  test("client.getTask() fail (1)", async () => {
    try {
      fetchSpy.mockResolvedValueOnce({
        ok: false,
        status: 401,
      });
      const taskObject = await client.getTask("NonExistentTaskID");
      expect(true).toEqual(false);
    } catch (error) {
      console.error("Error: " + error.message);
      expect(error.code).toEqual(401);
    }
  }, 10000);

  test("client.setEnvironment() succeed (1)", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(envData),
    });
    await client.setEnvironment({
      team: "someTeam",
      environment: "someEnv",
    });
    expect(client.http.environment).toEqual(environment);
  }, 10000);
});
