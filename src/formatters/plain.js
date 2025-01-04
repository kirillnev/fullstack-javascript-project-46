const formatPlain = (diff) => diff.map((node) => {
  switch (node.type) {
    case 'removed':
      return `Property '${node.key}' was removed`;
    case 'added':
      return `Property '${node.key}' was added with value: ${node.value}`;
    case 'updated':
      return `Property '${node.key}' was updated. From ${node.lastValue} to ${node.value}`;
    default:
      return null;
  }
}).filter(Boolean).join('\n');

export default formatPlain;
