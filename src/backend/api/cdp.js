'use strict';
import status from 'http-status';
import fs from 'fs';
import path from 'path';

const v1Api = ({options}, app) => {
    app.get('/getCdpMap', (req, res, next) => {
        try {
            fs.readFile(path.join( __dirname, '../cdpNeighbors.json'), function (err, data) {
                if (err) {
                    res.status(status.OK).json({status: 'missing-file', message: 'Could not locate CDP file. File missing or CDP file is initalizing still...'});
                } else {
                    data = JSON.parse(data);
                    //create nodes
                    let nodes = [];
                    let edges = [];

                    for(let node in data) {
                        nodes.push({
                            id: node, 
                            label: data[node].hostName + '\r' + data[node].ipAddr,
                            shape: 'box'
                        });

                        if(data[node].neighbors !== undefined) {
                            for(let i=0; i<data[node].neighbors.length; i++) {
                                let tempObj = {
                                    title: data[node].hostName + ':' + findInterface(data[data[node].neighbors[i].cdpDeviceId], data[node].hostName ) + ' to ' + data[node].neighbors[i].cdpDeviceId+':'+data[node].neighbors[i].cdpMgmtAddr,
                                    from: node, 
                                    to: data[node].neighbors[i].cdpDeviceId,
                                };
                                
                                if(edges.length === 0) {
                                    edges.push(tempObj);
                                }

                                let tempCount = 0;
                                for(let j=0; j<edges.length; j++) {
                                    if(
                                        (edges[j].to === tempObj.from && edges[j].from === tempObj.to) ||
                                        (edges[j].to === tempObj.to && edges[j].from === tempObj.from)
                                    ){
                                        tempCount++;
                                        break;
                                    }
                                }
                                if(tempCount === 0){
                                    edges.push(tempObj);
                                }
                                
                            }
                        }
                    }


                    res.status(status.OK).json({status: 'success', data: {nodes: nodes, edges: edges}});
                }
            });
        } catch (e) {
            res.status(status.OK).json({status: 'error', message: 'Could not attempt to find file'});
        }
    });
};

const findInterface = (obj2search, hostname) => {
    for(let neighbor in obj2search.neighbors) {
        if(obj2search.neighbors[neighbor].cdpDeviceId === hostname){
            return obj2search.neighbors[neighbor].cdpMgmtAddr;
        }
    }
    return "Unknown";
    
}


export {v1Api};