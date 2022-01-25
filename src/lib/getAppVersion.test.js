import getAppVersion from './getAppVersion';

const app = {
  version: '1.18',
};

describe('Test: getAppVersion()', () => {
  it('Should return 1.18', () => {
    expect(getAppVersion(app)).toBe('1.18');
  });
});
