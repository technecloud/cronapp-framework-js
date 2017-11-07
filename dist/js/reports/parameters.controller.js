(function () {
    'use strict';

    angular
        .module('custom.controllers')
        .controller('ParameterController', ParameterController)
        .filter('trusted', ['$sce', function ($sce) {
            return function (text) {
                return $sce.trustAsHtml(text);
            };
        }])
        .directive('compile', function ($compile, $timeout) {
            return {
                restrict: 'A',
                link: function (scope, elem) {
                    $timeout(function () {
                        $compile(elem.contents())(scope);
                    });
                }
            }
        })
        .directive("formatDate", function () {
            return {
                require: 'ngModel',
                link: function (scope, elem, attr, modelCtrl) {
                    modelCtrl.$formatters.push(function (modelValue) {
                        if (modelValue) {
                            return new Date(modelValue);
                        }
                        else {
                            return null;
                        }
                    });
                }
            };
        });

    ParameterController.$inject = ['$modalInstance', '$scope', 'ReportService', 'report', 'htmlParameters'];

    function ParameterController($modalInstance, $scope, ReportService, report, htmlParameters) {

        $scope.report = report;

        $scope.htmlParameters = htmlParameters;

        function openPDF(result) {
            var blob = new Blob([result.data], {type: 'application/pdf'});

            var ieEDGE = navigator.userAgent.match(/Edge/g);
            var ie = navigator.userAgent.match(/.NET/g);
            var oldIE = navigator.userAgent.match(/MSIE/g);

            if (ie || oldIE || ieEDGE) {
                window.navigator.msSaveBlob(blob, $scope.report.reportName + ".pdf");
            }
            else {
                window.open(URL.createObjectURL(blob));
            }
        }

        $scope.onPrint = function () {
            ReportService.getPDF($scope.report).then(openPDF);
        };

        $scope.onCancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }

})();
