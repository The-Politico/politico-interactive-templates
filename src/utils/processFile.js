import path from 'path';
import includes from 'lodash/includes';
import ignore from 'ignore';
import globalIgnores from 'Constants/ignores';
import renameFile from './renameFile';

const BINARY_EXTENSIONS = ['png', 'jpg', 'tiff', 'wav', 'mp3', 'doc', 'pdf', 'ai'];

function hasBinaryExtension(filename) {
  return BINARY_EXTENSIONS.some(ext => includes(filename, `.${ext}`));
}

export async function toFile(data, opts) {
  const { content, encoding, name, path: repoFilePath } = data;
  const { destination, templateConfig, renderer, context } = opts;

  // Ignore ignored files
  const ig = ignore().add(
    Array.isArray(templateConfig.ignore) ? [...globalIgnores, ...templateConfig.ignore] : globalIgnores
  );
  if (ig.ignores(repoFilePath)) {
    return null;
  }

  // Set up justCopy ignored files
  const jc = ignore().add(templateConfig.justCopy || []);

  let file;
  if (hasBinaryExtension(name)) {
    file = Buffer.from(content, encoding);
  } else {
    file = Buffer.from(content, encoding).toString('utf8');
    if (!jc.ignores(repoFilePath)) { // not ignoring means the file should be processed:
      try {
        file = renderer(file, context);
      } catch (err) {
        console.error(`There was a problem rendering ${repoFilePath}.`);
        throw err;
      }
    }
  }

  const renderedFilepath = path.join(destination, renameFile(repoFilePath, { rename: templateConfig.rename, context }));

  return { path: renderedFilepath, content: file };
}

export async function toString(data) {
  const text = Buffer.from(data.content, data.encoding).toString('utf8');
  return text;
}
