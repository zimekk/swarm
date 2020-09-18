const { getOptions } = require("loader-utils");

module.exports = function (source) {
  const loader = this.async();
  const { assets } = getOptions(this);
  if (this.cacheable) {
    this.cacheable();
  }
  Promise.resolve(assets)
    .then((assets) => JSON.stringify(assets))
    .then((source) => loader(null, source));
};
