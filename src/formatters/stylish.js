const formatStylish = (diff) => ['{', ...diff.map((node) => {
  switch (node.type) {
    case 'removed':
      return `  - ${node.key}: ${node.value}`;
    case 'added':
      return `  + ${node.key}: ${node.value}`;
    case 'unchanged':
      return `    ${node.key}: ${node.value}`;
    case 'updated':
      return `  - ${node.key}: ${node.lastValue}\n  + ${node.key}: ${node.value}`;
    default:
      return null;
  }
}).filter(Boolean), '}'].join('\n');

export default formatStylish;
