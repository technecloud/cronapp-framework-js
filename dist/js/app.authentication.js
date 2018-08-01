var cronappModules=["ui.router","ui.select","ui-select-infinity","ngResource","ngSanitize","custom.controllers","custom.services","datasourcejs","chart.js","ngJustGage","pascalprecht.translate","tmh.dynamicLocale","ui-notification","ui.bootstrap","ngFileUpload","report.services","upload.services","summernote","ui.tinymce"];window.customModules&&(cronappModules=cronappModules.concat(window.customModules));var app=function(){return angular.module("MyApp",cronappModules).constant("LOCALES",{locales:{pt_br:"Portugues (Brasil)",en_us:"English"},preferredLocale:"pt_br",urlPrefix:""}).config(["$httpProvider",function(e){var t=["$q","$rootScope",function(e,t){return{request:function(e){var t=JSON.parse(localStorage.getItem("_u"));return t&&t.token&&(e.headers["X-AUTH-TOKEN"]=t.token,window.uToken=t.token),e}}}];e.interceptors.push(t)}]).config(["$stateProvider","$urlRouterProvider","NotificationProvider",function(e,t,o){o.setOptions({delay:5e3,startTop:20,startRight:10,verticalSpacing:20,horizontalSpacing:20,positionX:"right",positionY:"top"}),window.customStateProvider?window.customStateProvider(e):e.state("login",{url:"",controller:"LoginController",templateUrl:"views/login.view.html"}).state("social",{url:"/connected",controller:"SocialController",templateUrl:"views/login.view.html"}).state("socialError",{url:"/notconnected",controller:"SocialController",templateUrl:"views/login.view.html"}).state("main",{url:"/",controller:"LoginController",templateUrl:"views/login.view.html"}).state("publicRoot",{url:"/public/{name:.*}",controller:"PageController",templateUrl:function(e){return"views/public/"+e.name+".view.html"}}).state("public",{url:"/home/public",controller:"PublicController",templateUrl:function(e){return"views/public/home.view.html"}}).state("public.pages",{url:"/{name:.*}",controller:"PageController",templateUrl:function(e){return"views/public/"+e.name+".view.html"}}).state("home",{url:"/home",controller:"HomeController",templateUrl:"views/logged/home.view.html"}).state("home.pages",{url:"/{name:.*}",controller:"PageController",templateUrl:function(e){return"views/"+e.name+".view.html"}}).state("404",{url:"/error/404",controller:"PageController",templateUrl:function(e){return"views/error/404.view.html"}}).state("403",{url:"/error/403",controller:"PageController",templateUrl:function(e){return"views/error/403.view.html"}}),t.otherwise("/error/404")}]).factory("originPath",["$location",function(e){return{request:function(t){return t.headers["origin-path"]=e.path(),t}}}]).config(["$httpProvider",function(e){e.interceptors.push("originPath")}]).config(["$translateProvider","tmhDynamicLocaleProvider",function(e,t){e.useMissingTranslationHandlerLog(),e.useStaticFilesLoader({files:[{prefix:"i18n/locale_",suffix:".json"},{prefix:"plugins/cronapp-framework-js/i18n/locale_",suffix:".json"}]}),e.registerAvailableLanguageKeys(["pt_br","en_us"],{"en*":"en_us","pt*":"pt_br","*":"pt_br"});var o=(window.navigator.userLanguage||window.navigator.language||"pt_br").replace("-","_");e.use(o.toLowerCase()),e.useSanitizeValueStrategy("escaped"),t.localeLocationPattern("plugins/angular-i18n/angular-locale_{{locale}}.js"),moment&&moment.locale(o)}]).directive("crnValue",["$parse",function(e){return{restrict:"A",require:"^ngModel",link:function(t,o,r,i){var n;n=r.value?r.value:e(r.crnValue)(t),o.attr("data-evaluated",JSON.stringify(n)),o.bind("click",function(e){t.$apply(function(){i.$setViewValue(n)}.bind(o))})}}}]).decorator("$xhrFactory",["$delegate","$injector",function(e,t){return function(o,r){var i=e(o,r),n=t.get("$http"),a=n.pendingRequests[n.pendingRequests.length-1];return angular.isFunction(a.onProgress)&&i.upload.addEventListener("progress",a.onProgress),i}}]).controller("PageController",["$controller","$scope","$stateParams","$location","$http","$rootScope","$translate",function(e,t,o,r,i,n,a){app.registerEventsCronapi(t,a),t.params=o,t.$http=i;var l=r.search();for(var s in l)l.hasOwnProperty(s)&&(t.params[s]=l[s]);t.registerComponentScripts=function(){$(".carousel-indicators li").on("click",function(){var e="#"+$(this).parent().parent().parent().attr("id"),t=$(e+" .carousel-indicators li").index(this);$(e+" #carousel-example-generic").carousel(t)})},t.registerComponentScripts();try{var c=e("AfterPageController",{$scope:t});app.copyContext(c,this,"AfterPageController")}catch(e){}try{t.blockly.events.afterPageRender&&t.blockly.events.afterPageRender()}catch(e){}}]).run(["$rootScope","$state",function(e,t){e.$on("$stateChangeError",function(){if(arguments.length>=6){var e=arguments[5];404!==e.status&&403!==e.status||t.go(e.status.toString())}else t.go("404")})}])}(window);app.userEvents={},app.config={},app.config.datasourceApiVersion=2,app.bindScope=function(e,t){var o={};for(var r in t)"string"==typeof t[r]?o[r]=t[r]:"function"==typeof t[r]?o[r]=t[r].bind(e):o[r]=app.bindScope(e,t[r]);return o},app.registerEventsCronapi=function(e,t){for(var o in app.userEvents)e[o]=app.userEvents[o].bind(e);e.vars={};try{cronapi&&(e.cronapi=app.bindScope(e,cronapi),e.cronapi.$scope=e,e.safeApply=safeApply,t&&(e.cronapi.$translate=t))}catch(e){console.info("Not loaded cronapi functions"),console.info(e)}try{blockly&&(e.blockly=app.bindScope(e,blockly))}catch(e){console.info("Not loaded blockly functions"),console.info(e)}},app.copyContext=function(e,t,o){if(e)for(var r in e)t[r]?t[r+o]=e[r]:t[r]=e[r]},window.safeApply=function(e){var t=this.$root.$$phase;"$apply"==t||"$digest"==t?e&&"function"==typeof e&&e():this.$apply(e)},app.kendoHelper={generateId:function(){var e=Math.floor(65536*(1+Math.random())).toString(16).substring(1);return"0123456789".indexOf(e.substr(0,1))>-1?this.generateId():e},getSchema:function(e){var t=[{kendoType:"string",entityType:["string","character","uuid","guid"]},{kendoType:"number",entityType:["integer","long","double","int","float","bigdecimal","single","int32","int64","decimal"]},{kendoType:"date",entityType:["date","time","datetime"]},{kendoType:"boolean",entityType:["boolean"]}],o=function(e){for(var o=0;o<t.length;o++)if(t[o].entityType.includes(e.toLocaleLowerCase()))return t[o].kendoType;return"string"},r={model:{id:"__$id",fields:{}}};return e&&e.schemaFields&&(e.schemaFields.forEach(function(e){r.model.fields[e.name]={type:o(e.type),editable:!0,nullable:e.nullable,validation:{required:!e.nullable}}}),r.model.fields.__$id={type:"string",editable:!0,nullable:!0,validation:{required:!1}}),r},getDataSource:function(e,t,o,r,i){function n(e){if(e.response&&e.response.d){var t=null;t=e.response.d.results?e.response.d.results:[e.response.d],this.group().length?i.forEach(function(e){if("Database"==e.dataType){if("datetime-local"==e.type||"month"==e.type||"time-local"==e.type||"week"==e.type)for(var o=0;o<t.length;o++){var r=t[o];e.field==r.Member&&(r.Key=r.Key.replace(/\d+/,function(e){return parseInt(e)+u})),a.bind(this)(r.Items)}}}):a.bind(this)(t)}}function a(e){for(var t=0;t<e.length;t++)i&&i.forEach(function(o){if("Database"==o.dataType){("datetime-local"==o.type||"month"==o.type||"time-local"==o.type||"week"==o.type)&&e[t][o.field]&&(e[t][o.field]=e[t][o.field].replace(/\d+/,function(e){return parseInt(e)+u}))}})}var l=this.getSchema(e);i&&i.forEach(function(e){for(var t in l.model.fields)if("Database"==e.dataType&&e.field==t){l.model.fields[t].nullable=!e.required,l.model.fields[t].validation.required=e.required;break}});var s=function(e){for(var t in e)if(l.model.fields.hasOwnProperty(t)){var o=l.model.fields[t];"string"==o.type&&void 0!=e[t]?e[t]=e[t]+"":"number"==o.type&&void 0!=e[t]?e[t]=parseFloat(e[t]):"date"==o.type&&void 0!=e[t]?e[t]="/Date("+e[t].getTime()+")/":"boolean"==o.type&&(void 0==e[t]?e[t]=!1:e[t]="true"==e[t].toString().toLowerCase()),l.model.id==t&&void 0!=e[t]&&0==e[t].toString().length&&delete e[t]}return e},c=10;t[e.name]&&(c=t[e.name].rowsPerPage);var u=6e4*(new Date).getTimezoneOffset(),d=this.generateId(),p={transport:{setActiveAndPost:function(e){var o=this.options.cronappDatasource;t.safeApply(o.updateActive(s(e.data))),o.active.__sender=d,o.postSilent(function(t){this.options.enableAndSelect(e),e.success(t)}.bind(this),function(t){this.options.enableAndSelect(e),e.error(t,t,t)}.bind(this))},push:function(e){!this.options.dataSourceEventsPush&&this.options.cronappDatasource&&(this.options.dataSourceEventsPush={create:function(t){if(this.options.isGridInDocument(this.options.grid)){this.options.getCurrentCallbackForPush(e,this.options.grid).pushUpdate(t)}else this.options.cronappDatasource.removeDataSourceEvents(this.options.dataSourceEventsPush)}.bind(this),update:function(t){if(this.options.isGridInDocument(this.options.grid)){this.options.getCurrentCallbackForPush(e,this.options.grid).pushUpdate(t)}else this.options.cronappDatasource.removeDataSourceEvents(this.options.dataSourceEventsPush)}.bind(this),delete:function(t){if(this.options.isGridInDocument(this.options.grid)){this.options.getCurrentCallbackForPush(e,this.options.grid).pushDestroy(t)}else this.options.cronappDatasource.removeDataSourceEvents(this.options.dataSourceEventsPush)}.bind(this),overRideRefresh:function(e){this.options.isGridInDocument(this.options.grid)&&this.options.grid.dataSource.read()}.bind(this),read:function(e){this.options.isGridInDocument(this.options.grid)&&(this.options.fromRead=!0,this.options.grid.dataSource.read())}.bind(this)},this.options.cronappDatasource.addDataSourceEvents(this.options.dataSourceEventsPush))},read:function(e){var t=!1;try{var o=this.options.cronappDatasource;this.options.grid;this.options.kendoCallback?this.options.fromRead?this.options.kendoCallback.success(o.data):t=!0:(this.options.kendoCallback=e,t=!0)}finally{this.options.fromRead=!1}if(t){for(key in e.data)void 0==e.data[key]&&delete e.data[key];var r=kendo.data.transports.odata.parameterMap(e.data,"read"),i="";this.options.grid&&this.options.grid.dataSource.group().forEach(function(e){i+=e.field+" "+e.dir+","}),i.length>0&&(i=i.substr(0,i.length-1),r.$orderby?r.$orderby=i+","+r.$orderby:r.$orderby=i);var o=this.options.cronappDatasource;o.rowsPerPage=e.data.pageSize,o.offset=e.data.page-1;var n={};n.params=r,o.fetch(n,{success:function(t){e.success(t)},canceled:function(t){e.error("canceled","canceled","canceled")}})}},update:function(e){this.setActiveAndPost(e)},create:function(e){this.setActiveAndPost(e)},destroy:function(e){cronappDatasource=this.options.cronappDatasource,cronappDatasource.removeSilent(e.data,function(t){e.success(t)},function(t){e.error("canceled","canceled","canceled")})},batch:function(e){},options:{fromRead:!1,disableAndSelect:function(e){this.isGridInDocument(this.grid)&&(this.grid.select(e.container),this.grid.options.selectable=!1,this.grid.selectable&&this.grid.selectable.element&&(this.grid.selectable.destroy(),this.grid.selectable=null))},enableAndSelect:function(e){this.isGridInDocument(this.grid)&&(this.grid.options.selectable="row",this.grid._selectable(),this.grid.select(e.container))},selectActiveInGrid:function(e){if(this.isGridInDocument(this.grid)&&this.grid.selectable&&this.grid.dataItems().length>0&&this.cronappDatasource.active&&this.cronappDatasource.active.__$id){for(var t=this.grid.dataItems(),o=-1,r=0;r<t.length;r++)if(this.cronappDatasource.active.__$id==t[r].__$id){o=r;break}o>-1&&this.grid.select(this.grid.table.find("tr")[o])}},isGridInDocument:function(e){return!!e&&$(document).has(e.element[0]).length},getCurrentCallbackForPush:function(e,t){return e||t},cronappDatasource:t[e.name]}},pageSize:c,serverPaging:!0,serverFiltering:!0,serverSorting:!0,batch:!1,schema:l,requestEnd:n};return p.schema.total=function(){return p.transport.options.cronappDatasource.getRowsCount()},p},getConfigCombobox:function(e,t){var o={},r=!1,o={};return!e||e.dynamic&&"false"!=e.dynamic?e.dataSource&&(o=app.kendoHelper.getDataSource(e.dataSource,t),r=null!=e.valuePrimitive&&("string"==typeof e.valuePrimitive?"true"==e.valuePrimitive:e.valuePrimitive)):(r=!0,e.dataValueField="key",e.dataTextField="value",o.data=null==e.staticDataSource?void 0:e.staticDataSource),e.dataValueField&&""!=e.dataValueField.trim()||(e.dataValueField=null==e.dataTextField?void 0:e.dataTextField),{dataTextField:null==e.dataTextField?void 0:e.dataTextField,dataValueField:null==e.dataValueField?void 0:e.dataValueField,dataSource:o,headerTemplate:null==e.headerTemplate?void 0:e.headerTemplate,template:null==e.template?void 0:e.template,placeholder:null==e.placeholder?void 0:e.placeholder,footerTemplate:null==e.footerTemplate?void 0:e.footerTemplate,filter:null==e.filter?void 0:e.filter,valuePrimitive:r,optionLabel:null==e.optionLabel?void 0:e.optionLabel,valueTemplate:null==e.valueTemplate?void 0:e.valueTemplate,suggest:!0}},getConfigDate:function(e,t){var o={};if(o){var r=function(e){return e&&(e=e.replace(/:MM/gm,":mm"),e=e.replace(/:M/gm,":m"),e=e.replace(/S/gm,"s"),e=e.replace(/D/gm,"d"),e=e.replace(/Y/gm,"y")),e},i={};if(t.animation)try{i=JSON.parse(t.animation)}catch(e){console.log("DateAnimation invalid configuration! "+e)}var n=function(t,o){return null==o&&(o=parseMaskType(t,e)),o}(t.type,t.format);o={value:null,format:r(n),timeFormat:r(t.timeFormat),momentFormat:n,culture:function(e){e=e.replace(/_/gm,"-");var t=e.split("-");return t[t.length-1]=t[t.length-1].toUpperCase(),t.join("-")}(e.use()),type:null==t.type?void 0:t.type,weekNumber:null==t.weekNumber?void 0:t.weekNumber,dateInput:null==t.dateInput?void 0:t.dateInput,animation:i,footer:null==t.footer?void 0:t.footer,start:null==t.start?void 0:t.start,depth:null==t.start?void 0:t.start}}return o},buildKendoMomentPicker:function(e,t,o,r){var i="date"==t.type||"datetime"==t.type||"time"==t.type;if(!e.attr("from-grid")){var n=function(){var o=e.val();if(o&&""!=o.trim()){var n=null;n=i?moment.utc(o,t.momentFormat):moment(o,t.momentFormat),r&&n.isValid()&&(r.$setViewValue(n.toDate()),e.data("changed",!0))}else r&&r.$setViewValue("")};t.change=o?function(){o.$apply(function(){n()})}:n}return"date"==t.type?e.kendoDatePicker(t).data("kendoDatePicker"):"datetime"==t.type||"datetime-local"==t.type?e.kendoDateTimePicker(t).data("kendoDateTimePicker"):"time"==t.type||"time-local"==t.type?e.kendoTimePicker(t).data("kendoTimePicker"):void 0},getConfigSlider:function(e){var t={increaseButtonTitle:e.increaseButtonTitle,decreaseButtonTitle:e.decreaseButtonTitle,dragHandleTitle:e.dragHandleTitle};try{t.min=e.min?parseInt(e.min):1,t.max=e.max?parseInt(e.max):1,t.smallStep=e.smallStep?parseInt(e.smallStep):1,t.largeStep=e.largeStep?parseInt(e.largeStep):1}catch(e){console.log("Slider invalid configuration! "+e)}return t},getConfigSwitch:function(e){return{onLabel:null==e.onLabel?void 0:e.onLabel,offLabel:null==e.offLabel?void 0:e.offLabel}},getConfigBarcode:function(e){var t={type:null==e.type?void 0:e.type,width:null==e.width?void 0:parseInt(e.width),height:null==e.height?void 0:parseInt(e.height)};return t.type||(t.type="EAN8"),t},getConfigQrcode:function(e){var t={errorCorrection:null==e.errorCorrection?void 0:e.errorCorrection,size:null==e.size?void 0:parseInt(e.size),color:null==e.color?void 0:e.color};return(e.borderColor||e.borderSize)&&(t.border={size:null==e.size?void 0:parseInt(e.size),color:null==e.color?void 0:e.color}),t}};