const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');

const app = express();
const distDir = path.join(__dirname, '..', 'dist');
const port = 1337;

app.use(history());
app.use(express.static(distDir));

app.get('/', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at "http://localhost:${port}".`);
});
