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
        var LOCAL_STORAGE_PROPOSAL = 'fmProposal',
            proposalString = localStorage[LOCAL_STORAGE_PROPOSAL];

        // Data to persist
        var conference = conferenceString ? JSON.parse(conferenceString) : {};
        var type = typeString ? JSON.parse(typeString) : {};
        var types = typesString ? JSON.parse(typesString) : [];
        var proposal = proposalString ? JSON.parse(proposalString) : {};

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
        $rootScope.$watch(function () {
            return proposal;
        }, function () {
            localStorage[LOCAL_STORAGE_PROPOSAL] = JSON.stringify(proposal);
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
        var proposals = [];
        // Datas loaded from network
        function loadConferences (){
            $http({method: 'GET', url: '/conferences'}).
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
        function loadProposals(){
            $http({method: 'GET', url: '/proposals'}).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    proposals = data;
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
                loadConferences();
                return conferences;
            }
            ,getProposals: function () {
                loadProposals();
                return proposals;
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
            }, getProposal: function () {
                return proposal;
            }, setProposal: function (t) {
                proposal = t;
            }
        }

    })
    .value('version', '0.1');
