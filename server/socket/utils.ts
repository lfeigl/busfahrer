import { log } from '../utils';
import rooms from './rooms';
import { PlayerSocket } from './types';

type LeaveRoomEvent = (socket: PlayerSocket, roomId: string) => void;

export function cleanRooms(): void {
  Object.keys(rooms).forEach((roomId: string) => {
    const room = rooms[roomId];

    if (!Object.keys(room.players).length) {
      delete rooms[roomId];
      log(`Server removed empty room "${room.name}" (${room.id}).`);
    }
  });
}

export function leaveJoinedRooms(socket: PlayerSocket, callback: LeaveRoomEvent): void {
  const { player } = socket;

  Object.keys(rooms).forEach((roomId: string) => {
    if (Object.keys(rooms[roomId].players).includes(player.id)) {
      callback(socket, roomId);
    }
  });
}
