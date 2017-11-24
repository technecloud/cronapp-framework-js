(function () {
    'use strict';

    angular
        .module('custom.services')
        .service('ReportService', ReportService);

    ReportService.$inject = ['$http','$compile'];

    function ReportService($http, $compile) {

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
        
        function openURLContent(url) {
             
          // Retrocompatibilidade    
          var context = $('#reportViewContext');
          
          if (!context.get(0)) {
            console.log('ng-include[#reportViewContext]');
            var body = $('body');
            body.append('<div id="reportViewContext" ng-include="\'plugins/cronapp-framework-js/components/reports/reports.view.html\'"></div>');
            var scope = angular.element(body.get(0)).scope();
            $compile(body)(scope);
          }

          var include = function() {
            var frame = $('<iframe/>');
            frame.attr('frameborder',0);
            var h = parseInt($(window).height());
            
            frame.attr('height', h - 200);
            frame.attr('width','100%');
            frame.attr('src', url + "?download=false"); 
            $('#reportView .modal-body').html(frame);
            $('#reportViewContext .modal-dialog').css('width' , '95%');
  
            setTimeout(function() {
              $('body').append(context);
              $('#reportView').modal();
            }, 100);
          }
          
          setTimeout(include, 200);
        }

        return {
            getReport: getReport,
            getPDF: getPDF,
            getPDFAsFile: getPDFAsFile,
            openURLContent : openURLContent
        };
    }

})();
