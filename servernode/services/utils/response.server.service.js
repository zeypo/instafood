'use strict';

/**
 * Object qui permet de renvoyer une réponse de succès
 * @param {Object} res
 * @param {Number} code
 * @param {String|Array|Object} data
 */
exports.success = function(res, code, data)
{
    var message = {
        status       : 'success',
        statusCode   : code,
        response     : data
    };

    send(res, message);
};


/**
 * Object qui permet de renvoyer une réponse de succès
 * @param {Object} res
 * @param {Number} code
 * @param {String|Array|Object} data
 */
exports.error = function(res, code, data)
{
    var message = {
        status       : 'error',
        statusCode   : code,
        errors       : data
    };

    send(res, message);
};


/**
 * Envoie le mesage de réponse
 * @param {Object} res
 * @param {Object} message
 */
var send = function (res, message) {
    res.writeHead(message.statusCode, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(JSON.stringify(message));
};
