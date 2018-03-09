import template from './map.html';
import Constants from '../constants';

const mapSymbol = {
    
};

export class MapController {
    constructor(commonServices, VisDataSet, $timeout) {
        'ngInject';
        
        this.alerts = [];
        this.commonServices = commonServices;
        this.visDataSet = VisDataSet;
        this.$timeout = $timeout;

    }

    $onInit() {
        let self = this;

        let nodes = new self.visDataSet();
        let edges = new self.visDataSet();

        self.data = {
            nodes: nodes,
            edges: edges
        };
        self.options = {
            layout: {
                improvedLayout: true
            },
            physics: {
                solver: 'forceAtlas2Based',
                forceAtlas2Based: {
                    centralGravity: 0.005
                },
                stabilization: {
                    enabled: true
                },
                repulsion: {
                    nodeDistance: 200
                }
            },
            height: '500px'
        };
        self.events = {};


        self.pullMap = () => {
            self.loaded = false;
            self.alerts = [];
            self.commonServices.getRequest(Constants.BACKEND_URI + Constants.GET_VIS_JS, (error, resultData) => {
                if(error) {
                    self.alerts.push({type: 'danger', msg: 'Error: ' + resultData});
                } else {
                    if(resultData.status === "success") {
                        self.loaded = true;
                        nodes.add(resultData.data.nodes);
                        edges.add(resultData.data.edges);
                        console.log(self.data);
                        
                    } else if(resultData.status === "missing-file") {
                        self.alerts.push({type: 'warning', msg: resultData.message});
                        self.$timeout(() => {self.pullMap()}, 3000);
                    } else {
                        self.alerts.push({type: 'danger', msg: resultData.message});
                    }
                }
            });
        }
        self.pullMap();

    }
};

const MapComponent = {
    bindings: {
    },
    controller: ['commonServices', 'VisDataSet', '$timeout', MapController],
    controllerAs: 'ctrl',
    template
};
export default MapComponent;