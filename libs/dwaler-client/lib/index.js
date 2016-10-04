'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _debug = require('./debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var log = (0, _debug2.default)('DwalerClient');

var DwalerClient = function () {
  function DwalerClient(stream) {
    _classCallCheck(this, DwalerClient);

    this.stream = stream;
    stream.onEvent(this.onEvent.bind(this));
    this.cbs = {};
    this.headers = {};
    this.autoDestroyCommands = ['state', 'stateh', 'liveh', 'destsh', 'tripsh', 'triph'];
  }

  _createClass(DwalerClient, [{
    key: 'getState',
    value: function getState() {
      var _this = this;

      var cb = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      var commandId = this.emitCommand('state', [], cb);
      return function () {
        delete _this.cbs[commandId];
      };
    }
  }, {
    key: 'live',
    value: function live() {
      var _this2 = this;

      var cb = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      var commandId = this.emitCommand('live', [], cb);
      return function () {
        _this2.emitCommand('liveoff', [], null, true);
      };
    }
  }, {
    key: 'getDestinations',
    value: function getDestinations() {
      var onDestination = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      this.emitCommand('dests', [], onDestination);
    }
  }, {
    key: 'getTrips',
    value: function getTrips(destinationName) {
      var onTrip = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      this.emitCommand('trips', [destinationName], onTrip);
    }
  }, {
    key: 'getTripRows',
    value: function getTripRows(destinationName, tripNum) {
      var _this3 = this;

      var onTripRow = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      var commandId = this.emitCommand('trip', [destinationName, tripNum], onTripRow);
      return function () {
        delete _this3.cbs[commandId];
      };
    }
  }, {
    key: 'onEvent',
    value: function onEvent(event) {
      var _this4 = this;

      var dataParts = event.split(',');
      var commandId = dataParts.shift();
      if (dataParts[0] === 'CB') {
        delete this.cbs[commandId];
        return;
      }
      if (this.cbs[commandId]) {
        if (this.cbs[commandId].header) {
          (function () {
            var mappedEvent = {};
            var headerParts = _this4.cbs[commandId].header.split(',');
            headerParts.forEach(function (key, i) {
              mappedEvent[key] = dataParts[i];
            });
            _this4.cbs[commandId](mappedEvent);
          })();
        } else {
          this.cbs[commandId](dataParts.join(','));
        }
        if (this.cbs[commandId].autoCleanup) {
          delete this.cbs[commandId];
        }
      }
    }
  }, {
    key: 'emitCommand',
    value: function emitCommand(commandName) {
      var args = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

      var _this5 = this;

      var cb = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
      var skipHeader = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

      // generate command id
      var commandId = Math.floor(Math.random() * 65535); // uint16_t max
      // retry if command id is already taken
      if (this.cbs[commandId]) return this.emitCommand(commandName, args, cb);
      // create command string
      var argsStr = args.length > 0 ? ',' + args.join(',') : '';
      var command = commandId + ',' + commandName + argsStr;
      // register callback
      if (cb !== null) {
        this.cbs[commandId] = cb;
        if (skipHeader === true) {
          this.cbs[commandId].autoCleanup = true;
        }
      }
      // get header
      if (!this.headers[commandName] && !skipHeader) {
        var headerCommandId = this.emitCommand(commandName + 'h', [], function (header) {
          _this5.cbs[commandId].header = header;
          _this5.stream.emitCommand(command);
        }, true);
        return commandId;
      }
      this.stream.emitCommand(command);
      return commandId;
    }
  }]);

  return DwalerClient;
}();

exports.default = DwalerClient;