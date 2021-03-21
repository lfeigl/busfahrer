import { Socket } from 'socket.io';
import { PlayingCard } from '../game/types';

export type Player = {
  id: string;
  name: string;
  socketId?: string;
  hand?: PlayingCard[],
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
  deck: PlayingCard[],
  firCards: PlayingCard[],
  currentFirCard?: PlayingCard,
};

export type Rooms = {
  [id: string]: Room;
};

export type RoomCallback = (room?: Room | null) => void;

export type GameCallback = (card?: PlayingCard | null) => void;
