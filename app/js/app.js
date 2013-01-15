'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'partials/partial1.html', controller: MyCtrl1});
    $routeProvider.when('/wizard/step1', {templateUrl: 'partials/wizard/step1.html', controller: 'WizStep1Controller'});
    $routeProvider.when('/wizard/step2', {templateUrl: 'partials/wizard/step2.html', controller: 'WizStep2Controller'});
    $routeProvider.when('/wizard/step3', {templateUrl: 'partials/wizard/step3.html', controller: 'WizStep3Controller'});
    $routeProvider.when('/wizard/step4', {templateUrl: 'partials/wizard/step4.html', controller: 'WizStep4Controller'});
    $routeProvider.otherwise({redirectTo: '/home'});
  }]);
