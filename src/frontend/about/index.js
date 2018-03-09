import * as angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import aboutConfig from './about.config';
import AboutPageComponent from './about-page.component';

export default angular
    .module('base.about', [uiRouter])
    .config(aboutConfig)
    .component('aboutPage', AboutPageComponent).name;