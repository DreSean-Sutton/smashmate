const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.get('/api', (req, res) => {
  res.json({ express: 'It worked!' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
