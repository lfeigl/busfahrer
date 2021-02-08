import { Arguments } from 'yargs-parser';
import { Socket } from 'socket.io';

export type Argv = Arguments & {
  port?: number;
  log?: boolean;
};

export type PlayerSocket = Socket & {
  player: Player;
};

export type Player = {
  id: string;
  name: string;
  socketId?: string;
};

export type Players = {
  [id: string]: Player;
};

export type Room = {
  id: string;
  name: string;
  isOpen: boolean;
  owner: Player;
  players: Players;
};

export type Rooms = {
  [id: string]: Room;
};
