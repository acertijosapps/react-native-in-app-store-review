const path = require('path');
const pkg = require('../package.json');

// Autolinking toma el módulo nativo (android/ e ios/) desde la raíz del repo,
// sin instalar la librería en node_modules.
module.exports = {
  dependencies: {
    [pkg.name]: {
      root: path.join(__dirname, '..'),
    },
  },
};
