const { expect } = require('chai');
const { registerBasicObject, registerObject } = require('..');

describe('registerObject', () => {
  it('should register an object', () => {
    registerBasicObject('basic');
    registerObject('alreadyExists', ['basic']);
    [
      () => registerObject(),
      () => registerObject(''),
      () => registerObject(123),
      () => registerObject('obj'),
      () => registerObject('obj', []),
      () => registerObject('obj', ['doesNotExist']),
      () => registerObject('obj', ['basic'], null),
      () => registerObject('alreadyExists', ['basic']),
    ].forEach((f) => {
      expect(f).to.throw();
    });

    expect(() => registerObject('obj', ['basic'])).to.not.throw();
  });
});
