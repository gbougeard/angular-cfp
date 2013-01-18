'use strict';

/* Filters */

angular.module('myApp.filters', []).
    filter('interpolate', ['version', function (version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }]).
    filter('fromNow', function () {
        return function (dateString) {
            return moment(new Date(dateString)).fromNow();
        }
    }).
    filter('fromNowTimestamp', function () {
        return function (timestamp) {
            var day = moment(timestamp);
//            console.log(day);
            return moment(day).fromNow()
        };
    });;
