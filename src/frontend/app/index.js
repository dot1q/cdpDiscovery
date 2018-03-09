import * as angular from 'angular';
import angularUi from 'angular-ui-bootstrap';
import uiRouter from '@uirouter/angularjs';
import appConfig from './app.config';
import AppComponent from './app.component';
import CommonServices from './app.services';

//appConfig.$inject = [  '$compileProvider', '$locationProvider', '$logProvider', '$stateProvider', '$urlRouterProvider', '$qProvider']; -> this line is not needed when strict dependency injection is off, strictDi
CommonServices.$inject = ['$http'];

export default angular
  .module('base.app', [uiRouter, angularUi])
  .config(appConfig)
  .component('app', AppComponent)
  .service('commonServices', CommonServices).name;