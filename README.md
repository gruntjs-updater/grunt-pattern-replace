# grunt-pattern-replace [![Build Status](https://travis-ci.org/Nimaen/grunt-pattern-replace.png?branch=master)](https://travis-ci.org/Nimaen/grunt-pattern-replace)

> Allow you to parse a list of files and replace tokens based on specifics patterns.
> Inspired by alanshaw / grunt-include-replace.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-pattern-replace --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-pattern-replace');
```

## The "patternReplace" task

### Overview
The task allow you to specify a list of tokens (a multi level dictionary), which allow you to replace in several files placeholder "variable".
Your placeholder variables can be prefixed and suffixed, by example : [[alpha]].
You can use a dot separated variable, it allow you to group your keys logically : [[alpha.beta]] will match with the child key beta of the object alpha.

At the moment, only single file examples are provided. More tests will come soon.

In your project's Gruntfile, add a section named `patternReplace` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  patternReplace: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.tokens
Type: `Object`
Default value: `{}`

A list of tokens available for replacement in all files.

#### options.prefix
Type: `String`
Default value: `\\[\\[`

Variable/include directive prefix.

#### options.suffix
Type: `String`
Default value: `\\]\\]`

Variable/include directive suffix.

#### options.includesDir
Type: `String`
Default value: Relative to including file

Directory where includes will be resolved.

### Usage Examples

#### Default Options
Default prefix and suffix are `\\[\\[` and `\\]\\]`.
It allows you to define placeholder variables like `[[variable.child]]`.
In this example, `[[falcon]]` would be replaced by `punch` and `[[bankai.ichigo]]` by `Tenza Zangetsu`.

```js
grunt.initConfig({
	patternReplace: {
        options : {
            tokens : {
                falcon : "punch",
                bankai : {
                    ichigo : "Tenza Zengetsu"
                }
            }
        },
	    expand : true,
	    cwd    : "source/folder/",
	    dest   : "dest/folder",
	    src    : "file"
    }
});
```

#### Custom Options
Same example while replacing default prefix and suffix.
Placeholder variables would be now `((falcon))` and `((bankai.ichigo))`.

```js
grunt.initConfig({
	patternReplace: {
        options : {
			prefix : "\\(\\(",
			suffix : "\\)\\)",
            tokens : {
                falcon : "punch",
                bankai : {
                    ichigo : "Tenza Zengetsu"
                }
            }
        },
	    expand : true,
        cwd    : "source/folder/",
        dest   : "dest/folder",
        src    : "file"
    }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2014-02-13   v0.1.5   Now identify empty strings token values : was previously handled as a not found token.
* 2014-01-09   v0.1.4   Identify tokens that match with no value and print them.
* 2014-01-08   v0.1.3   Can now use grunt template variables (with the <%= ... %> notation).
* 2013-11-10   v0.1.2   Correct the prefix and suffix example.
* 2013-11-10   v0.1.1   Add travis build, custom prefix & suffix tests.
* 2013-11-05   v0.1.0   First version.
