const expander = /([^,()]*?)\(([^()]*?)\)/;

module.exports.split = (input) => {
  let result = input;
  while (result.match(expander)) {
    result = result.replace(expander, (m, p1, p2) => p2.split(",").map(e => `${p1}.${e}`).join(','));
  }
  result = result.split(",");
  return result.filter((item, idx, ar) => ar.indexOf(item) === idx);
};

const recMerge = input => Object.keys(input)
  .map((key) => {
    switch (Object.keys(input[key]).length) {
      case 0:
        return key;
      case 1:
        return `${key}.${recMerge(input[key])}`;
      default:
        return `${key}(${recMerge(input[key])})`;
    }
  })
  .join(",");

module.exports.join = (input) => {
  const result = {};
  input
    .filter((item, idx, ar) => ar.indexOf(item) === idx)
    .forEach((f) => {
      let cur = result;
      f.split(".").forEach((key) => {
        if (cur[key] === undefined) {
          cur[key] = {};
        }
        cur = cur[key];
      });
    });
  return recMerge(result);
};
