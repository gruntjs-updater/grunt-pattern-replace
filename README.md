# grunt-pattern-replace

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
Default value: `\[\[`

Variable/include directive prefix.

#### options.suffix
Type: `String`
Default value: `\]\]`

Variable/include directive suffix.

#### options.includesDir
Type: `String`
Default value: Relative to including file

Directory where includes will be resolved.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

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
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
	patternReplace: {
        options : {
			prefix : "\[\[",
			suffix : "\]\]",
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
* 2013-11-05   v0.1.0   First version.
