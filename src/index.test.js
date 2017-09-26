/* eslint-disable global-require */
const expect = require('chai').expect;
const config = require('./index');

describe('config tests', () => {
  describe('default configuration', () => {
    it('gets proper value', () => {
      const value = config.get('gruntworkConfig:defaultOnly');
      return expect(value).to.equal('DefaultOnlyvalue');
    });
  });

  describe('env variable override', () => {
    it('gets proper value', () => {
      const value = config.get('gruntworkConfig:envOverride');
      return expect(value).to.equal('myValue');
    });
  });

  describe('environment specific', () => {
    it('gets proper value', () => {
      const value = config.get('gruntworkConfig:testEnvOverride');
      return expect(value).to.equal('testOverrideValue');
    });
  });

  describe('encrypted key', () => {
    it('gets proper value', (done) => {
      config.getEncrypted('gruntworkConfig:encryptedKey', (err, value) => {
        expect(value).to.equal('myEncryptedValue');
        done();
      });
    });
  });
});
