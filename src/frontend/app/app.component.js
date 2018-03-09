import template from './app.html';

export class AppController {
  constructor() {
    'ngInject';
  }
  
  $doCheck() {}
  $onChanges(changes) {}
  $onInit() {}
  $postLink() {}
  $onDestroy() {}
};

const AppComponent = {
  bindings: {},
  controller: AppController,
  template
};

export default AppComponent;