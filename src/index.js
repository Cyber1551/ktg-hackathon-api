const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {getAllRoutes, createRoute, deleteRoute, updateRoute} = require("./database");

const app = express();


// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());


app.get('/routes', async (req, res) => {
    const test = await getAllRoutes();
    res.send(test);
});

app.post('/createRoute', async (req, res) => {
    const test = await createRoute(req.body);
    res.send(true);
});

app.put('/updateRoute', async (req, res) => {
    const test = await updateRoute(req.body);
    console.log(test)
    res.send(true);
});

app.delete('/deleteRoute', async (req, res) => {
    const test = await deleteRoute(req.body);
    res.send(true);
});
// starting the server
app.listen(3001, () => {
    console.log('listening on port 3001');
});