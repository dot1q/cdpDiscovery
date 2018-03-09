'use strict';

const {EventEmitter} = require('events');
import * as di from './config';
import { asValue } from 'awilix';
import * as server from './server/server';
import * as webServer from './server/serverWeb';

import logging from './logger/logging.module';


/* other stuff here */
const mediator = new EventEmitter();
var logger = logging('cdp-service', di.logSettings);


logger.info('--- CDP Neighbor Scanning ---');
logger.info('Loading configuration...');


process.on('uncaughtException', (err) => {
  logger.error('Unhandled Exception', err);
});

process.on('uncaughtRejection', (err, promise) => {
  logger.error('Unhandled Rejection', err);
});

process.on('unhandledRejection', (err, promise) => {
  logger.error('Unhandled Rejection', err);
});

mediator.on('boot.ready', (container, imap, db) => {
  
    let config = container.cradle;
    webServer.start({
      container, logger
    });
    
    server.start(container, logger);
  
});

mediator.on('generic.log', (msg, level = 'info') => {
  if(logger.levels[level]){
    logger[level](msg);
  } else {
    logger.info(msg);
  }
});

// emit that the service stript has finished
di.init(mediator);
mediator.emit('init');
