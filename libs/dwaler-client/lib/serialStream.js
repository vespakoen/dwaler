'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _serialport = require('serialport');

var _serialport2 = _interopRequireDefault(_serialport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SerialStream = function () {
  _createClass(SerialStream, null, [{
    key: 'connect',
    value: function connect(device) {
      var baudRate = arguments.length <= 1 || arguments[1] === undefined ? 115200 : arguments[1];

      return new Promise(function (resolve) {
        var serial = new _serialport2.default(device, {
          baudRate: baudRate,
          parser: _serialport2.default.parsers.readline('\n')
        });
        serial.on('open', resolve(new SerialStream(serial)));
        serial.on('error', function (err) {
          return console.error('Error:', err.message);
        });
      });
    }
  }]);

  function SerialStream(serial) {
    _classCallCheck(this, SerialStream);

    this.serial = serial;
  }

  _createClass(SerialStream, [{
    key: 'onEvent',
    value: function onEvent(cb) {
      this.serial.on('data', cb);
    }
  }, {
    key: 'emitCommand',
    value: function emitCommand(command) {
      this.serial.write(command, function (err) {
        if (err) {
          return console.error('Error on write:', err.message);
        }
      });
    }
  }]);

  return SerialStream;
}();

exports.default = SerialStream;