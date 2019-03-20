# PIT RC Configuration

The `.pitrc` file should be written in es5 JavaScript as it will be `require`d by PIT when the `new` command is run. As such it should export an object using the `module.exports = {};` syntax.

Options can be configured by defining these keys in that `exports` object:

<table>
<thead>
  <tr>
    <td><b>Name</b></td>
    <td><b>Type</b></td>
    <td><b>Description</b></td>
    <td><b>Example</b></td>
  </tr>
</thead>
<tbody>
  <tr><td colspan="4"><em>Required config</em></td></tr>
  <tr>
    <td><code>name</code>*</td>
    <td>String</td>
    <td>The name of your template</td>
    <td><a href="templates.md#getting-started">Link</a></td>
  </tr>
  <tr>
    <td><code>renderer</code>*</td>
    <td>String</td>
    <td>The template renderer to use (only supports <code>ejs</code>)</td>
    <td><a href="templates.md#getting-started">Link</a></td>
  </tr>
  <tr>
    <td><code>category</code></td>
    <td>String</td>
    <td>The category to put this template in (useful when creating a set of templates)</td>
    <td><a href="templates.md#category">Link</a></td>
  </tr>

  <tr><td colspan="4"><em>Context creators</em></td></tr>
  <tr>
    <td><code>prompts</code></td>
    <td>Object[]</td>
    <td>An array of <a href="https://www.npmjs.com/package/inquirer#question"><code>inquirer</code> question formated</a> objects</td>
    <td><a href="templates.md#prompts">Link</a></td>
  </tr>
  <tr>
    <td><code>statics</code></td>
    <td>Object</td>
    <td>Hard-coded data to provide to the template renderer</td>
    <td><a href="templates.md#statics">Link</a></td>
  </tr>

  <tr><td colspan="4"><em>Path handlers</em></td></tr>
  <tr>
    <td><code>ignore</code></td>
    <td>String[] </td>
    <td>File/directory <a href="https://www.npmjs.com/package/glob#glob-primer"><code>glob</code> strings</a> to ignore when rendering your template</td>
    <td><a href="templates.md#ignore">Link</a></td>
  </tr>
  <tr>
    <td><code>rename</code></td>
    <td>Object</td>
    <td>Values to replace when found in the names of directories or files</td>
    <td><a href="templates.md#rename">Link</a></td>
  </tr>
</tbody>
</table>
<em>*Required key</em>

## Example
```JavaScript
// .pitrc
module.exports = {
  name: 'Your Template Name',
  renderer: 'ejs',
  category: 'Test',

  prompts: [
    {
      type: 'input',
      name: 'projectName',
      message: 'Project Name: ',
    },  
  ],

  statics: {
    copyright: 'POLITICO',
    year: new Date().getFullYear()
  },

  ignore: [
    'README.md'
  ],

  rename: {
    "README_template.md": "README.md",
    "projectName": context => context['projectName']
  }
}
```

See this example in action [here](templates#example-template).

## The Global `.pitrc`

If you've run `pit register` your CLI made a file in your user directory called `.pitrc` as well. That is not to be confused with the `.pitrc` files located in your template repos.

That file simply holds user options for `pit` (such as what repos you've already registered), and there should be no reason to open/edit it.
