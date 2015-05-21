'use strict';

var HomeController = function(){

    var self = this;

    this.places = null;
    this.$grid  = null;
    this.map    = null;
    this.marker = null;

    this.initHome = function() {
        $('#content').transition('to', 'home.html', 'fade');
    }

    this.init = function() {
        this.$grid = $('.articlegrid');

        $(document).off('pagebeforeshow');
        $(document).off('pageload');

        $('.article').on('tap', function() {
            var id = $(this).attr('data-id');
            self.loadPlacePage(id)
        });

        $('.back-to-home').on('tap', function() {
            $('#content').transition('to', 'home.html', 'flip')
            $(document).on('pageload', function() {
                self.generateHtml();
            });
        })
    };

    this.loadPlacePage = function(id) {

        var place = _.find(self.places, { 'id': id});
        $('#content').transition('to', 'place-info.html', 'flip')

        $(document).on('pagebeforeshow', function() {

            var str  = '<img src="' + place.photos.images.standard_resolution.url + '">';
                str += '<div>';
                str += '<p>' + place.location.address + '</p>';
                str += '<p>' + self.getPrice(place.price.tier) + '</p>';
                str += '<p>' + place.location.city + '</p>';
                str += '<p>' + place.rating + '/10</p>';
                str += '</div>';

            $('.content-place').append(str);
            $('#map-canvas').css('display', 'block');

            if(self.map === null) {
                console.log('Create map');
                self.getMap(place.location.lat, place.location.lng);
            }
            else {
                console.log('Update map');
                self.updateMapPostion(place.location.lat, place.location.lng);
            }

            self.init();

        });
    }

    /**
     * Génére le html de la home en placant
     * tous les pictos au bon endroit
     */
    this.generateHtml = function() {

        self.$grid = $('.articlegrid');
        $('#map-canvas').css('display', 'none');

        if(self.places !== null) {

            self.places.forEach(function(place) {
                if(place !== null && place.photos !== null) {

                    var price = place.price ? self.getPrice(place.price.tier) : '';

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
        console.log(document.getElementById('map-canvas'));
    	self.map = new google.maps.Map(document.getElementById('map-canvas'),
    	    mapOptions);

    	self.marker = new google.maps.Marker({
    	    position: myLatlng,
    	    map: self.map,
    	    title: 'Hello World!'
    	});
    };

    this.updateMapPostion = function(lat, lng) {
        var myLatlng = new google.maps.LatLng(lat, lng);

        self.marker.setPosition(myLatlng);
        self.map.panTo(myLatlng);
    }
};

var homeController = new HomeController();
