import expect from 'expect.js';
import getConfig from 'Utils/getConfig';
import outputConfig from 'Utils/outputConfig';
import register from './index';

const testRepo = 'git@github.com:The-Politico/template_pit-test.git';

describe('Register', () => {
  let config = {};

  before(async function() {
    config = await getConfig();
    await outputConfig({});
    await register(testRepo, false);
  });

  it('Registers template', async function() {
    const newConfig = await getConfig();
    expect(newConfig.templates).to.have.property('PIT Test');
    expect(newConfig.templates['PIT Test'].path).to.be(testRepo);
  });

  after(async function() {
    await outputConfig(config);
  });
});
