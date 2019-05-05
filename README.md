# object-fields

[![Build Status](https://circleci.com/gh/blackflux/object-fields.png?style=shield)](https://circleci.com/gh/blackflux/object-fields)
[![Test Coverage](https://img.shields.io/coveralls/blackflux/object-fields/master.svg)](https://coveralls.io/github/blackflux/object-fields?branch=master)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=blackflux/object-fields)](https://dependabot.com)
[![Dependencies](https://david-dm.org/blackflux/object-fields/status.svg)](https://david-dm.org/blackflux/object-fields)
[![NPM](https://img.shields.io/npm/v/object-fields.svg)](https://www.npmjs.com/package/object-fields)
[![Downloads](https://img.shields.io/npm/dt/object-fields.svg)](https://www.npmjs.com/package/object-fields)
[![Semantic-Release](https://github.com/blackflux/js-gardener/blob/master/assets/icons/semver.svg)](https://github.com/semantic-release/semantic-release)
[![Gardener](https://github.com/blackflux/js-gardener/blob/master/assets/badge.svg)](https://github.com/blackflux/js-gardener)

Utility functions around object paths

## Install

    $ npm i --save object-fields

## Usage

<!-- eslint-disable import/no-unresolved, import/no-extraneous-dependencies -->
```js
const objectFields = require('object-fields');

objectFields.split('data(file1,file2)');
// => ["data.file1", "data.file2"]
objectFields.join(['data', 'data']);
// => "data"
objectFields.join(['path.to.thing', 'path.to.other.thing']);
// => "path.to(thing,other.thing)"
objectFields.getParents(['child', 'parent.child', 'grandparent.parent.child']);
// => ['parent', 'grandparent', 'grandparent.parent']

const data = [{ id: 1, name: 'one' }, { id: 2, name: 'two' }];
objectFields.retain(data, ['name']); // updated data in place
// data => [{ name: 'one' }, { name: 'two' }]
```

## Methods

### split

Takes a shortened input string and separates it into an array.

### join

Takes array of selectors and shortens it into a string

### getParents

Takes array of selectors and returns unique, true parents.

### retain

Takes object and array of selectors. Removes non selected fields from object.

## Known Limitations

This package does not currently support escaping.
