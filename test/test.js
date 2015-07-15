import { expect } from 'chai';
import convert from '../es5';

describe("covert", () => {
  it("should replace global.define", () => {
    expect(convert(
`"format register";
System.register("github:polymer/mutationobservers@0.4.2", ["github:polymer/mutationobservers@0.4.2/MutationObserver"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  if (window.define) {
    define("mything", function(){});
  }
  global.define = __define;
  return module.exports;
});
`))
      .to.equal(
`"format register";"a";`);
  });
});