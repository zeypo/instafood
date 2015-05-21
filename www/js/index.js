/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var user = {

    position : {
        lat : null,
        lng : null
    },

    options : {
        radius         : 300,
        section        : 'food',
        sortByDistance : 1,
        limit          : 50
    }

};

var geoloc = {

    onSuccess : function(position) {

        console.log('Géoloc find');

        user.position.lat = position.coords.latitude;
        user.position.lng = position.coords.longitude;

        user.options.ll = position.coords.latitude + ',' + position.coords.longitude;

        loader._show($('.articlegrid'));

        api.get(user.options, function(data) {
            console.log('Places are loaded !');
            loader._hide($('.articlegrid'));
            homeController.setPlaces(data.response);
            homeController.generateHtml();
        });
    },

     onError : function(err) {
     }

};

var loader = {

    visible : false,

    _hide : function(div) {
        $('#loader').hide(300);
        setTimeout(function(){ div.show(300); }, 300);
        console.log('hide');

        loader.visible = false;
    },

    _show : function(div) {
        console.log('show');
        div.hide(300);
        setTimeout(function(){ $('#loader').show(300); }, 300);

        loader.visible = true;
    }



}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('Device is ready');
        navigator.geolocation.getCurrentPosition(geoloc.onSuccess, geoloc.onError);
    }
};

$(function() {

    homeController.init();
    homeController.initHome();

    $('.options-range').on('change', function() {
        var vol = $(this).val();
        user.options.radius = vol;
        $('#range').html(vol + ' mètres');
    });

})

app.initialize();
