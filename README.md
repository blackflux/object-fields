[![Build Status](https://img.shields.io/travis/simlu/objectpaths/master.svg)](https://travis-ci.org/simlu/objectpaths)
[![Test Coverage](https://img.shields.io/coveralls/simlu/objectpaths/master.svg)](https://coveralls.io/github/simlu/objectpaths?branch=master)
[![Greenkeeper Badge](https://badges.greenkeeper.io/simlu/objectpaths.svg)](https://greenkeeper.io/)
[![Dependencies](https://david-dm.org/simlu/objectpaths/status.svg)](https://david-dm.org/simlu/objectpaths)
[![NPM](https://img.shields.io/npm/v/objectpaths.svg)](https://www.npmjs.com/package/objectpaths)
[![Downloads](https://img.shields.io/npm/dt/objectpaths.svg)](https://www.npmjs.com/package/objectpaths)
[![Semantic-Release](https://github.com/simlu/js-gardener/blob/master/assets/icons/semver.svg)](https://github.com/semantic-release/semantic-release)
[![Gardener](https://github.com/simlu/js-gardener/blob/master/assets/badge.svg)](https://github.com/simlu/js-gardener)
[![Gitter](https://github.com/simlu/js-gardener/blob/master/assets/icons/gitter.svg)](https://gitter.im/simlu/objectpaths)

# Objectpaths

Utility functions around object paths

## Install

    $ npm i --save objectpaths

## Usage

<!-- eslint-disable import/no-unresolved, import/no-extraneous-dependencies -->
```js
const objectPaths = require("objectpaths");

objectPaths.expand("data(file1,file2)");
// => [data.file1, data.file2]
```
