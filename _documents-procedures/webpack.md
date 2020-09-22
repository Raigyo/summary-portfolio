# Webpack 4

> 🔨 Webpack overview. From Grafikart.fr '[Comprendre Webpack](https://www.youtube.com/watch?v=_KXGVca8uXw&list=PLjwdMgw5TTLVzGXGxEBdjwHXCeYnBb7n8)'. The training was for version 3 but has been updated for version 4 using documentation.
>
> Webpack allows you to break up and modulate Javascript.

![Webpack logo](_readme-img/webpack/webpack-logo-horizontal.png)

[Webpack](https://webpack.js.org/) is a **module builder**. This is important to understand, as Webpack does not run **during** your page, it runs during your development.

Webpack is a tool wherein you use a **configuration to explain** to the builder **how to load specific things**. You describe to Webpack how to load `*.js` files, or how it should look at `.scss` files, etc. Then, when you run it, it goes into your entry point and walks up and down your program and figures out **exactly** what it needs, in what order it needs it, and what each piece depends on. It will then create **bundles** — as few as possible, as optimized as possible, that you include as the scripts in your application.



## Concepts covered

- Configuration
- Dev mode / prod mode (new in Webpack 4)
- webpack.config.js (several files: common, dev and prod)
- Lazy Loading / Code splitting
- Minification
- Babel
- CSS, Sass, CSS extraction
- Caching
- Url Loader
- Resolve / Aliases
- Eslint
- Dev Server



## Install Webpack

### Init project

`npm init -y`

`npm i -D webpack webpack-cli`

Structure:

```diff
 webpack-demo
  |- package.json
+ |- index.html
+ |- /src
+   |- index.js
```

### Compile

- Use:

`./node_modules/.bin/webpack`

- Or in package.json:

````` json
"scripts": {

  "test": "echo \"Error: no test specified\" && exit 1",

  "build": "webpack --mode=production",

  "dev": "webpack --mode=development"

 },
`````

Then:

`npm run dev` / `npm run build`

- Or if installed globally use:

`webpack`

NB: it's not a good practise to install it globally.

Will create a 'dist' folder:

```diff
 webpack-demo
  |- package.json
+ |- index.html
+ |- /dist
+   |- main.js
+ |- /src
+   |- index.js
```



## Techniques

### [Mode dev and prod](https://webpack.js.org/configuration/mode/)

Providing the `mode` configuration option tells webpack to use its built-in optimizations accordingly.

It's new in Webpack 4. So webpack provides a preconfiguration for testing and building.

```
string = 'production': 'none' | 'development' | 'production'
```

**package.json**

````json
  "scripts": {
    "dev": "webpack --mode=development",
    "prod": "webpack --mode=production",
    "serve:dev": "webpack-dev-server --open --mode=development",
    "serve:prod": "webpack-dev-server --open --mode=production"
  },
````

We can still use a *webpack.config.js* file. 

Here is an exemple with several configs according to the mode dev or prod, with a common part.

```diff
 webpack-demo
  |- package.json
  |- webpack.config.js
+ |- index.html
+ |- /config
+   |- webpack.common.js
+   |- webpack.development.js
+   |- webpack.production.js
+ |- /build (prod)
+   |- main.js
+ |- /dist (dev)
+   |- main.js
+ |- /src
+   |- index.js
```

**webpack.config.js**

````js
const { merge } = require('webpack-merge');
const commonConfig = require('./config/webpack.common');

module.exports = (env, options) => {
  const config = require(`./config/webpack.${options.mode}`);
  return merge(commonConfig, config);
};
````

**config/webpack.common.js**

````js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: ['./src/css/app.scss', './src/index.js']
        //the entry is the name given to the files in build, here 'main'
    },
    plugins: [
      new HtmlWebpackPlugin({
        hash: true,
        title: 'Webpack overview',
        myPageHeader: 'Webpack overview',
        myEnv: 'Webpack environment: ',
        template: './src/template.html',
        filename: './index.html' //relative to root of the application
      })
    ],
};
````

**config/webpack.development.js**

````js
const path = require("path");

//Configuration
module.exports = {
  watch: true,
  mode: 'development',
	output: {
    path: path.resolve(__dirname, '..', "dist"),
    filename: '[name].js'
  },
  devtool: "eval-cheap-module-source-map",
  plugins: [

  ],//\plugins*/
	module: {
        rules: [
    	//...
        ]//\rules
  }//\modules
}//\module export


````

**config/webpack.production.js**

````js
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
//...

//Configuration
module.exports = {
  watch: true,
  mode: 'production',
	output: {
    path: path.resolve(__dirname, '..', "build"),
    filename: '[name].[chunkhash:8].js'
    //Cache invalidation can be achieved by including a hash to the filenames
  },
  devtool: "source-map",
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].css',
    }),
    new TerserPlugin({
      sourceMap: true
    }),
	//...
  ],//\plugins
	module: {
        rules: [
          //..
        ]//\rules
  }//\modules
}//\module export
````

It's also possible to use only one config file using conditionnals to filter what is applied on dev or prod.

**package.json**

````json
  "scripts": {
    "dev": "NODE_ENV=dev webpack",
    "start": "webpack-dev-server --open",
    "prod": "webpack"
  },
````

**webpack.config.js**

````js
const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');
const dev = process.env.NODE_ENV === "dev";

let cssLoaders = [
  'style-loader',
  'css-loader'
]
//Only use postcss-loader in production
if (!dev) {
  cssLoaders.push({
    loader: 'postcss-loader'
  })
}

//Configuration
let config = {
  entry: './src/index.js',
  watch: dev,
  mode: 'development',
	output: {
    path: path.resolve(__dirname, "build"),
    filename: 'bundle.js'
  },
  //Ternary operator to filter the way to use of TerserPlugin
  devtool: dev ? "eval-cheap-module-source-map" : "source-map",
  plugins: [
   //**
  ],//\plugins
	module: {
		rules: [
          {//CSS used in dev mode
            test: /\.css$/i,
            sideEffects: true,
            use: cssLoaders
          },
          {//SASS used in prod mode
            test: /\.scss$/i,
            sideEffects: true,
            use: [
              ...cssLoaders,
              'sass-loader'
            ]
          }
    	]//\rules
  	}//\modules
}//\config

//Only use TerserPlugin (source map plugin) in production
if (!dev) {
  config.plugins.push(new TerserPlugin({
    sourceMap: true
  }))
}

module.exports = config;
````

### [Lazy Loading](https://webpack.js.org/guides/lazy-loading/) / [Code Splitting](https://webpack.js.org/guides/code-splitting/)

Allows deferred loading for some file to improve performances or if we don't always need a component. This practice essentially involves splitting your code at logical breakpoints, and then loading it once the user has done something that requires, or will require, a new block of code. This speeds up the initial load of the application and lightens its overall weight as some blocks may never even be loaded.

Use this plugin for dynamic imports:

`npm i -D babel-plugin-syntax-dynamic-import`

In **.babelrc.json**:

````json
{
	"presets": [
		["@babel/preset-env", {
			"useBuiltIns": "entry",
			"modules": false,
			"debug":true
		}]
	],
	"plugins": ["syntax-dynamic-import"]
}
````

Exemple with an external component displaying a console log using a promise:

**index.js**

````js
document.getElementById('button').addEventListener('click', function () {
  //Async promise
  import('./print').then(module => {
      const print = module.default;
      print();
  })
})
````

**print.js**

````js
console.log('The print.js module has loaded! See the network tab in dev tools...');

export default () => {
  console.log('Button Clicked: Here\'s "some text"!');
};
````

Another exemple that display Web Assembly in client console, in **index.js**:

````js
import('./test.wasm').then(function (module) {
  //wasm script to add a number to 42
 log(module._Z5add42i(20))// Output: 62
}).catch(console.log)
````

### [Module Resolution](https://webpack.js.org/concepts/module-resolution/), [Resolve (Aliases)](https://webpack.js.org/configuration/resolve/)

A resolver is a library which helps in locating a module by its absolute path. A module can be required as a dependency from another module as:

```js
import foo from 'path/to/module';
// or
require('path/to/module');
```

The dependency module can be from the application code or a third-party library. The resolver helps webpack find the module code that needs to be included in the bundle for every such `require`/`import` statement. webpack uses [enhanced-resolve](https://github.com/webpack/enhanced-resolve) to resolve file paths while bundling modules.

`npm install enhanced-resolve`

By default webpack uses Resolve.

Here an exemple to create aliases:

**webpack.config.js**

````js
    resolve: {
      alias: {
        '@Css': path.resolve(__dirname, '../src/css/'),
        '@Img': path.resolve(__dirname, '../src/img/')
      }
    },
````

**index.js**

````js
import webpackLogo from '@Css/app.scss';
````

It's important not to forget to use this alias everywhere:

**app.scss**

````scss
$background: #DDD;

body {
    background: $background url(@Img/webpack-logo-horizontal.png);
    background-size: 100% 100%;
}
````

### DevServ: [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

Use webpack with a development server that provides live reloading. **This should be used for development only**.

`npm install webpack-dev-server --save-dev`

**package.json**

````json
  "scripts": {
    "serve:dev": "webpack-dev-server --open --mode=development --hot",
    "serve:prod": "webpack-dev-server --open --mode=production"
  },
````

The flag '--hot' enable hot reload. 

The flag '--open' opens the served page in the browser.

**webpack.config.js**


````js

module.exports = {
    entry: {
        app: ['./assets/css/app.scss', './assets/js/app.js']
    },
    output: {
    	path: path.resolve(./public/assets),
    filename: '[name].js',
        publicPath: '/assets/'
  },
  devServer: {
      contentBase: path.resolve('./public'), // path to the directory where pages are served
      sockjsPrefix: '/assets', // use it if DevServ try to access websockets in root
      overlay: true, //add an overlay with errors in the browser
      // If problems with CORS (exemple if we use several domains during dev)
      /*headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      },*/
      // Or we can use a proxy 
       proxy: {
          '/web': {// to distribute assets correctly
            target: ''http://localhost:8000',', // launch PHP server on: 127.0.0.1:8000
            pathRewrite: {'^/web' : ''}
          }
       }
  }
  //...
}
````

Hot reload for specific javascript libraries/frameworks are usually provided with the CLI.

The can be modified using [Hot Module Replacement](https://webpack.js.org/guides/hot-module-replacement/).

Dev server can be used with the html using [html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/) (cfr. infra in plugins section).

Dev server allows custom setup using [webpack-dev-middleware](https://webpack.js.org/guides/development/#using-webpack-dev-middleware).



## Packages

### Loaders

Webpack enables use of [loaders](https://webpack.js.org/loaders/) to preprocess files. This allows you to bundle any static resource way beyond JavaScript. 

#### Babel: [BabelLoader](https://webpack.js.org/loaders/babel-loader/)

*Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code (ex: JSX) into a backwards compatible version of JavaScript (vanilla) in current and older browsers or environments.*

````
npm install --save-dev @babel/core @babel/register @babel/preset-env babel-loader
npm install --save  @babel/polyfill
````

**webpack.config.js**

````js
module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      }
    }]
  }
}
````
**.babelrc.json**

````json
{
	"presets": [
		["@babel/preset-env", {
			"useBuiltIns": "entry",
			"debug":true
		}]
	]
}
````

#### Eslint: [EslintLoader](https://webpack.js.org/loaders/eslint-loader/)

*ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.*

`npm install eslint-loader --save-dev`

Note: You also need to install eslint from npm, if you haven't already:

`npm install eslint --save-dev`

Following plugins/dependencies are also needed:

[eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import): `npm i eslint-plugin-import -D`

[eslint-plugin-node](https://www.npmjs.com/package/eslint-plugin-node): `npm i eslint-plugin-node -D`

[eslint-plugin-promise](https://www.npmjs.com/package/eslint-plugin-promise): `npm i eslint-plugin-promise -D`

[eslint-plugin-standard](https://www.npmjs.com/package/eslint-plugin-standard): `npm i eslint-plugin-standard -D`

We have to load Eslint *before Babel* so for that we use the  `enforce` [property](https://webpack.js.org/configuration/module/#ruleenforce):

**webpack.config.js**

````js
rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
]
````

It's possible to add autofix in the config file, buts it's **not advised**. It's better to correct the errors by hand and learn to avoid them when coding.

````js
options: {
          fix: true,
        },
````

A config file is mandatory to make Eslint working, *.eslintrc* in the root.

Let's use [JavaScript Standard Style](https://www.npmjs.com/package/eslint-config-standard):

`npm install eslint-config-standard-D`

**.eslintrc**

````json
{
    "extends": "standard"
}
````

#### Preprocessor CSS (SASS): [CssLoader](https://webpack.js.org/loaders/css-loader/), [StyleLoader](https://webpack.js.org/loaders/style-loader/), [SassLoader](https://webpack.js.org/loaders/sass-loader/)

**css-loader**: *convert css to strings*

`npm install --save-dev css-loader`

**style-loader**: *inject strings into style tags*

`npm install --save-dev style-loader`

**sass-loader** and node-sass: *to use css preprocessor, here sass to css*

`npm install --save-dev sass-loader node-sass`

**webpack.config.js**

````js
	module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
            //loader on the right loaded first, respect the logical order
          },
          {
            test: /\.scss$/i,
            use: ['style-loader', 'css-loader', 'sass-loader'],
          }
        ]
  }
````

**app.scss**

````scss
$background: #DDD;

body {
    background: $background;
}
````

**index.js**, import scss

````js
import css from './app.scss'
````

SCSS will be automaticaly converted into CSS.

#### Postprocessor CSS (PostCSS): [postcss-loader](https://webpack.js.org/loaders/postcss-loader/)

**PostCSS loader** : *a CSS post-processing tool that can transform your CSS in a lot of  ways, like autoprefixing, linting and more!*

`npm i -D postcss-loader`

If you use plugins, you have to install them.

Exemple:

postcss-preset-env: `npm i postcss-preset-env`

css nano: `npm i cssnano`

**webpack.config.js**

````js
      {
        test: /\.scss$/i,
        //use: ['style-loader', 'css-loader', 'sass-loader'],
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('postcss-preset-env')({
                  browsers: "last 2 versions",
                  stage: 3,
                  features: {
                    "nesting-rules": true
                  }
                }),
                require('cssnano')(),
              ],
            }
          },
          'sass-loader'
        ],
      }
````

or with an external config file:

**webpack.config.js**

````js
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      }
````

**postcss.config.js**

````js
module.exports = {
  plugins: {
    'postcss-preset-env': {
      browsers: 'last 2 versions',
      stage: 3,
      features: {
        "nesting-rules": true
      }
    },
    cssnano: {},
  },
};
````

#### [UrlLoader](https://webpack.js.org/loaders/url-loader/), [FileLoader](https://webpack.js.org/loaders/file-loader/), [ImgLoader](https://www.npmjs.com/package/img-loader), [RawLoader](https://webpack.js.org/loaders/raw-loader/)

**url-loader**: *A loader for webpack which transforms files into base64 URIs.*

` npm install url-loader --save-dev`

**webpack.config.js**

````js
 {
     test: /\.(jpe?g|png|gif|svg)$/i,
         use: [
             {
                 loader: 'url-loader',//base 64 conversion
                 options: {
                     limit: 8192,//beyond the limit it will use 'file-loader' by default
                     name: '[name].[hash:7].[ext]'
                 },
             },
         ],
 },
````

**file-loader**: *The file-loader resolves import/require() on a file into a url and emits the file into the output directory.*

`npm install file-loader --save-dev`

**webpack.config.js**

````js
{
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
    loader: 'file-loader'
},
````

**img-loader**: *Image minimizing loader for webpack 4, meant to be used with url-loader, file-loader, or raw-loader.*

Meant to be used with url-loader, file-loader, or raw-loader

`npm install img-loader --save-dev`

img-loader can be used with a combination of other plugins, for instance imagemin:

[imagemin](https://www.npmjs.com/package/imagemin): `npm install imagemin`

[imagemin-mozjpeg](https://www.npmjs.com/package/imagemin-mozjpeg): `npm install imagemin-mozjpeg`

[imagemin-gifsicle](https://www.npmjs.com/package/imagemin-gifsicle): `npm install imagemin-gifsicle` (if problem during install use: `npm install imagemin-gifsicle@6.0.1`)

[imagemin-pngquant](https://www.npmjs.com/package/imagemin-pngquant): `npm install imagemin-pngquant`

[imagemin-svgo](https://www.npmjs.com/package/imagemin-svgo): `npm install imagemin-svgo`

[imagemin-webp](https://www.npmjs.com/package/imagemin-webp): `npm install imagemin-webp`

**webpack.config.js**

````js
 {
     test: /\.(jpe?g|png|gif|svg)$/i,
         use: [
			'url-loader?limit=10000',
             {
                 loader: 'img-loader',
                 options: {
                     plugins: [
                         require('imagemin-pngquant')({
                             floyd: 0.5,
                             speed: 2
                         }),
                     ]
                 }
             }
         ],
 },
````

**raw-loader**: *A loader for webpack that allows importing files as a String.*

`npm install raw-loader --save-dev`

**webpack.config.js**

````js
module.exports = {
  module: {
    rules: [
      {
        test: /\.txt$/i,
        use: 'raw-loader',
      },
    ],
  },
};
````



### Plugins

Webpack has a rich [plugin](https://webpack.js.org/plugins/) interface. Most of the features within webpack itself use this plugin interface. This makes webpack flexible.

#### [TerserWebpackPlugin](https://webpack.js.org/plugins/terser-webpack-plugin/)

*Minify code*

`npm i terser-webpack-plugin --save-dev`

It's generally a good practice to minify and combine your assets (Javascript & CSS) when deploying to production. This process reduces the size of your assets and dramatically improves your website's load time. Source maps create a map from these compressed asset files back to the source files.

Whe will use [**Devtool**](https://webpack.js.org/configuration/devtool/)  to control if and how **source maps** are generated.

For instance in *webpack.config.js* for production:

````js
module.exports = {
  watch: true,
  mode: 'production',
	//...
  },
  devtool: "source-map",
 }
````

In the browser, disable '**Enable JS source maps**'.

Then we can use `console.log` and `debugger` even with the minified build files.

Warning: [UglifyjsWebpackPlugin](https://webpack.js.org/plugins/uglifyjs-webpack-plugin/) is deprecated

#### [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)

*The HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles.*

`npm i -D webpack-dev-server html-webpack-plugin`

**webpack.config.js**, exemple with a template call:

```` js
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [
    new HTMLPlugin({
      hash: true,
      title: 'My Awesome application',
      myPageHeader: 'Hello World',
      template: './src/template.html',
      filename: './index.html' //relative to root of the application
    })
  ]
}
````

In **package.json**, for instance with 'start':

````json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --mode production",
    "dev": "webpack --mode development",
    "watch": "Webpack --watch --mode none",
    "start": "webpack-dev-server --mode development --open"
  },
````

Exemple of **template.html**

````html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>

  <body>
    <h1> <%= htmlWebpackPlugin.options.myPageHeader %> </h1>
    <h3>Welcome to the Awesome application</h3>

    <my-app></my-app>

  </body>
</html>
````

then: `npm run start` / http://localhost:8080/ 

#### [MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)

*This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.*

To use in production.

`npm install --save-dev mini-css-extract-plugin`

**webpack.config.js**

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
            chunkFilename: '[id].css',
        }),
    ],//\plugins
    module: {
      {
        test: /\.scss$/i,
        sideEffects: true,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/';
              },
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
      }
    ]//\rules
};
```

#### [OptimizeCssAssetsWebpackPlugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)

*It will search for CSS assets during the Webpack build and will optimize \ minimize the CSS (by default it uses cssnano but a custom CSS processor can be specified).*

`npm install --save-dev optimize-css-assets-webpack-plugin`

**webpack.config.js**

````js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//...
plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].css',
    }),
    new TerserPlugin({
      sourceMap: true
    }),
    new OptimizeCSSAssetsPlugin({})
 ],//\plugins
````

#### [WebpackManifestPlugin](https://www.npmjs.com/package/webpack-manifest-plugin)

*Webpack plugin for generating an asset manifest.*

`npm install --save-dev webpack-manifest-plugin`

If we invalidate cache using hashes (chunckhash, contenthash), name of the files are generated with keys.

This plugin will create a  'manifest.json' that can be useful to manage the names, for instance in backend side.

````js
const ManifestPlugin = require('webpack-manifest-plugin');

plugins: [
    new ManifestPlugin()
 ],//\plugins
````

**manifest.json**

````json
{
  "main.css": "/build/main.96a6baa9.css",
  "main.js": "/build/main.d6f62816.js",
  "main.js.map": "/build/main.d6f62816.js.map",
  "./index.html": "/build/./index.html"
}
````

#### [CleanWebpackPlugin](https://www.npmjs.com/package/clean-webpack-plugin)

*A webpack plugin to remove/clean your build folder(s) before building again.*

`npm install --save-dev clean-webpack-plugin`

````js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

plugins: [
     new CleanWebpackPlugin({
      verbose: true,//log
      dry: false// true = test without delete, false = delete
    })
 ],//\plugins
````



## Useful links

- [Webpack 4: comprendre webpack](https://www.grafikart.fr/tutoriels/webpack-4-992)
- [Webpack](https://webpack.js.org/)
- [What is Webpack and why should I care?](https://medium.com/the-self-taught-programmer/what-is-webpack-and-why-should-i-care-part-1-introduction-ca4da7d0d8dc)
- [Webpack 4: mode and optimization](https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a)
- [How to split dev/prod webpack configuration](https://dev.to/didof/how-to-split-dev-prod-webpack-configuration-n53)
- [Modularize Your JavaScript with ES6 Modules and Webpack](https://ericslenk.com/modularize-your-javascript-with-es6-modules-and-webpack.html)
- [How to configure Webpack 4 from scratch for a basic website](https://dev.to/pixelgoo/how-to-configure-webpack-from-scratch-for-a-basic-website-46a5)
- [Code Splitting](https://webpack.js.org/guides/code-splitting/)
- [Débuter avec Webpack](https://www.alsacreations.com/tuto/lire/1754-debuter-avec-webpack.html)
- [A mostly complete guide to webpack (2020)](https://www.valentinog.com/blog/webpack/)
- [Les outils pour travailler côté front](https://bts-sio-formation.com/javascript/developpementfront)
- [Working with Babel 7 and Webpack](https://www.thebasement.be/working-with-babel-7-and-webpack/)
- [JavaScript Standard Style](https://standardjs.com/)
- [Devtool](https://webpack.js.org/configuration/devtool/)
- [What are Javascript Source Maps?](https://blog.rapid7.com/2017/05/24/what-are-javascript-source-maps/)
- [using html-webpack-plugin to generate index.html](https://medium.com/a-beginners-guide-for-webpack-2/index-html-using-html-webpack-plugin-85eabdb73474)
- [PostCSS Preset Env: Babel for CSS](https://dev.to/adrianbdesigns/postcss-preset-env-babel-for-css-12hp)
- [imagemin](https://github.com/imagemin)
- [npm-install](https://docs.npmjs.com/cli/install)
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
- [Comprendre WebAssembly en 5 minutes](https://www.jesuisundev.com/comprendre-webassembly-en-5-minutes/)



