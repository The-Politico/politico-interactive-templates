import expect from 'expect.js';
import getGlobalConfig from 'Utils/getGlobalConfig';
import outputGlobalConfig from 'Utils/outputGlobalConfig';
import { testTemplateName, testTemplatePath } from 'Constants/testing';

import { register, unregister } from 'Scripts';

const emptyConfig = { templates: {} };

describe('Unregister', () => {
  let globalConfig;

  before(async function() {
    globalConfig = await getGlobalConfig();
    await outputGlobalConfig(emptyConfig);
    await register(testTemplatePath, false);
  });

  it('Unregisters templates', async function() {
    let config = await getGlobalConfig();
    expect(config.templates).to.have.property(testTemplateName);
    await unregister(testTemplateName, false);

    config = await getGlobalConfig();
    expect(config.templates).to.not.have.property(testTemplateName);
  });

  after(async function() {
    await outputGlobalConfig(globalConfig);
  });
});
