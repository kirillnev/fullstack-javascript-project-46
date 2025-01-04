const formatStylish = (diff, depth = 1) => {
  const indent = '    '.repeat(depth - 1);
  const closingIndent = '    '.repeat(depth - 1);

  const formatValue = (value, currentDepth) => {
    if (!_.isObject(value)) return value === null ? 'null' : value;
    const entries = Object.entries(value).map(
      ([key, val]) => `${'    '.repeat(currentDepth)}${key}: ${formatValue(val, currentDepth + 1)}`
    );
    return `{\n${entries.join('\n')}\n${'    '.repeat(currentDepth - 1)}}`;
  };

  const lines = diff.map((node) => {
    switch (node.type) {
      case 'removed':
        return `${indent}- ${node.key}: ${formatValue(node.value, depth)}`;
      case 'added':
        return `${indent}+ ${node.key}: ${formatValue(node.value, depth)}`;
      case 'unchanged':
        return `${indent}  ${node.key}: ${formatValue(node.value, depth)}`;
      case 'updated':
        return `${indent}- ${node.key}: ${formatValue(node.lastValue, depth)}\n${indent}+ ${node.key}: ${formatValue(node.value, depth)}`;
      case 'nested':
        return `${indent}  ${node.key}: ${formatStylish(node.children, depth + 1)}`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return `{\n${lines.join('\n')}\n${closingIndent}}`;
};

export default formatStylish;
