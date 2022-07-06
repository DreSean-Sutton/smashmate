import express from 'express';
const path = require('path');
const app = express();
const port = 3001

app.get('/*', function (req: any, res: any) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log(__dirname);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${port}`);
});
