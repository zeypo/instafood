'use strict';

var Api = function() {

    var self = this;

    this.get = function(options) {

        //var url = 'http://192.168.15.153:3005/api/search?' + $.param(options);
        var url = 'http://192.168.1.70:3005/api/search?' + $.param(options);
        $.ajax({
            type     : 'GET',
            dataType : 'json',
            url      : 'http://192.168.1.70:3005/api/search?' + $.param(options),
            //url      : 'http://192.168.15.153:3005/api/search?' + $.param(options),
            success  : self.onSuccess,
            error    : self.onError
        });
    };

    /**
     * Génére le html sur la home après la reception de la position
     * @param {Array} data
     */
    this.onSuccess = function(data) {
        homeController.setPlaces(data.response);
        homeController.generateHtml();
    };

    this.onError = function(err) {
        console.log('error');
        console.log(err);
    };
};

var api = new Api();
