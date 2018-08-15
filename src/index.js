const expander = /([^,()]*?)\(([^()]*?)\)/;

module.exports.split = (input) => {
  let result = input;
  while (result.match(expander)) {
    result = result.replace(expander, (m, p1, p2) => p2.split(",").map(e => `${p1}.${e}`).join(','));
  }
  result = result.split(",");
  return result.filter((item, idx, ar) => ar.indexOf(item) === idx);
};

module.exports.join = input => input
  .filter((item, idx, ar) => ar.indexOf(item) === idx).join(",");
