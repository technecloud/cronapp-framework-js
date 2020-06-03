var cronappModules=["ui.router","ui-select-infinity","ngResource","ngSanitize","custom.controllers","custom.services","datasourcejs","chart.js","ngJustGage","pascalprecht.translate","tmh.dynamicLocale","ui-notification","ui.bootstrap","ngFileUpload","report.services","upload.services"];window.customModules&&(cronappModules=cronappModules.concat(window.customModules));var app=function(){return angular.module("MyApp",cronappModules).constant("LOCALES",{locales:{pt_br:"Portugues (Brasil)",en_us:"English"},preferredLocale:"pt_br"}).config(["$httpProvider",function(a){a.interceptors.push(["$q","$rootScope",function(){return{request:function(a){var b=JSON.parse(localStorage.getItem("_u"));return b&&b.token&&(a.headers["X-AUTH-TOKEN"]=b.token,window.uToken=b.token),a}}}])}]).config(["$compileProvider",function(a){a.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript|chrome-extension):/)}]).config(["$stateProvider","$urlRouterProvider","NotificationProvider",function(a,b,c){c.setOptions({delay:5e3,startTop:20,startRight:10,verticalSpacing:20,horizontalSpacing:20,positionX:"right",positionY:"top",templateUrl:"node_modules/cronapp-framework-js/components/templates/angular-ui-notification.template.html"}),a.state("index",{url:"",controller:"HomeController",templateUrl:"views/home.view.html"}).state("main",{url:"/",controller:"HomeController",templateUrl:"views/home.view.html"}).state("home",{url:"/home",controller:"HomeController",templateUrl:"views/home.view.html"}).state("home.pages",{url:"/{name:.*}",controller:"PageController",templateUrl:function(a){return"views/"+a.name+".view.html"}}).state("404",{url:"/error/404",controller:"PageController",templateUrl:function(){return"views/error/404.view.html"}}).state("403",{url:"/error/403",controller:"PageController",templateUrl:function(){return"views/error/403.view.html"}}),b.otherwise("/error/404")}]).config(["$translateProvider","tmhDynamicLocaleProvider",function(a,b){a.useMissingTranslationHandlerLog(),a.useStaticFilesLoader({files:[{prefix:"i18n/locale_",suffix:".json"},{prefix:"node_modules/cronapp-framework-js/i18n/locale_",suffix:".json"}]}),a.registerAvailableLanguageKeys(["pt_br","en_us"],{"en*":"en_us","pt*":"pt_br","*":"pt_br"});var c=(window.navigator.userLanguage||window.navigator.language||"pt_br").replace("-","_");a.use(c.toLowerCase()),a.useSanitizeValueStrategy("escaped"),b.localeLocationPattern("node_modules/angular-i18n/angular-locale_{{locale}}.js"),moment&&moment.locale(c)}]).directive("crnValue",["$parse",function(a){return{restrict:"A",require:"^ngModel",link:function(b,c,d,e){var f;f=d.value?d.value:a(d.crnValue)(b),c.attr("data-evaluated",JSON.stringify(f)),c.bind("click",function(){b.$apply(function(){e.$setViewValue(f),$(c).data("changed",!0)}.bind(c))}),b.$watch(function(){return e.$modelValue},function(a,b){if(a!==b){var d=c.attr("data-evaluated"),e=$(c).data("changed");$(c).data("changed",!1),e||(a&&JSON.stringify(""+a)==d?$(c)[0].checked=!0:$(c)[0].checked=!1)}})}}}]).decorator("$xhrFactory",["$delegate","$injector",function(a,b){return function(c,d){var e=a(c,d),f=b.get("$http"),g=f.pendingRequests[f.pendingRequests.length-1];return angular.isFunction(g.onProgress)&&e.upload.addEventListener("progress",g.onProgress),e}}]).controller("PageController",["$scope","$stateParams","$location","$http","$rootScope",function(a,b,c,d){for(var e in app.userEvents)a[e]=app.userEvents[e].bind(a);try{cronapi&&(a.cronapi=cronapi)}catch(a){console.info("Not loaded cronapi functions"),console.info(a)}try{blockly&&(a.blockly=blockly)}catch(a){console.info("Not loaded blockly functions"),console.info(a)}a.params=b,a.$http=d;var f=c.search();for(var g in f)f.hasOwnProperty(g)&&(a.params[g]=f[g]);registerComponentScripts();try{$controller("AfterPageController",{$scope:a})}catch(a){}try{a.blockly.events.afterPageRender&&a.blockly.events.afterPageRender()}catch(a){}}]).run(["$rootScope","$state","$stateParams","$timeout",function(a,b,c,d){a.$state=b,a.$stateParams=c,a.$on("$stateChangeError",function(){if(6<=arguments.length){var a=arguments[5];(404===a.status||403===a.status)&&b.go(a.status.toString())}else b.go("404")}),a.$on("$stateChangeSuccess",function(b,c){d(()=>{let b=$("h1:first").length&&$("h1:first").text().trim().length?$("h1:first").text().trim():"",d=window.location.hash?window.location.hash.split("/"):null,e=d?d[d.length-1]:null,f=window.camelCaseToSentenceCase(window.toCamelCase(e)),g="";$("h2.title").length?g=$("h2.title").text()+(b.length?" - "+b:""):f&&(g=f+(b.length?" - "+b:"")),a.viewTitle=g||c.name;let h=$("[role=main]").find("input");if(h&&h.length){$(h[0]);if(h&&h.length){let a=$(h[0]);["date","datetime","time"].includes(a.data("type"))||a.focus()}}})})}])}(window);app.userEvents={},app.config={},app.config.datasourceApiVersion=2,app.bindScope=function(a,b){var c={};for(var d in b)c[d]="string"==typeof b[d]||"boolean"==typeof b[d]?b[d]:"function"==typeof b[d]?b[d].bind(a):app.bindScope(a,b[d]);return c},app.registerEventsCronapi=function(a,b){for(var c in app.userEvents)a[c]=app.userEvents[c].bind(a);a.vars={};try{cronapi&&(a.cronapi=app.bindScope(a,cronapi),a.cronapi.$scope=a,a.safeApply=safeApply,b&&(a.cronapi.$translate=b))}catch(a){console.info("Not loaded cronapi functions"),console.info(a)}try{blockly&&(blockly.cronapi=cronapi,a.blockly=app.bindScope(a,blockly))}catch(a){console.info("Not loaded blockly functions"),console.info(a)}},window.safeApply=function(a){var b=this.$root.$$phase;"$apply"==b||"$digest"==b?a&&"function"==typeof a&&a():this.$apply(a)};var registerComponentScripts=function(){$(".carousel-indicators li").on("click",function(){var a="#"+$(this).parent().parent().parent().attr("id"),b=$(a+" .carousel-indicators li").index(this);$(a+" #carousel-example-generic").carousel(b)})};window.toCamelCase=function(a){return null===a?a:a.toLowerCase().replace(/[-_\.]+/g," ").replace(/[^\w\s]/g,"").replace(/ (.)/g,function(a){return a.toUpperCase()}).replace(/ /g,"")},window.camelCaseToSentenceCase=function(a){if(null!==a){let b=a.replace(/([A-Z])/g," $1");return b.charAt(0).toUpperCase()+b.slice(1)}return a};