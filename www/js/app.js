// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('donacion', [
  'ionic',
  'ngResource',
  'LocalStorageModule',
  'angular-jwt',
  'ngTouch',
  'ngAnimate',
  'ui.bootstrap',
  'file-model',
  'base64',
  'flow'
  ])

  .config(function($stateProvider, $urlRouterProvider, $httpProvider, $resourceProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    $resourceProvider.defaults.stripTrailingSlashes = false;
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('login', {
        cache: false,
        url: "/login",
        templateUrl: "templates/cuentas/login.html",
        controller: "LoginController"
      })

      .state('registro', {
        cache: false,
        url: "/registro",
        templateUrl: "templates/cuentas/registro.html",
        controller: "RegistroController"
      })

      .state('perfil', {
        cache: false,
        url: "/perfil",
        templateUrl: "templates/donantes/perfil.html",
        controller: "ProfileController"
      })

      .state('perfil-edit', {
        cache: false,
        url: "/perfil/edit",
        templateUrl: "templates/donantes/perfil-edit.html",
        controller: "ProfileEditController",
      })

      .state('libreta', {
        cache: false,
        url: "/libreta",
        templateUrl: "templates/donaciones/libreta-donacion.html",
        controller: "LibretaController",
      })

      .state('registrar-donacion', {
        cache: false,
        url: "/donacion/registro",
        templateUrl: "templates/donaciones/registrar-donacion.html",
        controller: "RegistrarDonacionController",
      })
  });
