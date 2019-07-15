import getGlobalConfig from 'Utils/getGlobalConfig';
import outputGlobalConfig from 'Utils/outputGlobalConfig';
import promptTemplate from 'Utils/promptTemplate/index.js';

/**
 * Removes a template from the user's global .pitrc file
 * @param {string} [name] - The name of the template to remove
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @return {Promise} Resolves when the template is removed
 */
const unregister = async function(name, verbose = true) {
  const globalConfig = await getGlobalConfig();

  if (!name) {
    if (verbose) {
      name = await promptTemplate(globalConfig.templates);
      if (!name) {
        return false;
      }
    } else {
      return false;
    }
  }

  if (name in globalConfig.templates) {
    delete globalConfig.templates[name];
    await outputGlobalConfig(globalConfig);

    if (verbose) {
      console.log(`Success! Your template, "${name}", has been unregistered.`);
    }
  } else {
    if (verbose) {
      console.log(`You don't have a template with the name "${name}."`);
    }
  }
};

export default unregister;
