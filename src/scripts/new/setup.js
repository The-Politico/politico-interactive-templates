import inquirer from 'inquirer';
import zipObject from 'lodash/zipObject';
import keys from 'lodash/keys';
import merge from 'lodash/merge';
import mergeWith from 'lodash/mergeWith';
import chalk from 'chalk';
import getGlobalConfig from 'Utils/getGlobalConfig';
import getRepoConfig from 'Utils/getRepoConfig';
import promptTemplate from 'Utils/promptTemplate/index.js';
import getRepoDependencies from 'Utils/getRepoDependencies';
import parseRepoPath from 'Utils/parseRepoPath';
import * as renderMethods from 'Utils/renderer/index.js';
import validateTemplateVersion from 'Utils/validateTemplateVersion';
import meta from 'Meta';

export default async function({ template, destination, verbose = true, context, override = {}, validateVersion = true }) {
  // Get global configuration
  const globalConfig = await getGlobalConfig();

  // Check/prompt for required args
  if (!template && !override.config) {
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
  const templateConfig = override.config || await getRepoConfig(templateOptions);

  // Check for template version match
  if (!validateTemplateVersion(templateConfig)) {
    throw new Error(`This template requires version: ${chalk.bold(templateConfig.version)}. Version ${chalk.bold(meta.version)} is installed.`);
  }

  // Get the tempalate's renderer
  const renderer = renderMethods[templateConfig.renderer];
  if (renderer === undefined) {
    throw new Error(`${templateConfig.renderer} is an invalid rendering method. Available methods are ${keys(renderMethods).join(', ')}`);
  }

  // Get the template's dependencies
  const dependencyPaths = override.dependencies || await getRepoDependencies(templateOptions);
  const repos = await Promise.all(
    [...dependencyPaths.map(repoPath => parseRepoPath(repoPath)), templateOptions]
  );
  const dependencies = await Promise.all(
    dependencyPaths.map(repoPath => getRepoConfig(repoPath))
  );
  const projectConfig = mergeWith({}, ...[...dependencies, templateConfig], (obj, src) => {
    if (Array.isArray(obj)) {
      return obj.concat(src);
    }
  });

  // Process template's static values (resolving promises)
  const staticKeys = keys(projectConfig.statics);
  const staticValues = await Promise.all(staticKeys.map(
    k => typeof projectConfig.statics[k] === 'function' ?
      Promise.resolve(projectConfig.statics[k]()) : // resolve the function if it returns a promise
      Promise.resolve(projectConfig.statics[k]) // if not a function, pass along the value
  ));
  const statics = zipObject(staticKeys, staticValues);

  // Set up/prompt for context values
  if (!context) {
    context = await inquirer.prompt(projectConfig.prompts);
  }
  context = merge({}, context, statics);

  return {
    templateOptions,
    repos,
    config: projectConfig,
    renderer,
    context,
  };
};
