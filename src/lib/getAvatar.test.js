import getAvatar from './getAvatar';

describe('Test: getAvatar()', () => {
  test('Passing nulfrost should return return the correct URL', () => {
    const expected = 'https://github.com/nulfrost.png?size=460';
    const actual = getAvatar('nulfrost');
    expect(expected).toBe(actual);
  });
  test('Passing nothing should return the github avatar', () => {
    const expected = 'https://github.com/github.png?size=460';
    const actual = getAvatar();
    expect(expected).toBe(actual);
  });
});
