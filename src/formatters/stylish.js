import _ from 'lodash';

const indentSize = 4;

const getIndent = (depth, type = ' ') => {
  const spacesCount = Math.max(indentSize * depth - 2, 0);
  const spaces = ' '.repeat(spacesCount);
  if (type === ' ') {
    return spaces + ' ';
  }
  return spaces + type;
};

const formatValue = (value, depth) => {
  if (!_.isObject(value)) {
    if (value === null) return 'null';
    if (typeof value === 'string') return value;
    return String(value);
  }

  const entries = Object.entries(value).map(
    ([key, val]) => `${getIndent(depth + 1)}${key}: ${formatValue(val, depth + 1)}`
  );
  return `{\n${entries.join('\n')}\n${getIndent(depth)}}`;
};

const formatStylish = (diff, depth = 1) => {
  const lines = diff.map((node) => {
    const { key, type, value, lastValue, children } = node;
    switch (type) {
      case 'added':
        return `${getIndent(depth, '+')} ${key}: ${formatValue(value, depth)}`;
      case 'removed':
        return `${getIndent(depth, '-')} ${key}: ${formatValue(value, depth)}`;
      case 'unchanged':
        return `${getIndent(depth, ' ')} ${key}: ${formatValue(value, depth)}`;
      case 'updated':
        return `${getIndent(depth, '-')} ${key}: ${formatValue(lastValue, depth)}\n${getIndent(depth, '+')} ${key}: ${formatValue(value, depth)}`;
      case 'nested':
        return `${getIndent(depth, ' ')} ${key}: ${formatStylish(children, depth + 1)}`;
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  });

  return `{\n${lines.join('\n')}\n${getIndent(depth - 1)}}`;
};

export default formatStylish;
