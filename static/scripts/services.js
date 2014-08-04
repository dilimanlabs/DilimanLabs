'use strict';

/* Services */

var mapServices = angular.module('mapServices', ['ngResource']);

mapServices.factory('MapSrvc', ['$resource', function($resource) {
    return $resource('https://pitstop-dilimanlabs.appspot.com/_ah/api/places/v1/place/brand/:brand', {}, {});
  }]);