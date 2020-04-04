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
    useArraySelector: false,
    joined: false,
    breakFn: (key, value, { traversedBy, matchedBy, context }) => {
      if (matchedBy.length > 1) {
        // matched by '**' and another needle => keep and break
        return true;
      }
      if (traversedBy.length === 1) {
        // traversed by only '**' => delete and break
        const directParent = key.slice(0, -1)
          .reduce((p, k) => p[k], context.obj);
        if (Array.isArray(directParent)) {
          directParent.splice(key[key.length - 1], 1);
        } else {
          delete directParent[key[key.length - 1]];
        }
        return true;
      }
      // look further
      return false;
    }
  });
  return (obj) => {
    retainer(obj, { obj });
  };
};
