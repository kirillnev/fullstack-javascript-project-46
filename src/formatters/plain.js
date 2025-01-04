import _ from 'lodash';

const stringifyValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const formatPlain = (diff, parent = '') => {
  const lines = diff.flatMap((node) => {
    const propertyPath = parent ? `${parent}.${node.key}` : node.key;

    switch (node.type) {
      case 'removed':
        return `Property '${propertyPath}' was removed`;
      case 'added':
        return `Property '${propertyPath}' was added with value: ${stringifyValue(node.value)}`;
      case 'updated':
        return `Property '${propertyPath}' was updated. From ${stringifyValue(node.lastValue)} to ${stringifyValue(node.value)}`;
      case 'nested':
        return formatPlain(node.children, propertyPath);
      default:
        return [];
    }
  });

  return lines.join('\n');
};

export default formatPlain;
