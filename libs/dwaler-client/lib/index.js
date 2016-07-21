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
    this.doneCbs = {};
  }

  _createClass(DwalerClient, [{
    key: 'getLocation',
    value: function getLocation() {
      var cb = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      return this.call('location', [], cb);
    }
  }, {
    key: 'getState',
    value: function getState() {
      var cb = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      return this.call('state', [], cb);
    }
  }, {
    key: 'getDestinations',
    value: function getDestinations() {
      var onDestination = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
      var cb = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      if (onDestination === null) {
        return this.getDestinationsPromise();
      }
      return this.call('destination', [], onDestination, cb);
    }
  }, {
    key: 'getTrip',
    value: function getTrip(destinationName, tripNum) {
      var onCoord = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
      var cb = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

      if (onCoord === null) {
        return this.getTripPromise(destinationName, tripNum);
      }
      return this.call('trip', [destinationName, tripNum], onCoord, cb);
    }
  }, {
    key: 'getDestinationsPromise',
    value: function getDestinationsPromise() {
      var _this = this;

      return new Promise(function (resolve) {
        var destinations = [];
        _this.getDestinations(function (destination) {
          destinations.push(destination);
        }, function () {
          return resolve(destinations);
        });
      });
    }
  }, {
    key: 'getTripPromise',
    value: function getTripPromise(destinationName, tripNum) {
      var _this2 = this;

      return new Promise(function (resolve) {
        var coords = [];
        _this2.getTrip(destinationName, tripNum, function (coord) {
          coords.push(coord);
        }, function () {
          return resolve(coords);
        });
      });
    }
  }, {
    key: 'onEvent',
    value: function onEvent(e) {
      var parts = e.data.split(',');
      var commandId = parts[0];
      var commandName = parts[1];
      console.log('<- ' + e.data);
      switch (commandName) {
        case 'location':
          return this.cbs[commandId]({
            latitude: Number(parts[2]),
            longitude: Number(parts[3]),
            altitude: Number(parts[4])
          });
        case 'state':
          return this.cbs[commandId]({
            activeScreen: Number(parts[2]),
            destinationName: parts[3],
            startingLocation: {
              latitude: Number(parts[4]),
              longitude: Number(parts[5]),
              altitude: Number(parts[6])
            },
            destinationLocation: {
              latitude: Number(parts[7]),
              longitude: Number(parts[8]),
              altitude: Number(parts[9])
            },
            currentLocation: {
              latitude: Number(parts[10]),
              longitude: Number(parts[11]),
              altitude: Number(parts[12])
            },
            topSpeed: Number(parts[13]),
            travelledDistance: Number(parts[14]),
            tripNum: Number(parts[15]),
            heading: Number(parts[16]),
            temp: Number(parts[17]),
            rpm: Number(parts[18])
          });
        case 'destination':
          return this.cbs[commandId]({
            name: parts[2],
            location: {
              latitude: Number(parts[3]),
              longitude: Number(parts[4]),
              altitude: Number(parts[5])
            },
            tripCount: Number(parts[6])
          });
        case 'trip':
          return this.cbs[commandId]({
            latitude: Number(parts[2]),
            longitude: Number(parts[3]),
            altitude: Number(parts[4]),
            time: Math.round(new Date().getTime() / 1000),
            speed: 50 + Math.random() * 10,
            temp: 120 + Math.random() * 50,
            rpm: 1200 + Math.random() * 500
          });
        case 'cb':
          if (this.doneCbs[commandId]) {
            this.doneCbs[commandId]();
            delete this.doneCbs[commandId];
          }
          return delete this.cbs[commandId];
      }
    }
  }, {
    key: 'call',
    value: function call(commandName, args) {
      var _this3 = this;

      var cb = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
      var doneCb = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

      var commandId = Math.floor(Math.random() * 65535); // uint16_t max
      var argsStr = args.length > 0 ? '$' + args.join(',') : '';
      var command = commandId + ',' + commandName + argsStr;
      console.log('-> ' + command);
      if (cb !== null) {
        this.cbs[commandId] = cb;
        if (doneCb !== null) {
          this.doneCbs[commandId] = doneCb;
        }
        this.stream.emitCommand(command);
        return;
      }
      return new Promise(function (resolve) {
        _this3.cbs[commandId] = resolve;
        _this3.stream.emitCommand(command);
      });
    }
  }]);

  return DwalerClient;
}();

exports.default = DwalerClient;