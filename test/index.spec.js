const expect = require('chai').expect;
const {
  split, join, getParents, Retainer
} = require('../src/index');

describe('Testing index.', () => {
  describe('Testing split.', () => {
    it('Testing de-duplication (split).', () => {
      expect(split('data,data')).to.deep.equal(['data']);
    });

    it('Testing simple expand.', () => {
      expect(split('data(file1,file2)')).to.deep.equal(['data.file1', 'data.file2']);
    });

    it('Testing nested expand.', () => {
      expect(split('data(file1,folder1(file2,file3))')).to.deep.equal([
        'data.file1',
        'data.folder1.file2',
        'data.folder1.file3'
      ]);
    });

    it('Testing incomplete bracket.', () => {
      expect(split('data(file1,file2')).to.deep.equal([
        'data(file1',
        'file2'
      ]);
    });
  });

  describe('Testing join.', () => {
    it('Testing de-duplication (join).', () => {
      expect(join(['data', 'data'])).to.deep.equal('data');
      expect(join(['path.to.thing', 'path.to.other.thing']))
        .to.deep.equal('path.to(thing,other.thing)');
    });
  });

  describe('Testing getParents', () => {
    it('Testing basic', () => {
      expect(getParents(['child', '', 'parent.child', 'grandparent.parent.child']))
        .to.deep.equal(['parent', 'grandparent', 'grandparent.parent']);
    });

    it('Testing de-duplication', () => {
      expect(getParents(['grandparent.parent.child', 'grandparent.parent.child']))
        .to.deep.equal(['grandparent', 'grandparent.parent']);
    });
  });

  describe('Testing Retainer.', () => {
    it('Testing top level retain.', () => {
      const data = { id: 1, name: 'a' };
      expect(Retainer(['name'])(data)).to.equal(undefined);
      expect(data).to.deep.equal({ name: 'a' });
    });

    it('Testing nested level retain.', () => {
      const data = { id: 1, arr: [{ arr: [{ id: 1, name: 'a' }] }] };
      expect(Retainer(['arr.arr.name'])(data)).to.equal(undefined);
      expect(data).to.deep.equal({ arr: [{ arr: [{ name: 'a' }] }] });
    });

    it('Testing array filter.', () => {
      const data = [{ name: [] }];
      expect(Retainer([])(data)).to.equal(undefined);
      expect(data).to.deep.equal([]);
    });

    it('Testing readme example', () => {
      const data = [{ id: 1, name: 'one' }, { id: 2, name: 'two' }];
      Retainer(['name'])(data);
      expect(data).to.deep.equal([{ name: 'one' }, { name: 'two' }]);
    });
  });
});
