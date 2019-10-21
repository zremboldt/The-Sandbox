const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');

// We'll create our routes here ↓

// Getting all
router.get('/', async (req, res) => {
  // res.send('Hello, world!');
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Getting one
router.get('/:id', getSubscriber, (req, res) => {
  res.send(res.subscriber.name);
});
// Creating one
router.post('/', async (req, res) => {
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
// Updating one
router.patch('/:id', (req, res) => {});
// Deleting one
router.delete('/:id', (req, res) => {});

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

module.exports = router;
