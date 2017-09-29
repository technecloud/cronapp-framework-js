(function($app) {

  /**
   * Função que retorna o formato que será utilizado no componente
   * capturando o valor do atributo format do elemento, para mais formatos
   * consulte os formatos permitidos em http://momentjs.com/docs/#/parsing/string-format/
   *
   */
  var patternFormat = function(element) {
    if (element) {
      return $(element).attr('format') || 'DD/MM/YYYY';
    }
    return 'DD/MM/YYYY';
  }

  var parsePermission = function(perm) {
    var result = {
      visible: {
        public: true
      },
      enabled: {
        public: true
      }
    }

    if (perm) {
      var perms = perm.toLowerCase().trim().split(",");
      for (var i=0;i<perms.length;i++) {
        var p = perms[i].trim();
        if (p) {
          var pair = p.split(":");
          if (pair.length == 2) {
            var key = pair[0].trim();
            var value = pair[1].trim();
            if (value) {
              var values = value.split(";");
              var json = {};
              for (var j=0;j<values.length;j++) {
                var v = values[j].trim();
                if (v) {
                  json[v] = true;
                }
              }
              result[key] = json;
            }
          }
        }
      }
    }
    return result;
  }

  /**
   * Em todo elemento que possuir o atibuto as-date será
   * aplicado o componente Datetimepicker (http://eonasdan.github.io/bootstrap-datetimepicker/)
   *
   * O componente se adequa de acordo com o formato, definido através do atributo format
   * espeficado no elemento.
   * Para data simples use format="DD/MMM/YYYY", para data e hora use format="DD/MM/YYYY HH:mm:ss"
   *
   * @see http://eonasdan.github.io/bootstrap-datetimepicker/
   */
  app.directive('asDate', function() {
      return {
        require: '^ngModel',
        restrict: 'A',
        link: function(scope, element, attrs, ngModel) {
          if (!ngModel) {
            return;
          }

          var format = patternFormat(element);

          var options = {
            format: format,
            locale: 'pt-BR',
            showTodayButton: true,
            useStrict: true,
            tooltips: {
              today: 'Hoje',
              clear: 'Limpar seleção',
              close: 'Fechar',
              selectMonth: 'Selecionar mês',
              prevMonth: 'Mês anterior',
              nextMonth: 'Próximo mês',
              selectYear: 'Selecionar ano',
              prevYear: 'Ano anterior',
              nextYear: 'Próximo ano',
              selectDecade: 'Selecionar década',
              prevDecade: 'Década anterior',
              nextDecade: 'Próxima década',
              prevCentury: 'Século anterior',
              nextCentury: 'Próximo século'
            }
          };

          if (format != 'DD/MM/YYYY') {
            options.sideBySide = true;
          }

          element.datetimepicker(options);

          element.on('dp.change', function() {
            if ($(this).is(":visible"))
              scope.$apply(read);
          });

          ngModel.$render = function() {
			if(ngModel.$viewValue){
			  var momentDate = moment(ngModel.$viewValue);

			  if(momentDate.isValid()){
				element.val( momentDate.format(patternFormat(element)));
			  }else{
				var dateInMilliseconds = parseInt(ngModel.$viewValue, 10);
				momentDate = moment(dateInMilliseconds);
				if(momentDate.isValid()){
				  element.val( momentDate.format(patternFormat(element)));
				}else{
				  element.val('');
				}
			  }
			}else{
			  element.data("DateTimePicker").clear();
			  element.val('');
			}
		  }

          read();

          function read() {
            var value = element.val();
            var momentDate = moment(value, patternFormat(element));
            if (momentDate.isValid())
              ngModel.$setViewValue(momentDate.toDate());
          }
        }
      };
    })

    .directive('ngDestroy', function() {
      return {
        restrict: 'A',
        link: function(scope, element, attrs, ctrl) {
          element.on('$destroy', function() {
            if (attrs.ngDestroy && attrs.ngDestroy.length > 0)
              if (attrs.ngDestroy.indexOf('app.') > -1 || attrs.ngDestroy.indexOf('blockly.') > -1)
                scope.$eval(attrs.ngDestroy);
              else
                eval(attrs.ngDestroy);
          });
        }
      }
    })
    
    .directive('dynamicImage', function($compile) {
      var template = '';
      return {
        restrict: 'E',
        replace: true,
        scope: {
            label: '@',
            ngModel: '@',
            width: '@',
            height: '@',
            style: '@',
            class: '@'
        },
        require: 'ngModel',
        template: '<div></div>',
        init: function(s) {
          if (!s.ngModel)
            s.ngModel = '';
          if (!s.width)
            s.width = '128';
          if (!s.height)
            s.height = '128';
          if (!s.style)
            s.style = '';
          if (!s.class)
            s.class = '';
          if (!this.containsLetter(s.width))
            s.width += 'px';
          if (!this.containsLetter(s.height))
            s.height += 'px';
        },
        containsLetter: function(value) {
          var containsLetter;
          for (var i=0; i<value.length; i++) {
            containsLetter = true;
            for (var number = 0; number <10; number++)
              if (parseInt(value[i]) == number)
                containsLetter = false;
            if (containsLetter)
              break;
          }
          return containsLetter;
        },
        link: function(scope, element, attr) {
          this.init(scope);
          var s = scope;
          var templateDyn    = '<div class="form-group upload-image-component" ngf-drop="" ngf-drag-over-class="dragover">\
                                  <img class="$class$" style="$style$; height: $height$; width: $width$;" ng-if="$ngModel$" data-ng-src="{{$ngModel$.startsWith(\'http\') || ($ngModel$.startsWith(\'/\') && $ngModel$.length < 1000)? $ngModel$ : \'data:image/png;base64,\' + $ngModel$}}">\
                                  <img class="$class$" style="$style$; height: $height$; width: $width$;" ng-if="!$ngModel$" data-ng-src="/plugins/cronapp-framework-js/img/selectImg.svg" class="btn" ng-if="!$ngModel$" ngf-drop="" ngf-select="" ngf-change="cronapi.internal.setFile(\'$ngModel$\', $file)" accept="image/*;capture=camera">\
                                  <div class="remove btn btn-danger btn-xs" ng-if="$ngModel$" ng-click="$ngModel$=null">\
                                    <span class="glyphicon glyphicon-remove"></span>\
                                  </div>\
                                  <div class="btn btn-info btn-xs start-camera-button" ng-if="!$ngModel$" ng-click="cronapi.internal.startCamera(\'$ngModel$\',\'$style$\',\'$width$\',\'$height$\')">\
                                    <span class="glyphicon glyphicon-facetime-video"></span>\
                                  </div>\
                                </div>';
          element.append(templateDyn
                          .split('$height$').join(s.height)
                          .split('$width$').join(s.width)
                          .split('$ngModel$').join(s.ngModel)
                          .split('$style$').join(s.style)
                          .split('$class$').join(s.class)
                          );
          $compile(element)(element.scope());
      }
    }
  })
    .directive('pwCheck', [function() {
      'use strict';
      return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {
          var firstPassword = '#' + attrs.pwCheck;
          elem.add(firstPassword).on('keyup', function() {
            scope.$apply(function() {
              var v = elem.val() === $(firstPassword).val();
              ctrl.$setValidity('pwmatch', v);
            });
          });
        }
      }
    }])


    /**
     * Validação de campos CPF e CNPJ,
     * para utilizar essa diretiva, adicione o atributo valid com o valor
     * do tipo da validação (cpf ou cnpj). Exemplo <input type="text" valid="cpf">
     */
    .directive('valid', function() {
      return {
        require: '^ngModel',
        restrict: 'A',
        link: function(scope, element, attrs, ngModel) {
          var validator = {
            'cpf': CPF,
            'cnpj': CNPJ
          };

          ngModel.$validators[attrs.valid] = function(modelValue, viewValue) {
            var value = modelValue || viewValue;
            var fieldValid = validator[attrs.valid].isValid(value);
            if (!fieldValid) {
              element[0].setCustomValidity(element[0].dataset['errorMessage']);
            } else {
              element[0].setCustomValidity("");
            }
            return (fieldValid || !value);
          };
        }
      }
    })

    .directive('cronappSecurity', function() {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var roles = [];
          if (scope.session && scope.session.roles) {
            roles = scope.session.roles.toLowerCase().split(",");
          }

          var perms = parsePermission(attrs.cronappSecurity);
          var show = false;
          var enabled = false;
          for (var i=0;i<roles.length;i++) {
            var role = roles[i].trim();
            if (role) {
              if (perms.visible[role]) {
                show = true;
              }
              if (perms.enabled[role]) {
                enabled = true;
              }
            }
          }

          if (!show) {
            $(element).hide();
          }

          if (!enabled) {
            $(element).find('*').addBack().attr('disabled', true);
          }
        }
      }
    })
}(app));