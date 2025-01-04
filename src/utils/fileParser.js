import fs from 'fs';
import path from 'path';
import parseData from './dataParser.js';

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  const format = path.extname(filepath);

  return parseData(content, format);
};

export default parseFile;
