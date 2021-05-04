import rooms from '../rooms';
import * as socketUtils from '../utils';
import { log } from '../../utils';
import leaveRoom from './leave-room';
import {
  PlayerSocket,
  RoomCallback,
} from '../types';

export default (socket: PlayerSocket, roomId: string, callback?: RoomCallback): void => {
  const { player } = socket;
  const room = rooms[roomId];

  socketUtils.leaveJoinedRooms(socket, leaveRoom);

  if (room && room.isOpen) {
    socket.join(roomId);
    player.roomId = roomId;
    room.players[player.id] = {
      ...player,
      socketId: socket.id,
    };

    log(`Player "${player.name}" (${player.id}) joined room "${room.name}" (${roomId}).`);
    socket.to(roomId).emit('playerJoinedRoom', player);

    if (Object.keys(room.players).length >= 18) {
      room.isOpen = false;
    }

    if (callback) {
      callback(room);
    }
  }

  if (callback) {
    callback(null);
  }
};
