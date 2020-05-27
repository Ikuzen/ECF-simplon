import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as debug from 'debug';

const log = debug('tn:express');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

//Requests
app.get('/', (req, res) => {
    res.send('<h1>Users service</h1>');
});

app.listen(PORT, () => log('Listening on port', PORT));
