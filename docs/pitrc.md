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

See a full example [here](templates#example-template).
