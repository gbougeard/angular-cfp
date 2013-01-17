'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
    service('wizardSvc', function ($rootScope, $http, localStorage) {

        var LOCAL_STORAGE_CONFERENCE = 'fmConference',
            conferenceString = localStorage[LOCAL_STORAGE_CONFERENCE];
        var LOCAL_STORAGE_TYPE = 'fmType',
            typeString = localStorage[LOCAL_STORAGE_TYPE];
        var LOCAL_STORAGE_TYPES = 'fmTypes',
            typesString = localStorage[LOCAL_STORAGE_TYPES];

        // Data to persist
        var conference = conferenceString ? JSON.parse(conferenceString) : {};
        var type = typeString ? JSON.parse(typeString) : {};
        var types = typesString ? JSON.parse(typesString) : [];

        // Watch on data and persist to local storage
        $rootScope.$watch(function () {
            return conference;
        }, function () {
            localStorage[LOCAL_STORAGE_CONFERENCE] = JSON.stringify(conference);
        }, true);
        $rootScope.$watch(function () {
            return type;
        }, function () {
            localStorage[LOCAL_STORAGE_TYPE] = JSON.stringify(type);
        }, true);
        $rootScope.$watch(function () {
            return types;
        }, function () {
            localStorage[LOCAL_STORAGE_TYPES] = JSON.stringify(types);
        }, true);

        // Datas - hard coded
        var conferences = [
            {id: 'uk2013', text: 'Devoxx UK 2013', conftypes: [
                {id: 'conf', text: 'Conference'},
                {id: 'bof', text: 'BOF'},
                {id: 'quickie', text: 'Quickie'}
            ]},
            {id: 'fr2013', text: 'Devoxx FR 2013', conftypes: [
                {id: 'conf', text: 'Conference'},
                {id: 'bof', text: 'BOF'},
                {id: 'quickie', text: 'Quickie'},
                {id: 'handson', text: 'Hands-on Labs'},
                {id: 'tools', text: 'Tools in action'},
                {id: 'uni', text: 'University'}
            ]}
        ];
        // Datas loaded from network
        function loadConferences (){
            $http({method: 'GET', url: '/someUrl'}).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    conferences = data;
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.error("Cannot load data", status);
                });
        }


        return {
            // DATA services
            getConferences: function () {
                //loadConferences();
                return conferences;
            }
            // GETTERS & SETTERS
            , getConference: function () {
                return conference;
            }, setConference: function (conf) {
                conference = conf;
            }, getType: function () {
                return type;
            }, setType: function (t) {
                type = t;
            }, getTypes: function () {
                return types;
            }, setTypes: function (t) {
                types = t;
            }
        }

    })
    .value('version', '0.1');
