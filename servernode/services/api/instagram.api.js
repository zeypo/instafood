'use strict';

var request = require('request');
var _       = require('lodash');
var async   = require('async');

var Instagram = function() {

    var self = this;

    this.config = {
        clientID     : '72aa8570683e4485a0409f9caace15d3',
        clientSecret : '06037313c7084337a36d8747b122a358',
        baseUrl      : 'https://api.instagram.com/v1'
    };

    this.buildPath = function(method, options, cb) {
        var path = self.config.baseUrl + '/locations/' + method + '?';
        var i    = 0;

        _.forEach(options, function(value, params) {
            path += params + '=' + value + '&';
        });

        path += 'client_id=' + self.config.clientID;

        cb(null, path);
    };

    this.getJson = function(path, cb) {
        
        request.get(path, function(err, response, body) {
            cb(null, JSON.parse(body));
        });
    }

    /**
     * Recherche en fonction d'une mérthode sur instagram
     * Se réferer à la doc instagram : https://instagram.com/developer/endpoints/locations
     * @param {String} method
     * @param {Object} options
     * @param {Object} callback
     */
    this.api = function(method, options, cb) {
        async.waterfall([
            async.apply(self.buildPath, method, options),
            async.apply(self.getJson)
        ], cb);
    };

    return this;
}

module.exports = new Instagram();
