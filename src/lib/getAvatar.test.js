import getAvatar from "./getAvatar";

describe("Test: getAvatar()", () => {
  test("Passing nulfrost should return return the correct URL", () => {
    let expected = "https://github.com/nulfrost.png?size=460";
    let actual = getAvatar("nulfrost");
    expect(expected).toBe(actual);
  });
  test("Passing nothing should return the github avatar", () => {
    let expected = "https://github.com/github.png?size=460";
    let actual = getAvatar();
    expect(expected).toBe(actual);
  });
});
