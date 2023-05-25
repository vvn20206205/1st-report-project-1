const express = require('express');
const proxy = require('express-http-proxy');
const app = express();
 
app.use('/sv1', proxy('http://localhost:3001'));
app.use('/sv2', proxy('http://localhost:3002'));
app.use('/sv3', proxy('http://localhost:3003'));
app.use('/sv4', proxy('http://localhost:3004'));
app.use('/sv5', proxy('http://localhost:3005'));
app.use('/sv6', proxy('http://localhost:3006'));
app.use('/sv7', proxy('http://localhost:3007'));
app.use('/sv8', proxy('http://localhost:3008'));

app.get('/', (req, res) => {
  return res.status(200).json({
      message: 'Author: Vũ Văn Nghĩa 20206205'
  })
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server run: http://localhost:${port}/`)
});