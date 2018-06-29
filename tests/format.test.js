import { pad } from '../index';

test('pad util', () => {
  expect(pad(2, 2)).toBe('02');
  expect(pad(12, 2)).toBe('12');
  expect(pad(233, 2)).toBe('233');
  expect(pad(233, 4)).toBe('0233');
});
