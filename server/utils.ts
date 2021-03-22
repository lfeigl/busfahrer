import { join as joinPath } from 'path';
import { appendFileSync } from 'fs';
import argv from './argv';

export function writeToLogFile(...messages: string[]): void {
  const logPath = joinPath(__dirname, '..', 'busfahrer.log');
  const logMessage = `[${new Date().toLocaleString()}] ${messages.join(' ')}\n`;

  appendFileSync(logPath, logMessage);
}

export function log(...messages: string[]): void {
  /* eslint-disable-next-line no-console */
  console.log('[Busfahrer]', ...messages);
  if (argv.log) writeToLogFile(...messages);
}
