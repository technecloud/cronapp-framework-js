(function($app) {
  angular.module('custom.controllers', []);

  app.controller('HomeController', [ '$scope', '$http', '$rootScope', '$state', '$translate', 'Notification', 'ReportService', 'UploadService',
      function($scope, $http, $rootScope, $state, $translate, Notification, ReportService, UploadService) {

        $rootScope.http = $http;
        $rootScope.Notification = Notification;
        $rootScope.UploadService = UploadService;

        $rootScope.getReport = function(reportName, params) {
          ReportService.openReport(reportName, params);
        }
        
        app.registerEventsCronapi($scope, $translate);

        for( var x in app.userEvents)
          $scope[x] = app.userEvents[x].bind($scope);

        $scope.message = {};

      } ]);
}(app));
