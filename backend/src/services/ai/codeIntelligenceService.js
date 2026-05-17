const { parseToAst } = require('./astService');

function analyzeCode(code) {
  const ast = parseToAst(code);
  return { astType: ast.type, bodyCount: ast.program.body.length };
}

module.exports = { analyzeCode };
