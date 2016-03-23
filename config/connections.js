var config = require('./config');

var connections = {
    api: {

        dev: {
            url: 'mongodb://localhost:27017/tinkermakersmith'
        },

        prod: {
            url: 'mongodb://' + config.prod.user + ':' + config.prod.password + '@ds055495.mlab.com:55495/tinkermakersmith'
        }

    }
}

module.exports = connections;