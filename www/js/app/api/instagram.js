'use strict';

var Instagram = function() {

    this.config = {
        clientID     : '72aa8570683e4485a0409f9caace15d3',
        clientSecret : '06037313c7084337a36d8747b122a358',
        baseUrl      : 'https://api.instagram.com/v1'
    };

    this.buildPath = function(method, options) {
        var path = this.config.baseUrl + '/locations/' + method + '?';
        var i    = 0;

        options.forEeach(options, function(value, params) {
            path += params + '=' + value + '&';
        });

        path += 'client_id=' + this.config.clientID;

        console.log(path);

        return path;
    };

    this.api = function(method, options, callback) {

        var path = this.buildPath(method, options);
    };

}

var instagram = new Instagram();
