// create angular app
var validationApp = angular.module('validationApp', ['ui.bootstrap.tpls', 'ui.bootstrap.modal']);

var submitted=false;
// create angular controller
validationApp.controller('mainController', ['$scope','$modal', function ($scope, $modal){

    $scope.tabs = [{
            title: 'Contribuição financeira',
            url: 'templates/financeira.html',
        }, {
            title: 'Aprensentação musical',
            url: 'templates/musical.html',
        }, {
            title: 'Oficinas, vivências ou palestras',
            url: 'templates/vivencias.html',
          }, {
            title: 'Voluntariados e outras trocas',
            url: 'templates/voluntario.html',

    }];

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }

    $scope.adultos = ['Número de adultos...',1,2,3,4,5,6,7,8,9,10];
  	$scope.selection = $scope.adultos[0];
  	$scope.criancas = [0,1,2,3,4,5,6,7,8,9,10];
  	$scope.selection = $scope.criancas[0];
  	$scope.dias = [10,5];
  	$scope.selection = $scope.dias[0];
	  $scope.hospedagens = ['Camping', 'Chalés'];
  	$scope.selection = $scope.hospedagens[0];
  	$scope.alimentacoes = ['Coletiva', 'Individual'];
  	$scope.selection = $scope.alimentacoes[0];
  	$scope.carros = [0,1,2,3,4,5];
  	$scope.selection = $scope.carros[0];
    $scope.tipos = ['Alimentos', 'Dinheiro']
    $scope.selection = $scope.tipos[0];
    $scope.totalEntrada = 200;
    $scope.totalAlimentacao = 100;
    $scope.totalHospedagem = 0;
    $scope.totalEstacionamento = 0;


    $scope.calculos = function (user, nadultos, ncriancas, ndias, talimentacao, thospedagem, ncarros, pagalimentacao) {
        user.nadultos = nadultos;
        user.ncriancas = ncriancas;
        user.dias = ndias;
        user.alimentacao = talimentacao;
        user.hospedagem = thospedagem;
        user.estacionamento = ncarros;
        user.tipoalimentacao = pagalimentacao;
          //ENTRADA
        if (ndias === 10) {
        $scope.totalEntrada = 10*((nadultos*20)+(ncriancas*10));
      } else {
       $scope.totalEntrada = 5*((nadultos*25)+(ncriancas*12.5));
      }
          //ALIMENTACAO
        if (talimentacao === 'Coletiva'){
              $scope.totalAlimentacao = ndias*((nadultos*10)+(ncriancas*5));
            } else {
              $scope.totalAlimentacao = ndias*((nadultos*40)+(ncriancas*40));
            }
           //HOSPEDAGEM 
        if (thospedagem === 'Chalés' && ndias===10) {
            $scope.totalHospedagem = ndias*((nadultos*20)+(ncriancas*20));
          }
          else if (thospedagem==='Chalés' && ndias===5) {
             $scope.totalHospedagem = ndias*((nadultos*30)+(ncriancas*30)); 
          }
          else {
            $scope.totalHospedagem = 0;
          }
          // ESTACIONAMENTO
        $scope.totalEstacionamento = 5*(ndias*ncarros);
    

        //                PAGSEGURO
        
        $scope.carrinho = [];
        $scope.itens = [
          {
            "id":"001",
            "description": "Participação para adulto em 10 dias de evento",
            "amount": "200.00",
            "quantity":nadultos
          },{
            "id":"002",
            "description": "Participação para crianças em 10 dias de evento",
            "amount": "100.00",
            "quantity":ncriancas
        }, {
            "id":"003",
            "description": "Participação para adulto em 5 dias de evento",
            "amount": "125.00",
            "quantity":nadultos
        }, {
            "id":"004",
            "description": "Participação para criança abaixo de 12 anos em 5 dias de evento",
            "amount": "62.50",
            "quantity":ncriancas
        }, {
            "id":"005",
            "description": "Hospedagem em chalé coletivo para 10 dias de festival",
            "amount": "200.00",
            "quantity":ncriancas+nadultos
        }, {
            "id":"006",
            "description": "Hospedagem em chalé coletivo para 5 dias de festival",
            "amount": "150.00",
            "quantity":ncriancas+nadultos
        }, {
            "id":"007",
            "description": "Contribuição adulto de "+ndias+" dias para cozinha comunitária",
            "amount": (10*ndias)+'.00',
            "quantity":nadultos
        }, {
            "id":"008",
            "description": "Contribuição criança de "+ndias+" dias para cozinha comunitária",
            "amount": (5*ndias)+'.00',
            "quantity":ncriancas
        }, {
            "id":"009",
            "description": "Alimentação individual para "+ndias+" dias de festival",
            "amount": (ndias*40)+'.00',
            "quantity":ncriancas+nadultos
        }, {
            "id":"010",
            "description": "Estacionamento para "+ndias+" dias de festival",
            "amount": (ndias*5)+'.00',
            "quantity":ncarros
        }
      ]
        //Colaboração Festival Inteira Adultos
        if (nadultos > 0 && ndias === 10) {$scope.carrinho.push($scope.itens[0]);}
        //Colaboração Festival Inteira Crianças
        if (ncriancas > 0 && ndias === 10) {$scope.carrinho.push($scope.itens[1]);}
        //Colaboração Festival Meia Adultos
        if (nadultos > 0 && ndias === 5) {$scope.carrinho.push($scope.itens[2]);}
        //Colaboração Festival Meia Criancas 
        if (ncriancas > 0 && ndias === 5) {$scope.carrinho.push($scope.itens[3]);}
        //Hospedagem Festival Inteiro 
        if (thospedagem === 'Chalés' && ndias === 10) {$scope.carrinho.push($scope.itens[4]);}
        //Hospedagem Festival Meio 
        if (thospedagem === 'Chalés' && ndias === 5) {$scope.carrinho.push($scope.itens[5]);}
        //Alimentacao Coletiva Adulto
        if (talimentacao === 'Coletiva' && pagalimentacao === 'Dinheiro') {$scope.carrinho.push($scope.itens[6]);}
         //Alimentacao Coletiva Crianca 
        if (talimentacao === 'Coletiva' && pagalimentacao === 'Dinheiro' && ncriancas > 0) {$scope.carrinho.push($scope.itens[7]);}
        //Alimentacao Individual 
        if (talimentacao === 'Individual') {$scope.carrinho.push($scope.itens[8]);}
        //Estacionamento
        if (ncarros > 0) {$scope.carrinho.push($scope.itens[9]);}
    };
    $scope.PagSubmit = function () {
      var modalInstance = $modal.open({

      templateUrl: 'pagamento/Pagseguro.html',
      controller: 'PagController',
       resolve: {
        carrinho: function () {
          return $scope.carrinho;
        }
      } })
    };
  // function to submit the form after all validation has occurred      
  $scope.submitForm = function(isValid) {
    // check to make sure the form is completely valid
    if (isValid) { 
    }
  };

}]);

validationApp.controller('PagController', ['$scope','$modalInstance', 'carrinho', function ($scope, $modalInstance, carrinho){
    $scope.carrinho = carrinho;
    $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss();
  };
}]);

//Post to Google Drive
function doGet(e){
  var vals=[];
  vals.push(new Date());
  for(var i in e.parameter){
    vals.push(e.parameter[i]);
  }
  SpreadsheetApp.openById("1Noz7hYinSb0QeVraWLUTPRb_g_TSXpEaXTwEZWkvKfk").appendRow(vals);
  return ContentService.createTextOutput("ENVIADO COM SUCESSO");
}
validationApp.$inject = ['$scope'];

/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 0.10.0 - 2014-01-14
 * License: MIT
 */
angular.module("ui.bootstrap", ["ui.bootstrap.tpls", "ui.bootstrap.transition","ui.bootstrap.modal"]);
angular.module("ui.bootstrap.tpls", ["template/modal/backdrop.html","template/modal/window.html"]);
angular.module('ui.bootstrap.transition', [])

/**
 * $transition service provides a consistent interface to trigger CSS 3 transitions and to be informed when they complete.
 * @param  {DOMElement} element  The DOMElement that will be animated.
 * @param  {string|object|function} trigger  The thing that will cause the transition to start:
 *   - As a string, it represents the css class to be added to the element.
 *   - As an object, it represents a hash of style attributes to be applied to the element.
 *   - As a function, it represents a function to be called that will cause the transition to occur.
 * @return {Promise}  A promise that is resolved when the transition finishes.
 */
.factory('$transition', ['$q', '$timeout', '$rootScope', function($q, $timeout, $rootScope) {

  var $transition = function(element, trigger, options) {
    options = options || {};
    var deferred = $q.defer();
    var endEventName = $transition[options.animation ? "animationEndEventName" : "transitionEndEventName"];

    var transitionEndHandler = function(event) {
      $rootScope.$apply(function() {
        element.unbind(endEventName, transitionEndHandler);
        deferred.resolve(element);
      });
    };

    if (endEventName) {
      element.bind(endEventName, transitionEndHandler);
    }

    // Wrap in a timeout to allow the browser time to update the DOM before the transition is to occur
    $timeout(function() {
      if ( angular.isString(trigger) ) {
        element.addClass(trigger);
      } else if ( angular.isFunction(trigger) ) {
        trigger(element);
      } else if ( angular.isObject(trigger) ) {
        element.css(trigger);
      }
      //If browser does not support transitions, instantly resolve
      if ( !endEventName ) {
        deferred.resolve(element);
      }
    });

    // Add our custom cancel function to the promise that is returned
    // We can call this if we are about to run a new transition, which we know will prevent this transition from ending,
    // i.e. it will therefore never raise a transitionEnd event for that transition
    deferred.promise.cancel = function() {
      if ( endEventName ) {
        element.unbind(endEventName, transitionEndHandler);
      }
      deferred.reject('Transition cancelled');
    };

    return deferred.promise;
  };

  // Work out the name of the transitionEnd event
  var transElement = document.createElement('trans');
  var transitionEndEventNames = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'transition': 'transitionend'
  };
  var animationEndEventNames = {
    'WebkitTransition': 'webkitAnimationEnd',
    'MozTransition': 'animationend',
    'OTransition': 'oAnimationEnd',
    'transition': 'animationend'
  };
  function findEndEventName(endEventNames) {
    for (var name in endEventNames){
      if (transElement.style[name] !== undefined) {
        return endEventNames[name];
      }
    }
  }
  $transition.transitionEndEventName = findEndEventName(transitionEndEventNames);
  $transition.animationEndEventName = findEndEventName(animationEndEventNames);
  return $transition;
}]);

angular.module('ui.bootstrap.modal', ['ui.bootstrap.transition'])

/**
 * A helper, internal data structure that acts as a map but also allows getting / removing
 * elements in the LIFO order
 */
  .factory('$$stackedMap', function () {
    return {
      createNew: function () {
        var stack = [];

        return {
          add: function (key, value) {
            stack.push({
              key: key,
              value: value
            });
          },
          get: function (key) {
            for (var i = 0; i < stack.length; i++) {
              if (key == stack[i].key) {
                return stack[i];
              }
            }
          },
          keys: function() {
            var keys = [];
            for (var i = 0; i < stack.length; i++) {
              keys.push(stack[i].key);
            }
            return keys;
          },
          top: function () {
            return stack[stack.length - 1];
          },
          remove: function (key) {
            var idx = -1;
            for (var i = 0; i < stack.length; i++) {
              if (key == stack[i].key) {
                idx = i;
                break;
              }
            }
            return stack.splice(idx, 1)[0];
          },
          removeTop: function () {
            return stack.splice(stack.length - 1, 1)[0];
          },
          length: function () {
            return stack.length;
          }
        };
      }
    };
  })

/**
 * A helper directive for the $modal service. It creates a backdrop element.
 */
  .directive('modalBackdrop', ['$timeout', function ($timeout) {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'template/modal/backdrop.html',
      link: function (scope) {

        scope.animate = false;

        //trigger CSS transitions
        $timeout(function () {
          scope.animate = true;
        });
      }
    };
  }])

  .directive('modalWindow', ['$modalStack', '$timeout', function ($modalStack, $timeout) {
    return {
      restrict: 'EA',
      scope: {
        index: '@',
        animate: '='
      },
      replace: true,
      transclude: true,
      templateUrl: 'template/modal/window.html',
      link: function (scope, element, attrs) {
        scope.windowClass = attrs.windowClass || '';

        $timeout(function () {
          // trigger CSS transitions
          scope.animate = true;
          // focus a freshly-opened modal
          element[0].focus();
        });

        scope.close = function (evt) {
          var modal = $modalStack.getTop();
          if (modal && modal.value.backdrop && modal.value.backdrop != 'static' && (evt.target === evt.currentTarget)) {
            evt.preventDefault();
            evt.stopPropagation();
            $modalStack.dismiss(modal.key, 'backdrop click');
          }
        };
      }
    };
  }])

  .factory('$modalStack', ['$transition', '$timeout', '$document', '$compile', '$rootScope', '$$stackedMap',
    function ($transition, $timeout, $document, $compile, $rootScope, $$stackedMap) {

      var OPENED_MODAL_CLASS = 'modal-open';

      var backdropDomEl, backdropScope;
      var openedWindows = $$stackedMap.createNew();
      var $modalStack = {};

      function backdropIndex() {
        var topBackdropIndex = -1;
        var opened = openedWindows.keys();
        for (var i = 0; i < opened.length; i++) {
          if (openedWindows.get(opened[i]).value.backdrop) {
            topBackdropIndex = i;
          }
        }
        return topBackdropIndex;
      }

      $rootScope.$watch(backdropIndex, function(newBackdropIndex){
        if (backdropScope) {
          backdropScope.index = newBackdropIndex;
        }
      });

      function removeModalWindow(modalInstance) {

        var body = $document.find('body').eq(0);
        var modalWindow = openedWindows.get(modalInstance).value;

        //clean up the stack
        openedWindows.remove(modalInstance);

        //remove window DOM element
        removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, 300, checkRemoveBackdrop);
        body.toggleClass(OPENED_MODAL_CLASS, openedWindows.length() > 0);
      }

      function checkRemoveBackdrop() {
          //remove backdrop if no longer needed
          if (backdropDomEl && backdropIndex() == -1) {
            var backdropScopeRef = backdropScope;
            removeAfterAnimate(backdropDomEl, backdropScope, 150, function () {
              backdropScopeRef.$destroy();
              backdropScopeRef = null;
            });
            backdropDomEl = undefined;
            backdropScope = undefined;
          }
      }

      function removeAfterAnimate(domEl, scope, emulateTime, done) {
        // Closing animation
        scope.animate = false;

        var transitionEndEventName = $transition.transitionEndEventName;
        if (transitionEndEventName) {
          // transition out
          var timeout = $timeout(afterAnimating, emulateTime);

          domEl.bind(transitionEndEventName, function () {
            $timeout.cancel(timeout);
            afterAnimating();
            scope.$apply();
          });
        } else {
          // Ensure this call is async
          $timeout(afterAnimating, 0);
        }

        function afterAnimating() {
          if (afterAnimating.done) {
            return;
          }
          afterAnimating.done = true;

          domEl.remove();
          if (done) {
            done();
          }
        }
      }

      $document.bind('keydown', function (evt) {
        var modal;

        if (evt.which === 27) {
          modal = openedWindows.top();
          if (modal && modal.value.keyboard) {
            $rootScope.$apply(function () {
              $modalStack.dismiss(modal.key);
            });
          }
        }
      });

      $modalStack.open = function (modalInstance, modal) {

        openedWindows.add(modalInstance, {
          deferred: modal.deferred,
          modalScope: modal.scope,
          backdrop: modal.backdrop,
          keyboard: modal.keyboard
        });

        var body = $document.find('body').eq(0),
            currBackdropIndex = backdropIndex();

        if (currBackdropIndex >= 0 && !backdropDomEl) {
          backdropScope = $rootScope.$new(true);
          backdropScope.index = currBackdropIndex;
          backdropDomEl = $compile('<div modal-backdrop></div>')(backdropScope);
          body.append(backdropDomEl);
        }
          
        var angularDomEl = angular.element('<div modal-window></div>');
        angularDomEl.attr('window-class', modal.windowClass);
        angularDomEl.attr('index', openedWindows.length() - 1);
        angularDomEl.attr('animate', 'animate');
        angularDomEl.html(modal.content);

        var modalDomEl = $compile(angularDomEl)(modal.scope);
        openedWindows.top().value.modalDomEl = modalDomEl;
        body.append(modalDomEl);
        body.addClass(OPENED_MODAL_CLASS);
      };

      $modalStack.close = function (modalInstance, result) {
        var modalWindow = openedWindows.get(modalInstance).value;
        if (modalWindow) {
          modalWindow.deferred.resolve(result);
          removeModalWindow(modalInstance);
        }
      };

      $modalStack.dismiss = function (modalInstance, reason) {
        var modalWindow = openedWindows.get(modalInstance).value;
        if (modalWindow) {
          modalWindow.deferred.reject(reason);
          removeModalWindow(modalInstance);
        }
      };

      $modalStack.dismissAll = function (reason) {
        var topModal = this.getTop();
        while (topModal) {
          this.dismiss(topModal.key, reason);
          topModal = this.getTop();
        }
      };

      $modalStack.getTop = function () {
        return openedWindows.top();
      };

      return $modalStack;
    }])

  .provider('$modal', function () {

    var $modalProvider = {
      options: {
        backdrop: true, //can be also false or 'static'
        keyboard: true
      },
      $get: ['$injector', '$rootScope', '$q', '$http', '$templateCache', '$controller', '$modalStack',
        function ($injector, $rootScope, $q, $http, $templateCache, $controller, $modalStack) {

          var $modal = {};

          function getTemplatePromise(options) {
            return options.template ? $q.when(options.template) :
              $http.get(options.templateUrl, {cache: $templateCache}).then(function (result) {
                return result.data;
              });
          }

          function getResolvePromises(resolves) {
            var promisesArr = [];
            angular.forEach(resolves, function (value, key) {
              if (angular.isFunction(value) || angular.isArray(value)) {
                promisesArr.push($q.when($injector.invoke(value)));
              }
            });
            return promisesArr;
          }

          $modal.open = function (modalOptions) {

            var modalResultDeferred = $q.defer();
            var modalOpenedDeferred = $q.defer();

            //prepare an instance of a modal to be injected into controllers and returned to a caller
            var modalInstance = {
              result: modalResultDeferred.promise,
              opened: modalOpenedDeferred.promise,
              close: function (result) {
                $modalStack.close(modalInstance, result);
              },
              dismiss: function (reason) {
                $modalStack.dismiss(modalInstance, reason);
              }
            };

            //merge and clean up options
            modalOptions = angular.extend({}, $modalProvider.options, modalOptions);
            modalOptions.resolve = modalOptions.resolve || {};

            //verify options
            if (!modalOptions.template && !modalOptions.templateUrl) {
              throw new Error('One of template or templateUrl options is required.');
            }

            var templateAndResolvePromise =
              $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions.resolve)));


            templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {

              var modalScope = (modalOptions.scope || $rootScope).$new();
              modalScope.$close = modalInstance.close;
              modalScope.$dismiss = modalInstance.dismiss;

              var ctrlInstance, ctrlLocals = {};
              var resolveIter = 1;

              //controllers
              if (modalOptions.controller) {
                ctrlLocals.$scope = modalScope;
                ctrlLocals.$modalInstance = modalInstance;
                angular.forEach(modalOptions.resolve, function (value, key) {
                  ctrlLocals[key] = tplAndVars[resolveIter++];
                });

                ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
              }

              $modalStack.open(modalInstance, {
                scope: modalScope,
                deferred: modalResultDeferred,
                content: tplAndVars[0],
                backdrop: modalOptions.backdrop,
                keyboard: modalOptions.keyboard,
                windowClass: modalOptions.windowClass
              });

            }, function resolveError(reason) {
              modalResultDeferred.reject(reason);
            });

            templateAndResolvePromise.then(function () {
              modalOpenedDeferred.resolve(true);
            }, function () {
              modalOpenedDeferred.reject(false);
            });

            return modalInstance;
          };

          return $modal;
        }]
    };

    return $modalProvider;
  });

angular.module("template/modal/backdrop.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/modal/backdrop.html",
    "<div class=\"modal-backdrop fade\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1040 + index*10}\"></div>");
}]);

angular.module("template/modal/window.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/modal/window.html",
    "<div tabindex=\"-1\" class=\"modal fade {{ windowClass }}\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\" ng-click=\"close($event)\">\n" +
    "    <div class=\"modal-dialog\"><div class=\"modal-content\" ng-transclude style=\"display:block\"></div></div>\n" +
    "</div>");
}]);
