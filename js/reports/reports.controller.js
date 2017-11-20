(function () {
    'use strict';

    angular
        .module('custom.controllers')
        .controller('ReportController', ReportController);

    ReportController.$inject = ['$scope', '$modal', 'ReportService'];

    function ReportController($scope, $modal, ReportService) {

        function escapeRegExp(str) {
            return str.replace(/([.*+?^=!:()|\[\]\/\\])/g, "\\$1");
        }

        function replaceAll(str, find, replace) {
            return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
        }

        function showParameters(report) {

            var parameters = report.parameters;

            var htmlParameters = [];

            var index = 0;
 
            function next() {
                if (index < parameters.length) {
                    var parameter = parameters[index++];  
                    $.get("plugins/cronapp-framework-js/components/reports/" + parameter.type + ".parameter.html").done(function (result) {
                        htmlParameters.push(replaceAll(result, "_field_", parameter.name));
                        next();
                    });
                } else if (htmlParameters.length > 0) {
                    $modal.open({
                        templateUrl: 'plugins/cronapp-framework-js/components/reports/reports.parameters.html',
                        controller: 'ParameterController',
                        resolve: {
                            report: function () {
                                return JSON.parse(JSON.stringify(report));
                            },
                            htmlParameters: function () {
                                return JSON.parse(JSON.stringify(htmlParameters));
                            }
                        }
                    });
                }
            }
            
            next();
        }

        $scope.getReport = function (reportName) {
            ReportService.getReport(reportName).then(function (result) {
                if (result && result.data) {
                    // Abrir direto o relatorio , caso não haja parametros
                    if(result.data.parameters.length == 0 ||  
                      (result.data.parameters.length == 1 && result.data.parameters[0].name == 'DATA_LIMIT')) {
                       ReportService.getPDFAsFile(result.data.reportName).then(function(obj){
                         ReportService.openURLContent(obj.data);
                       });
                    } else {
                     showParameters(JSON.parse(JSON.stringify(result.data)));
                    }
                }
            });
        };
    }

})();
