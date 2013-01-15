'use strict';

/* Controllers */


function MyCtrl1() {
}
MyCtrl1.$inject = [];


myApp.controller('WizStep1Controller',
    function ($scope, $location, wizardSvc) {
        $scope.conferences = wizardSvc.getConferences();

        $scope.next = function () {
            $location.path('/wizard/step2');
        };

    });

myApp.controller('WizStep2Controller',
    function ($scope, $location) {

        $scope.back = function () {
            $location.path('/wizard/step1');
        };
        $scope.next = function () {
            $location.path('/wizard/step3');
        };

    });

myApp.controller('WizStep3Controller',
    function ($scope, $location) {

        $scope.next = function () {
            $location.path('/wizard/step4');
        };
        $scope.back = function () {
            $location.path('/wizard/step2');
        };

    });

myApp.controller('WizStep4Controller',
    function ($scope, $location) {

        $scope.back = function () {
            $location.path('/wizard/step3');
        };

    });
