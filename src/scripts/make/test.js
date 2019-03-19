import expect from 'expect.js';
import path from 'path';
import rimraf from 'Utils/rimraf';
import make from './index';

describe('Make', () => {
  before(async function() {
    await make('test', false);
  });

  it('Makes a config file', async function() {
    const config = require(path.join(process.cwd(), '.pitrc'));

    expect(config).to.have.property('name');
    expect(config.name).to.be('test');

    expect(config.prompts).to.be.an('array');
    expect(config.rename).to.be.an('object');
  });

  it('Errors if file exists', async function() {
    try {
      await make('test', false);
    } catch (err) {
      expect(err.message).to.be('.pitrc file already exists.');
    }
  });

  after(async function() {
    await rimraf('.pitrc');
  });
});
