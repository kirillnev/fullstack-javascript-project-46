import { describe, expect, test } from '@jest/globals';
import formatStylish from '../stylish.js';

describe('formatStylish', () => {
  test('formats diff with added, removed, updated, and unchanged nodes', () => {
    const diff = [
      {
        type: 'removed',
        key: 'host',
        value: 'hexlet.io',
      },
      {
        type: 'added',
        key: 'timeout',
        value: 20,
      },
      {
        type: 'updated',
        key: 'verbose',
        lastValue: true,
        value: false,
      },
      {
        type: 'unchanged',
        key: 'port',
        value: 80,
      },
    ];

    const expected = `{
  - host: hexlet.io
  + timeout: 20
  - verbose: true
  + verbose: false
    port: 80
}`;

    expect(formatStylish(diff)).toBe(expected);
  });
});
