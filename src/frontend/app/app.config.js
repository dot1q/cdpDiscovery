export default function appConfig (
  $compileProvider,
  $locationProvider,
  $logProvider,
  $stateProvider,
  $urlRouterProvider,
  $qProvider
) {
  'ngInject';

  $stateProvider.state('base', {
    abstract: true,
    template: '<ui-view></ui-view>'
  });

  $urlRouterProvider.otherwise('/');

  $locationProvider.hashPrefix('');
}