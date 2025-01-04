import _ from 'lodash';
import parseFile from './utils/fileParser.js';
import getFormatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const formatFunction = getFormatter(format);

  const buildDiff = (obj1, obj2) => {
    const keys = _.sortBy([...new Set([...Object.keys(obj1), ...Object.keys(obj2)])]);

    return keys.map((key) => {
      if (!_.has(obj2, key)) {
        return { key, value: obj1[key], type: 'removed' };
      }
      if (!_.has(obj1, key)) {
        return { key, value: obj2[key], type: 'added' };
      }
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        return { key, type: 'nested', children: buildDiff(obj1[key], obj2[key]) };
      }
      if (!_.isEqual(obj1[key], obj2[key])) {
        return {
          key, value: obj2[key], lastValue: obj1[key], type: 'updated',
        };
      }
      return { key, value: obj1[key], type: 'unchanged' };
    });
  };

  const diff = buildDiff(data1, data2);
  return formatFunction(diff);
};

export default genDiff;
