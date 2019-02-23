import expect from 'expect.js';
import getConfig from 'Utils/getConfig';
import outputConfig from 'Utils/outputConfig';
import { testTemplateName, testTemplateRepo } from 'Constants/testing';
import register from './index';

describe('Register', () => {
  let config = { templates: {} };

  before(async function() {
    config = await getConfig();
    await outputConfig({});
    await register(testTemplateRepo, false);
  });

  it('Registers template', async function() {
    const newConfig = await getConfig();
    expect(newConfig.templates).to.have.property(testTemplateName);
    expect(newConfig.templates[testTemplateName].path).to.be(testTemplateRepo);
  });

  after(async function() {
    await outputConfig(config);
  });
});
