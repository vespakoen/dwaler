var DwalerClient = require('./lib/index').default
var SerialStream = require('./lib/serialStream').default

DwalerClient.connect = function (device, baudRate) {
	return SerialStream.connect(device, baudRate)
		.then(function (stream) {
			return new DwalerClient(stream)
		})
}

module.exports = DwalerClient