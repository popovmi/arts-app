const path = require('path');
const ormConfig = require('../../apps/api/ormconfig.js');
const glob = require('glob');

module.exports = function (config, context) {
  // clean base directory for dist
  const baseDirectory = path.resolve(config.output.path);
  // generate additionalEntries
  console.log(ormConfig);
  const additionalEntries = {
    ...getMigrations(ormConfig.migrations),
  };

  // merge entries
  config.entry = {
    ...config.entry,
    ...additionalEntries,
  };

  //output
  config.output = {
    path: baseDirectory,
    filename: '[name].js',
    libraryTarget: 'commonjs',
  };

  // config.module.rules = newRules;
  return config;
};

function getMigrations(migrations) {
  // Convert js file names to ts
  migrations = migrations.map((migration) => {
    return migration.substr(0, migration.lastIndexOf('.')) + '.ts';
  });
  const additionalEntries = {};

  for (let index = 0; index < migrations.length; index++) {
    const relativePaths = glob.sync(migrations[index], {
      absolute: false,
    });
    // console.log({ relativePaths });

    for (let index = 0; index < relativePaths.length; index++) {
      const relativePath = relativePaths[index];
      const absolutePath = glob.sync(relativePath, {
        absolute: true,
      });
      // console.log({ absolutePath });
      const key = 'migrations/' + relativePath.split('.')[0].split('/').pop();
      additionalEntries[key] = absolutePath;
    }
  }
  console.groupEnd();
  // console.log({ additionalEntries });
  return additionalEntries;
}
