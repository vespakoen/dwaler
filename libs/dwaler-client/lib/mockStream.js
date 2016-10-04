'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _debug = require('./debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var log = (0, _debug2.default)('MockStream');

var MockStream = function () {
  _createClass(MockStream, null, [{
    key: 'connect',
    value: function connect(url) {
      return Promise.resolve(new MockStream());
    }
  }]);

  function MockStream() {
    _classCallCheck(this, MockStream);

    this.lat = 50.5;
    this.lng = 5.21;
  }

  _createClass(MockStream, [{
    key: 'onEvent',
    value: function onEvent(cb) {
      this.cb = cb;
    }
  }, {
    key: 'getPosition',
    value: function getPosition() {
      var ts = new Date().toISOString();
      this.lat = this.lat + Math.random() / 10;
      this.lng = this.lng + Math.random() / 10;
      return [ts, this.lat, this.lng, 50.5].join(',');
    }
  }, {
    key: 'emitCommand',
    value: function emitCommand(command) {
      var _this = this;

      log.debug('emitCommand', command);

      var _command$split = command.split(',');

      var _command$split2 = _slicedToArray(_command$split, 2);

      var commandId = _command$split2[0];
      var commandName = _command$split2[1];

      if (commandName == 'live') {
        this.liveCommandId = commandId;
        this.liveInteval = setInterval(function () {
          _this.emit(_this.liveCommandId, _this.getPosition());
        }, 1000);
      }
      if (commandName == 'liveh' || commandName == 'triph') {
        this.emit(commandId, 'ts,lat,lng,alt');
      }
      if (commandName == 'state') {
        this.emit(commandId, 'BERLIN,1,50.5,5.43,50.5,5.44,1,1,1,92.45,35.00');
      }
      if (commandName == 'stateh') {
        this.emit(commandId, 'dest,trip,slat,slng,dlat,dlng,sats,fix,fixq,top,dist');
      }
      if (commandName == 'liveoff') {
        clearInterval(this.liveInterval);
      }
      if (commandName == 'chdest') {
        // noop
      }
      if (commandName == 'dests') {
        this.emit(commandId, 'BERLIN,50.5,5.44');
        this.emit(commandId, 'ASIA,51.5,5.44');
        this.emit(commandId, 'PORTO,52.5,-5.44');
      }
      if (commandName == 'destsh') {
        this.emit(commandId, 'name,lat,lng');
      }
      if (commandName == 'trips') {
        this.emit(commandId, '20160806221400');
        this.emit(commandId, '20160806221401');
        this.emit(commandId, '20160806221402');
      }
      if (commandName == 'tripsh') {
        this.emit(commandId, 'ts');
      }
      if (commandName == 'trip') {
        this.emit(commandId, '20160806221400,50.5,5.44,105.3');
        this.emit(commandId, '20160806221401,50.55,5.445,105.3');
        this.emit(commandId, '20160806221402,50.6,5.45,103.3');
      }
    }
  }, {
    key: 'emit',
    value: function emit(commandId, command) {
      this.cb(commandId + ',' + command);
    }
  }]);

  return MockStream;
}();

exports.default = MockStream;