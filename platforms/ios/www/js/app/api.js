'use strict';

var Api = function() {

    var self = this;

    this.get = function(options) {

        var url = 'http://192.168.15.153:3005/api/search?' + $.param(options);

        $.ajax({
            type     : 'GET',
            dataType : 'json',
            url      : 'http://192.168.15.153:3005/api/search?' + $.param(options),
            success  : self.onSuccess,
            error    : self.onError
        });
    };

    this.onSuccess = function(data) {
        console.log(data);
        //alert(JSON.stringify(data));
    };

    this.onError = function(err) {
        console.log('error');
        console.log(err);
        //alert(JSON.stringify(err));
    };
};

var api = new Api();
