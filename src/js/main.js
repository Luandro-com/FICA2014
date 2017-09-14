var FicaApp = angular.module('FicaApp',['angular-flip', 'ngAnimate', 'duScroll']);

FicaApp.controller('homeController', ['$scope', 'timer','$http', function ($scope, timer, $http){
    //Timer
    var Today   = new Date();
    var restante = timer.DayDiff(Today);
    $scope.restam = restante;
    //Get window width and adapt to mobile
   
     //Scroll
    //Filter
    $scope.filters = {};
    $http({method: 'GET', url: 'js/programacao.json'})
        .success(function (data, status) {
            $scope.programacoes = data;
                })
        .error(function() {
            console.log('error');
            });
    // var ficaData = $resource('/programacao.json',
    // { callback: "JSON_CALLBACK" },
    // { get: { method: "JSON" }});
    // $scope.programacoes = ficaData.get();


}]);

FicaApp.factory('timer', function () {
    return {
        DayDiff: function(CurrentDate) {
            var TYear=CurrentDate.getFullYear();
            var TDay=new Date("July, 25, 2014");
            TDay.getFullYear(TYear);
            var DayCount=(TDay-CurrentDate)/(1000*60*60*24);
            DayCount=Math.round(DayCount); 
            return(DayCount);
        }
    };  
});


var winWidth = $(document).width();
if (winWidth > 767) {
    $('.world-container').append( '<video poster="img/poster.jpg" id="bgvideo" autoplay muted loop>
                    <source id=mp4_source src="video/bgvideo2.mp4" type=video/mp4>
                    <source id=webm_source src="video/bgvideo2.webm" type=video/webm>
                    <source id=ogg_source src="video/bgvideo2.ogv" type=video/ogv>
                    Seu navegador não suporta video =(</video>'
        );
};
// FicaApp.directive('scroll', function ($window) {
//     return function(scope, element, attrs) {

//     }
// });
//NAV CONTROLLER
$(window).scroll(function(e) {
    // Get the position of the location where the scroller starts.
    var scroller_anchor = $("#poster").offset().top;
    if ($(this).scrollTop() >= scroller_anchor) {
        $('.divider').css('opacity', 1).addClass("slideInLeft");
        $('nav a').addClass( "small-nav-a" );
        $('nav').addClass( "small-nav" );
        $('.nav-inscreva').addClass( "small-inscreva" );
        $('.hide').hide('fast');
        $('.show').show('slow');
    }
    else if ($(this).scrollTop() < scroller_anchor) {
        $('.divider').css('opacity', 0).removeClass("slideInLeft");
        $('nav a').removeClass( "small-nav-a" );
        $('nav').removeClass( "small-nav" );
        $('.nav-inscreva').removeClass( "small-inscreva" );
        $('.hide').show('fast');
        $('.show').hide('slow');
    }
});
$(window).scroll(function(e) {
    var participe_anchor = $("#participe").offset().top;
    if ($(this).scrollTop() >= participe_anchor-300) {
        $('.divider-p').css('opacity', 1).addClass("slideInLeft");
    }
    else if ($(this).scrollTop() < participe_anchor-300) {
        $('.divider-p').removeClass("slideInLeft");
    }
});
//GMAPS
var map;
    $(document).ready(function(){
      map = new GMaps({
        el: '#map',
        lat: -14.065341,
        lng: -47.470197,
        zoom: 12,
        zoomControl : true,
        zoomControlOpt: {
            style : 'BIG',
            position: 'TOP_LEFT'
        },
        panControl : false,
        streetViewControl : false,
        mapTypeControl: true,
        overviewMapControl: false,
        scrollwheel: false,
        navigationControl: false,
        scaleControl: false,
        draggable: true,
        styles: [{"featureType":"landscape","stylers":[{"hue":"#FFA800"},{"saturation":0},{"lightness":0},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#53FF00"},{"saturation":-73},{"lightness":40},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FBFF00"},{"saturation":0},{"lightness":0},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#00FFFD"},{"saturation":0},{"lightness":30},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#00BFFF"},{"saturation":6},{"lightness":8},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#679714"},{"saturation":33.4},{"lightness":-25.4},{"gamma":1}]}]

      });
      map.drawOverlay({
        lat: map.getCenter().lat(),
        lng: map.getCenter().lng(),
        layer: 'overlayLayer',
        content: '<div class="map-overlay">
                    <div class="cont">
                        <h1>Flor de Ouro</h1>
                        <hr/>
                        <div>Moinho, Alto Paraíso de Goiás</div>
                        <div>sitioflordeouro@gmail.com</div>
                        <div>(62) 9601 2056</div>
                        <div>(62) 9986 6617</div>
                    </div>
                    <div class="overlay-arrow"></div>
                  </div>',
        verticalAlign: 'top',
        horizontalAlign: 'center'
      });
    });
    google.maps.event.addDomListener(window, "resize", function() {
       var center = map.getCenter();
       google.maps.event.trigger(map, "resize");
       map.setCenter(center); 
});
//INSTAGRAM
     var feed = new Instafeed({
        get: 'user',
        userId: 1330512204,
        accessToken: '1330512204.467ede5.17371c95c49244d2bb7d9bf9d22a8821',
        sortBy: 'most-liked',
        limit:3,
        resolution: 'standard_resolution'
    });
    feed.run();