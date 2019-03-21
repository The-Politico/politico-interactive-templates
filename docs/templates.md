# Creating New Templates

PIT is designed to easily turn an existing project into a template. To see a finished example template check out our [Hello World](https://github.com/The-Politico/template_hello-world).


## Getting Started
You may want to duplicate your entire project before doing this to keep your template separate from your original project. To start, delete the `.git` folder in your template's project folder. Then use THE CLI to create a `.pitrc` file in the root of your directory:

```
$ pit make
```

OR you can create the file manually, paste the following, and change the `name` to the name of your template:

```javascript
// .pitrc
module.exports = {
  name: 'Your Template Name',
  renderer: 'ejs',
}
```

Once PIT supports more than one rendering engine, you'll be able to replace the `renderer` value as well, but for now `ejs` is the only supported value.

That's actually all you need to make your codebase a template, but you probably want to have some variable content.

For a quick breakdown of `.pitrc` options check out [these docs](pitrc.md). In this doc, we'll go through each option and provide a reasonable example of when you might use it. Remember, everything below this is optional.

## `category`

Users may have dozens of templates registered at some point, so to help organize them PIT comes with a way to categorize your templates. When a user runs `pit new` they will be prompted to find the template they're looking for by first filtering through categories. If your template doesn't have a `category` designated in its `.pitrc` file, it will go in the `Other` category automatically.

Note that if you change the category of your template, all your users will have to re-register your template to see that change.

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

### `ignore`
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

### `rename`
You may also want to rename directories, or files based with hard-coded rules or based on their input. That's where the `rename` key comes in which should be an object.

The keys correspond to the name (or parts of the name) of the directory or file names that should should be replaced. For example if your key is `a` then any `a` in filenames will be replaced with your value. For this reason, it's advised that you make these replacements more unique than single letters.

The value can either be a string which is the replacement value, or a function receiving the template context as the only argument and returning the replacement value as a string.

#### String Replacement

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

#### Function Replacement

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

## `justCopy`
There may be files that you want to copy as-is (i.e. without passing it through your render function). you can define them using the `justCopy` key in your `.pitrc`'s export. It should be an array of [`glob` strings](https://www.npmjs.com/package/glob#glob-primer).

Files that are binary (such as images) will not be rendered in any case (only copied) and don't need to be specified with this option.

**IMPORTANT: Any files that match an `ignore` glob and a `justCopy` glob will be ignored, NOT copied.**

For example, if your codebase template itself includes `ejs` template files that you want to stay as template files. In this case, you could put them all in a directory named `templates` and then include that directory as a `justCopy`.

```javascript
// .pitrc
module.exports = {
  ...

  justCopy: [
    'templates'
  ]
}
```

## Testing your template
Once you have your template ready to go, run `pit test` (make sure you're at the root of your template directory when you do). If the test completes, that means your template works!

If you want to inspect the files produced by that test you can run `pit test --no-cleanup`. This will build the files in a directory named `.tmp.pit` in your template directory. You can then open it and make sure everything rendered correctly.

Finally, if you want to be able to test your template with a set of dummy user-input data you can create a JSON file in your directory and then pass the path to this file as the first argument. For example, you can call it `test-data.json` and then run `pit test test-data.json`. Remember, you probably don't want this dummy data to be in the final template, so add it to your `ignore` files in your `.pitrc`.

## Example Template
For example, consider a codebase that looks like this:

```
YOUR_TEMPLATE
├── projectName-src
│  ├── templates
│  │  └── index.html
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
  }

  ignore: [
    'README.md'
  ],

  rename: {
    "README_template.md": "README.md",
    "projectName": context => context['projectName']
  },

  justCopy: [
    'templates'
  ]
}
```
<br/>

```html
<!-- projectName-src/templates/index.html -->
<h1><%=projectName%></h1>
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
│  ├── templates
│  │  └── index.html
│  └── ...
└── README.md
```
<br/>

```html
<!-- my-project-src/templates/index.html -->
<h1>my-project</h1>
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
