const objectScan = require('object-scan');

const expander = /([^,()]*?)\(([^()]*?)\)/;

module.exports.split = (fields) => {
  let result = fields;
  while (result.match(expander)) {
    result = result.replace(expander, (m, p1, p2) => p2.split(',').map((e) => `${p1}.${e}`).join(','));
  }
  result = result.split(',');
  return [...new Set(result)];
};

const joinRec = (input) => Object.entries(input)
  .map(([key, value]) => {
    switch (Object.keys(value).length) {
      case 0:
        return key;
      case 1:
        return `${key}.${joinRec(value)}`;
      default:
        return `${key}(${joinRec(value)})`;
    }
  })
  .join(',');

module.exports.join = (fields) => {
  const result = {};
  fields.forEach((path) => path.split('.')
    .reduce((cur, key) => Object.assign(cur, {
      [key]: cur[key] || {}
    })[key], result));
  return joinRec(result);
};

module.exports.getParents = (fields) => [...fields
  .reduce((prev, cur) => cur
    .split('')
    .map((e, idx) => (e === '.' ? idx : -1))
    .filter((pos) => pos !== -1)
    .reduce((p, c) => p.add(cur.slice(0, c)), prev), new Set())];

module.exports.Retainer = (fields) => {
  const retainer = objectScan(['**'].concat(fields), {
    rtn: 'count',
    useArraySelector: false,
    breakFn: ({ parent, property, getTraversedBy }) => {
      if (parent === undefined) {
        return false;
      }
      if (getTraversedBy().length === 1) {
        // traversed by only '**' => delete and break
        if (Array.isArray(parent)) {
          parent.splice(property, 1);
        } else {
          // eslint-disable-next-line no-param-reassign
          delete parent[property];
        }
        return true;
      }
      // look further
      return false;
    }
  });
  return (obj) => {
    retainer(obj);
  };
};
