import parseArgv, { Arguments } from 'yargs-parser';

type Argv = Arguments & {
  port?: number;
  log?: boolean;
};

const argv: Argv = parseArgv(process.argv.slice(2));

export default argv;
