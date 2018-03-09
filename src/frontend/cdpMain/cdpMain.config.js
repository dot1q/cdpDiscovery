export default function cdpMainConfig($stateProvider) {
    'ngInject';
    $stateProvider.state('base.cdpMain', {
    name: 'cdpMain',
    url: '/',
    component: 'cdpMainPage'
    });
}