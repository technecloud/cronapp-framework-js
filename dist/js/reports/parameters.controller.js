!function(){"use strict";function t(t,e,r,n,o){function i(t){$("body #reportViewContext").size()>1&&$($("body #reportViewContext").get(0)).remove();var e=$("<iframe/>");e.attr("frameborder",0);var r=parseInt($(window).height());e.attr("height",r-200),e.attr("width","100%"),e.attr("src",t),$("#reportView .modal-body").html(e),$("#reportViewContext .modal-dialog").css("width","95%"),setTimeout(function(){var t=$("#reportViewContext");$("body").append(t),$("#reportView").modal()},100)}function a(t){var r=new Blob([t.data],{type:"application/pdf"}),n=navigator.userAgent.match(/Edge/g),o=navigator.userAgent.match(/.NET/g),a=navigator.userAgent.match(/MSIE/g);i(URL.createObjectURL(r)),o||a||n?window.navigator.msSaveBlob(r,e.report.reportName+".pdf"):i(URL.createObjectURL(r))}e.getDescription=function(t){var e=t.name;return t.description&&(e=t.description,e.indexOf("{{")>-1&&e.indexOf("}}")>-1&&(e=e.replace("{{","").replace("}}",""),e=window.cronapi.i18n.translate(e,[]))),e},e.isDataLimit=function(t){return"DATA_LIMIT"==t.name};var c=n.reportName.match(/\/(.*?)(.*?)\.jrxml/);e.report=n,e.report.name=c[2],e.htmlParameters=o,e.onPrint=function(){r.getPDF(e.report).then(a)},e.onCancel=function(){t.dismiss("cancel")}}angular.module("custom.controllers").controller("ParameterController",t).filter("trusted",["$sce",function(t){return function(e){return t.trustAsHtml(e)}}]).directive("compile",["$compile","$timeout",function(t,e){return{restrict:"A",link:function(r,n){e(function(){t(n.contents())(r)})}}}]).directive("formatDate",function(){return{require:"ngModel",link:function(t,e,r,n){n.$formatters.push(function(t){return t?new Date(t):null})}}}),t.$inject=["$modalInstance","$scope","ReportService","report","htmlParameters"]}();