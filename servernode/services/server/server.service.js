'use strict';

var express      = require('express');
var bodyParser   = require('body-parser');
var routes       = require('../../config/routes.config');
var logger       = require('../utils/logger.console.service');

/**
 * Service qui permet de créer une instance de l'application PMS
 * @params {Number} port
 */
module.exports = function(port) {

    //Création d'une application express
    var app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    //Chargement des routes
    routes(app);
    app.disable('etag');

    //Lancement du serveur sur le {port}
    app.listen(port);
    logger.console('info', 'Démarrage du serveur sur le port '+ port);
};
