const express = require('express');
const { Pool } = require('pg');

const client = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
});

const app = express();
app.use(express.json());

app.post('/leaderboard', (req, res) => {
  client.query('INSERT INTO leaderboard (user, score) VALUES ($1, $2)', [req.body.name, req.body.score])
  .then(() => res.sendStatus(201))
  .catch(() => res.sendStatus(500));
});

app.get('/leaderboard', (req, res) => {
  console.log('request received!')
  client.query('SELECT name, score FROM leaderboard ORDER BY score DESC LIMIT 50')
  .then(data => {
    console.log(data);
    res.send(data)
  })
  .catch(err => {
    console.log(err)
    res.sendStatus(500)
  });
});

app.listen(process.env.PORT, console.log(`Listening on ${process.env.PORT}...`));
