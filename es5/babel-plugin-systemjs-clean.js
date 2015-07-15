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
    Function: function Function() {
      var functionBody = this.get('body');
      var statements = functionBody.get('body');
      if (statements.length > 3) {
        if (statements[0].isVariableDeclaration() && statements[1].isExpressionStatement()) {
          var declarations = statements[0].get('declarations');
          if (declarations.length !== 2 || !declarations[0].node.init || !declarations[1].node.init) {
            return;
          }
          if (!declarations[0].get('init').matchesPattern('System.global') || !declarations[1].get('init').matchesPattern('global.define')) {
            return;
          }
          var assignDefine = statements[1].get('expression');
          if (!assignDefine.isAssignmentExpression()) {
            return;
          }
          if (!assignDefine.get('left').matchesPattern('global.define')) {
            return;
          }
          var unassignDefineStatement = statements[statements.length - 2];
          if (!unassignDefineStatement.isExpressionStatement()) {
            return;
          }
          var unassignDefine = statements[1].get('expression');
          if (!unassignDefine.isAssignmentExpression()) {
            return;
          }
          if (!assignDefine.get('left').matchesPattern('global.define')) {
            return;
          }
          statements[0].dangerouslyRemove();
          statements[1].dangerouslyRemove();
          unassignDefineStatement.dangerouslyRemove();

          this.traverse({
            MemberExpression: function MemberExpression() {
              var object = this.get('object');
              var globals = ['global', 'window'];
              if (!object.isIdentifier() || globals.indexOf(object.node.name) < 0) {
                return;
              }
              var property = this.get('property');
              if (!property.isIdentifier() || property.node.name !== 'define') {
                return;
              }

              return babel.types.identifier('undefined');
            },
            Identifier: function Identifier() {
              if (this.node.name !== 'define') {
                return;
              }
              if (babel.types.isMemberExpression(this.parent)) {
                return;
              }
              return babel.types.identifier('undefined');
            }
          });
        }
      }
    },
    ExpressionStatement: function ExpressionStatement(node, parent, scope, file) {
      // remove "format *" directives
      var expression = this.get('expression');
      if (expression.isLiteral() && expression.node.value.indexOf('format') === 0) {
        this.dangerouslyRemove();
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
      } else if (this.get('callee').matchesPattern('System.import')) {}
    }
  });
};

module.exports = exports['default'];

//throw new Error("System.import is not supported");