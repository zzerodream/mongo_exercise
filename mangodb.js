const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://test_user:test1234@cluster0.7ypufdn.mongodb.net/?retryWrites=true&w=majority";
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    if(err) throw err;

    const collection = client.db("sample_airbnb").collections("listingAndReviews");

    // perform actions on the collection object
    client.close();
});