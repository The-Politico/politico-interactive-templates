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

Change the `name` to the name of your template. This will have to be a unique name, so make sure to check the [README](../README.md) for a list of templates that already exist.

Once PIT supports more than one rendering engine, you'll be able to replace that value as well, but for now `ejs` is the only supported value.

That's actually all you need to make your codebase a template, but you probably want to have some variable content.

For a complete breakdown of `.pitrc` options check out [these docs](pitrc.md).

## [`args`](.pitrc.md#args)
PIT provides an easy way to prompt your users for input and use those answers in your codebase.

Set the `args` key to an empty array in the `export` of your `.pitrc`.

Each item in `args` should be an object the follows the [`inquirer` question format](https://www.npmjs.com/package/inquirer#question). The `name` key in each item will be added to your template context when a user creates a new instance of your template.

For example, you might want a user to provide a name for their project. Your `args` could look something like this:

```javascript
// .pitrc
module.exports = {
  ...

  args: [
    {
      type: 'input',
      name: 'project-name',
      message: 'Project Name: ',
    },  
  ]
}
```

Using the example above, `project-name` will be a variable available to you when writing your templates.

For example, you might want the user's provided name to appear in their `README.md`. Make a file named `README.md` in your template and paste the following:

```markdown
# <%=project-name%>

*Documentation coming soon...*
```

## [`context`](.pitrc.md#context)
You can also provide variables that all instances of your template have available with the `context` key in your `.pitrc` file. It should be an object with various keys and values. Those keys will then be variable when writing your templates.

For example, you can add a `credit` value and give it a value:
```javascript
// .pitrc
module.exports = {
  ...

  context: {
    credit: 'Andrew Briz'
  }
}
```

Then in your template's `README.md` you can use this like any other variable:
```markdown

_____
Template created by <%=credit%>.
```

## [`ignore`](.pitrc.md#ignore)
If you want files in your template's repo that shouldn't be downloaded and used in new instances of your template, you can define them using the `ignore` key in your `.pitrc`'s export. It should be an array of [`glob` strings](https://www.npmjs.com/package/glob#glob-primer).

For example, you might want a README for your template repo with instructions on using the template. In this case, you don't want this file to appear every time a user uses your template. To do this, you could add it to your ignores:

```javascript
// .pitrc
module.exports = {
  ...

  ignores: [
    'README.md'
  ]
}
```

## [`rename`](.pitrc.md#rename)
You may also want to rename directories, or files based with hard-coded rules or based on their input. That's where the `rename` key comes in which should be an object.

The keys correspond to the name (or parts of the name) of the directory or file names that should should be replaced. For example if your key is `a` then any `a` in filenames will be replaced with your value. For this reason, it's advised that you make these replacements more unique than single letters.

The value can either be a string which is the replacement value, or a function receiving the template context as the only argument and returning the replacement value as a string.

### String Replacement

For example, if your template has it's own README you could ignore it in your templates output (see `ignore` above), and create a new file called `README_template.md` and fill that with the content of your user's template (see `args` above). Then in your `.pitrc` your can add this rename so that any files called `README_template.md` in your template will be called `README.md` when a user generates a new instance of your template:

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

For example, if your template has a folder that should be called the same as your user's project name you can use provide a function that returns the `project-name` of the template context:

```javascript
// .pitrc
module.exports = {
  ...

  rename: {
    "rename-as-project-name": d => d['project-name']
  }
}
```

## Example Template
So if you've followed all the examples in this guide your template should at least look like this:

```
YOUR_TEMPLATE
├── project-name-src
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

  args: [
    {
      type: 'input',
      name: 'project-name',
      message: 'Project Name: ',
    },  
  ],

  context: {
    credit: 'Andrew Briz'
  },

  ignores: [
    'README.md'
  ],

  rename: {
    "README_template.md": "README.md"
    "project-name": d => d['project-name']
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
# <%=project-name%>

*Documentation coming soon...*
_____
Template created by <%=credit%>.
```
<br/>

## Example Usage

When a user tries to make a new instance of your template they'll see this prompt (as we defined in our `args`'s `message`):

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
Template created by Andrew Briz.
```
<br/>
