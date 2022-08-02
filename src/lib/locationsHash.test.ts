import locationsHash from "./locationsHash";
import { describe, expect, test } from "vitest";

describe("Test: locationsHash()", () => {
  test("should return results for popular", () => {
    const result = locationsHash["/popular"];

    expect(result).toBe("popular");
  });
});

describe("Test: locationsHash()", () => {
  test("should return results for recent", () => {
    const result = locationsHash["/recent"];

    expect(result).toBe("recent");
  });
});

describe("Test: locationsHash()", () => {
  test("should 404 if the has path does not exist", () => {
    const result = locationsHash["/foo"];

    expect(result).toBe(undefined);
  });
});
