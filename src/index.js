const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {getAllRoutes, createRoute, deleteRoute, updateRoute} = require("./database");

const app = express();


// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'https://ktg-hackathon-frontend.herokuapp.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.get('/', (req, res) => res.send('Working!!!'));

app.get('/routes', async (req, res) => {
    const test = await getAllRoutes();
    res.send(test);
});

app.post('/createRoute', async (req, res) => {
    const test = await createRoute(req.body);
    res.status(204).end();
});

app.put('/updateRoute', async (req, res) => {
    const test = await updateRoute(req.body);
    res.status(204).end();
});

app.post('/deleteRoute', async (req, res) => {
    const test = await deleteRoute(req.body);
    res.status(204).end();
});
// starting the server
app.listen(process.env.PORT || 3001, () => {
    console.log('listening on port 3001');
});
