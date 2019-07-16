import path from 'path';
import glob from 'glob';
import chalk from 'chalk';
import flattenDeep from 'lodash/flattenDeep';
import assign from 'lodash/assign';
import { lstat, readFile } from 'fs-extra';
import setup from 'Scripts/new/setup';
import build from 'Scripts/new/build';
import output from 'Scripts/new/output';
import { toFile } from 'Utils/processFile';
import cwd from 'Utils/cwd';
import getRepoConfig from 'Utils/getRepoConfig';
import getRepoDependencies from 'Utils/getRepoDependencies';
import rimraf from 'Utils/rimraf';
import { Logger } from 'Utils/console';

/**
 * Tests a tempalte directory
 * @param {Object} [context] - Data to pass for the test
 * @param {string} [templateDirectory=".tmp.pit"] - The directory containing template files
 * @param {string} [outputDirectory=""] - The directory in which to save the new template
 * @param {boolean} [cleanup=true] - Whether to delete the output files after the test completes
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @return {Promise} Resolves when files are built
 */
export default async function(baseContext, templateDirectory = '', outputDirectory = '.tmp.pit', cleanup = true, verbose = true) {
  // Set up logger
  const logger = new Logger({ verbose });
  const log = logger.log;

  const absoluteTemplateDir = path.join(cwd, templateDirectory);
  log(`🧱 PIT: Testing your template in ${chalk.bold(absoluteTemplateDir)}.`);

  log(`\n[1/5] ⏳  Loading your local template configuration...`);
  const templateConfig = await getRepoConfig(absoluteTemplateDir, true);

  let conf;
  try {
    const setupOverride = {
      config: templateConfig,
      dependencies: await getRepoDependencies(absoluteTemplateDir, true),
    };
    conf = await setup({
      template: '',
      destination: outputDirectory,
      verbose,
      context: baseContext,
      override: setupOverride,
      validateVersion: false,
    });
  } catch (e) {
    throw e;
  }
  const { repos, renderer, context, config } = conf;

  log(`\n[2/5] ✏️  Rendering template dependencies...`);
  const dependencyFiles = await Promise.all(repos.map(d =>
    build(assign({}, d, {
      destination: outputDirectory,
      config,
      renderer,
      context,
    }))
  ));

  log(`\n[3/5] ✏️  Rendering local template...`);
  const localFiles = await processLocalRepo(absoluteTemplateDir, {
    destination: outputDirectory,
    config,
    renderer,
    context,
  });

  const files = flattenDeep([...dependencyFiles, localFiles]);

  log(`\n[4/5] 💾  Saving files...`);
  await output(files, verbose);

  if (cleanup) {
    log(`\n[5/5] 🗑️  Cleaning up test files...`);
    await rimraf(outputDirectory);
  } else {
    log(`\n[5/5] 🗑️  Skipping cleanup...`);
  }

  if (verbose) {
    console.log();
  }

  log('');
  log('Test complete. Looks like your template is good to go!', 'success');
};

async function processLocalRepo(dir, opts) {
  const files = glob.sync(path.join(dir, '**'), { dot: true });

  let filesData = await Promise.all(files.map(async function(f) {
    if ((await lstat(f)).isFile()) {
      const data = {
        content: await readFile(f),
        encoding: 'base64',
        name: path.basename(f),
        path: f.split(dir)[1],
      };
      return toFile(data, opts);
    } else {
      return null;
    }
  }));

  return filesData.filter(f => f);
}
