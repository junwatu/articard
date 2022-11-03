import { MongoClient } from 'mongodb';
import { artObject } from '../unit.js';

describe('MongoDB', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db('telp');
    });

    afterAll(async () => {
        await connection.close();
    });

    test('Insert & Read Data', async () => {
        const artObjectsColl = db.collection('artobjects');
        await artObjectsColl.insertOne(artObject);

        const data = await artObjectsColl.findOne({ id: artObject.id });
        expect(data.links.artobject).toEqual(artObject.links.artobject);
    });
});
5;
