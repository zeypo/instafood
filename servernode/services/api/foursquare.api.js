'use strict';

var request = require('request');
var _       = require('lodash');
var async   = require('async');

var Foursquare = function() {

    var self = this;

    this.config = {
        clientID     : 'I5IWL1OD0BWB1N31NQAZKF3OIFCL5LGDPAPL5JV3KGMNBQSZ',
        clientSecret : 'SBUMRO4DGBIKSHDSROWLGCKQ0J2ZC0PA4DMJTOX5WJ51X2YZ',
        baseUrl      : 'https://api.foursquare.com/v2/'
    };

    this.buildPath = function(method, options, cb) {
        var path = self.config.baseUrl + 'venues/' + method + '?';

        _.forEach(options, function(value, params) {
            path += params + '=' + value + '&';
        });

        path += 'client_id=' + self.config.clientID + '&client_secret=' + self.config.clientSecret + '&v=20140806&m=swarm';

        cb(null, path);
    };

    this.getJson = function(path, cb) {

        request.get(path, function(err, response, body) {

            if(JSON.parse(body).response.isEmpty()) {
                cb({errors : 'The response gives no results'});
            }
            else {
                cb(null, JSON.parse(body).response.groups[0].items);
            }
        });
    };

    this.cleanJson = function(json, cb) {

        var cleanJson = [];

        cb(null, _.reduce(json, function(_json, value) {
            cleanJson.push(value.venue);
            return cleanJson;
        }));
    };

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
            async.apply(self.getJson),
            async.apply(self.cleanJson)
        ], cb);
    };

    return this;
};

Object.prototype.isEmpty = function() {
    for(var key in this) {
        if(this.hasOwnProperty(key))
            return false;
    }
    return true;
};

module.exports = new Foursquare();
