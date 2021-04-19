import { PlayerSocket } from '../types';
import * as socketUtils from '../utils';
import createRoom from './create-room';
import joinRoom from './join-room';
import leaveRoom from './leave-room';
import startGame from './start-game';

export function disconnect(socket: PlayerSocket): void {
  socketUtils.leaveJoinedRooms(socket, leaveRoom);
}

export {
  createRoom,
  joinRoom,
  leaveRoom,
  startGame,
};
