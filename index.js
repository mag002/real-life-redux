const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');
const compression = require('compression');

let app = express();
app.use(history());
app.use(compression());
app.use((req, res, next) => {
  res.header('access-control-allow-credentials', true);
  res.header('access-Control-allow-origin', '*');
  res.header('access-Control-allow-headers', '*');
  res.header('access-control-allow-methods', '*');
  next();
});
const staticpath = path.join(__dirname, 'build');
app.use(express.static(staticpath));

let port = process.env.PORT || 4000;

app.get('*', (req, res) => {
  console.log('Run all', req.url);
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(port);
console.log(`Server render client run on ${port}`);
