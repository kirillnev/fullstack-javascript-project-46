import YAML from 'yaml';

const parseData = (content, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(content);
    case '.yml':
    case '.yaml':
      return YAML.parse(content);
    default:
      throw new Error(`Unsupported file format: ${format}`);
  }
};

export default parseData;
