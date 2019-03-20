import expect from 'expect.js';
import getConfig from 'Utils/getConfig';
import outputConfig from 'Utils/outputConfig';
import { testTemplateName, testTemplateRepo } from 'Constants/testing';
import register from './index';

const emptyConfig = { templates: {} };

describe('Register', () => {
  let globalConfig;

  before(async function() {
    globalConfig = await getConfig();
    await outputConfig(emptyConfig);
    await register(testTemplateRepo, false);
  });

  it('Registers templates', async function() {
    const newConfig = await getConfig();
    expect(newConfig.templates).to.have.property(testTemplateName);
    expect(newConfig.templates[testTemplateName].path).to.be(testTemplateRepo);
  });

  after(async function() {
    await outputConfig(globalConfig);
  });
});
