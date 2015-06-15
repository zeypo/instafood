'use strict';

var response   = require('../services/utils/response.server.service');

/**
 * Récupére les photos intagram à partir
 * d'un lien donnée depuis foursquare.
 * @param  {Object} req
 * @param  {Object} res
 * @return {Object} res
 */
exports.redirect = function(req, res) {

    response.error(res, 404, {'message' : 'This page doesn\'t exist'});

};
