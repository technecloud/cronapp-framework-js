!function(t){angular.module("custom.controllers",[]),app.controller("HomeController",["$scope","$http","$rootScope","$state","$translate","Notification",function(t,o,e,n,r,a){e.http=o,e.Notification=a,app.registerEventsCronapi(t,r);for(var p in app.userEvents)t[p]=app.userEvents[p].bind(t);t.message={}}])}(app);