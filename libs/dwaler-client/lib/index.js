'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DwalerClient = function () {
  function DwalerClient(stream) {
    _classCallCheck(this, DwalerClient);

    this.stream = stream;
    stream.onEvent(this.onEvent.bind(this));
    this.cbs = {};
    this.headers = {};
  }

  _createClass(DwalerClient, [{
    key: 'getState',
    value: function getState() {
      var cb = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      var stopper;
      var autoStoppingCb = function autoStoppingCb(event) {
        stopper();
        cb();
      };
      stopper = this.emitCommand('state', [], autoStoppingCb);
      return;
    }
  }, {
    key: 'startLive',
    value: function startLive() {
      var _this = this;

      var cb = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      var stopper = this.emitCommand('live', [], cb);
      return function () {
        _this.emitCommand('liveoff', [], stopper, true);
      };
    }
  }, {
    key: 'startRegular',
    value: function startRegular() {
      var _this2 = this;

      var cb = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      var stopper = this.emitCommand('regular', [], cb);
      return function () {
        _this2.emitCommand('regularoff', [], stopper, true);
      };
    }
  }, {
    key: 'getDestinations',
    value: function getDestinations() {
      var onDestination = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      return this.emitCommand('dests', [], onDestination);
    }
  }, {
    key: 'getTrips',
    value: function getTrips(destinationName) {
      var onTrip = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      return this.emitCommand('trips', [destinationName], onTrip);
    }
  }, {
    key: 'getTripRows',
    value: function getTripRows(destinationName, tripNum) {
      var onTripRow = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      return this.emitCommand('trip', [destinationName, tripNum], onTripRow);
    }
  }, {
    key: 'onEvent',
    value: function onEvent(event) {
      var _this3 = this;

      var dataParts = event.split(',');
      var commandId = dataParts[0];
      dataParts.shift();
      if (this.cbs[commandId]) {
        if (this.cbs[commandId].header) {
          (function () {
            var mappedEvent = {};
            var headerParts = _this3.cbs[commandId].header.split(',');
            headerParts.forEach(function (key, i) {
              mappedEvent[key] = dataParts[i];
            });
            _this3.cbs[commandId](mappedEvent);
          })();
        } else {
          this.cbs[commandId](dataParts.join(','));
        }
      }
    }
  }, {
    key: 'emitCommand',
    value: function emitCommand(commandName) {
      var args = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

      var _this4 = this;

      var cb = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
      var skipHeader = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

      var commandId = Math.floor(Math.random() * 65535); // uint16_t max
      if (this.cbs[commandId]) return this.emitCommand(commandName, args, cb); // retry if commandId is already taken
      var argsStr = args.length > 0 ? ',' + args.join(',') : '';
      var command = commandId + ',' + commandName + argsStr;
      if (cb !== null) {
        this.cbs[commandId] = cb;
      }
      if (!this.headers[commandName] && !skipHeader) {
        var headerStop;
        headerStop = this.emitCommand(commandName + 'h', [], function (header) {
          _this4.cbs[commandId].header = header;
          _this4.stream.emitCommand(command);
          headerStop();
        }, true);
        return;
      }
      this.stream.emitCommand(command);
      return function () {
        if (cb !== null) {
          delete _this4.cbs[commandId];
        }
      };
    }
  }]);

  return DwalerClient;
}();

exports.default = DwalerClient;