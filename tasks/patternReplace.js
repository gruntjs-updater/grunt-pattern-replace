/*
 * grunt-pattern-replace
 * https://github.com/nimaen/grunt-pattern-replace
 *
 * Copyright (c) 2013 Arnaud Bosc
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function (grunt) {

	var path = require("path");
	var _ = require("lodash");
	var name = "patternReplace";
	var description = "Allow you to parse a list of files and replace tokens based on specifics patterns.";

	// Effectively register the task to grunt.
	grunt.registerMultiTask(name, description, function () {

		var undefinedTokens = {};
		var numReplacedTokens = 0;
		var numBrowsedFiles = 0;
		var numIncludes = 0;

		// Default vars.
		var options = this.options({
			prefix      : "\\[\\[",
			suffix      : "\\]\\]",
			tokens      : {},
			includesDir : ""
		});

		// Variables available in ALL files
		var tokens = options.tokens;

		grunt.log.debug('Options', options);
		grunt.log.debug('Tokens', tokens);

		// Patterns
		var includePattern = new RegExp(options.prefix + 'include\\(\\s*(.*?)(,\\s*({[\\s\\S]*?})){0,1}\\s*\\)' + options.suffix);
		var replacePattern = new RegExp(options.prefix + '(\\w*[\\.\\w]*)' + options.suffix, 'g');

		/**
		 * @param {String} rawPath A path to resolve.
		 * @param {String} workingDir The working directory to base the search.
		 * @returns {String} the real path.
		 */
		var resolveIncludePath = function (rawPath, workingDir) {
			rawPath = grunt.template.process(rawPath);

			if (!grunt.file.isPathAbsolute(rawPath)) {
				rawPath = path.resolve(path.join((options.includesDir ? options.includesDir : workingDir), rawPath));
			} else {
				if (options.includesDir) {
					grunt.log.error('includesDir works only with relative paths. Could not apply includesDir to ' + rawPath);
				}
				rawPath = path.resolve(rawPath);
			}
			return rawPath;
		};


		/**
		 * @param {String} token The token to search.
		 * @param {Object} tokens A tokens dictionnary.
		 * @returns {String} The value associated with the token, the token otherwise.
		 */
		var getTokenValue = function (token, tokens) {
			var value = tokens;
			var matches = token.split(".");
			var numMatches = matches.length;
			for (var matchIndex = 0; matchIndex < numMatches; matchIndex++) {
				if (typeof value[matches[matchIndex]] !== "undefined") {
					value = value[matches[matchIndex]];
				}
			}

			// Undefined or non valid token value
			if(typeof value === "object") {
				value = undefined;
				undefinedTokens[token] = true;
			}

			numReplacedTokens++;
			return value;
		};


		/**
		 * @param {String} contents The contents of a file.
		 * @param {Object} tokens A tokens dictionnary.
		 * @returns {String} The contents with its keys replaced by the correct token value.
		 */
		var replaceTokens = function (contents, tokens) {
			return contents.replace(replacePattern, function (match, token) {
				return getTokenValue(token, tokens) || match;
			});
		};


		/**
		 * @param {String} contents The contents of a file.
		 * @param {String} workingDir The working directory to resolve path.
		 *
		 * @returns {String} The new contents of the file.
		 */
		var include = function (contents, workingDir) {
			var matches = includePattern.exec(contents);

			while (matches) {
				var match = matches[0];
				var includePath = resolveIncludePath(matches[1], workingDir);

				grunt.log.debug('Including', includePath);

				var includeContents = grunt.file.read(includePath);
				includeContents = include(includeContents, path.dirname(includePath));
				contents = contents.replace(match, includeContents);

				matches = includePattern.exec(contents);

				numIncludes++;
			}

			return contents;
		};

		// Loop on each files.
		this.files.forEach(function (config) {
			config.src.forEach(function (src) {
				// If the file is a directory, return.
				if (!grunt.file.isFile(src)) {
					grunt.log.debug("Can't process dir : " + src);
					return;
				}

				// Read file
				var contents = grunt.file.read(src);

				// Process includes & replacements
				contents = include(contents, path.dirname(src));
				contents = replaceTokens(contents, tokens);

				var dest = config.dest;
				if (!config.orig.cwd) {
					dest = path.join(dest, src);
				}

				grunt.file.write(dest, contents);
				grunt.log.debug("Processed : " + src);

				numBrowsedFiles++;
			});
		});

		grunt.log.ok("Browsed " + numBrowsedFiles.toString().cyan + " files, " + "included " + numIncludes.toString().cyan	+ " files, " + "replaced " + numReplacedTokens.toString().cyan + " tokens.");

		undefinedTokens = _.keys(undefinedTokens);
		if(undefinedTokens.length !== 0) {
			grunt.log.oklns("Could not find " + undefinedTokens.length.toString().cyan + " tokens, see bellow :");
			_.forEach(undefinedTokens, function(undefinedToken) {
				grunt.log.writeln("\t" + "- ".cyan + undefinedToken);
			});
		}
	});
};
