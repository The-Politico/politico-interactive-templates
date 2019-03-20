import expect from 'expect.js';
import getConfig from 'Utils/getConfig';
import outputConfig from 'Utils/outputConfig';
import { testTemplateName, testTemplateRepo } from 'Constants/testing';

import { register, unregister } from 'Scripts';

const emptyConfig = { templates: {} };

describe('Unregister', () => {
  let globalConfig;

  before(async function() {
    globalConfig = await getConfig();
    await outputConfig(emptyConfig);
    await register(testTemplateRepo, false);
  });

  it('Unregisters templates', async function() {
    let config = await getConfig();
    expect(config.templates).to.have.property(testTemplateName);
    await unregister(testTemplateName, false);

    config = await getConfig();
    expect(config.templates).to.not.have.property(testTemplateName);
  });

  after(async function() {
    await outputConfig(globalConfig);
  });
});
