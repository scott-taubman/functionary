const { exceptionMap } = require("../error.js");
const SDK = require("../functionarySDK.js");
const utilities = require("../utilities.js");
const outputJSONID = "e9c964ad-ae03-411f-b019-4dce34c2377e";
const numCharsID = "36d7c970-8572-48ad-b627-23cb4206976a";
const longProcessID = "a65406c5-4c72-4157-b21b-f8454f869409";
const downloadURLID = "726d95e7-258c-4849-95bd-d0a4e0510ebf";
const outputTextID = "d83b1a26-89d7-400e-816c-433757ab278c";
const environment = "3764e110-2e14-4ab6-a8be-ee7b5b6345d6";
const token = "f041ba0b98bd3b1362d0a3bc8589db542c11500c";

const HTTPClient = require("../httpClient");

describe("HTTP Client (mocked)", () => {
  const client = new SDK({
    host: "localhost",
    port: 8000,
    environment,
    token,
  });

  const fetchSpy = jest.spyOn(global, "fetch");

  test("Bad request (missing parameter)", async () => {
    try {
      fetchSpy.mockResolvedValue({ status: 400, ok: false });
      const response = await client.http.request("POST", `/tasks/`, null, {
        bad: "input",
      });
      expect(true).toBe(false);
    } catch (error) {
      console.error("Error: " + error.message);
      expect(error.message).toEqual(exceptionMap[400]().message);
    }
  }, 10000);

  test("Unauthorized (Invalid Token)", async () => {
    const temp = client.http.token;
    try {
      fetchSpy.mockResolvedValue({ status: 401, ok: false });
      client.http.token = "a";
      const response = await client.http.request("GET", "/tasks/");
    } catch (error) {
      console.error("Error: " + error.message);
      expect(error.message).toEqual(exceptionMap[401]().message);
    }
    client.http.token = temp;
  }, 10000);

  test("Forbidden", async () => {
    try {
      fetchSpy.mockResolvedValue({ status: 403, ok: false });
      const response = await client.http.request("GET", "/tasks/");
    } catch (error) {
      console.error("Error: " + error.message);
      expect(error.message).toEqual(exceptionMap[403]().message);
    }
  }, 10000);

  test("Unknown (Giving random code number)", async () => {
    try {
      fetchSpy.mockResolvedValue({ status: 995, ok: false }); // 995 is not a real error code
      const response = await client.http.request("GET", "/tasks/");
    } catch (error) {
      console.error("Error: " + error.message);
      expect(error.message).toEqual(
        "An unknown error occurred (does not match normal http errors)"
      );
    }
  }, 10000);
});
