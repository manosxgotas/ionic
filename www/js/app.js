// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('donacion', [
  'ionic',
  'ngResource',
  'LocalStorageModule',
  'angular-loading-bar',
  'angular-jwt',
  'ngTouch',
  'ngAnimate',
  'ui.bootstrap',
  'file-model',
  'base64',
  'flow'
  ])

  .config(function($stateProvider, $urlRouterProvider, $httpProvider, $resourceProvider, cfpLoadingBarProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    $resourceProvider.defaults.stripTrailingSlashes = false;
    $urlRouterProvider.otherwise("/home");

    cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
    cfpLoadingBarProvider.spinnerTemplate = '<span class="fa fa-lg fa-spinner fa-pulse"></span>';

    $stateProvider

      .state('home', {
        cache: false,
        url: "/",
        abstract: true,
        templateUrl: "templates/home/nav-home.html",
        controller: "NavHomeController"
      })

      .state('home.inicio', {
        cache: false,
        url: "home",
        views: {
          "homeContent": {
            templateUrl: "templates/home/inicio.html",
            controller: "InicioController"
          }
        }
      })

      .state('home.registro', {
        cache: false,
        url: "/registro",
        views: {
          "homeContent": {
            templateUrl: "templates/cuentas/registro.html",
            controller: "RegistroController"
          }
        }
      })

      .state('home.registro-exito', {
        cache: false,
        url: "/registro-exito",
        "homeContent": {
          templateUrl: "templates/cuentas/registro-exito.html",
        }
      })

      .state('dashboard', {
        cache: false,
        url: "/dashboard",
        templateUrl: "templates/nav-dashboard.html",
        controller: "NavDashboardController"
      })

      .state('dashboard.perfil', {
        cache: false,
        url: "/perfil",
        views: {
          "dashboardContent": {
            templateUrl: "templates/donantes/perfil.html",
            controller: "ProfileController"
          }
        }
      })

      .state('dashboard.perfil-edit', {
        cache: false,
        url: "/perfil/edit",
        views: {
          "dashboardContent": {
            templateUrl: "templates/donantes/perfil-edit.html",
            controller: "ProfileEditController",
          }
        }
      })

      .state('dashboard.libreta', {
        cache: false,
        url: "/libreta",
        views: {
          "dashboardContent": {
            templateUrl: "templates/donaciones/libreta-donacion.html",
            controller: "LibretaController",
          }
        }
      })

      .state('dashboard.registrar-donacion', {
        cache: false,
        url: "/donacion/registro",
        views: {
          "dashboardContent": {
            templateUrl: "templates/donaciones/registrar-donacion.html",
            controller: "RegistrarDonacionController",
          }
        }
      })

      .state('dashboard.editar-donacion', {
        cache: false,
        url: "/donacion/editar/:donacionID",
        views: {
          "dashboardContent": {
            templateUrl: "templates/donaciones/editar-donacion.html",
            controller: "EditarDonacionController",
          }
        }
      })
  });
