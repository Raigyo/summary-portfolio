# SASS & SCSS: overview

*July 2020*

> 🔨 Training from Udemy
'[SASS & SCSS : la formation ULTIME](https://www.udemy.com/course/sass-scss-la-formation-ultime/)'.

## Concept covered

- Variables
- Nesting
- Current Selector '&'
- Importation '@'
- Inheritance, bloc of properties '%', @extend
- Mixins
- Functions and Built-in modules, (@function)
- Conditions (@if, @else if, @else)
- Loops (@for, @each, @while)
- Lists (Function nth, Append)
- @at-root
- Maps



![sass logo](_readme-img/sass/sass-logo.png)

## What is SASS?

Sass is a preprocessor for CSS. It has been developped using Ruby.

With Sass you can expend the possibilities of CSS.

There are two ways to use Sass: **sass files** or **scss files**.

### SASS: Syntacticaly Awesome Style Sheets ('.sass')

- concise syntax: no curly braces '{}' or semicolons ';'
- more easy to read

### SCSS: Sassy Cascading Style Sheets ('.scss')

- written like CSS
- precise syntax, force to write clearly
- integration/refactoring easier into an existing site using CSS
- future base for CSS specs? (for instance variables)

=> we can choose the syntax used with Sass preprocessor: '.sass' OR '.scss'

=> but it will be the same principle with '.sass' files excepted for the syntax

## Why using Sass?

Because using Sass make your code factorisable, portable, more easy and quicker
to maintain or update.

Sass is **DRY**, Css is **WET**...

Let's see why...

Syntax used in the following exemples and in the repo is Sassy Cascading Style Sheets / '.scss'.

But it's easy to adapt them for '.sass'

![My Sassy Cascading Style Sheets](_readme-img/sass/my-sassy.jpg)

## How to install?

Sass can be used with Windows and Windows Subsystem for Linux (WSL), Linux and MacOsx...

I use it with WSL.

### Installation of SASS preprocessor:

- Install Ruby: `sudo apt-get install ruby-full`
- Install SASS (a 'gem' in Ruby): `sudo gem install sass`
- Test: `sass --version`
- Or you can install it using [scout-app.io](scout-app.io)
(but it's more easy to use it with the terminal)

### Activate sass:

- In project, use relative path: `sass sass/default.scss css/default.css`
(or any other name for the scss/css. It's better to use the same for the two versions)

Sass will create the rendered css in 'css/default.css'. It will also add 'default.css.map'

### Automatic processing/watch:

- `sass --watch sass/default.scss:css/default.css` (use relative path)

Otherwise you will have to relaunch the command `sass sass/default.scss css/default.css`
to regenerate the '.scss' file.

## Sass in a few points

### Comments with sass/scss:

- // Comment: not rendered by sass in css but still in sass/scss file
(so take care of what you write!)
- /\* Comment: rendered by sass in css \*/

### Variables

Exemple:

```
$primaryColor:purple;

header {
    background-color: $primaryColor;
}

```

=> if you have to change a color used in several classes for instance,
no need to change it in each classes, but you just need to do it once!

#### Operations with variables:

- additions and subtractions (ex: `padding: 10px + 2px;` or `padding: 10px - 2;`)
- strings and concatenation
- multiplications and divisions (ex: `15px * 15` but not `15px / 5px`)

### Nesting

Exemple css:

```
footer {
    padding: 50px;
    background-color: $primaryColor;
}

footer span {
    color: #ffffff77;
}
```

Using scss (it will be rendered as if it was written in usual css):

```
footer {
    padding: 50px;
    background-color: $primaryColor;

    span {
        color: #ffffff77;
    }
}
```

=> with sass you can group datas by stacking selectors using nesting

=> factorise

### Current Selector '&' (= parent name )

Exemple with CSS:

```
span {
    color: #ffffff77;
}

span:hover {
    text-decoration: underline;
}
```

Using SCSS (it will be rendered as if it was written in usual css):

```
    span {
        color: #ffffff77;

        &:hover {
            text-decoration: underline;
        }
    }
```

=> again, it's more easy to factorise

### Importation

To import SCSS into an another SCSS without rendering it in 'css'
(for instance if you don't need or want to import the css file a 'html' file):

Use the underscore '_' before the name and use '@' to import the file in '.scss'

Exemple for a new css, 'header':

```
css
-- default.css
-- default.css.map

sass
-- _header.scss
-- default.scss
```

In 'default.scss' import the '_header.scss" with `@import 'header';`
or with '.sass' files `@import header`.

For instance:

```
$primaryColor:purple;

@import 'header';

body {
    background-color: #ceaf26;
}
```

Of course we have to import it after the variables declaration
so you could use variable in the children SCSS...

### Inheritance and bloc of properties

We can declare a *bloc of properties* using Sass. For that we use '%'.

**Before using sass**:

HTML:

```
    <div class="alert alert-green">
      Green box
    </div>

    <div class="alert alert-red">
      Red box
    </div>
```

CSS:

```
.alert {
    padding: 15px;
    border: 1px solid #ccc;
    color: white;
}

.alert-green {
    background-color: green;
}

.alert-red {
    background-color: red;
}

```

=> Inheritence is managed in html file!

**With Sass**:

HTML:

```
    <div class="alert-green">
      Green box
    </div>

    <div class="alert-red">
      Red box
    </div>
```

SCSS:

```
%alert {
    padding: 15px;
    border: 1px solid #ccc;
    color: white;
}

.alert-green {
    @extend %alert;
    background-color: green;
}

.alert-red {
    @extend %alert;
    background-color: red;
}

```

=> **Inheritance is managed in SCSS**!

=> If a bloc of properties is not called in a class, it's not rendered by Sass.

### Mixins & includes

A Mixin is a block of code that lets us group CSS declarations we may reuse throughout our site.

CSS:

```
#logo {
    width: 135px;
    margin-right: auto;
    margin-left: auto;
}

#slogan {
    width: 150px;
    margin-right: auto;
    margin-left: auto;
}
```

SCSS:

```
@mixin center {
    margin-right: auto;
    margin-left: auto;
}

#logo {
    width: 135px;
    @include center;
}

#slogan {
    width: 150px;
    @include center;
}
```
=> The mixins are reusable

=> Mixins can take arguments and include selectors

With arguments:

```
@mixin border-radius ($degree) {
    -moz-border-radius: $degree;
    -webkit-border-radius: $degree;
    -ms-border-radius: $degree;
    border-radius: $degree;
}

footer {
    @include border-radius(15px);
}
```

Mixin exemple for Google Fonts:

```
@mixin googleFonts ($font) {
    @import url('https://fonts.googleapis.com/css2?family=#{$font}');
}

@include googleFonts(Roboto);

body {
    font-family: 'Roboto', sans-serif;
}
```

**Tips**:

Inheritance => when properties on the selectors don't have to change

Mixin => when properties on the selector have to change

### Functions

Mixin generate properties, functions generate results.

#### Built-in modules

See [SASS Built-In Modules](https://sass-lang.com/documentation/modules).

Before creating a new function, check if it already exists in SASS.

#### Create functions (@function)

Exemple:

```
@function calculateDivision ($nombreA, $nombreB){
    @return $nombreA/ $nombreB;
}

footer {
    content: calculateDivision (15.3); //=> content: 5; in code source
}

```

### Conditions (@if, @else if, @else)

```
@if (condition) {
    // We try a first condition
}

@else if (condition) {
    // Then another
}

[...] // As many @else if (condition) as we want

@else {
    // If no condition is verified
}
```

Exemple, creating theme using conditions:

```
// Variables
$theme: ""; // purple / black (otherwise white by default)

// Inheritance / Blocks of properties
%theme {
    @if ($theme == purple){
        background-color: purple;
        color: white;
    }
    @else if ($theme == black){
        background-color: black;
        color: white;
    }
    @else {
        background-color: white;
        color: black;
    }
}

body {
    @extend %theme;
}
```

### Loops (@for, @each, @while)

**@for**

Iterates from one value to another value, returning $i as the current position in the loop.

Exemple, generate grids with **@for**:

```
$columns: 5;

//@for $i from 1 through 6 {
@for $i from 1 through $columns {
    .grid-#{$i} {
        width: 100px*$i;
    }
}
```

Will generate in CSS:

```
.grid-1 {
  width: 100px; }

.grid-2 {
  width: 200px; }

.grid-3 {
  width: 300px; }

.grid-4 {
  width: 400px; }

.grid-5 {
  width: 500px; }

.grid-6 {
  width: 600px; }
```

**@each**

The @each loop iterates each value in an array.

Exemple, generate icons with **@each**:

```
$iconsLists: twitter-square, google-plus-square, facebook-square, share-alt-square;

//@each $name in twitter-square, google-plus-square, facebook-square, share-alt-square {
@each $name in $iconsLists {
    .#{$name}-icon {
        background-image: url('/img/#{$name}.png');
    }
}
```

Will generate in CSS:

```
.twitter-square-icon {
  background-image: url("/img/twitter-square.png"); }

.google-plus-square-icon {
  background-image: url("/img/google-plus-square.png"); }

.facebook-square-icon {
  background-image: url("/img/facebook-square.png"); }

.share-alt-square-icon {
  background-image: url("/img/share-alt-square.png"); }
```

**@while**

A while loop is simply conditional. It will execute until a given condition is met.

Exemple, generate grids with **@while**:

```
$nbGrids: 1;
@while $nbGrids <= 6 {
    .grid-#{$nbGrids} {
        width: 100px*$nbGrids;
    }
    $nbGrids: $nbGrids +1;
}
```

Will generate in CSS:

```
.grid-1 {
  width: 100px; }

.grid-2 {
  width: 200px; }

.grid-3 {
  width: 300px; }

.grid-4 {
  width: 400px; }

.grid-5 {
  width: 500px; }

.grid-6 {
  width: 600px; }
```

### Lists

Used with @each. Cfr.supra.

Use quotes if an item has several words.

#### Function nth

Pick an itemp from a list using index.

```
$iconsLists: twitter-square, google-plus-square, facebook-square, share-alt-square;
footer {
    content: nth($iconsLists, 1); //=> content: twitter-square;
}
```

=> For once, with lists in SASS **index begins at 1**!!!!!!!!

#### Add a value to a list (append)

```
$iconsLists: twitter-square, google-plus-square, facebook-square, share-alt-square;
$addIcon: "address-card";
$iconsLists: append($iconsLists, $addIcon, comma); //space/comma/auto
```

#### Maps

Maps in Sass hold pairs of keys and values, and make it easy to look up a value
by its corresponding key.

```
$default: ( color: blue, font-size: 1em );
#slogan {
    color: map-get($default, color); // blue
}
```

Returns the value in $map associated with $key.

Exemple with each loop to generate classes:

```
$colorMap: (
  color-blue: blue,
  color-red: red,
  color-white: white,
  color-yellow: yellow,
  color-green: green
);
@each $key,$value in $colorMap {
  .#{$key}{
    color: #{$value};
  }
};
```

or:

```
$colorMap2: (
   blue, red, white, yellow, green
);
@each $value in $colorMap2 {
  .color-#{$value}{
    color: #{$value};
  }
};
```

Will render in CSS:

```
.color-blue {
  color: blue; }

.color-red {
  color: red; }

.color-white {
  color: white; }

.color-yellow {
  color: yellow; }

.color-green {
  color: green; }
```

### @at-root

The @at-root rule is usually written @at-root <selector> { ... }
and causes everything within it to be emitted at the root of the document
instead of using the normal nesting.

Exemple:

```
.item {
    color: #333;

    @at-root {
        .item-wrapper {
            color: #666;

            img {
                width: 100%;
            }
        }
    }
    .item-child {
        background-color: #555;
    }
}
```

Will render in CSS:

```
.item {
  color: #333;
}
.item-wrapper {
  color: #666;
}
.item-wrapper img {
  width: 100%;
}
.item .item-child {
  background-color: #555;
}
```



## Useful links

- [SASS & SCSS : la formation ULTIME](https://www.udemy.com/course/sass-scss-la-formation-ultime/)
- [SCSS: Sassy Cascading Style Sheets](https://sharkcoder.com/tools/scss)
- [SASS Built-In Modules](https://sass-lang.com/documentation/modules)
- [CSS with superpowers](https://marksheet.io/sass.html)
- [Loops in CSS Preprocessors](https://css-tricks.com/loops-css-preprocessors/)
