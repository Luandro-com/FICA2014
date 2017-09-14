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
