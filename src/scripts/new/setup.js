import zipObject from 'lodash/zipObject';
import getGlobalConfig from 'Utils/getGlobalConfig';
import getRepoConfig from 'Utils/getRepoConfig';
import promptTemplate from 'Utils/promptTemplate/index.js';
import keys from 'lodash/keys';
import merge from 'lodash/merge';
import inquirer from 'inquirer';
import * as renderMethods from 'Utils/renderer/index.js';

export default async function(template, destination, verbose = true, context, override) {
  // Get global configuration
  const globalConfig = await getGlobalConfig();

  // Check/prompt for required args
  if (!template && !override) {
    if (verbose) {
      template = await promptTemplate(globalConfig.templates);
      if (!template) {
        throw new Error('No template provided.');
      }
    } else {
      throw new Error('No template provided.');
    }
  }

  // Get the template's config
  const templateOptions = globalConfig.templates[template];
  const templateConfig = override || await getRepoConfig(templateOptions);

  // Get the tempalate's renderer
  const renderer = renderMethods[templateConfig.renderer];
  if (renderer === undefined) {
    throw new Error(`${templateConfig.renderer} is an invalid rendering method. Available methods are ${keys(renderMethods).join(', ')}`);
  }

  // Process template's static values (resolving promises)
  const staticKeys = keys(templateConfig.statics);
  const staticValues = await Promise.all(staticKeys.map(
    k => typeof templateConfig.statics[k] === 'function' ?
      Promise.resolve(templateConfig.statics[k]()) : // resolve the function if it returns a promise
      Promise.resolve(templateConfig.statics[k]) // if not a function, pass along the value
  ));
  const statics = zipObject(staticKeys, staticValues);

  // Set up/prompt for context values
  if (!context) {
    context = await inquirer.prompt(templateConfig.prompts);
  }
  context = merge({}, context, statics);

  return {
    templateOptions,
    templateConfig,
    renderer,
    context,
  };
};
