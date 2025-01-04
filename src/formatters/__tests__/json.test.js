import { describe, expect, test } from '@jest/globals';
import formatJson from '../json.js';

describe('formatJson', () => {
  test('formats diff as a JSON string', () => {
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
    ];

    const expected = JSON.stringify(diff, null, 2);

    expect(formatJson(diff)).toBe(expected);
  });
});
