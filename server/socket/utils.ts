import { log } from '../utils';
import rooms from './rooms';
import { PlayerSocket } from './types';

type LeaveRoomEvent = (socket: PlayerSocket, roomId: string) => void;

export function cleanRooms(): void {
  Object.keys(rooms).forEach((roomId: string) => {
    const room = rooms[roomId];

    if (room) {
      if (!Object.keys(room.players).length) {
        delete rooms[roomId];
        log(`Server removed empty room "${room.name}" (${room.id}).`);
      }
    }
  });
}

export function checkIfPlayerIsInRoom(socket: PlayerSocket): boolean {
  const { player } = socket;
  const { roomId } = player;

  if (roomId) {
    const room = rooms[roomId];

    if (room) {
      return Object.keys(room.players).includes(player.id);
    }
  }

  return false;
}

export function leaveJoinedRooms(socket: PlayerSocket, callback: LeaveRoomEvent): void {
  Object.keys(rooms).forEach((roomId: string) => {
    if (checkIfPlayerIsInRoom(socket)) {
      callback(socket, roomId);
    }
  });
}
