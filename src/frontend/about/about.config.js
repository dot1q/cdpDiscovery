export default function aboutConfig($stateProvider) {
    'ngInject';
    $stateProvider.state('base.about', {
    url: '/about',
    component: 'aboutPage'
    });
}