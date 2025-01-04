import formatPlain from './plain.js';
import formatStylish from './stylish.js';
import formatJson from './json.js';

const getFormatter = (format) => {
  switch (format) {
    case 'plain':
      return formatPlain;
    case 'stylish':
      return formatStylish;
    case 'json':
      return formatJson;
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default getFormatter;
