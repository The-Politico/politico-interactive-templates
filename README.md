![POLITICO](https://www.politico.com/interactives/cdn/images/badge.svg)

# @politico/interactive-templates

Easy-bake templates from existing projects, backed by GitHub.

## Why this?

At POLITICO, we're always looking for projects we can replicate.

You might have used [Yeoman](https://yeoman.io/), npm scripts or something else in the past to help create the boilerplate code similar projects start from. [We](https://github.com/The-Politico/generator-politico-django) [have](https://github.com/The-Politico/generator-politico-graphics), [too](https://github.com/The-Politico/generator-politico-interactives). These are powerful templating tools, but in some cases they're overkill and the overhead of building generators means only a few members of our team usually create them.

POLITICO interactive templates, or PIT, is designed to make creating templates easy for anyone. It also fits seamlessly in the GitHub-based workflow we use for projects.

With PIT, anyone can easily create a reusable codebase and a simple interface for jump-starting new projects from old ones.

PIT let's us quickly create templates at exactly the point where reuse makes sense. It's a Goldilocks tool for easy replication on our team.

## How it works

PIT is a local CLI tool for scaffolding a new project directory from a template hosted on GitHub. You can turn any existing project hosted on GitHub into a PIT template by simply adding a `.pitrc` configuration file.

Once a project is templatized, you register it with your PIT CLI to use it.

You can customize the CLI for any project by adding prompts via [Inquire.js](https://github.com/SBoudrias/Inquirer.js/) and then use the answers to those questions to customize your template files with [EJS](https://ejs.co/) template rendering.


## Quick start

1. Install:

  ```
  $ npm install -g @politico/interactive-templates
  ```

2. Register a [PIT-configured template](docs/templates.md) hosted on GitHub by using the HTTPS URL for the repo:

  ```
  $ pit register GIT_URL_HERE
  ```

3. To start a new project, make an empty directory:

  ```
  $ mkdir MY_PROJECT_NAME
  $ cd MY_PROJECT_NAME
  ```

4. Then run PIT's new project command:

  ```
  $ pit new
  ```

5. Select your project template, answer any prompts and then BUILD! 🚀

## Read more
- [Creating new PIT templates](docs/templates.md)
- [.pitrc file specification](docs/pitrc.md)
- [Developing this app](docs/developing.md)
