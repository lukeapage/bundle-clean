export default class SystemImportExpressionTransformer {
  constructor(babel, params) {
    this.babel = babel;
    this.params = params;
  }

  createTransformedExpression() {
    return this.params[0];
  }
};