const express = require('express')

const bodyParser = require('body-parser');
const cors = require('cors');


const port = 3001

const app = express()

app.use(cors());
app.use(bodyParser.json());


const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://mdsymoon:symoon82522@cluster0.o8cqw.mongodb.net/flyWheel?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const destination = client.db("flyWheel").collection("destination");

  app.post('/rider',(req, res) => {
      const customer = req.body;
      destination.insertOne(customer)
      .then(result => {
          res.send(result);
      })
      console.log(customer);
  })
  
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})