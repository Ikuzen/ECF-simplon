/* eslint-disable prettier/prettier */
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as debug from 'debug';
import * as uuid from 'uuid';
import { DbManager } from './db-manager';
import { dbConfig } from './config';
import { schemaVerify } from './users-service/users-schema';
import { User } from './users-service/users-interface';

const log = debug('tn:express');

const app = express();
const cors = require('cors');

const PORT = 3000;

const dbManager = new DbManager(dbConfig);

app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}))

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
        console.log(e)
        return res.status(409).send(
            `There already is a user with the username "${user.username}"`
        )
    }
});
//GET BY ID
app.get('/users/:id/', async (req, res) => {
    const { id } = req.params;
    
    const user: User = await dbManager.getDocument(id);

    if (!user) {
        return res.status(404).send(`User ${id} Not Found`);
    }

    return res.send(user);
});
//GET BY USERNAME
app.get('/users/username/:username', async(req,res) =>{
    const { username } = req.params;
    const user: User = await dbManager.getDocumentByName(username);

    if (!user) {
        return res.status(404).send(`User ${username} Not Found`);
    }

    return res.send(user);
})
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
    const objectToModify = await dbManager.getDocument(id);
    delete objectToModify._id;
    delete objectToModify.register_date;
    const modifiedObject = Object.assign(objectToModify,req.body);
    console.log(modifiedObject)
    const schemaValidation = schemaVerify(modifiedObject)
    
    if(schemaValidation.error){
        return res.status(409).send(`Couldn't update "${req.body.username}`)
    }
    try {
        const update = await dbManager.updateDocument(id, req.body);
        return res.send(update);
        
    } catch (e) {
        return res.status(409).send(
            `Couldn't update "${req.body.username}"`
        )
    }
});


app.listen(PORT, () => log('Listening on port', PORT));
