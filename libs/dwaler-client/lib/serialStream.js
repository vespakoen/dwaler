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
          parser: _serialport2.default.parsers.readline('\r\n')
        });
        serial.on('open', function () {
          return setTimeout(function () {
            resolve(new SerialStream(serial));
          }, 2000);
        });
        serial.on('error', function (err) {
          return console.error('Error:', err);
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
      this.serial.on('data', function (event) {
        console.log('<- ' + event);
        cb(event);
      });
    }
  }, {
    key: 'emitCommand',
    value: function emitCommand(command) {
      var _this = this;

      console.log('-> ' + command);
      this.serial.write(command + '\n', function (err) {
        if (err) {
          console.error('Error on write:', err);
          console.warn('Retrying in 1 second...');
          setTimeout(_this.emitCommand.bind(_this, command), 1000);
        }
      });
    }
  }]);

  return SerialStream;
}();

exports.default = SerialStream;