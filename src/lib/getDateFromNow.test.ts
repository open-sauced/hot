import getDateFromNow from "./getDatefromNow";
import { describe, expect, test } from "vitest";

describe("Test: getDateFromNow() without suffix", () => {
  test("should return 24 years", () => {
    const date = (new Date);

    date.setFullYear(date.getFullYear() - 24);
    const dateString = date.toISOString().substring(0, 10);
    const result = getDateFromNow(dateString, true);

    expect(result).toBe("24 years");
  });
});

describe("Test: getDateFromNow() with suffix", () => {
  test("should return 20 years", () => {
    const date = (new Date);

    date.setFullYear(date.getFullYear() - 20);
    const dateString = date.toISOString().substring(0, 10);

    const result = getDateFromNow(dateString);

    expect(result).toBe("20 years ago");
  });
});
