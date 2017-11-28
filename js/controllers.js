(function($app) {
  angular.module('custom.controllers', []);

  app.controller('HomeController', [ '$scope', '$http', '$rootScope', '$state', '$translate', 'Notification', 'ReportService',
      function($scope, $http, $rootScope, $state, $translate, Notification, ReportService) {

        $rootScope.http = $http;
        $rootScope.Notification = Notification;

        $rootScope.getReport = function(reportName) {
          ReportService.openReport(reportName);
        }
        app.registerEventsCronapi($scope, $translate);

        for( var x in app.userEvents)
          $scope[x] = app.userEvents[x].bind($scope);

        $scope.message = {};

      } ]);
}(app));
