'use strict';

var HomeController = function(){

    var self = this;

    this.places = null,
    this.$grid  = null,

    this.init = function() {
        this.$grid = $('.articlegrid');
    },

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

                    var str  = '<div class="article" data-id="dqsdsqd"><div class="info-article">';
                        str += '<p class="name">' + place.name + '</p>';
                        str += '<p class="price">' + price + '</p>';
                        str += '</div>';
                        str += '<img class="image" src="' + place.photos.images.standard_resolution.url + '">';
                        str += '</div>';

                    self.$grid.append(str);
                }
            })
        }

    },

    this.setPlaces = function(places) {
        self.places = places;
    }
};

var homeController = new HomeController();
