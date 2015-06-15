'use strict';

var searchController   = require('../controllers/search.controller');
var redirectController = require('../controllers/redirect.controller');

/**
 * Liste des routes
 * @param {Object} app
 * @param {Object} passport
 **/
module.exports = function(app) {

    /**
     * Controller api
     */
    app.get('/api/search', searchController.around);


    /**
     * Controller front
     */
    app.get('/*', redirectController.redirect);

};
