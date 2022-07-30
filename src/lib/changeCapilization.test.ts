import camelCaseToTitleCase from './camelCaseToTitleCase';
import { describe, test, expect } from 'vitest'

describe('Test: camelCaseToTitleCase()', () => {
  test('open should capitalize', () => {
    const str = "openSauced";
    const result = camelCaseToTitleCase(str);
    expect(result).toBe('Open Sauced');
  });
});
