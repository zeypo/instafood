'use strict';

var server = require('./services/server/server.service');
var port   = process.env.PORT || 3005;
new server(port);
