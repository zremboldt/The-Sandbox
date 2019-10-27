// https://youtu.be/fgTGADljAeg?list=WL

// require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Subscriber = require('./models/subscriber');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('err', err => console.error(err));
db.once('open', () => console.log('Connected to database'));

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses

// app.use(express.json());
// const subscribersRouter = require('./routes/subscribers');
// app.use('/subscribers', subscribersRouter);

app.listen(5000, () => console.log('Server started'));

////////////////
// Routes
////////////////

app.get('/', async (req, res) => {
  try {
    // res.send('Hello, world!');
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//

app.get('/users', (req, res) => {
  res.json([
    { name: 'William', location: 'Abu Dhabi' },
    { name: 'Chris', location: 'Vegas' }
  ]);
});

//

// Creating one
app.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//

// Middleware we'll use in a few of the fns above. (fns that use :id)
// https://youtu.be/fgTGADljAeg?list=WL&t=1221
async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: 'Cannot find subscriber' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.subscriber = subscriber;
  next();
}
