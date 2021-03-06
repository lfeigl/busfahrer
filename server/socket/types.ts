import { Socket } from 'socket.io';

export type Player = {
  id: string;
  name: string;
  socketId?: string;
};

export type Players = {
  [id: string]: Player;
};

export type PlayerSocket = Socket & {
  player: Player;
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

export type RoomCallback = (room: Room | null) => void;
