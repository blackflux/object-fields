[![Build Status](https://img.shields.io/travis/simlu/obj-paths/master.svg)](https://travis-ci.org/simlu/obj-paths)
[![Test Coverage](https://img.shields.io/coveralls/simlu/obj-paths/master.svg)](https://coveralls.io/github/simlu/obj-paths?branch=master)
[![Greenkeeper Badge](https://badges.greenkeeper.io/simlu/obj-paths.svg)](https://greenkeeper.io/)
[![Dependencies](https://david-dm.org/simlu/obj-paths/status.svg)](https://david-dm.org/simlu/obj-paths)
[![NPM](https://img.shields.io/npm/v/obj-paths.svg)](https://www.npmjs.com/package/obj-paths)
[![Downloads](https://img.shields.io/npm/dt/obj-paths.svg)](https://www.npmjs.com/package/obj-paths)
[![Semantic-Release](https://github.com/simlu/js-gardener/blob/master/assets/icons/semver.svg)](https://github.com/semantic-release/semantic-release)
[![Gardener](https://github.com/simlu/js-gardener/blob/master/assets/badge.svg)](https://github.com/simlu/js-gardener)
[![Gitter](https://github.com/simlu/js-gardener/blob/master/assets/icons/gitter.svg)](https://gitter.im/simlu/obj-paths)

# obj-paths

Utility functions around object paths

## Install

    $ npm i --save obj-paths

## Usage

<!-- eslint-disable import/no-unresolved, import/no-extraneous-dependencies -->
```js
const objPaths = require("obj-paths");

objPaths.split("data(file1,file2)");
// => ["data.file1", "data.file2"]
objPaths.join(["data", "data"]);
// => "data"
```
