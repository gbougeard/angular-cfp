'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
    service('wizardSvc', function ($rootScope) {

        var conferences = [{name : 'Devoxx FR'},{name : 'Devoxx UK'}];

        return {
            getConferences: function () {
                return conferences;
            }
        }

    })
.value('version', '0.1');
