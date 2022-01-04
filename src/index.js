//const { v4: uuidv4 } = require('uuid')
require('dotenv').config()
const cors = require('cors');
const express = require('express');
const models = require('./models/index');
const routes = require('./routes');

const app = express();

app.use(cors());

// extracts the body of the incoming request and makes it accessible on req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
