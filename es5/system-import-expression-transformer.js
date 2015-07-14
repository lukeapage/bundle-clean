"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SystemImportExpressionTransformer = (function () {
  function SystemImportExpressionTransformer(babel, params) {
    _classCallCheck(this, SystemImportExpressionTransformer);

    this.babel = babel;
    this.params = params;
  }

  SystemImportExpressionTransformer.prototype.createTransformedExpression = function createTransformedExpression() {
    return this.params[0];
  };

  return SystemImportExpressionTransformer;
})();

exports["default"] = SystemImportExpressionTransformer;
;
module.exports = exports["default"];