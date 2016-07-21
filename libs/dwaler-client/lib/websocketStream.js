"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebsocketStream = function () {
  _createClass(WebsocketStream, null, [{
    key: "connect",
    value: function connect(url) {
      return new Promise(function (resolve) {
        var ws = new WebSocket(url);
        ws.onopen = function () {
          return resolve(new WebsocketStream(ws));
        };
      });
    }
  }]);

  function WebsocketStream(ws) {
    _classCallCheck(this, WebsocketStream);

    this.ws = ws;
  }

  _createClass(WebsocketStream, [{
    key: "onEvent",
    value: function onEvent(cb) {
      this.ws.onmessage = cb;
    }
  }, {
    key: "emitCommand",
    value: function emitCommand(command) {
      this.ws.send(command);
    }
  }]);

  return WebsocketStream;
}();

exports.default = WebsocketStream;