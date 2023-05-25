const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Service 2 - Root Endpoint');
});

app.get('/hello2', (req, res) => {
  res.send('Service 2 - Hello 2 Endpoint');
});

app.listen(3002, () => {
  console.log('Service 2 is running on port 3002');
});
