# Parcel, Module Bundler

> 🔨 How to configurate Parcel. *[Tutoriel Parcel : Parcel, Module bundler](https://www.youtube.com/watch?v=YN9NwWR5ExE)* from *grafikart.fr*.
>

![parcel-logo](_readme-img/parcel/parcel-logo.png)

*Parcel.js is a bundler just like rollup, webpack, browserify but its zero-config/no-config and supports bundling the whole web app not just javascript files. Although few bundlers are only Javascript centered. Bundlers like Webpack, Parcel.js are web app bundlers which includes Javascript, it's variants and the whole ecosystem, Images, Stylesheets, Template engines.*

## Table of content

- [Parcel, Module Bundler](#parcel--module-bundler)
  * [Concepts](#concepts)
  * [How to use?](#how-to-use-)
  * [CSS preprocessor: Sass](#css-preprocessor--sass)
  * [CSS postprocessor](#css-postprocessor)
  * [Babel: Converting JS](#babel--converting-js)
  * [ESLint, Prettier & EditorConfig](#eslint--prettier---editorconfig)
  * [Typescript](#typescript)
  * [Add plugins](#add-plugins)
  * [Useful links](#useful-links)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

## Concepts

- Assets: Out of the box support for JS, CSS, HTML, file assets. Parcel Detect all the dependecies declare them and build a tree with dependencies

- [Transformers](https://github.com/parcel-bundler/parcel/tree/v2/packages/transformers): Babel, PostCss... to transform the code.

- [Packagers](https://github.com/parcel-bundler/parcel/tree/v2/packages/packagers): manage behaviours at the end of the chain.

## How to use?

`npm init`

`npm i -D parcel-bundler`

To launch local server:

`parcel serve index.html`

It will create *.dist* and *.cache* directories.

Launch: `http://localhost:1234 `

To build optimized files (css and js minified):

`parcel build index.html`

## CSS preprocessor: Sass

If we add a scss file, Parcel will automatically download node-sass.

Warning: we need to use quotes for url:

````scss
body {
  background: $backgroundColor url("./parcel-js-bkgr.jpg");
}
````

## CSS preprocessor: Less

It's not even necessary to install less, parcel will automatically install less if it detects a less file.

You can import LESS files from JavaScript or html files.

`import './custom.less'`

or

`<link href="./custom.less" rel="stylesheet">`

## CSS postprocessor: PostCSS

Create *.postcssrcrc* at the root with:

````json
{
  "modules": false,
  "plugins": {
    "autoprefixer": {
      "grid": true
    },
    "css-mqpacker": {
      "sort": true
    }
  }
}
````

Delete *.cache* before relaunch dev server

Parcel will add *autoprefixer* and *css-mqpacker* and autoprefix and group media queries automatically.

````css
/*autoprefix*/
@-webkit-keyframes demo {
  from {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1);
  }
  to {
    transform: scale(0.9);
  }
}

@keyframes demo {
  from {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1);
  }
  to {
    transform: scale(0.9);
  }
}

/*group media queries that are in 2 different scss files*/
@media screen and (min-width: 756px) {
  .foo {
    background-color: #FF0000;
  }
  .bar {
    background-color: #3cff26;
  }
}
````

## Babel: Converting JS

`npm install --save-dev @babel/core @babel/cli`

`npm install @babel/preset-env --save-dev`

Create *.babelrc* at the root with:

````json
{
  "presets": ["@babel/preset-env"]
}

````
Delete *.cache* before relaunch dev server.

Babel will convert code, for instance `const` to `var`.

## ESLint, Prettier & EditorConfig

Our three tools all have similar objectives:

make code more consistent in itself and across team members
detect problematic code patterns that could lead to potential bugs
ESLint is by far the most popular JavaScript linter. It statically analyzes your code to help you detect formatting issues and find code inconsistencies.

Prettier, while similar to ESLint by formatting your code, does not check your code quality. It just serves as a code formatter. It does this job pretty well though by natively supporting JavaScript but also JSX, Flow, TypeScript, HTML, JSON, CSS and many more languages.

EditorConfig, on the other hand, does not lint or format your code. It merely defines a standard code formatting style guide among all the IDEs and editors used within a team of developers. For instance, if a team uses two main editors such as Sublime Text and Visual Studio Code, EditorConfig allows them to define a common indentation pattern (spaces or tabs) within a single file.

Download the [**ESLint**](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [**Prettier**](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions for VSCode.

Install Eslint and Prettier libraries:

`npm install eslint prettier --save-dev`

Install [Airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) config:

`npx install-peerdeps --dev eslint-config-airbnb`

Install [**eslint-config-prettier**](https://github.com/prettier/eslint-config-prettier) (disables formatting for ESLint) and [**eslint-plugin-prettier**](https://github.com/prettier/eslint-plugin-prettier) (allows ESLint to show formatting errors as we type):

`npm install -D eslint-config-prettier eslint-plugin-prettier`

In **.eslintrc** (root):

````json
{
  "extends": ["airbnb", "prettier"],
  "env": {
    "es6": true,
    "browser": true,
    "node": true
  },
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": ["error"],
    "no-console": "off"
  }
}
````

on **.prettierrc** (root):

````json
{
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
````



In VSCode:

Open the User Settings, usinge the shortcut Ctrl + Shift + P then search for: “_Preferences: Open Settings (JSON)_”, then add:

````json
"[javascript]": {
    "editor.formatOnSave": true
}
````

In **.editorconfig** (root):

````json
[*]
end_of_line = lf
charset = utf-8
indent_style = space
````



## Typescript

If we use Tyscript instead of Javascript, Parcel will convert automatically.

However, It won't be able to do type checking and won't display any error.

## Add plugins

All the plugins begins by 'parcel-plugin'.

### parcel-plugin-bundle-manifest

For instance let's add, [parcel-plugin-bundle-manifest](https://www.npmjs.com/package/parcel-plugin-bundle-manifest):

`npm install --save-dev parcel-plugin-bundle-manifest`

It will create 'manifest.json'.

### parcel-plugin-custom-dist-structure

It will generate the structure you specify in the configuration object while also handle all your imports (css, images, js...) which makes it suitable for all use cases, from simple websites all the way to complex React/Angular/Vue projects.

[parcel-plugin-custom-dist-structure](https://www.npmjs.com/package/parcel-plugin-custom-dist-structure)

`npm i parcel-plugin-custom-dist-structure --save-dev`

Example configuration object in package.json:

````JSON
"customDistStructure": {
  "config": {
    // Output JS files to dist/js folder
    ".js": "js",
    // Output JPG and PNG files to dist/images folder
    "images": [
      ".jpg",
      ".png"
    ],
    // General idea
    ".fileExtension": "folder/in/dist",
    "folder/in/dist": [ ".file", ".extensions" ]
  },
  "options": {
    // Enable plugin in development mode (default: false)
    "development": true
  }
}
````

## Useful links

- [Parcel documentation](https://parceljs.org/)
- [parcel-bundler/parcel](https://github.com/parcel-bundler/parcel)
- [Using Babel](https://babeljs.io/setup#installation)
- [PostCSS](https://parceljs.org/css.html)
- [What is Parcel.js and how it's faster than webpack?](https://hashnode.com/post/what-is-parceljs-and-how-its-faster-than-webpack-cjrj27c9g01wt84s2elxkdpv5)
- [Why You Should Use ESLint, Prettier & EditorConfig](https://blog.theodo.com/2019/08/why-you-should-use-eslint-prettier-and-editorconfig-together/)
- [Integrating Prettier + ESLint + Airbnb Style Guide in VSCode](https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a)
- [Integrating Prettier + ESLint + Airbnb Style Guide + EditorConfig no VSCode](https://medium.com/matheus-barbosa/integrating-prettier-eslint-airbnb-style-guide-editorconfig-no-vscode-ff950263adbf)
- [reactivestack/parcel-react-ssr](https://github.com/reactivestack/parcel-react-ssr)
- [parcel-plugin-custom-dist-structure](https://www.npmjs.com/package/parcel-plugin-custom-dist-structure)