'use strict';

var Api = function() {

    var self = this;

    this.get = function(options, cb) {

        var url = 'http://192.168.1.70:3005/api/search?' + $.param(options);

        console.log('Searching in API : ', url);

        $.ajax({
            type     : 'GET',
            dataType : 'json',
            url      : 'http://192.168.15.153:3005/api/search?' + $.param(options),
            success  : cb,
            error    : self.onError
        });
    };

    this.onError = function(err) {
        console.log('error');
        console.log(err);
    };
};

var api = new Api();
