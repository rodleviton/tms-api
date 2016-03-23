var mongoose = require('mongoose');
var connections = require('./connections');

module.exports = {
  connect: function (env) {
    mongoose.connect(connections.api[env].url);
  }
}
