'use strict';

var Api = function() {

    var self = this;

    this.get = function(options, cb) {

        var url = 'https://instafood-zeypo.c9.io/api/search?' + $.param(options);

        console.log('Searching in API : ', url);

        $.ajax({
            type     : 'GET',
            dataType : 'json',
            url      : 'https://instafood-zeypo.c9.io/api/search?' + $.param(options),
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
