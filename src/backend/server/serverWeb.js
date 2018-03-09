import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyparser from 'body-parser';
import cors from 'cors';
import * as _api from '../api/cdp';

const start = (options, logger) => {
  return new Promise((resolve, reject) => {
    
    if (!options) { 
      reject(new Error('The server must have a connected repository'));
    }

    const app = express();
    app.use(morgan('dev'));
    app.use(bodyparser.json());
    app.use(cors());
    app.use(helmet());
    app.use((err, req, res, next) => {
        reject(new Error('Something went wrong!, error: ' + err));
        res.status(500).send('Something went uh-oh');
        next();
    });

    //const api = _api.bind(null, {options});
    const api = _api.v1Api({options}, app);

    const server = app.listen(3000, () => resolve(server));
    
  });
};

export {start};