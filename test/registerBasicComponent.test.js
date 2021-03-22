const { expect } = require('chai');
const { registerBasicObject } = require('..');

describe('registerBasicObject', () => {
  it('should register a basic object', () => {
    registerBasicObject('123');
    [
      () => registerBasicObject(),
      () => registerBasicObject(''),
      () => registerBasicObject(123),
      () => registerBasicObject('123'),
      () => registerBasicObject('obj', null),
      () => registerBasicObject('obj', 'xyz'),
    ].forEach((f) => {
      expect(f).to.throw();
    });

    expect(() => registerBasicObject('xyz', {})).to.not.throw();
  });
});
