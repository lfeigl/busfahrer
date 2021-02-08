import { Arguments } from 'yargs-parser';

export type Argv = Arguments & {
  port?: number;
  log?: boolean;
};
