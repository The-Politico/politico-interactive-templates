import getConfig from 'Utils/getConfig';
import outputConfig from 'Utils/outputConfig';
import getTemplate from 'Utils/getTemplate';

const unregister = async function(name, verbose = true) {
  const globalConfig = await getConfig();

  if (!name) {
    if (verbose) {
      name = await getTemplate(globalConfig.templates);
      if (!name) {
        return false;
      }
    } else {
      return false;
    }
  }

  if (name in globalConfig.templates) {
    delete globalConfig.templates[name];
    await outputConfig(globalConfig);

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
