'use strict';

/* Controllers */

var mapControllers = angular.module('mapControllers', []);

mapControllers.controller('MapCtrl', ['$scope', 'MapSrvc', function($scope, MapSrvc) {
    var mapOptions = {
        center: new google.maps.LatLng(14.581769, 120.977044),
        zoom: 6
    };
    var infoWindow = new google.maps.InfoWindow();


    $scope.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    $scope.markers = [];

    var createMarker = function (info) {
        var marker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(info.latitude, info.longitude),
            title: info.brand
        });

        marker.content = '<div class="infoWindowContent">' + info.name + '</div>';
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);
	}

    MapSrvc.get({brand: 'Petron'}).$promise.then(function(places) {
    	$scope.places = places;

    	for (var i = 0; i < $scope.places.place.length; i++){
        	createMarker($scope.places.place[i]);
    	}	
    });
}]);