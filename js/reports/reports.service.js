(function () {
    'use strict';

    angular
        .module('custom.services')
        .service('ReportService', ReportService);

    ReportService.$inject = ['$http'];

    function ReportService($http) {

        function getReport(reportName) {
            var req = {
                url: 'api/rest/report',
                method: 'POST',
                data: angular.toJson({
                    'reportName': reportName
                })
            };
            return $http(req);
        }

        function getPDF(report) {
            var req = {
                url: 'api/rest/report/pdf',
                method: 'POST',
                responseType: 'arraybuffer',
                data: angular.toJson(report)
            };
            return $http(req);
        }

        function getPDFAsFile(report) {
          var req = {
              url: 'api/rest/report/pdfasfile',
              method: 'POST',
              data: angular.toJson(report)
          };
          return $http(req);
      }

      return {
          getReport: getReport,
          getPDF: getPDF,
          getPDFAsFile: getPDFAsFile
      };
    }

})();
