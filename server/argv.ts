import parseArgv from 'yargs-parser';
import { Argv } from './types';

const argv: Argv = parseArgv(process.argv.slice(2));

export default argv;
