import { expect } from 'chai';
import convert from '../es5';

describe("covert", () => {
  it("should work", () => {
    expect(convert(
`"format register";System.register("a",[],!1,function(a,b,c) { return; });`))
      .to.equal(
`"format register";"a";`);
  });
});