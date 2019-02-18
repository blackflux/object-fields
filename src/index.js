const expander = /([^,()]*?)\(([^()]*?)\)/;

module.exports.split = (input) => {
  let result = input;
  while (result.match(expander)) {
    result = result.replace(expander, (m, p1, p2) => p2.split(',').map(e => `${p1}.${e}`).join(','));
  }
  result = result.split(',');
  return [...new Set(result)];
};

const joinRec = input => Object.entries(input)
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

module.exports.join = (input) => {
  const result = {};
  input.forEach(path => path.split('.')
    .reduce((cur, key) => Object.assign(cur, {
      [key]: cur[key] || {}
    })[key], result));
  return joinRec(result);
};

module.exports.getParents = input => [...input
  .reduce((prev, cur) => cur
    .split('')
    .map((e, idx) => (e === '.' ? idx : -1))
    .filter(pos => pos !== -1)
    .reduce((p, c) => p.add(cur.slice(0, c)), prev), new Set())];
