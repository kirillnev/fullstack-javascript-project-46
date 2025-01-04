import { expect, test } from '@jest/globals';
import parseData from '../dataParser.js';

test('correctly parses valid JSON content', () => {
  const content = '{"key": "value"}';
  const expected = { key: 'value' };

  expect(parseData(content, '.json')).toEqual(expected);
});

test('correctly parses valid YAML content', () => {
  const content = 'key: value\nnumber: 10';
  const expected = {
    key: 'value',
    number: 10,
  };

  expect(parseData(content, '.yml')).toEqual(expected);
});

test('throws error for unsupported file format', () => {
  const content = 'some text';
  const format = '.txt';

  expect(() => parseData(content, format)).toThrow(`Unsupported file format: ${format}`);
});

test('throws an error for invalid JSON content', () => {
  const invalidJsonContent = '{key: value}';
  const format = '.json';

  expect(() => parseData(invalidJsonContent, format)).toThrow();
});
