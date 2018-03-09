import { createContainer, asValue } from 'awilix';

const initDi = ({snmpSettings, logSettings}, mediator) => {
    mediator.once('init', () => {
        const container = createContainer();

        container.register({
            snmpSettings: asValue(snmpSettings),
            logSettings: asValue(logSettings)
        });

        mediator.emit('boot.ready', container);
    });
};

export default initDi;