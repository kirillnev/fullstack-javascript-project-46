import { describe, expect, test } from '@jest/globals';
import genDiff from '../genDiff.js';

describe('genDiff function', () => {
  test('returns a string with "-" and "+" for a modified key', () => {
    const filepath1 = './__fixtures__/file1.json';
    const filepath2 = './__fixtures__/file2.json';
    const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

    expect(genDiff(filepath1, filepath2, 'stylish')).toBe(expected);
  });
});
