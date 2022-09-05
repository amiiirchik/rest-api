// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://Amir:<amirka2004>@cluster0.frlws7x.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   client.close();
// });

const { mongoose, Schema } = require('mongoose')
mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/posts`)

const PostSchema = new Schema(
  {
    title: String,
    description: String
  }
)

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
