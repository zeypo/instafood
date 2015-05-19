'use strict';

var _         = require('lodash');
var Q         = require('q');
var response  = require('../services/utils/response.server.service');
var foursquare = require('../services/api/foursquare.api');

/**
 * Récupére les photos intagram à partir
 * d'un lien donnée depuis foursquare.
 * @param  {Object} req
 * @param  {Object} res
 * @return {Object} res
 */
exports.around = function(req, res) {

    foursquare.api('explore', req.query, function(err, data) {
        response.success(res, 200, data);
    });

};
