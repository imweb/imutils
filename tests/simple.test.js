import { isClient } from '../src/index';

test('jest in fake browser environment', () => {
  expect(isClient).toBe(true);
});
