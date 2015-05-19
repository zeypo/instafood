'use strict';

var request = require('request');
var _       = require('lodash');
var async   = require('async');

var Instagram = function() {

    this.config = {
        clientID     : '72aa8570683e4485a0409f9caace15d3',
        clientSecret : '06037313c7084337a36d8747b122a358',
        baseUrl      : 'https://api.instagram.com/v1'
    };

    this.buildPath = function(method, options) {
        var path = this.config.baseUrl + '/locations/' + method + '?';
        var i    = 0;

        _.forEach(options, function(value, params) {
            path += params + '=' + value + '&';
        });

        path += 'client_id=' + this.config.clientID;

        return path;
    };

    this.getJson = function(path) {

        request.get(path, function(err, response, body) {
            console.log(body);
        });
    }

    /**
     * Recherche en fonction d'une mérthode sur instagram
     * Se réferer à la doc instagram : https://instagram.com/developer/endpoints/locations
     * @param {String} method
     * @param {Object} options
     * @param {Object} callback
     */
    this.api = function(method, options, callback) {

        var path = this.buildPath(method, options);
        var data = this.getJson(path);
    };

    return this;
}

module.exports = new Instagram();
