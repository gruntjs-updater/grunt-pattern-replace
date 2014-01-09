/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

(function() {

	"use strict";

	var fs = require('fs');

	exports.suite = {
		test: function(test) {

			var expectations = [
				'basic',
				'custom',
				'unknownTokens',
				'include'
			];

			test.expect(expectations.length);

			expectations.forEach(function(expectation) {
				test.equal(
					fs.readFileSync('test/expected/' + expectation, 'utf-8'),
					fs.readFileSync('tmp/' + expectation, 'utf-8')
				);
			});

			test.done();
		}
	};
})();