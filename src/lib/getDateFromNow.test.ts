import getDateFromNow from "./getDatefromNow";
import { describe, expect, test } from "vitest";

describe("Test: getDateFromNow() without suffix", () => {
  test("should return 20 years", () => {
    const dateString = "1999-01-01";
    const result = getDateFromNow(dateString, true);

    expect(result).toBe("24 years");
  });
});

describe("Test: getDateFromNow() with suffix", () => {
  test("should return 20 years", () => {
    const dateString = "1999-01-01";
    const result = getDateFromNow(dateString);

    expect(result).toBe("24 years ago");
  });
});
