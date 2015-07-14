import SystemImportExpressionTransformer from './system-import-expression-transformer';

export default function(babel) {
  return new babel.Transformer('systemjs-clean', {
    CallExpression: function (node, parent, scope, file) {
      if (this.get('callee').matchesPattern('System.register')) {
        var params = this.get('arguments');
        var transformer = new SystemImportExpressionTransformer(babel, params);
        var transformedExpression = transformer.createTransformedExpression();
        if (transformedExpression) {
          return babel.types.expressionStatement(transformedExpression);
        }
      } else if (this.get('callee').matchesPattern('System.import')) {
        throw new Error("System.import is not understood");
      }
    }
  });
}