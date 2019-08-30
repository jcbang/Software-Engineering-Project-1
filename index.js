const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://JCBang:G73XgEPumDZEMGJm@ucf-spc-poosw-project1-exub3.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
	const collection = client.db("sample_airbnb").collection("listingsAndReviews");
	// perform actions on the collection object

	collection.findOne({_id: '10009999'}, function(err, result) {
		if (err) throw err;
		console.log("\n\n");
		console.log("JSON of id:" + 10009999);
		console.log("\n\n");
		console.log(result);
	});
	client.close();
});