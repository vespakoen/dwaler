'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BLEStream = function () {
  _createClass(BLEStream, null, [{
    key: 'connect',
    value: function connect(btserial) {
      this.btserial = btserial;
      return new Promise(function (resolve) {
        var scanTimer = setInterval(function () {
          btserial.listDevices(function (err, devices) {
            console.log(devices);
            devices.forEach(function (device) {
              if (device.name === 'Dwaler') {
                clearInterval(scanTimer);
                btserial.connect(device.uuid, function (err, status, deviceName) {
                  resolve(new BLEStream(btserial));
                });
              }
            });
          });
        }, 5000);
      });
    }
  }]);

  function BLEStream(btserial) {
    _classCallCheck(this, BLEStream);

    this.btserial = btserial;
  }

  _createClass(BLEStream, [{
    key: 'onEvent',
    value: function onEvent(cb) {
      var _this = this;

      this.btserial.setDataAvailableCallback(function (e) {
        _this.btserial.read(function (err, string) {
          if (!err) {
            var event = string.replace('\r\n', '');
            console.log('<- ' + event);
            cb(event);
          }
        });
      });
    }
  }, {
    key: 'emitCommand',
    value: function emitCommand(command) {
      var _this2 = this;

      console.log('-> ' + command);
      this.btserial.write(command, function (err) {
        if (err) {
          console.error('Error on write:', err);
          console.warn('Retrying in 1 second...');
          setTimeout(_this2.emitCommand.bind(_this2, command), 1000);
        }
      });
    }
  }]);

  return BLEStream;
}();

exports.default = BLEStream;