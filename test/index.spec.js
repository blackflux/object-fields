const expect = require('chai').expect;
const index = require('../src/index');


describe('Testing index.', () => {
  describe('Testing expand.', () => {
    it('Testing de-duplication.', () => {
      expect(index.expand("data,data")).to.deep.equal(["data"]);
    });

    it('Testing simple expand.', () => {
      expect(index.expand("data(file1,file2)")).to.deep.equal(["data.file1", "data.file2"]);
    });

    it('Testing nested expand.', () => {
      expect(index.expand("data(file1,folder1(file2,file3))")).to.deep.equal([
        "data.file1",
        "data.folder1.file2",
        "data.folder1.file3"
      ]);
    });

    it('Testing incomplete bracket.', () => {
      expect(index.expand("data(file1,file2")).to.deep.equal([
        "data(file1",
        "file2"
      ]);
    });
  });
});
