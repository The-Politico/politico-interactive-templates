import expect from 'expect.js';
import getGlobalConfig from 'Utils/getGlobalConfig';
import outputGlobalConfig from 'Utils/outputGlobalConfig';
import register from './index';

import { testTemplateName,
  testTemplateRepo,
  testTemplateOwner,
  testTemplatePath
} from 'Constants/testing';

const emptyConfig = { templates: {} };

describe('Register', () => {
  let globalConfig;

  before(async function() {
    globalConfig = await getGlobalConfig();
    await outputGlobalConfig(emptyConfig);
    await register(testTemplatePath, false);
  });

  it('Registers templates', async function() {
    const newConfig = await getGlobalConfig();
    expect(newConfig.templates).to.have.property(testTemplateName);
    expect(newConfig.templates[testTemplateName].repo).to.be(testTemplateRepo);
    expect(newConfig.templates[testTemplateName].owner).to.be(testTemplateOwner);
  });

  after(async function() {
    await outputGlobalConfig(globalConfig);
  });
});
