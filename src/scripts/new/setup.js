import fs from 'fs-extra';
import getConfig from 'Utils/getConfig';
import downloadRepo from 'Utils/downloadRepo';
import getTemplate from 'Utils/getTemplate';

/**
 * Prompts user for template selection and downloads the template from GitHub
 * @param {string} [template] - The name of the template
 * @param {string} [directory=""] - The directory in which to save the template repo
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @return {Promise} Resolves to a boolean indicating if setup was successful
 */
const setup = async function(template, directory = '', verbose = true) {
  const globalConfig = await getConfig();

  await fs.ensureDir(directory);

  if (!template) {
    if (verbose) {
      template = await getTemplate(globalConfig.templates);
      if (!template) {
        return false;
      }
    } else {
      return false;
    }
  }

  const templatePath = globalConfig.templates[template].path;

  await downloadRepo(templatePath, directory, verbose);
  return true;
};

export default setup;
