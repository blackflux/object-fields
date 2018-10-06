const expander = /([^,()]*?)\(([^()]*?)\)/;

module.exports.split = (input) => {
  let result = input;
  while (result.match(expander)) {
    result = result.replace(expander, (m, p1, p2) => p2.split(",").map(e => `${p1}.${e}`).join(','));
  }
  result = result.split(",");
  return result.filter((item, idx, ar) => ar.indexOf(item) === idx);
};

const recMerge = input => Object.entries(input)
  .map(([key, value]) => {
    switch (Object.keys(value).length) {
      case 0:
        return key;
      case 1:
        return `${key}.${recMerge(value)}`;
      default:
        return `${key}(${recMerge(value)})`;
    }
  })
  .join(",");

module.exports.join = (input) => {
  const result = {};
  input.forEach(path => path.split(".")
    .reduce((cur, key) => Object.assign(cur, {
      [key]: cur[key] || {}
    })[key], result));
  return recMerge(result);
};
