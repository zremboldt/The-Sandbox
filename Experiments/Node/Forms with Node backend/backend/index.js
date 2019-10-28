// https://youtu.be/fgTGADljAeg?list=WL

// require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
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
// const usersRouter = require('./routes/users');
// app.use('/users', usersRouter);

app.listen(5000, () => console.log('Server started'));

////////////////
// Routes
////////////////

app.get('/', async (req, res) => {
  try {
    // res.send('Hello, world!');
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//

app.get('/users', (req, res) => {
  res.json([{ name: 'William', location: 'Abu Dhabi' }, { name: 'Chris', location: 'Vegas' }]);
});

//

// Creating one
app.post('/', async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//

// Middleware we'll use in a few of the fns above. (fns that use :id)
// https://youtu.be/fgTGADljAeg?list=WL&t=1221
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}
