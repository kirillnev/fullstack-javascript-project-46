// src/formatters/stylish.js
import _ from 'lodash';

const indentSize = 4;

// Функция для получения отступа для строк с символами '+' и '-'
const getLineIndent = (depth, type = ' ') => {
  if (type === ' ') {
    return ' '.repeat(indentSize * depth);
  }
  return `${' '.repeat(indentSize * depth - 2) + type} `;
};

// Функция для получения отступа для значений внутри объектов
const getValueIndent = (depth) => ' '.repeat(indentSize * depth);

const formatValue = (value, depth) => {
  if (!_.isObject(value)) {
    if (value === null) return 'null';
    if (typeof value === 'string') return value;
    return String(value);
  }

  const entries = Object.entries(value).map(
    ([key, val]) => `${getValueIndent(depth + 1)}${key}: ${formatValue(val, depth + 1)}`,
  );
  return `{\n${entries.join('\n')}\n${getValueIndent(depth)}}`;
};

const formatStylish = (diff, depth = 1) => {
  const lines = diff.map((node) => {
    const {
      key, type, value, lastValue, children,
    } = node;
    switch (type) {
      case 'added':
        return `${getLineIndent(depth, '+')}${key}: ${formatValue(value, depth)}`;
      case 'removed':
        return `${getLineIndent(depth, '-')}${key}: ${formatValue(value, depth)}`;
      case 'unchanged':
        return `${getLineIndent(depth, ' ')}${key}: ${formatValue(value, depth)}`;
      case 'updated':
        return `${getLineIndent(depth, '-')}${key}: ${formatValue(lastValue, depth)}\n${getLineIndent(depth, '+')}${key}: ${formatValue(value, depth)}`;
      case 'nested':
        return `${getLineIndent(depth, ' ')}${key}: ${formatStylish(children, depth + 1)}`;
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  });

  const closingIndent = ' '.repeat(indentSize * (depth - 1));
  return `{\n${lines.join('\n')}\n${closingIndent}}`;
};

export default formatStylish;
