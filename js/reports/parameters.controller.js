(function() {
  'use strict';

  angular.module('custom.controllers').controller('ParameterController',
      ParameterController).filter('trusted', ['$sce', function($sce) {
    return function(text) {
      return $sce.trustAsHtml(text);
    };
  }]).directive('compile', function($compile, $timeout) {
    return {
      restrict : 'A',
      link : function(scope, elem) {
        $timeout(function() {
          $compile(elem.contents())(scope);
        });
      }
    }
  }).directive("formatDate", function() {
    return {
      require : 'ngModel',
      link : function(scope, elem, attr, modelCtrl) {
        modelCtrl.$formatters.push(function(modelValue) {
          if (modelValue) {
            return new Date(modelValue);
          } else {
            return null;
          }
        });
      }
    };
  });

  ParameterController.$inject = ['$modalInstance', '$scope', 'ReportService',
      'report', 'htmlParameters'];

  function ParameterController($modalInstance, $scope, ReportService, report,
      htmlParameters) {

    $scope.getDescription = function(param) {
      var name = param.name;
      if (param.description) {
        name = param.description;
        //translate
        if (name.indexOf('{{') > -1 && name.indexOf('}}') > -1) {
          name = name.replace('{{','').replace('}}','');
          name = window.cronapi.i18n.translate(name,[]);
        }
      }
      return name;
    };
    
    $scope.isDataLimit = function(param) {
      return (param.name == 'DATA_LIMIT');
    };

    var grp = report.reportName.match(/\/(.*?)(.*?)\.jrxml/);
    $scope.report = report;
    $scope.report.name = grp[2];
    $scope.htmlParameters = htmlParameters;

    function openURLContent(url) {
      
      if ($('body #reportViewContext').size() > 1)
        $($('body #reportViewContext').get(0)).remove();
        
      var frame = $('<iframe/>');
      frame.attr('frameborder',0);
      var h = parseInt($(window).height());
      
      frame.attr('height', h - 200);
      frame.attr('width','100%');
      frame.attr('src', url + "?download=false"); 
      $('#reportView .modal-body').html(frame);
      $('#reportViewContext .modal-dialog').css('width' , '95%');
      
      // Remover modal de dentro da tela de parametros pois a tela de visualização é maior.
      setTimeout(function() {
        var ctx = $('#reportViewContext');
        $('body').append(ctx);
        $('#reportView').modal();
      }, 100);
      
    }

    function openPDFAsFile(result) {
      // Abrir no modal
      openURLContent(result.data);
    }
    
    function openPDF(result) {
      var blob = new Blob([result.data], {
        type : 'application/pdf'
      });

      var ieEDGE = navigator.userAgent.match(/Edge/g);
      var ie = navigator.userAgent.match(/.NET/g);
      var oldIE = navigator.userAgent.match(/MSIE/g);
  
      // Abrir no modal
      openURLContent(URL.createObjectURL(blob));


      if (ie || oldIE || ieEDGE) {
       window.navigator.msSaveBlob(blob, $scope.report.reportName + ".pdf");
      } else {
       openURLContent(URL.createObjectURL(blob));
      }
    }

    $scope.onPrint = function() {
      ReportService.getPDFAsFile($scope.report).then(openPDFAsFile);
    };

    $scope.onCancel = function() {
      $modalInstance.dismiss('cancel');
    };
  }

})();
