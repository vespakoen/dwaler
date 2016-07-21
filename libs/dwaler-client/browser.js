var DwalerClient = require('./lib/index').default
var WebsocketStream = require('./lib/websocketStream').default

DwalerClient.connect = function (url) {
	return WebsocketStream.connect(url)
		.then(function (stream) {
			return new DwalerClient(stream)
		})
}

module.exports = DwalerClient