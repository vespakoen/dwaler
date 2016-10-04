'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (filename) {
	return {
		debug: function debug() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return console.log(filename, args.join(' '));
		}
	};
};