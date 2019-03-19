# PIT RC Configuration

The `.pitrc` file should be written in es5 JavaScript as it will be `require`d by PIT when the `new` command is run. As such it should export an object using the `module.exports = {};` syntax.

Options can be configured by defining these keys in that `exports` object:

| Name | Type | Description  | Example |
| --- | --- | --- | --- |
| `name`* | String | The name of your template | [Link](templates.md#getting-started) |
| `renderer`* | String | The template renderer to use (only supports `ejs`)| [Link](templates.md#getting-started) |
| `args`| Object[]| An array of [`inquirer` question formated](https://www.npmjs.com/package/inquirer#question) objects| [Link](templates.md#args) |
| `context`| Object | Hard-coded data to provide to the template renderer | [Link](templates.md#context) |
| `ignore`| String[] | File/directory [`glob` strings](https://www.npmjs.com/package/glob#glob-primer) to ignore when rendering your template| [Link](templates.md#ignore) |
| `rename`| Object | Values to replace when found in the names of directories or files.| [Link](templates.md#rename) |
<em> * Required key </em>


## Example
```JavaScript
// .pitrc
module.exports = {
  name: 'Your Template Name',
  renderer: 'ejs',

  args: [
    {
      type: 'input',
      name: 'projectName',
      message: 'Project Name: ',
    },  
  ],

  context: {
    credit: 'Andrew Briz'
  },

  ignore: [
    'README.md'
  ],

  rename: {
    "README_template.md": "README.md"
    "projectName": d => d['projectName']
  }
}
```

See this example in action [here](templates#example-template).

## The Global `.pitrc`

If you've run `pit register` you may have noticed that there is a file in your user directory called `.pitrc` as well. That is not to be confused with the `.pitrc` files located in your template repos.

That file simply holds user options for `pit` (such as what repos you've already registered), and there should be no reason to touch it unless you want to delete a registered template.
