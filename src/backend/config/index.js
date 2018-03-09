
import {snmpSettings, logSettings} from './config';
import {initDi} from './di';

const init = initDi.bind(null, {snmpSettings, logSettings});

export {init, logSettings};