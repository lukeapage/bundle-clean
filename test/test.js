var expect = require("chai").expect;
var convert = require("../es5");

describe("covert", function() {
  it("should work", function() {
    expect(convert("Hi!")).to.equal("Hi!");
  });
});