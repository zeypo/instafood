'use strict';

var searchController = require('../controllers/search.controller');

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

};
