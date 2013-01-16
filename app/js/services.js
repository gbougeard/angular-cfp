'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
    service('wizardSvc', function ($rootScope) {

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

        return {
            getConferences: function () {
                return conferences;
            }
        }

    })
    .value('version', '0.1');
