import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import data from './data.js';
import Videos from './dbModel.js';

//app config
const app = express();
const port = process.env.PORT || 9000;


//middlewares
app.use(express.json());

app.use(cors());

// deprecated, just example, should be a environment variable
//db config
const connection_url = 'mongodb+srv://admin:tbO4ypqUyGMXzm9E@cluster0.h4wsz.mongodb.net/tiktok?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});


//api endpoints
app.get('/', (req, res) => res.status(200).send("hello world"));

app.get('/dataposts', (req, res) => res.status(200).send(data));

//get all dbposts
app.get('/posts', (req, res) => {
  // Videos.find({}, ) {o que queremos} = filter
  Videos.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})

//make db entry
app.post('/posts', (req, res) => {
  const dbVideos = req.body
  Videos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  })
});

//update likes
app.put(`/update/:id/:likes`, (req, res) => {
  const conditions = { _id: req.params.id };
  Videos.update({ _id: req.params.id }, {likes: req.params.likes})
    .then(doc => {
      if(!doc) { return res.status(404).end(); }
      return res.status(200).json(doc);
    })
    .catch(err => next(err))
})


//lister
app.listen(port, () => console.log(`listening on localhost: ${port}`));

