var expect = require("chai").expect;
var convert = require("../es5");

describe("covert", function() {
  it("should work", function() {
    expect(convert('"format register";System.register("a",[],!1,function(a,b,c) { return; });')
      .to.equal('"format register";System.register("a",[],!1,function(a,b,c) { return; });');
  });
});