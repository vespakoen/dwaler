var DwalerClient = require('./lib/index').default
var BLEStream = require('./lib/bleStream').default

DwalerClient.connect = function (btserial) {
	return BLEStream.connect(btserial)
		.then(function (stream) {
			return new DwalerClient(stream)
		})
}

module.exports = DwalerClient