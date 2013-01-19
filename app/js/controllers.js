'use strict';

/* Controllers */

myApp.controller('MyCtrl1',
    function ($scope, $location, wizardSvc) {
        $scope.proposals = wizardSvc.getProposals();
    });

myApp.controller('MyCtrl2',
    function ($scope, $location, wizardSvc) {
        $scope.proposals = wizardSvc.getProposals();
    });

myApp.controller('WizStep1Controller',
    function ($scope, $location, wizardSvc) {
        $scope.conferences = wizardSvc.getConferences();
        $scope.conftypes = wizardSvc.getTypes();

        $scope.proposal = wizardSvc.getProposal();

        $scope.getTypes = function () {
            angular.forEach($scope.conferences, function (item, key) {
                if (item.id === $scope.proposal.conference) {
                    $scope.conftypes = item.conftypes;
                }
            });
        };

        $scope.next = function () {
            wizardSvc.setProposal($scope.proposal);
            wizardSvc.setTypes($scope.conftypes);
            $location.path('/wizard/step2');
        };

    });

myApp.controller('WizStep2Controller',
    function ($scope, $location, wizardSvc) {
        $scope.proposal = wizardSvc.getProposal();

        $scope.back = function () {
            $location.path('/wizard/step1');
        };
        $scope.next = function () {
            wizardSvc.setProposal($scope.proposal);
            $location.path('/wizard/step3');
        };

    });

myApp.controller('WizStep3Controller',
    function ($scope, $location, wizardSvc) {
        $scope.proposal = wizardSvc.getProposal();

        $scope.next = function () {
            wizardSvc.setProposal($scope.proposal);
            $location.path('/wizard/step4');
        };
        $scope.back = function () {
            $location.path('/wizard/step2');
        };

    });

myApp.controller('WizStep4Controller',
    function ($scope, $location, wizardSvc) {
        $scope.proposal = wizardSvc.getProposal();

        $scope.back = function () {
            $location.path('/wizard/step3');
        };

    });
