const SDK = require("../functionarySDK.js");
const utilities = require("../utilities.js");
const Func = require("../function.js");
const Task = require("../task.js");

const environment = "3764e110-2e14-4ab6-a8be-ee7b5b6345d6";
const token = "f041ba0b98bd3b1362d0a3bc8589db542c11500c";

describe("Function tests", () => {
  const client = new SDK({
    host: "localhost",
    port: 8000,
    environment,
    token,
  });

  const fetchSpy = jest.spyOn(global, "fetch");

  test("func.execute() on mocked function", async () => {
    const mockFunction = new Func({ id: "123FuncID" }, client.functionClient);

    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ id: "456TaskID" }),
    });
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ status: "IN PROGRESS" }),
    });

    const mockTask = await mockFunction.execute({ input: "someInput" });
    expect(mockTask instanceof Task).toBe(true);
    expect(mockTask.status).toBe("IN PROGRESS");
  });

});
