import { describe, expect, test } from '@jest/globals';
import getFormatter from '../index.js';
import formatPlain from '../plain.js';
import formatStylish from '../stylish.js';

describe('getFormatter', () => {
  test('returns formatPlain for "plain"', () => {
    expect(getFormatter('plain')).toBe(formatPlain);
  });

  test('returns formatStylish for "stylish"', () => {
    expect(getFormatter('stylish')).toBe(formatStylish);
  });

  test('throws an error for an unknown format', () => {
    expect(() => getFormatter('unknown')).toThrow('Unknown format: unknown');
  });
});
