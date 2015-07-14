'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _systemImportExpressionTransformer = require('./system-import-expression-transformer');

var _systemImportExpressionTransformer2 = _interopRequireDefault(_systemImportExpressionTransformer);

exports['default'] = function (babel) {
  var state = {
    InVarDecl: false
  };
  return new babel.Transformer('systemjs-clean', {
    VariableDeclaration: function VariableDeclaration(node, parent, scope, file) {
      // look for   var global = System.global,
      // __define = global.define;
      if (node.declarations.length === 2) {

        var index = 0,
            matches = 0;
        this.traverse({
          VariableDeclarator: function VariableDeclarator(node, parent, scope, file) {
            var pattern = ['System.global', 'global.define'][index];
            if (this.node.init) {
              if (this.get('init').matchesPattern(pattern)) {
                matches++;
              }
              index++;
            }
          }
        });
        if (matches === 2) {
          console.dir(this.parent);
          console.dir(this.next);
          this.dangerouslyRemove();
        }
      }
    },
    CallExpression: function CallExpression(node, parent, scope, file) {
      if (this.get('callee').matchesPattern('System.register')) {
        return;
        var params = this.get('arguments');
        var transformer = new _systemImportExpressionTransformer2['default'](babel, params);
        var transformedExpression = transformer.createTransformedExpression();
        if (transformedExpression) {
          return babel.types.expressionStatement(transformedExpression);
        }
      } else if (this.get('callee').matchesPattern('System.import')) {
        throw new Error('System.import is not supported');
      }
    }
  });
};

module.exports = exports['default'];