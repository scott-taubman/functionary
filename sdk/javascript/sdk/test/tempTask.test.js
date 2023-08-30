const SDK = require("../functionarySDK.js");
const utilities = require("../utilities.js");
const Task = require("../task.js");
const outputJSONID = "e9c964ad-ae03-411f-b019-4dce34c2377e";
const numCharsID = "36d7c970-8572-48ad-b627-23cb4206976a";
const longProcessID = "a65406c5-4c72-4157-b21b-f8454f869409";
const downloadURLID = "726d95e7-258c-4849-95bd-d0a4e0510ebf";
const outputTextID = "d83b1a26-89d7-400e-816c-433757ab278c";
const environment = "3764e110-2e14-4ab6-a8be-ee7b5b6345d6";
const token = "f041ba0b98bd3b1362d0a3bc8589db542c11500c";

// main functionary SDK tests
describe("Functionary SDK", () => {
  let outputTextTask;

  const inputOutput = "This is a test";

  const fetchSpy = jest.spyOn(global, "fetch");

  beforeEach(() => {
    outputTextTask = new Task(
      { status: "IN PROGRESS", id: "abc-def" },
      client.taskClient
    );
  });

  afterEach(() => {
    //fetchSpy.mockRestore();
  });

  const client = new SDK({
    host: "localhost",
    port: 8000,
    environment,
    token,
  });

  test("task.refresh() on output_text", async () => {
    fetchSpy.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ status: "COMPLETE" }),
    });
    await outputTextTask.refresh();

    expect(outputTextTask.status).toEqual("COMPLETE");
  }, 10000);

  test("task.getResult() on output_text", async () => {
    fetchSpy.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ result: inputOutput }),
    });
    const result = await outputTextTask.getResult();
    expect(result).toEqual(inputOutput);
  }, 10000);

  test("task.waitForResult() on output_text", async () => {
    const start = Date.now();
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ status: "IN PROGRESS" }),
    });
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ status: "IN PROGRESS" }),
    });
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ status: "COMPLETE" }),
    });
    fetchSpy.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ result: inputOutput }),
    });
    const result = await outputTextTask.waitForResult(1000, 10000);

    expect(result).toEqual(inputOutput);
    expect(Date.now()).toBeGreaterThan(start + 2000); // since we have two 1000 ms delays
  });
});
