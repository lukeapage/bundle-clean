'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _systemImportExpressionTransformer = require('./system-import-expression-transformer');

var _systemImportExpressionTransformer2 = _interopRequireDefault(_systemImportExpressionTransformer);

exports['default'] = function (babel) {
  return new babel.Transformer('systemjs-clean', {
    CallExpression: function CallExpression(node, parent, scope, file) {
      if (this.get('callee').matchesPattern('System.register')) {
        var params = this.get('arguments');
        var transformer = new _systemImportExpressionTransformer2['default'](babel, params);
        var transformedExpression = transformer.createTransformedExpression();
        if (transformedExpression) {
          return babel.types.expressionStatement(transformedExpression);
        }
      } else if (this.get('callee').matchesPattern('System.import')) {
        throw new Error('System.import is not understood');
      }
    }
  });
};

module.exports = exports['default'];