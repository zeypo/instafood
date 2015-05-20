'use strict';

var HomeController = function(){

    var self = this;

    this.places = null;
    this.$grid  = null;
    this.$article = null;
    this.map      = null;

    this.init = function() {
        this.$grid = $('.articlegrid');
        this.$article = $('.article');

        console.log(self.$article);

        $('.article').on('tap', function() {
            var id = $(this).attr('data-id');
            self.loadPlacePage(id)
        });
    };

    this.loadPlacePage = function(id) {

        var place = _.find(self.places, { 'id': id});
        $(document).transition('to', 'place-info.html', 'flip')

        $(document).on('pagebeforeshow', function() {

            var str  = '<img src="' + place.photos.images.standard_resolution.url + '">';
                str += '<div>';
                str += '<p>' + place.location.address + '</p>';
                str += '<p>' + self.getPrice(place.price.tier) + '</p>';
                str += '<p>' + place.location.city + '</p>';
                str += '<p>' + place.rating + '/10</p>';
                str += '</div>';

            $('.content-place').append(str);
            console.log(place.location.lat, place.location.lng);
            self.getMap(place.location.lat, place.location.lng);

        });
    }

    /**
     * Génére le html de la home en placant
     * tous les pictos au bon endroit
     */
    this.generateHtml = function() {

        console.log(self.$grid);
        console.log(self.places);
        if(self.places !== null) {

            self.$grid.empty();

            self.places.forEach(function(place) {
                if(place !== null && place.photos !== null) {

                    var price = place.price ? place.price.currency : '';

                    var str  = '<div class="article" data-id="' + place.id + '"><div class="info-article">';
                        str += '<p class="name">' + place.name + '</p>';
                        str += '<p class="price">' + price + '</p>';
                        str += '</div>';
                        str += '<img class="image" src="' + place.photos.images.standard_resolution.url + '">';
                        str += '</div>';

                    self.$grid.append(str);
                }
            });

            self.init();
        }

    };

    this.setPlaces = function(places) {
        self.places = places;
    }

    this.getPrice = function(tier) {

        var price = '';

        for(var i = 0; i < tier; i++) {
            price += '€';
        }

        return price;
    };

    this.getMap = function(lat, lng) {

    	var myLatlng = new google.maps.LatLng(lat, lng);
    	var mapOptions = {
    	  zoom: 16,
    	  center: myLatlng,
    	  disableDefaultUI:true
    	};
    	self.map = new google.maps.Map(document.getElementById('map-canvas'),
    	    mapOptions);

    	var marker = new google.maps.Marker({
    	    position: myLatlng,
    	    map: self.map,
    	    title: 'Hello World!'
    	});
    }
};

var homeController = new HomeController();
