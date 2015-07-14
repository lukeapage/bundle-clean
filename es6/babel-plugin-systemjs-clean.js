import SystemImportExpressionTransformer from './system-import-expression-transformer';

export default function(babel) {
  const state = {
    InVarDecl: false
  };
  return new babel.Transformer('systemjs-clean', {
    VariableDeclaration: function (node, parent, scope, file) {
      // look for   var global = System.global,
      // __define = global.define;
      if (node.declarations.length === 2) {

        var index = 0, matches = 0;
        this.traverse({
          VariableDeclarator: function (node, parent, scope, file) {
            var pattern = ["System.global", "global.define"][index];
            if (this.node.init) {
              if (this.get('init').matchesPattern(pattern)) {
                matches++;
              }
              index++;
            }
          }
        });
        if (matches === 2) {
          this.dangerouslyRemove();
          // need to remove the next statement...
          console.dir(this.parent.body[1]);
        }
      }
    },
    CallExpression: function (node, parent, scope, file) {
      if (this.get('callee').matchesPattern('System.register')) {
        return;
        var params = this.get('arguments');
        var transformer = new SystemImportExpressionTransformer(babel, params);
        var transformedExpression = transformer.createTransformedExpression();
        if (transformedExpression) {
          return babel.types.expressionStatement(transformedExpression);
        }
      } else if (this.get('callee').matchesPattern('System.import')) {
        throw new Error("System.import is not supported");
      }
    }
  });
}