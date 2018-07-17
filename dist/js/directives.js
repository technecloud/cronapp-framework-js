function maskDirectiveAsDate(e,t){return maskDirective(e,t,"as-date")}function maskDirectiveMask(e,t){return maskDirective(e,t,"mask")}function maskDirective(e,t,i){return{restrict:"A",require:"?ngModel",link:function(e,n,a,r){if("as-date"!=i||void 0===a.mask){var o=$(n),l=o.attr("type");if("checkbox"!=l&&"password"!=l){o.data("type",l),o.attr("type","text"),r&&(r.$formatters=[],r.$parsers=[]),void 0!==a.asDate&&"text"==l&&(l="date");var s=!1,c=a.mask||a.format;c=c?parseMaskType(c,t):parseMaskType(l,t),c.endsWith(";0")&&(s=!0);var d=c.replace(";1","").replace(";0","").trim();if(void 0!=d&&0!=d.length)if("date"==l||"datetime"==l||"datetime-local"==l||"month"==l||"time"==l||"time-local"==l||"week"==l){var u={format:d,locale:t.use(),showTodayButton:!0,useStrict:!0,tooltips:{today:t.instant("DatePicker.today"),clear:t.instant("DatePicker.clear"),close:t.instant("DatePicker.close"),selectMonth:t.instant("DatePicker.selectMonth"),prevMonth:t.instant("DatePicker.prevMonth"),nextMonth:t.instant("DatePicker.nextMonth"),selectYear:t.instant("DatePicker.selectYear"),prevYear:t.instant("DatePicker.prevYear"),nextYear:t.instant("DatePicker.nextYear"),selectDecade:t.instant("DatePicker.selectDecade"),prevDecade:t.instant("DatePicker.prevDecade"),nextDecade:t.instant("DatePicker.nextDecade"),prevCentury:t.instant("DatePicker.prevCentury"),nextCentury:t.instant("DatePicker.nextCentury")}};"DD/MM/YYYY"!=d&&"MM/DD/YYYY"!=d&&(u.sideBySide=!0);var p="date"==l||"datetime"==l||"time"==l;if(o.attr("from-grid")){if(o.on("click",function(){var e=$(this).offset(),t=!0,i=$(this).parent().find(".bootstrap-datetimepicker-widget.dropdown-menu.usetwentyfour.bottom");i.length||(t=!1,i=$(this).parent().find(".bootstrap-datetimepicker-widget.dropdown-menu.usetwentyfour.top"));var n=$(i).offset().left,a=i.closest("cron-grid");i.appendTo(a);var r=0;r=t?e.top+35:e.top-($(i).height()+15),i.css("top",r),i.css("bottom","auto"),i.css("left",n)}),o.on("dp.change",function(){var e=null;e=p?moment.utc(o.val(),d):moment(o.val(),d),o.data("rawvalue",e.toDate())}),o.data("initial-value")){var m=o.data("initial-value"),f=null;f=p?moment.utc(m):moment(m),o.val(f.format(d)),o.data("initial-value",null)}}else o.wrap('<div style="position:relative"></div>');o.datetimepicker(u),o.on("dp.change",function(){$(this).is(":visible")&&($(this).trigger("change"),e.$apply(function(){var e=o.val(),t=null;t=p?moment.utc(e,d):moment(e,d),t.isValid()&&r&&r.$setViewValue(t.toDate())}))}),r&&(r.$formatters.push(function(e){if(e){var t=null;return t=p?moment.utc(e):moment(e),t.format(d)}return null}),r.$parsers.push(function(e){if(e){var t=null;return t=p?moment.utc(e,d):moment(e,d),t.toDate()}return null}))}else if("number"==l||"money"==l||"integer"==l){s=!0,!1;var g=d.trim().replace(/\./g,"").replace(/\,/g,"").replace(/#/g,"").replace(/0/g,"").replace(/9/g,""),h="",v="",y="",b=",",k=0;d.startsWith(g)?h=g:d.endsWith(g)&&(v=g);var M=d.trim().replace(h,"").replace(v,"").trim();M.startsWith("#.")?y=".":M.startsWith("#,")&&(y=",");var w=null;if(-1!=M.indexOf(",0")?(b=",",w=",0"):-1!=M.indexOf(".0")&&(b=".",w=".0"),null!=w){var D=M.substring(M.indexOf(w)+1);k=D.length}var T="numeric";0==k&&(T="integer");var F={rightAlign:"money"==l,unmaskAsNumber:!0,allowMinus:!0,prefix:h,suffix:v,radixPoint:b,digits:k};y&&(F.autoGroup=!0,F.groupSeparator=y),$(n).inputmask(T,F);var x=function(){$(this).data("rawvalue",$(this).inputmask("unmaskedvalue"))};$(n).on("keydown",x).on("keyup",x),r&&(r.$formatters.push(function(e){return void 0!=e&&null!=e&&""!=e?format(d,e):null}),r.$parsers.push(function(e){if(void 0!=e&&null!=e&&""!=e){var t=o.inputmask("unmaskedvalue");if(""!=t)return t}return null}))}else if("text"==l||"tel"==l){var u={};a.maskPlaceholder&&(u.placeholder=a.maskPlaceholder),o.mask(d,u);var x=function(){s&&$(this).data("rawvalue",$(this).cleanVal())};$(n).on("keydown",x).on("keyup",x),s&&r&&(r.$formatters.push(function(e){return e?o.masked(e):null}),r.$parsers.push(function(e){return e?o.cleanVal():null}))}else if(o.attr("from-grid")){var x=function(){$(this).data("rawvalue",$(this).val())};$(n).on("keydown",x).on("keyup",x)}}}}}}function parseMaskType(e,t){return"datetime"==e||"datetime-local"==e?"Format.DateTime"==(e=t.instant("Format.DateTime"))&&(e="DD/MM/YYYY HH:mm:ss"):"date"==e?"Format.Date"==(e=t.instant("Format.Date"))&&(e="DD/MM/YYYY"):"time"==e||"time-local"==e?"Format.Hour"==(e=t.instant("Format.Hour"))&&(e="HH:mm:ss"):"month"==e?e="MMMM":"number"==e?"Format.Decimal"==(e=t.instant("Format.Decimal"))&&(e="0,00"):"money"==e?"Format.Money"==(e=t.instant("Format.Money"))&&(e="#.#00,00"):"integer"==e?e="0":"week"==e?e="dddd":"tel"==e?e="(00) 00000-0000;0":"text"==e&&(e=""),e}maskDirectiveAsDate.$inject=["$compile","$translate"],maskDirectiveMask.$inject=["$compile","$translate"],function($app){var isoDate=/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,patternFormat=function(e){return e?$(e).attr("format")||"DD/MM/YYYY":"DD/MM/YYYY"},parsePermission=function(e){var t={visible:{public:!0},enabled:{public:!0}};if(e)for(var i=e.toLowerCase().trim().split(","),n=0;n<i.length;n++){var a=i[n].trim();if(a){var r=a.split(":");if(2==r.length){var o=r[0].trim(),l=r[1].trim();if(l){for(var s=l.split(";"),c={},d=0;d<s.length;d++){var u=s[d].trim();u&&(c[u]=!0)}t[o]=c}}}}return t};app.directive("asDate",maskDirectiveAsDate).directive("ngDestroy",function(){return{restrict:"A",link:function(scope,element,attrs,ctrl){element.on("$destroy",function(){attrs.ngDestroy&&attrs.ngDestroy.length>0&&(attrs.ngDestroy.indexOf("app.")>-1||attrs.ngDestroy.indexOf("blockly.")>-1?scope.$eval(attrs.ngDestroy):eval(attrs.ngDestroy))})}}}).directive("dynamicImage",["$compile",function(e){return{restrict:"E",replace:!0,scope:{ngModel:"@",width:"@",height:"@",style:"@",class:"@"},require:"ngModel",template:"<div></div>",init:function(e){e.ngModel||(e.ngModel=""),e.width||(e.width="128"),e.height||(e.height="128"),e.style||(e.style=""),e.class||(e.class=""),this.containsLetter(e.width)||(e.width+="px"),this.containsLetter(e.height)||(e.height+="px")},containsLetter:function(e){for(var t,i=0;i<e.length;i++){t=!0;for(var n=0;n<10;n++)parseInt(e[i])==n&&(t=!1);if(t)break}return t},link:function(t,i,n){this.init(t);var a=t,r=n.ngRequired&&"true"==n.ngRequired?"required":"";i.append('<div class="form-group upload-image-component" ngf-drop="" ngf-drag-over-class="dragover">                                  <img class="$class$" style="$style$; height: $height$; width: $width$;" ng-if="$ngModel$" data-ng-src="{{$ngModel$.startsWith(\'http\') || ($ngModel$.startsWith(\'/\') && $ngModel$.length < 1000)? $ngModel$ : \'data:image/png;base64,\' + $ngModel$}}">                                  <img class="$class$" style="$style$; height: $height$; width: $width$;" ng-if="!$ngModel$" data-ng-src="/plugins/cronapp-framework-js/img/selectImg.svg" class="btn" ng-if="!$ngModel$" ngf-drop="" ngf-select="" ngf-change="cronapi.internal.setFile(\'$ngModel$\', $file)" accept="image/*;capture=camera">                                  <div class="remove btn btn-danger btn-xs" ng-if="$ngModel$" ng-click="$ngModel$=null">                                    <span class="glyphicon glyphicon-remove"></span>                                  </div>                                  <div class="btn btn-info btn-xs start-camera-button" ng-if="!$ngModel$" ng-click="cronapi.internal.startCamera(\'$ngModel$\')">                                    <span class="glyphicon glyphicon-facetime-video"></span>                                  </div>                                  <input ng-if="!$ngModel$" autocomplete="off" tabindex="-1" class="uiSelectRequired ui-select-offscreen" style="top: inherit !important; margin-left: 85px !important;margin-top: 50px !important;" type=text ng-model="$ngModel$" $required$>                                </div>'.split("$height$").join(a.height).split("$width$").join(a.width).split("$ngModel$").join(a.ngModel).split("$style$").join(a.style).split("$class$").join(a.class).split("$required$").join(r)),e(i)(i.scope())}}}]).directive("dynamicImage",["$compile",function(e){return{restrict:"A",scope:!0,require:"ngModel",link:function(t,i,n){var a=n.ngRequired&&"true"==n.ngRequired?"required":"",r=i.html(),o='<div ngf-drop="" ngf-drag-over-class="dragover">                   <img style="width: 100%;" ng-if="$ngModel$" data-ng-src="{{$ngModel$.startsWith(\'http\') || ($ngModel$.startsWith(\'/\') && $ngModel$.length < 1000)? $ngModel$ : \'data:image/png;base64,\' + $ngModel$}}">                   <input ng-if="!$ngModel$" autocomplete="off" tabindex="-1" class="uiSelectRequired ui-select-offscreen" style="top: inherit !important; margin-left: 85px !important;margin-top: 50px !important;" type=text ng-model="$ngModel$" $required$>                   <div class="btn" ng-if="!$ngModel$" ngf-drop="" ngf-select="" ngf-change="cronapi.internal.setFile(\'$ngModel$\', $file)" ngf-pattern="\'image/*\'" ngf-max-size="$maxFileSize$">                     $userHtml$                   </div>                   <div class="remove-image-button btn btn-danger btn-xs" ng-if="$ngModel$" ng-click="$ngModel$=null">                     <span class="glyphicon glyphicon-remove"></span>                   </div>                   <div class="btn btn-info btn-xs start-camera-button-attribute" ng-if="!$ngModel$" ng-click="cronapi.internal.startCamera(\'$ngModel$\')">                     <span class="glyphicon glyphicon-facetime-video"></span>                   </div>                 </div>',l="";n.maxFileSize&&(l=n.maxFileSize),o=$(o.split("$ngModel$").join(n.ngModel).split("$required$").join(a).split("$userHtml$").join(r).split("$maxFileSize$").join(l)),i.html(o),e(o)(i.scope())}}}]).directive("dynamicFile",["$compile",function(e){return{restrict:"A",scope:!0,require:"ngModel",link:function(t,i,n){var a=n.ngRequired&&"true"==n.ngRequired?"required":"",r=n.ngModel.split("."),o=r[0],l=r[r.length-1],s=Math.floor(1e3*Math.random()+20),c=i.html(),d="";n.maxFileSize&&(d=n.maxFileSize);var u='                                <div ng-show="!$ngModel$" ngf-drop="" ngf-drag-over-class="dragover">                                  <input ng-if="!$ngModel$" autocomplete="off" tabindex="-1" class="uiSelectRequired ui-select-offscreen" style="top: inherit !important;margin-left: 85px !important;margin-top: 50px !important;" type=text ng-model="$ngModel$" $required$>                                  <div class="btn" ngf-drop="" ngf-select="" ngf-change="cronapi.internal.uploadFile(\'$ngModel$\', $file, \'uploadprogress$number$\')" ngf-max-size="$maxFileSize$">                                    $userHtml$                                  </div>                                  <div class="progress" data-type="bootstrapProgress" id="uploadprogress$number$" style="display:none">                                    <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:0%">                                      <span class="sr-only"></span>                                    </div>                                  </div>                                </div>                                 <div ng-show="$ngModel$" class="upload-image-component-attribute">                                   <div class="btn btn-danger btn-xs ng-scope" style="float:right;" ng-if="$ngModel$" ng-click="$ngModel$=null">                                     <span class="glyphicon glyphicon-remove"></span>                                   </div>                                   <div>                                     <div ng-bind-html="cronapi.internal.generatePreviewDescriptionByte($ngModel$)"></div>                                     <a href="javascript:void(0)" ng-click="cronapi.internal.downloadFileEntity($datasource$,\'$field$\')">download</a>                                   </div>                                 </div>                                 ';u=$(u.split("$ngModel$").join(n.ngModel).split("$datasource$").join(o).split("$field$").join(l).split("$number$").join(s).split("$required$").join(a).split("$userHtml$").join(c).split("$maxFileSize$").join(d)),i.html(u),e(u)(i.scope())}}}]).directive("dynamicFile",["$compile",function(e){return{restrict:"E",replace:!0,scope:{ngModel:"@"},require:"ngModel",template:"<div></div>",init:function(e){e.ngModel||(e.ngModel="")},link:function(t,i,n){this.init(t);var a=t,r=n.ngRequired&&"true"==n.ngRequired?"required":"",o=a.ngModel.split("."),l=o[0],s=o[o.length-1],c=Math.floor(1e3*Math.random()+20);i.append('                                <div ng-show="!$ngModel$">                                  <input ng-if="!$ngModel$" autocomplete="off" tabindex="-1" class="uiSelectRequired ui-select-offscreen" style="top: inherit !important;margin-left: 85px !important;margin-top: 50px !important;" type=text ng-model="$ngModel$" $required$>                                  <div class="form-group upload-image-component" ngf-drop="" ngf-drag-over-class="dragover">                                     <img class="ng-scope" style="height: 128px; width: 128px;" ng-if="!$ngModel$" data-ng-src="/plugins/cronapp-framework-js/img/selectFile.png" ngf-drop="" ngf-select="" ngf-change="cronapi.internal.uploadFile(\'$ngModel$\', $file, \'uploadprogress$number$\')" accept="*">                                    <progress id="uploadprogress$number$" max="100" value="0" style="position: absolute; width: 128px; margin-top: -134px;">0</progress>                                  </div>                                </div>                                 <div ng-show="$ngModel$" class="form-group upload-image-component">                                   <div class="btn btn-danger btn-xs ng-scope" style="float:right;" ng-if="$ngModel$" ng-click="$ngModel$=null">                                     <span class="glyphicon glyphicon-remove"></span>                                   </div>                                   <div>                                     <div ng-bind-html="cronapi.internal.generatePreviewDescriptionByte($ngModel$)"></div>                                     <a href="javascript:void(0)" ng-click="cronapi.internal.downloadFileEntity($datasource$,\'$field$\')">download</a>                                   </div>                                 </div>                                 '.split("$ngModel$").join(a.ngModel).split("$datasource$").join(l).split("$field$").join(s).split("$number$").join(c).split("$required$").join(r)),e(i)(i.scope())}}}]).directive("pwCheck",[function(){"use strict";return{require:"ngModel",link:function(e,t,i,n){var a="#"+i.pwCheck;t.add(a).on("keyup",function(){e.$apply(function(){var e=t.val()===$(a).val();n.$setValidity("pwmatch",e)})})}}}]).directive("ngClick",[function(){"use strict";return{link:function(scope,elem,attrs,ctrl){if(scope.rowData){var crnDatasource=elem.closest("[crn-datasource]");crnDatasource.length>0&&elem.on("click",function(){scope.$apply(function(){var datasource=eval(crnDatasource.attr("crn-datasource"));datasource.active=scope.rowData})})}}}}]).directive("valid",function(){return{require:"^ngModel",restrict:"A",link:function(e,t,i,n){var a={cpf:CPF,cnpj:CNPJ};n.$validators[i.valid]=function(e,n){var r=e||n,o=a[i.valid].isValid(r);return o?t[0].setCustomValidity(""):t.scope().$applyAsync(function(){t[0].setCustomValidity(t[0].dataset.errorMessage)}),o||!r}}}}).directive("cronappSecurity",function(){return{restrict:"A",link:function(e,t,i){var n=[];e.session&&e.session.roles&&(n=e.session.roles.toLowerCase().split(","));for(var a=parsePermission(i.cronappSecurity),r=!1,o=!1,l=0;l<n.length;l++){var s=n[l].trim();s&&(a.visible[s]&&(r=!0),a.enabled[s]&&(o=!0))}r||$(t).hide(),o||$(t).find("*").addBack().attr("disabled",!0)}}}).directive("qr",["$window",function(e){return{restrict:"A",require:"^ngModel",template:'<canvas ng-hide="image"></canvas><img ng-if="image" ng-src="{{canvasImage}}"/>',link:function(t,i,n,a){void 0===t.size&&n.size&&(t.text=n.size);var r=function(){return a.$modelValue||""},o=function(e){return/^[0-9]*$/.test(e)},l=function(e){return/^[0-9A-Z $%*+\-.\/:]*$/.test(e)},s=function(e){for(var t=0;t<e.length;t++){if(e.charCodeAt(t)>255)return!1}return!0},c=function(e,t){if("NUMBER"===e&&!o(t))throw new Error("The `NUMBER` input mode is invalid for text.");if("ALPHA_NUM"===e&&!l(t))throw new Error("The `ALPHA_NUM` input mode is invalid for text.");if("8bit"===e&&!s(t))throw new Error("The `8bit` input mode is invalid for text.");if(!s(t))throw new Error("Input mode is invalid for text.");return!0},d=function(e){var i=t.inputMode;return i=i||(o(e)?"NUMBER":void 0),i=i||(l(e)?"ALPHA_NUM":void 0),i=i||(s(e)?"8bit":""),c(i,e)?i:""},u=i.find("canvas")[0],p=!!e.CanvasRenderingContext2D;t.TYPE_NUMBER=function(){return t.typeNumber||0}(),t.TEXT=r(),t.CORRECTION=function(){return{L:1,M:0,Q:3,H:2}[t.correctionLevel||0]||0}(),t.SIZE=function(){return t.size||$(i).outerWidth()}(),t.INPUT_MODE=d(t.TEXT),t.canvasImage="";var m=function(e,t,i,n){for(var a=0;a<i;a++)for(var r=0;r<i;r++){var o=Math.ceil((r+1)*n)-Math.floor(r*n),l=Math.ceil((a+1)*n)-Math.floor(a*n);e.fillStyle=t.isDark(a,r)?"#000":"#fff",e.fillRect(Math.round(r*n),Math.round(a*n),o,l)}},f=function(e,i,n,a,r,o){var l=/^\s+|\s+$/g,s=i.replace(l,""),c=new QRCode(n,a,o);c.addData(s),c.make();var d=e.getContext("2d"),u=c.getModuleCount(),f=r/u;e.width=e.height=r,p&&(m(d,c,u,f),t.canvasImage=e.toDataURL()||"")};t.$watch(function(){return a.$modelValue},function(e,i){e!==i&&(t.text=a.$modelValue,t.TEXT=r(),t.INPUT_MODE=d(t.TEXT),f(u,t.TEXT,t.TYPE_NUMBER,t.CORRECTION,t.SIZE,t.INPUT_MODE))}),f(u,t.TEXT,t.TYPE_NUMBER,t.CORRECTION,t.SIZE,t.INPUT_MODE)}}}]).directive("uiSelect",["$compile",function(e){return{restrict:"E",require:"ngModel",link:function(t,i,n,a){if(void 0!=n.required||"true"===n.ngRequired){$(i).append('<input autocomplete="off" tabindex="-1" class="uiSelectRequired ui-select-offscreen" style="left: 50%!important; top: 100%!important;" type=text ng-model="'+n.ngModel+'" required>');var r=$(i).find("input.uiSelectRequired");e(r)(i.scope())}}}}]).filter("raw",["$translate",function(e){return function(e){return e?"number"==typeof e?e+"":e instanceof Date?"datetime'"+e.toISOString()+"'":"'"+e+"'":""}}]).filter("mask",["$translate",function(e){return function(t,i){if(!(i=parseMaskType(i,e)))return t;if(i=i.replace(";1","").replace(";0","").trim(),"string"==typeof t&&t.match(isoDate))return moment.utc(t).format(i);if(t instanceof Date)return moment.utc(t).format(i);if("number"==typeof t)return format(i,t);if(void 0!=t&&null!=t&&""!=t){var n=$('<input type="text">');return n.mask(i),n.masked(t)}return t}}]).directive("mask",maskDirectiveMask).directive("cronappFilter",["$compile",function($compile){return{restrict:"A",require:"?ngModel",setFilterInButton:function(e,t,i){var n=e.closest("fieldset");if(n){var a=n.find("button[cronapp-filter]");if(a){var r=a.data("filters");r||(r=[]);var o=-1,l=e.attr("ng-model");if($(r).each(function(e){this.ngModel==l&&(o=e)}),o>-1&&r.splice(o,1),t.length>0){var s={ngModel:l,bindedFilter:t};r.push(s)}a.data("filters",r)}}},makeAutoPostSearch:function(e,t,i,n){var a=e.closest("fieldset");if(a&&a.length>0){var r=a.find("button[cronapp-filter]");if(r&&r.length>0){var o=r.data("filters");o&&o.length>0&&(t="",$(o).each(function(){t+=this.bindedFilter+";"}))}}i.search(t,"true"==n.cronappFilterCaseinsensitive)},inputBehavior:function(scope,element,attrs,ngModelCtrl,$element,typeElement,operator,autopost){var filterTemplate="",filtersSplited=attrs.cronappFilter.split(";"),datasource=eval(attrs.crnDatasource),isOData=datasource.isOData();$(filtersSplited).each(function(){this.length>0&&(""!=filterTemplate&&(filterTemplate+=isOData?" and ":";"),isOData&&("="==operator?operator="eq":"!="==operator?operator="ne":">"==operator?operator="gt":">="==operator?operator="ge":"<"==operator?operator="lt":"<="==operator&&(operator="le")),filterTemplate+="text"==typeElement?isOData?this+" "+operator+" {value}":this+"@"+operator+"%{value}%":isOData?this+" "+operator+" {value}":this+operator+"{value}")}),0==filterTemplate.length&&(filterTemplate=isOData?"{value}":"%{value}%");var selfDirective=this;ngModelCtrl?scope.$watch(attrs.ngModel,function(e,t){if(!angular.equals(e,t)){var i=$element.data("type")||$element.attr("type"),n=ngModelCtrl.$modelValue;isOData?n=n instanceof Date?"datetime-local"==i?"datetimeoffset'"+n.toISOString()+"'":"datetime'"+n.toISOString().substring(0,23)+"'":"number"==typeof n?n:"boolean"==typeof n?n:"'"+n+"'":n instanceof Date?(n=n.toISOString(),n+="date"==i?"@@date":"time"==i||"time-local"==i?"@@time":"@@datetime"):"number"==typeof n?n+="@@number":"boolean"==typeof n&&(n+="@@boolean");var a=filterTemplate.split("{value}").join(n);0==ngModelCtrl.$viewValue.length&&(a=""),selfDirective.setFilterInButton($element,a,operator),autopost&&selfDirective.makeAutoPostSearch($element,a,datasource,attrs)}}):"text"==typeElement?$element.on("keyup",function(){var datasource=eval(attrs.crnDatasource),value=void 0;value=ngModelCtrl&&void 0!=ngModelCtrl?ngModelCtrl.$viewValue:this.value;var bindedFilter=filterTemplate.split("{value}").join(value);0==this.value.length&&(bindedFilter=""),selfDirective.setFilterInButton($element,bindedFilter,operator),autopost&&selfDirective.makeAutoPostSearch($element,bindedFilter,datasource,attrs)}):$element.on("change",function(){var datasource=eval(attrs.crnDatasource),value=void 0,typeElement=$(this).attr("type");if(void 0!=attrs.asDate&&(typeElement="date"),ngModelCtrl&&void 0!=ngModelCtrl)value=ngModelCtrl.$viewValue;else if("checkbox"==typeElement)value=$(this).is(":checked");else if("date"==typeElement){if(value=this.value,this.value.length>0){var momentDate=moment(this.value,patternFormat(this));value=momentDate.toDate().toISOString()}}else value=this.value;var bindedFilter=filterTemplate.split("{value}").join(value);0==value.toString().length&&(bindedFilter=""),selfDirective.setFilterInButton($element,bindedFilter,operator),autopost&&selfDirective.makeAutoPostSearch($element,bindedFilter,datasource,attrs)})},forceDisableDatasource:function(datasourceName,scope){var disableDatasource=setInterval(function(){try{var datasourceInstance=eval(datasourceName);datasourceInstance&&($(document).ready(function(){var e=0,t=setInterval(function(){e<10?(scope.$apply(function(){datasourceInstance.enabled=!1,datasourceInstance.data=[]}),e++):clearInterval(t)},20)}),clearInterval(disableDatasource))}catch(e){}},10)},buttonBehavior:function(scope,element,attrs,ngModelCtrl,$element,typeElement,operator,autopost){var datasourceName="";datasourceName=attrs.crnDatasource?attrs.crnDatasource:$element.parent().attr("crn-datasource");var requiredFilter=attrs.requiredFilter&&"true"==attrs.requiredFilter.toString();requiredFilter&&this.forceDisableDatasource(datasourceName,scope),$element.on("click",function(){var $this=$(this),filters=$this.data("filters");if(datasourceName&&datasourceName.length>0&&filters){var bindedFilter="";$(filters).each(function(){bindedFilter+=this.bindedFilter+";"});var datasourceToFilter=eval(datasourceName);requiredFilter?(datasourceToFilter.enabled=bindedFilter.length>0,datasourceToFilter.enabled?datasourceToFilter.search(bindedFilter,"true"==attrs.cronappFilterCaseinsensitive):scope.$apply(function(){datasourceToFilter.data=[]})):datasourceToFilter.search(bindedFilter,"true"==attrs.cronappFilterCaseinsensitive)}})},link:function(e,t,i,n){var a=$(t),r=a.data("type")||a.attr("type");void 0!=i.asDate&&(r="date");var o="=";i.cronappFilterOperator&&i.cronappFilterOperator.length>0&&(o=i.cronappFilterOperator);var l=!0;i.cronappFilterAutopost&&"false"==i.cronappFilterAutopost&&(l=!1),"INPUT"==a[0].tagName?this.inputBehavior(e,t,i,n,a,r,o,l):this.buttonBehavior(e,t,i,n,a,r,o,l)}}}]).directive("cronRichEditor",["$compile",function(e){return{restrict:"E",replace:!0,require:"ngModel",parseToTinyMCEOptions:function(e){var t={};t.allowFullScreen="fullscreen |",t.allowPage="fullpage newdocument code pagebreak |",t.allowPrint="preview print |",t.allowTransferArea="cut copy paste |",t.allowDoUndo="undo redo |",t.allowSymbol="charmap |",t.allowEmbeddedImage="bdesk_photo |",t.allowFont="formatselect fontselect fontsizeselect strikethrough bold italic underline removeformat |",t.allowLinks="link unlink anchor |",t.allowParagraph="alignleft aligncenter alignright alignjustify numlist bullist outdent indent blockquote hr |",t.allowFormulas="tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry tiny_mce_wiris_CAS |";var i={menubar:!1,statusbar:!1,plugins:"bdesk_photo advlist anchor autolink autoresize autosave charmap code colorpicker contextmenu directionality emoticons fullpage fullscreen hr image imagetools importcss insertdatetime legacyoutput link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace tabfocus table template toc visualblocks visualchars wordcount tiny_mce_wiris",toolbar:"",content_style:""};for(var n in e)n.startsWith("allow")&&e[n]&&(i.toolbar+=" "+t[n]);return i.menubar=e.showMenuBar,i.statusbar=e.showStatusBar,i.content_style=e.contentStyle,JSON.stringify(i)},link:function(t,i,n,a){var r=JSON.parse(n.options),o=this.parseToTinyMCEOptions(r),l='                  <textarea                     ui-tinymce="$options$"                     ng-model="$ngModel$">                   </textarea>                 ';l=$(l.split("$ngModel$").join(n.ngModel).split("$options$").join(escape(o)));var s=angular.element(l);i.html(""),i.append(s),e(s)(t)}}}]).directive("cronGrid",["$compile","$translate",function($compile,$translate){return{restrict:"E",replace:!0,require:"ngModel",generateId:function(){var e=Math.floor(65536*(1+Math.random())).toString(16).substring(1);return"0123456789".indexOf(e.substr(0,1))>-1?this.generateId():e},generateBlocklyCall:function(e){var t;if("client"==e.type){var i=e.blocklyClass.split("/"),n=i[i.length-1];t="blockly.js.blockly."+n,t+="."+e.blocklyMethod;var a="()";e.blocklyParams.length>0&&(a="(",e.blocklyParams.forEach(function(e){a+=this.encodeHTML(e.value)+","}.bind(this)),a=a.substr(0,a.length-1),a+=")"),t+=a}else if("server"==e.type){var n=e.blocklyClass+":"+e.blocklyMethod;t="cronapi.util.makeCallServerBlocklyAsync('"+n+"',null,null,",e.blocklyParams.length>0&&e.blocklyParams.forEach(function(e){t+=this.encodeHTML(e.value)+","}.bind(this)),t=t.substr(0,t.length-1),t+=")"}return t},generateToolbarButtonBlockly:function(e,t){var i=function(e,i,n){var a='<a class="k-button" id="#BUTTONID#" href="javascript:void(0)" ng-click="#FUNCTIONCALL#">#TITLE#</a>';a=a.split("#BUTTONID#").join(e).split("#FUNCTIONCALL#").join(i).split("#TITLE#").join(n);var r=setInterval(function(){if($("#"+e).length>0){var i=angular.element($("#"+e));$compile(i)(t),clearInterval(r)}},200);return a};return function(e,t){return{template:function(){var n=this.generateId();return i(n,e,t)}.bind(this)}}.bind(this)(this.generateBlocklyCall(e.blocklyInfo),e.title)},getObjectId:function(e){if(e){if(e instanceof Date){var t=moment.utc(e);e=new Date(t.format("YYYY-MM-DDTHH:mm:ss"))}else if("object"==typeof e)if(e.id)e=e.id;else for(var i in e){e=e[i];break}}else e="";return e},updateFiltersFromAngular:function(e,t){var i=function(t){var i=-1,n=e.dataSource.filter()?e.dataSource.filter().filters:null;if(n)for(var a=0;a<n.length;a++)if(t.linkParentField==n[a].linkParentField){i=a;break}return i},n=function(t){var n=i(t),a=!1,r=e.dataSource.filter()?e.dataSource.filter().filters:null;n>-1?(t.value&&""!=t.value||!t.linkParentLoadIfEmpty?r[n]=t:r.splice(n,1),a=!0):(t.value&&""!=t.value||!t.linkParentLoadIfEmpty)&&(r?r.push(t):r=[t],a=!0),a&&e.dataSource.filter(r)},a=null,r=function(t,i){i.value=this.getObjectId(t),n(i),setTimeout(function(){e.trigger("change")},100)};e.dataSource.options.filterScreen.forEach(function(e){t.$watch(e.linkParentField,function(t,i){a&&(clearTimeout(a),a=null),a=setTimeout(function(){r.bind(this)(t,e)}.bind(this),500)}.bind(this))}.bind(this))},setFiltersFromLinkColumns:function(e,t,i){e.filter=[],e.filterScreen=[],t.columns.forEach(function(t){if(t.linkParentField&&t.linkParentField.length>0&&t.linkParentType&&t.linkParentType.length>0)if("screen"==t.linkParentType){var n=i[t.linkParentField];n=this.getObjectId(n);var a={field:t.field,operator:"eq",value:n,linkParentField:t.linkParentField,linkParentType:t.linkParentType,linkParentLoadIfEmpty:t.linkParentLoadIfEmpty};(n&&""!=n||!f.linkParentLoadIfEmpty)&&e.filter.push(a),e.filterScreen.push(a)}else if("hierarchy"==t.linkParentType){var a={field:t.field,operator:"eq",value:"",linkParentField:t.linkParentField,linkParentType:t.linkParentType};e.filter.push(a)}}.bind(this))},encodeHTML:function(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")},decodeHTML:function(e){return e.replace(/&apos;/g,"'").replace(/&quot;/g,'"').replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&")},getColumns:function(options,scope){function getTemplate(e){var t=void 0;return"checkbox"==e.inputType&&(t="<input type='checkbox' class='k-checkbox' #="+e.field+" ? \"checked='checked'\": '' # /><label class='k-checkbox-label k-no-text'></label>"),"switch"==e.inputType?t='<span class="k-switch km-switch k-widget km-widget k-switch-off km-switch-off" style="width: 100%">                  <span class="k-switch-wrapper km-switch-wrapper">                    <span class="k-switch-background km-switch-background" style="margin-left: #='+e.field+' ? "80%": "0%" #"></span>                  </span>                  <span class="k-switch-container km-switch-container">                    <span class="k-switch-handle km-switch-handle" style=#='+e.field+' ? "float:right;margin-right:-1px": "margin-left:0%" #>                    </span>                  </span>                </span>':e.displayField&&e.displayField.length>0?t=e.type.startsWith("date")||e.type.startsWith("month")||e.type.startsWith("time")||e.type.startsWith("week")?"#= formatDate("+e.displayField+",'"+e.format+"','"+e.type+"') #":"#="+e.displayField+"#":(e.type.startsWith("date")||e.type.startsWith("month")||e.type.startsWith("time")||e.type.startsWith("week"))&&(t="#= formatDate("+e.field+",'"+e.format+"','"+e.type+"') #"),t}function getFormat(e){if(e.format&&!e.type.startsWith("date")&&!e.type.startsWith("time")&&!e.type.startsWith("month")&&!e.type.startsWith("week"))return e.format}function getColumnByField(e){var t=null;return options.columns.forEach(function(i){i.field==e&&(t=i)}),t}function isRequired(e){var t=!1,i=null;return options.dataSource.schemaFields.forEach(function(t){t.name==e&&(i=t)}),i&&(t=!i.nullable),t}function getEditor(e){return editor.bind(this)}function editor(e,t){$(e).css("position","relative");var i=getColumnByField(t.field),n=isRequired(t.field)?"required":"",a=this.generateId(),r=$("<input "+n+' name="'+t.field+'" id="'+a+'"from-grid=true />');if("dynamicComboBox"==i.inputType||"comboBox"==i.inputType){var o=app.kendoHelper.getConfigCombobox(i.comboboxOptions);o.autoBind=!0,o.optionLabel=void 0,r.appendTo(e).kendoDropDownList(o)}else if("slider"==i.inputType){var o=app.kendoHelper.getConfigSlider(i.sliderOptions);r.appendTo(e).kendoSlider(o)}else if("switch"==i.inputType){var o=app.kendoHelper.getConfigSwitch(i.switchOptions);r.appendTo(e).kendoMobileSwitch(o)}else if("checkbox"==i.inputType){var l=this.generateId();r=$('<input id="'+l+'" name="'+t.field+'" class="k-checkbox" type="checkbox" ><label class="k-checkbox-label" for="'+l+'"></label>'),r.appendTo(e)}else if("date"==i.inputType){r.attr("cron-date",""),r.attr("options",JSON.stringify(i.dateOptions)),r.data("initial-date",t.model[t.field]),r.appendTo(e).off("change");var s=setInterval(function(){if($("#"+a).length>0){var e=angular.element($("#"+a))
;$compile(e)(scope),clearInterval(s),$("#"+a).on("change",function(){setTimeout(function(){t.model[t.field]=$("#"+a).data("rawvalue"),t.model.dirty=!0,t.model.dirtyFields[t.field]=!0}.bind(this))})}},10)}else{r.attr("type",i.type),r.attr("mask",i.format?i.format:""),r.attr("class","k-input k-textbox"),r.data("initial-value",t.model[t.field]),r.appendTo(e);var s=setInterval(function(){if($("#"+a).length>0){$("#"+a).off("change"),$("#"+a).on("change",function(){t.model[t.field]=$("#"+a).data("rawvalue"),t.model.dirty=!0,t.model.dirtyFields[t.field]=!0});var e=angular.element($("#"+a));$compile(e)(scope),clearInterval(s)}},10)}}window.formatDate=function(e,t,i){var n,a="";return e&&(n="date"==i||"datetime"==i||"time"==i?moment.utc(e):moment(e),t&&"null"!=t?a=n.format(t):(t=parseMaskType(i,$translate),a=n.format(t))),a};var columns=[];return options.columns&&options.columns.forEach(function(column){if(column.visible)if("Database"==column.dataType){var addColumn={field:column.field,title:column.headerText,type:column.type,width:column.width,sortable:column.sortable,filterable:column.filterable};addColumn.template=getTemplate(column),addColumn.format=getFormat(column),addColumn.editor=getEditor.bind(this)(column),columns.push(addColumn)}else if("Command"==column.dataType){if("no"!=options.editable){var command=column.command.split("|"),addColumn={command:command,title:column.headerText,width:column.width};columns.push(addColumn)}}else if("Blockly"==column.dataType){var directiveContext=this,addColumn={command:[{name:this.generateId(),text:column.headerText,click:function(e){e.preventDefault();var tr=$(e.target).closest("tr"),grid=tr.closest("table"),item=this.dataItem(tr),index=$(grid.find("tbody")[0]).children().index(tr),consolidated={item:item,index:index},call="scope."+directiveContext.generateBlocklyCall(column.blocklyInfo);eval(call)}}],width:column.width};columns.push(addColumn)}}.bind(this)),columns},getPageAble:function(e){var t={refresh:e.allowRefreshGrid,pageSizes:e.allowSelectionTotalPageToShow,buttonCount:5};return e.allowPaging||(t=e.allowPaging),t},getToolbar:function(e,t){var i=[];return e.toolBarButtons.forEach(function(n){if("Native"==n.type)"no"!=e.editable?"save"==n.title||"cancel"==n.title?"batch"==e.editable&&i.push(n.title):i.push(n.title):"pdf"!=n.title&&"excel"!=n.title||i.push(n.title);else if("Blockly"==n.type){var a=this.generateToolbarButtonBlockly(n,t);i.push(a)}else if("Template"==n.type){var r={template:n.template};i.push(r)}}.bind(this)),0==i.length&&(i=void 0),i},getEditable:function(e){var t=e.editable;return"batch"==e.editable?t=!0:"no"==e.editable&&(t=!1),t},generateKendoGridInit:function(e,t){function i(e){e.sender.options.listCurrentOptions.forEach(function(i){var a=n.generateKendoGridInit(i,t);a.dataSource.filter.forEach(function(t){"hierarchy"==t.linkParentType&&(t.value=e.data[t.linkParentField])});var r=$("<div/>").appendTo(e.detailCell).kendoGrid(a).data("kendoGrid");r.dataSource.transport.options.grid=r,n.updateFiltersFromAngular(r,t)})}var n=this,a=app.kendoHelper.getDataSource(e.dataSource,e.allowPaging,e.pageCount,e.columns),r=this.getColumns(e,t),o=this.getPageAble(e),l=this.getToolbar(e,t),s=this.getEditable(e);return this.setFiltersFromLinkColumns(a,e,t),{toolbar:l,pdf:{allPages:!0,avoidLinks:!0,paperSize:"A4",margin:{top:"2cm",left:"1cm",right:"1cm",bottom:"1cm"},landscape:!0,repeatHeaders:!0,scale:.8},dataSource:a,editable:s,height:e.height,groupable:e.allowGrouping,sortable:e.allowSorting,filterable:!0,pageable:o,columns:r,selectable:e.allowSelectionRow,detailInit:e.details&&e.details.length>0?i:void 0,listCurrentOptions:e.details&&e.details.length>0?e.details:void 0}},link:function(scope,element,attrs,ngModelCtrl){var $templateDyn=$("<div></div>"),baseUrl="plugins/cronapp-framework-js/dist/js/kendo-ui/js/messages/kendo.messages.";"pt_br"==$translate.use()?baseUrl+="pt-BR.min.js":baseUrl+="en-US.min.js";var helperDirective=this;$.getScript(baseUrl,function(){console.log("loaded language");var options=JSON.parse(attrs.options||"{}"),kendoGridInit=helperDirective.generateKendoGridInit(options,scope);kendoGridInit.change=function(e){var item=this.dataItem(this.select()),fcChangeValue=eval("scope.cronapi.screen.changeValueOfField");fcChangeValue(attrs.ngModel,item)};var grid=$templateDyn.kendoGrid(kendoGridInit).data("kendoGrid");grid.dataSource.transport.options.grid=grid,helperDirective.updateFiltersFromAngular(grid,scope)}),element.html($templateDyn),$compile($templateDyn)(element.scope())}}}])}(app);