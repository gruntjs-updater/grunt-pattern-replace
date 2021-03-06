/*
 * grunt-pattern-replace
 * https://github.com/nimaen/grunt-pattern-replace
 *
 * Copyright (c) 2013 Arnaud Bosc
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp']
		},

		// Configuration to be run (and then tested).
		patternReplace: {
			basic: {
				options: {
					tokens: {
						falcon: "punch",
						bankai: {
							ichigo: "Tenza Zengetsu"
						}
					}
				},
				files: [
					{
						expand: true,
						cwd: "test/fixtures/",
						dest: "tmp",
						src: "basic"
					}
				]
			},
			object: {
				options: {
					tokens: {
						bankai: {
							ichigo: "Tenza Zengetsu"
						}
					}
				},
				files: [
					{
						expand: true,
						cwd: "test/fixtures/",
						dest: "tmp",
						src: "object"
					}
				]
			},
			unknownTokens: {
				options: {
					tokens: {
						known: "OK"
					}
				},
				files: [
					{
						expand: true,
						cwd: "test/fixtures/",
						dest: "tmp",
						src: "unknownTokens"
					}
				]
			},
			custom: {
				options: {
					prefix: "\\(\\(",
					suffix: ">>",
					tokens: {
						falcon: "punch"
					}
				},
				files: [
					{
						expand: true,
						cwd: "test/fixtures/",
						dest: "tmp",
						src: "custom"
					}
				]
			},
			include: {
				options: {
					tokens: {
						falcon: "punch",
						bankai: {
							ichigo: "Tenza Zengetsu"
						}
					}
				},
				files: [
					{
						expand: true,
						cwd: "test/fixtures/",
						dest: "tmp",
						src: "include"
					}
				]
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js']
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'patternReplace', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
