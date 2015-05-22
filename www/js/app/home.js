'use strict';

var HomeController = function(){

    var self = this;

    this.places  = null;
    this.$grid   = null;
    this.map     = null;
    this.marker  = null;
    this.optOpen = false;
    this.panel   = 'home';

    this.initHome = function() {
        $('#content').transition('to', 'home.html', 'fade');
    }

    this.initHomeHtml = function() {
        $(function() {
            $('.icon-menu').on('click', function() {
                $('.icon-grid').removeClass('selected');
                $('.icon-menu').addClass('selected');
                var gridtype = $('#articlegrid').attr('attr-grid');

               if(gridtype === 'false') {

                    $('#articlegrid').attr('attr-grid', 'true');
                    $('#articlegrid').attr('id', 'articlemenu');
               }

            }),

            $('.icon-grid').on('click', function() {

                $('.icon-menu').removeClass('selected');
                $('.icon-grid').addClass('selected');

               var gridtype = $('#articlemenu').attr('attr-grid');

               if(gridtype === 'true') {

                    $('#articlemenu').attr('attr-grid', 'false');
                    $('#articlemenu').attr('id', 'articlegrid');
               }

            })
        });
    }

    this.init = function() {
        this.$grid = $('.articlegrid');

        $(document).off('pagebeforeshow');
        $(document).off('pageload');
        $('.article').off('tap');
        $('.back-to-home').off('tap');
        $('#header').off('swipeLeft');
        $('.option-menu').off('tap');
        $('#header').off('swipeRight');
        $('.options-validate').off('singleTap');

        if (self.panel === "home") {
            self.initHomeHtml();
        };

        $('.article').on('tap', function() {
            var id = $(this).attr('data-id');
            self.loadPlacePage(id)
        });

        $('.back-to-home').on('tap', function() {
            $('#content').transition('to', 'home.html', 'slide', true)
            $(document).on('pageload', function() {
                self.generateHtml();
            });
        });

        $('#header').on('swipeLeft', function() {
            self.openOptions();
        });

        $('.option-menu').on('tap', function() {
            self.openOptions();
        })

        $('#header').on('swipeRight', function() {
            self.closeOptions();
        });

        $('.options-validate').on('singleTap', function() {
            user.options.radius = $('.options-range').val();
            console.log(user);
            self.refreshPage();
        })

    };

    this.openOptions = function() {
        $('#options').animate({
            'right' : 0
        }, 300, 'ease-out');

        self.optOpen = true;
    };

    this.closeOptions = function() {
        $('#options').animate({
            'right' : '-100%'
        }, 300, 'ease-in');

        self.optOpen = false;
    }

    this.loadPlacePage = function(id) {

        var place = _.find(self.places, { 'id': id});
        $('#content').transition('to', 'place-info.html', 'slide')

        $(document).on('pagebeforeshow', function() {

            var str  = '<img src="' + place.photos.images.standard_resolution.url + '">';
                str += '<div>';
                str += '<a launch-external="yes" href="geo:' + place.location.lat + ',' + place.location.lng + '">';
                str += '<p>' + place.location.address + '</p>';
                str += '</a>';
                str += '<p>' + self.getPrice(place.price.tier) + '</p>';
                str += '<p>' + place.location.city + '</p>';
                str += '<p>' + place.rating + '/10</p>';
                str += '</div>';

            $('.content-place').append(str);
            $('#map-canvas').css('display', 'block');
            console.log(place.location.lat, place.location.lng);

            if(self.map === null) {
                console.log('Create map');
                self.getMap(place.location.lat, place.location.lng);
            }
            else {
                console.log('Update map');
                self.updateMapPostion(place.location.lat, place.location.lng);
            }

            self.panel = 'place-info';
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

            self.panel = 'home';
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


    /**
     * Options gestions
     *
     */
    this.refreshPage = function() {

        $('.articlegrid').html('');
        $('#map-canvas').css('display', 'none');

        if(self.panel !== 'home') {
            $('#content').transition('to', 'home.html', 'fade');
        }

        if(self.optOpen === true) {
            self.closeOptions();
        }

        loader._show($('.articlegrid'));

        api.get(user.options, function(data) {
            console.log('Places are loaded !');
            loader._hide($('.articlegrid'));
            homeController.setPlaces(data.response);
            homeController.generateHtml();
        });
    }

};

var homeController = new HomeController();
