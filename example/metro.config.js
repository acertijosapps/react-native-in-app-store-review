const path = require('path');
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const pkg = require('../package.json');

const root = path.resolve(__dirname, '..');
const exampleModules = path.join(__dirname, 'node_modules');

// Las peerDependencies (react, react-native) deben salir solo de
// example/node_modules: se bloquean las copias de la raíz para no cargar dos
// React Native distintos.
const peers = Object.keys(pkg.peerDependencies);

/** @type {import('@react-native/metro-config').MetroConfig} */
const config = {
  watchFolders: [root],
  resolver: {
    blockList: peers.map(
      (name) =>
        new RegExp(`^${escape(path.join(root, 'node_modules', name))}\\/.*$`),
    ),
    // La librería se resuelve a la raíz del repo; su campo "react-native"
    // apunta a src/index.tsx, así que Metro usa el código fuente.
    extraNodeModules: {
      [pkg.name]: root,
      ...Object.fromEntries(
        peers.map((name) => [name, path.join(exampleModules, name)]),
      ),
    },
    nodeModulesPaths: [exampleModules],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
