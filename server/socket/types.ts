import { Socket } from 'socket.io';
import { PlayingCard } from '../game/types';

export type Player = {
  id: string;
  name: string;
  socketId?: string;
  roomId?: string;
  hand?: PlayingCard[],
  distributableGulps?: number;
  playFinished: boolean;
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
  activeRow?: number;
};

export type Rooms = {
  [id: string]: Room | undefined;
};

export type RoomCallback = (room?: Room | null, rejectReason?: string) => void;

export type GameCallback = (card?: PlayingCard | null) => void;

export type PlayCallback = (isValidPlay?: boolean, hand?: PlayingCard[]) => void;
