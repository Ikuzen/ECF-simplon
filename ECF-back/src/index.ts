import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as debug from 'debug';
import * as uuid from 'uuid';
import {User} from './users-service/users-interface';
import {users_schema, schemaVerify} from './users-service/users-schema';
import { dbConfig } from './config';
import { DbManager } from './db-manager';
const log = debug('tn:express');

const app = express();

const PORT = 3000;

const dbManager = new DbManager(dbConfig);

app.use(bodyParser.json());


//Requests
app.get('/', (req, res) => {
    res.send('<h1>Users service</h1>');
});
//POST
app.post('/users', async (req, res) => {
    const schemaVerification = schemaVerify(req.body)
    if (schemaVerification.error) {
        return res.status(400).send(schemaVerification.error);
    }

    const user: User = {
        ...req.body,
        _id: uuid.v4(),
        register_date: new Date(),
    };

    try {
        await dbManager.putDocument(user);
        return res.send(user);
    } catch (e) {
        return res.status(409).send(
            `There already is a user with the username "${user.username}"`
        )
    }
});
//GET BY ID
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    
    const user: User = await dbManager.getDocument(id);

    if (!user) {
        return res.status(404).send(`User ${id} Not Found`);
    }

    return res.send(user);
});
//GET ALL
app.get('/users/', async (req, res) => {
    const users: User[] = await dbManager.listDocuments();
    res.send(users);
});
//DELETE BY ID
app.delete('/users/:id', async(req, res) => {

    const { id } = req.params;
    
    const {deletedCount} = await dbManager.deleteDocument(id);

    if (deletedCount === 0) {
        return res.status(404).send(`Tournament ${id} Not Found`);
    }

    return res.status(204).send();
});
//DELETE ALL
app.delete('/users/', (req, res) => {
    dbManager.deleteAllDocuments();
    return res.status(204).send();
});



//UPDATE BY ID
app.put('/users/:id', async(req, res) => {
    const { id } = req.params;
    let objectToModify = await dbManager.getDocument(id);
    delete objectToModify._id;
    delete objectToModify.createdAt;
    let modifiedObject = Object.assign(objectToModify,req.body);
    const schemaValidation = schemaVerify(modifiedObject)
    
    if(schemaValidation.error){
        return res.status(209).send(`Couldn't update "${req.body.name}`)
    }
    try {
        const update = await dbManager.updateDocument(id, req.body);
        return res.send(update);
        
    } catch (e) {
        return res.status(409).send(
            `Couldn't update "${req.body.name}"`
        )
    }
});


app.listen(PORT, () => log('Listening on port', PORT));
