import * as angular from 'angular';
import angularUi from 'angular-ui-bootstrap';
import angularVis from 'angular-visjs';
import uiRouter from '@uirouter/angularjs';
import cdpMainConfig from './cdpMain.config';
import CdpMainPageComponent from './cdpMain-page.component';
import map from '../common/cdpMap/';

export default angular
    .module('base.cdpMain', [uiRouter, angularUi, map, 'ngVis'])
    .config(cdpMainConfig)
    .component('cdpMainPage', CdpMainPageComponent).name;