/* eslint-disable no-prototype-builtins,no-param-reassign,no-restricted-syntax */
const aws = require('aws-sdk');
const path = require('path');
const nconf = require('nconf');
const glob = require('glob');
const fs = require('fs');
const template = require('string-template');

const configFolder = process.env.GW_CONFIG_DIR || 'config';

function loadEnvironmentSpecificConfig(dir) {
  const baseDir = path.join(process.cwd(), dir);
  const envFile = path.join(baseDir, `${process.env.NODE_ENV}.json`);
  const defaultFile = path.join(baseDir, 'default.json');

  nconf.file(envFile, envFile);
  nconf.file(defaultFile, defaultFile);
}

function loadConfigFromOtherModules() {
  glob.sync('**/*/gw-*/config').forEach(loadEnvironmentSpecificConfig);
}

function deleteEmptyPropertiesOf(object) {
  for (const property in object) {
    if (object.hasOwnProperty(property) && !object[property]) {
      delete object[property];
    } else if (typeof object[property] === 'object') {
      deleteEmptyPropertiesOf(object[property]);
    }
  }
}

function mapCustomEnvVariables() {
  const customEnvFile = path.join(process.cwd(), configFolder, 'env-vars.json');

  if (fs.existsSync(customEnvFile)) {
    const customEnvContent = fs.readFileSync(customEnvFile).toString();
    const mappedConf = JSON.parse(template(customEnvContent, process.env));

    deleteEmptyPropertiesOf(mappedConf);
    nconf.defaults(mappedConf);
  }
}

function loadConfig(config) {
  if (config) {
    nconf.overrides(config);
  }

  mapCustomEnvVariables();
  loadEnvironmentSpecificConfig(configFolder);
  loadConfigFromOtherModules();
}

nconf.Provider.prototype.getEncrypted = function (key, callback) {
  const kms = new aws.KMS();

  const params = {
    CiphertextBlob: Buffer.from(this.get(key), 'base64'),
  };

  kms.decrypt(params, (err, data) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, data.Plaintext.toString('utf8'));
  });
};

loadConfig();
nconf.update = loadConfig;

module.exports = nconf;
