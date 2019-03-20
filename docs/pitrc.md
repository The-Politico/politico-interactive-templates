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
    <td>`name`\*</td>
    <td>String</td>
    <td>The name of your template</td>
    <td>[Link](templates.md#getting-started)</td>
  </tr>
  <tr>
    <td>`renderer`\*</td>
    <td>String</td>
    <td>The template renderer to use (only supports `ejs`)</td>
    <td>[Link](templates.md#getting-started)</td>
  </tr>
  <tr>
    <td>`category`\*</td>
    <td>String</td>
    <td>The category to put this template in (useful when creating a set of templates)</td>
    <td>[Link](templates.md#getting-started)</td>
  </tr>

  <tr><td colspan="4"><em>Context creators</em></td></tr>
  <tr>
    <td>`prompts`</td>
    <td>Object[]</td>
    <td>An array of [`inquirer` question formated](https://www.npmjs.com/package/inquirer#question) objects</td>
    <td>[Link](templates.md#prompts)</td>
  </tr>
  <tr>
    <td>`statics`</td>
    <td>Object</td>
    <td>Hard-coded data to provide to the template renderer</td>
    <td>[Link](templates.md#statics)</td>
  </tr>

  <tr><td colspan="4"><em>Path handlers</em></td></tr>
  <tr>
    <td>`ignore`</td>
    <td>String[] </td>
    <td>File/directory [`glob` strings](https://www.npmjs.com/package/glob#glob-primer) to ignore when rendering your template</td>
    <td>[Link](templates.md#ignore)</td>
  </tr>
  <tr>
    <td>`rename`</td>
    <td>Object</td>
    <td>Values to replace when found in the names of directories or files</td>
    <td>[Link](templates.md#rename)</td>
  </tr>
</tbody>
</table>
<em>\*Required key</em>

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
