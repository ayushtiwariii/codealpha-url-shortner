const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3000;

// MongoDB Connection URI
const mongoURI ='mongodb+srv://Ayush:6k3DxtnjaCUB0YYo@cluster0.shokl92.mongodb.net/urlShortener?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB: ', err);
  });

const db = mongoose.connection;

db.on('error', () => {
  console.log('Error');
});

db.once('open', () => {
  console.log('Connected');
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Link Router
const urlRouter = require('./routes/urlRout');
app.use('/', urlRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
