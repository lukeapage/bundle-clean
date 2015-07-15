"use strict";

exports.__esModule = true;
exports["default"] = convert;

var _babelCore = require("babel-core");

function convert(src) {
  return _babelCore.transform(src, {
    whitelist: [],
    compact: false,
    plugins: [require("./babel-plugin-systemjs-clean")]
  }).code;
}

;
module.exports = exports["default"];