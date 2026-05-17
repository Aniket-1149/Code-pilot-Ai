const parser = require('@babel/parser');

function parseToAst(code) {
  return parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx']
  });
}

module.exports = { parseToAst };
