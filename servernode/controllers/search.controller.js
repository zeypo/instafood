'use strict';

var fs         = require('fs');
var events     = require('events');
var _          = require('lodash');
var async      = require('async');
var Q          = require('q');
var response   = require('../services/utils/response.server.service');
var foursquare = require('../services/api/foursquare.api');
var instagram  = require('../services/api/instagram.api');
var hashtags   = require('../services/utils/hashtags.json');

/**
 * Récupére les photos intagram à partir
 * d'un lien donnée depuis foursquare.
 * @param  {Object} req
 * @param  {Object} res
 * @return {Object} res
 */
exports.around = function(req, res) {

    var photos = [];
    var batchEventEmitter = new events.EventEmitter();

    foursquare.api('explore', req.query, function(err, foursquareData) {

        async.each(foursquareData, function(data, cb) {
            addData(data).then(function(insta) {
                batchEventEmitter.emit('data', insta);
                cb(null);
            })
        }, function() {
            batchEventEmitter.emit('end');
        });

    });

    /* Push une nouvelle entrée dans data quand elle est formaté */
    batchEventEmitter.on('data', function(photo) {
        photos.push(photo);
    });

    /* Renvoit la réponse de l'API lorsque toutes les
     * photos aux alentours sont chargés */
    batchEventEmitter.on('end', function() {
        response.success(res, 200, photos);
    });

};

/**
 * Grephe les datas instagram aux data foursquare
 * @param  {Object}  data
 * @return {object} data
 */
var addData = function(data) {

    var deferred = Q.defer();

    instagram.api('search', {'foursquare_v2_id' : data.id}, function(err, insta) {
        if(insta.data[0]) {
            instagram.api(insta.data[0].id + '/media/recent', {}, function(err, insta) {
                data.photos = cleanInstaData(insta.data);
                deferred.resolve(data);
            });
        }
        else {
            deferred.resolve(null);
        }
    });

    return deferred.promise;
}

/**
 * Format les datas instagram pour alléger le retour api
 * @param  {Array}  instaData
 * @return {Object} cleanData
 */
var cleanInstaData = function(instaData) {

    var cleanData = [];

    instaData.forEach(function(value) {

        // On arréte l'itération si l'image n'a pas de tags
        if(value.tags.length === 0) {
            return;
        }

        // On néttoie les photos sans #
        // Ou comportant des hashtags hors nourriture
        var isbanned = false;
        value.tags.forEach(function(tag) {

            hashtags.banned.forEach(function(banned) {

                if(tag.indexOf(banned) > -1) {
                    console.log(tag);
                    isbanned = true;
                }
            })
        })

        var cleanValue = {};
        cleanValue.tags   = value.tags;
        cleanValue.likes  = value.likes.count;
        cleanValue.images = value.images;

        if(isbanned !== true) {
            cleanData.push(cleanValue);
        }
    });

    //return cleanData;

    return _.max(cleanData, function(data) {
        return data.likes;
    });
}
