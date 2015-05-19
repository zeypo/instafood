'use strict';

var moment = require('moment');
var string = require('string');
var color  = require('cli-color');

/**
 * Permet de logguer un message dans la console
 * @param {String} type (Info, Success, Warn, Alert)
 * @param {String} message
 */
exports.console = function (type, message) {

    var time           = color.white.bold(moment().format('YYYY-MM-DD HH:mm:ss'));
    var messageColored = getColoredMessage(type, message);
    var out            = time + ' '+messageColored;

    process.stdout.write(out + '\n');
};

/**
 * Retourne la couleur du lessage
 * @param {String} type
 * @param {String} message
 * @return {String} colorName
 */
var getColoredMessage = function(type, message) {

    var colorName;

    switch(type) {
        case 'info'     : colorName = 26;  break;
        case 'success'  : colorName = 36;  break;
        case 'warn'     : colorName = 178; break;
        case 'alert'    : colorName = 160; break;
        default         : colorName = 246; break;
    }

    return color.bgXterm(colorName)(string(type).capitalize().s) + ' ' + message;
};
