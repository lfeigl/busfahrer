import express from 'express';
import path from 'path';
import historyApiFallback from 'connect-history-api-fallback';
import argv from './argv';
import { log } from './utils';
import attachSocketServer from './socket';

const app = express();
const distDir = path.join(__dirname, '..', 'dist');
const port = argv.port || 1337;

app.use(historyApiFallback());
app.use(express.static(distDir));

app.get('/', (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

const server = app.listen(port);
log(`Server listening at "http://localhost:${port}".`);
attachSocketServer(server);
