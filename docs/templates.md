# Creating New Templates

PIT is designed to easily turn an existing project into a template.


## Getting Started
You may want to duplicate your entire project before doing this to keep your template separate from your original project. To start, delete the `.git` folder in your template's project folder. Then create a file called `.pitrc`, and paste the following:

```javascript
// .pitrc
module.exports = {
  name: 'Your Template Name',
  renderer: 'ejs',
}
```

Change the `name` to the name of your template. This will have to be a unique name for your user.

Once PIT supports more than one rendering engine, you'll be able to replace the `renderer` value as well, but for now `ejs` is the only supported value.

That's actually all you need to make your codebase a template, but you probably want to have some variable content.

For a quick breakdown of `.pitrc` options check out [these docs](pitrc.md). In this doc, we'll go through each option and provide a reasonable example of when you might use it. Remember, everything below this is optional.

## Context creators

The context passed to your `renderer` will be a combination of the answers to user `prompts` and `statics` context defined by the developer of the template.

### `prompts`
PIT provides an easy way to prompt your users for input and use those answers in your codebase.

Set the `prompts` key to an empty array in the `export` of your `.pitrc`.

Each item in `prompts` should be an object the follows the [`inquirer` question format](https://www.npmjs.com/package/inquirer#question). The `name` key in each item will be added to your template context when a user creates a new instance of your template.

**IMPORTANT: The `name` of your prompts must be in camelCase if using the `ejs` renderer. Any dashes or spaces will throw an error when a user runs `pit new`.**

For example, you might want a user to provide a name for their project. Your `prompts` could look something like this:

```javascript
// .pitrc
module.exports = {
  ...

  prompts: [
    {
      type: 'input',
      name: 'projectName',
      message: 'Project Name: ',
    },  
  ]
}
```

Using the example above, `projectName` will be a variable available to you when writing your templates.

For example, you might want the user's provided name to appear in their `README.md`. Make a file named `README.md` in your template and paste the following:

```markdown
# <%=projectName%>

*Documentation coming soon...*
```

### `statics`
You can also provide variables that all instances of your template have available with the `statics` key in your `.pitrc` file. It should be an object with various keys and values. Those keys will then be variables when writing your templates. Remember that this is a JavaScript file, so any valid JavaScript values are acceptable.

For example, you can add a `copyright` value and `year`:
```javascript
// .pitrc
module.exports = {
  ...

  statics: {
    copyright: 'POLITICO',
    year: new Date().getFullYear()
  }
}
```

Then in your template's `README.md` you can use this like any other variable:
```markdown

_____
© <%=copyright%> <%=year%>
```

## Path handlers
While the content of your files will be passed through your selected `renderer`, managing which and how files make it from your template to your user's instance can be managed through `ignore` and `rename` respectively.

## `ignore`
If you want files in your template's repo that shouldn't be downloaded and used in new instances of your template, you can define them using the `ignore` key in your `.pitrc`'s export. It should be an array of [`glob` strings](https://www.npmjs.com/package/glob#glob-primer).

For example, you might want a README for your template repo with instructions on using the template. In this case, you don't want this file to appear every time a user uses your template. To do this, you could add it to your ignore:

```javascript
// .pitrc
module.exports = {
  ...

  ignore: [
    'README.md'
  ]
}
```

## `rename`
You may also want to rename directories, or files based with hard-coded rules or based on their input. That's where the `rename` key comes in which should be an object.

The keys correspond to the name (or parts of the name) of the directory or file names that should should be replaced. For example if your key is `a` then any `a` in filenames will be replaced with your value. For this reason, it's advised that you make these replacements more unique than single letters.

The value can either be a string which is the replacement value, or a function receiving the template context as the only argument and returning the replacement value as a string.

### String Replacement

For example, if your template has it's own README you could ignore it in your templates output (see `ignore` above), and create a new file called `README_template.md` and fill that with the content of your user's template (see `prompts` above). Then in your `.pitrc` your can add this rename so that any files called `README_template.md` in your template will be called `README.md` when a user generates a new instance of your template:

```javascript
// .pitrc
module.exports = {
  ...

  rename: {
    "README_template.md": "README.md"
  }
}
```

### Function Replacement

For example, if your template has a folder that should be called the same as your user's project name you can use provide a function that returns the `projectName` of the template context:

```javascript
// .pitrc
module.exports = {
  ...

  rename: {
    "renameAsProjectName": context => context['projectName']
  }
}
```

## Example Template
For example, consider a codebase that looks like this:

```
YOUR_TEMPLATE
├── projectName-src
│  └── ...
├── README_template.md
├── README.md
└── .pitrc
```
<br/>

```javascript
// .pitrc
module.exports = {
  name: 'Your Template Name',
  renderer: 'ejs',

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
  }

  ignore: [
    'README.md'
  ],

  rename: {
    "README_template.md": "README.md"
    "projectName": context => context['projectName']
  }
}
```
<br/>

```bash
# README.md
```
```markdown
# My Template

To use my template follow these instructions...

...
```
<br/>

```bash
# README_template.md
```
```markdown
# <%=projectName%>

*Documentation coming soon...*
_____
© <%=copyright%> <%=year%>
```
<br/>

## Example Usage

When a user tries to make a new instance of the template above they'll see this prompt (as defined in the `prompts`'s `message`):

```
$ Project Name:
```

And if they answer `my-project`, their project will look like:
```
ROOT
├── my-project-src
│  └── ...
└── README.md
```
<br/>

```bash
# README.md
```

```markdown
# my-project

*Documentation coming soon...*
_____
© POLITICO 2019
```
<br/>
