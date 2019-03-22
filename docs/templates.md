# Creating New Templates

PIT is designed to easily turn an existing project into a template. To see an example, check out our [Hello World](https://github.com/The-Politico/template_hello-world) template.


## Getting Started

We'll assume you're starting from a working project you'd like to turn into a template.

To begin, you may want to separate your template from your project version control. You can simply copy your project files to a new directory. At POLITICO, we often take a shortcut: If you've already committed your project to GitHub, you can just delete the `.git` folder at your project's root directory and re-initialize your repo with `git init`.

Next use THE CLI to create a `.pitrc` file in the root of your directory:

```
$ pit make
```

You can also create the file manually, paste the following, and change the `name` to the name of your template:

```javascript
// .pitrc
module.exports = {
  name: 'Your Template Name',
  renderer: 'ejs',
}
```

Once PIT supports more than one rendering engine, you'll be able to replace the `renderer` value as well, but for now `ejs` is the only supported value.

That's actually all you need to make your codebase a template, but you probably want to let your users customize parts of your codebase for their own projects. PIT makes that easy.

For a quick breakdown of `.pitrc` options check out [these docs](pitrc.md). For now, we'll go through some additional options to customize your template.

## `category`

If you're like us, your team will register dozens of templates. To help organize them, PIT lets you categorize your templates. Just set a `category` prop in your template's `.pitrc` file with the name of the category your template fits under.

Now when users run `pit new`, PIT will ask them which category of template they'd like first. If your template doesn't have a `category` designated in its `.pitrc` file, it will go in a default `Other` category automatically.

(Note that if you change the category of your template, all your users will have to re-register your template to see that change.)

## Context creators

The context passed to your `renderer` will be a combination of the answers to user `prompts` and `statics` context defined by the developer of the template.

You can use that context to customize your template files by using [EJS variables](https://ejs.co/#docs).

### `prompts`
PIT provides an easy way to prompt your users for input and use those answers in your codebase.

Set the `prompts` key to an array in your template's `.pitrc`.

Each object in that `prompts` array should follow the [`inquirer` question format](https://www.npmjs.com/package/inquirer#question). The `name` key in each item will be part of your template context whenever a user creates a new project from your template.

**IMPORTANT: The `name` of your prompts must be in camelCase if using the `ejs` renderer. Any dashes or spaces will throw an error when a user runs `pit new`.**

Let's look at an example: You might want a user to provide a name for their project. Your `prompts` could look something like this:

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

Now when a user starts a new project from your template, they will be asked to provide a `projectName`. Once they give one, that variable will be available for rendering out new files from the template.

For example, here's how you might that variable in a `README.md` file in your template:

```markdown
# <%=projectName%>

*My new project documentation...*
```

### `statics`

You can also provide variables that don't require any user input. Add these to a `statics` key in your `.pitrc` file.

These keys will then be part of your context. Remember that this is a JavaScript file, so any valid JavaScript values are acceptable!

For example, let's calculate the current `year` for use in a copyright:
```javascript
// .pitrc
module.exports = {
  ...

  statics: {
    year: new Date().getFullYear()
  }
}
```

Now in our template's `README.md` we can use that value:
```markdown

_____
© POLITICO <%=year%>
```

## Path handlers
You can manage which and how files make it from your template to your user's new project through a couple special path handler properties.

### `ignore`
If you want to ignore certain files in your template's repo, you can add them to array at an `ignore` key in your `.pitrc` file. You can ignore a specific file or any number of files by using [`glob` strings](https://www.npmjs.com/package/glob#glob-primer).

For example, you have a README in your template's repo with instructions on using it with PIT to create a new project. That's good, but you don't necessarily want _that_ README copied into new projects.  To do ignore it when copying over template files, add it to your `ignore` array:

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
You may also want to rename directories or files when copying them over to a new project. You can use the `rename` key.

Each key represents the file path _or part of a file path_ that should be replaced.

For example, if your key is the string `PROJECT` then any file with that string in its path will replace it with a new value.

The value can either be a string or a function receiving the template context as the only argument and returning the replacement value as a string.

#### String Replacement

Let's revisit the example from `ignore` section. Your template has its own README but you'd like to copy a different template as the README in new projects.

Let's say you put _that_ template in a file called `README_template.md`.

Now, you can specify ignoring the template's README, and copying and renaming your project README in your `.pitrc`.

```javascript
// .pitrc
module.exports = {
  ...

  ignore: ['README.md']
  rename: {
    "README_template.md": "README.md"
  }
}
```

#### Function Replacement

Let's say your template has a folder that should be renamed to whatever the `projectName` is. You can use your template's context to rename that file path.

```javascript
// .pitrc
module.exports = {
  ...

  rename: {
    "RENAME_ME": context => context['projectName']
  }
}
```

Now a file in your template at `src/RENAME_ME/index.html` with a context of `projectName: 'myProject'` will be renamed to `src/myProject/index.html`.

## `justCopy`
There may be files that you want to copy as-is, without passing it through your render function. You can define them using the `justCopy` key in your `.pitrc` file. You can specify individual files or files matching a pattern using [`glob` strings](https://www.npmjs.com/package/glob#glob-primer).

By default, PIT already "just copies" binary files like images.

For example, let's say your template includes `ejs` template files that you don't want rendered when starting a new project. In that case, you could put them all in a directory named `templates` and then include that directory as a `justCopy`.

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
Once you have your template ready to go, run `pit test` from the root of your template directory. If the test completes, that means your template is configured correctly!

If you want to inspect the files produced by that test you can run `pit test --no-cleanup`. This will build the files in a directory named `.tmp.pit` in your template directory. You can then open it and make sure everything rendered correctly.

Finally, if you want to be able to test your template with context data, you can create a JSON file in your directory and then pass its path as the first argument to the test method.

```
$ pit test test-context.json
```

(Remember, you probably don't want this test data to be in the final template, so add it to your `ignore` files in your `.pitrc`.)

## Putting it all together
Let's look at a complete example. Say your template looks like this:

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

## Example usage

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

## Updating templates

One of the main goals of PIT is to make updating templates easy. Every time you run `pit new`, PIT will pull down the latest version of the codebase from GitHub.

That said, some of the configuration options set when a user first registers your template don't follow that rule.

If your template's `category` changes, users will need to `pit register` the template again to catch that change.

If you change your template's `name` and you `pit register` it again, you'll notice you  have two registered templates pointing to the same template. To remove one, you can simply run `pit unregister` and select the old name.
