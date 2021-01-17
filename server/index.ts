import express from 'express';
import path from 'path';
import historyApiFallback from 'connect-history-api-fallback';

const app = express();
const distDir = path.join(__dirname, '..', 'dist');
const port = 1337;

app.use(historyApiFallback());
app.use(express.static(distDir));

app.get('/', (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at "http://localhost:${port}".`);
});