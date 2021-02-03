import express from 'express';
import { join as joinPath } from 'path';
import historyApiFallback from 'connect-history-api-fallback';
import argv from './argv';
import { log } from './utils';
import attachSocketServer from './socket';

const app = express();
const distDir = joinPath(__dirname, '..', 'dist');
const port = argv.port || 1337;

app.use(historyApiFallback());
app.use(express.static(distDir));

app.get('/', (req: express.Request, res: express.Response) => {
  res.sendFile(joinPath(distDir, 'index.html'));
});

const server = app.listen(port);
log(`Server listening at "http://localhost:${port}".`);
attachSocketServer(server);
