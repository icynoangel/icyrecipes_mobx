const app = require('./app');
const SERVER_PORT = require('../config').SERVER_PORT;

var port = process.env.PORT || SERVER_PORT;
var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
