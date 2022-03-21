const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');


const dbName = "ktg_hackathon"
const mongoUsername = "ktg_user";
const mongoPassword = "ktg_password";

const URI = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.a0thb.mongodb.net/${dbName}?retryWrites=true&w=majority`

const client = new MongoClient(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.connect(err => {
    console.log("Connected to database");
});

const getAllRoutes = async () => {
    const routes = client.db(dbName).collection('routes');
    const result = await routes.find({}).toArray();
    console.log(result);
    return result;
}

const createRoute = async (doc) => {
    const routes = client.db(dbName).collection('routes');
    const result = await routes.insertOne(doc);
    return result.insertedId;
}

const updateRoute = async (doc) => {
    const routes = client.db(dbName).collection('routes');
    if (!doc._id) return;
    const query = {_id: ObjectId(doc._id)};
    console.log(query);
    console.log(doc);
    const changes = {$set: {name: doc.name, points: doc.points, color: doc.color}}
    const result = await routes.updateOne(query, changes);
    return result.modifiedCount;
}

const deleteRoute = async (doc) => {
    const routes = client.db(dbName).collection('routes');
    console.log(doc)
    if (!doc._id) return;
    const query = {_id: ObjectId(doc._id)};
    const result = await routes.deleteOne(query);
    return result.deletedCount;
}
module.exports = {getAllRoutes, createRoute, updateRoute, deleteRoute}
