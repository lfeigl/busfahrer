import rooms from '../rooms';
import { log } from '../../utils';
import {
  PlayerSocket,
  RoomCallback,
} from '../types';

export default (socket: PlayerSocket, roomId: string, callback?: RoomCallback): void => {
  const { player } = socket;
  const room = rooms[roomId];

  if (room && room.players[player.id]) {
    socket.leave(roomId);
    delete room.players[player.id];
    log(`Player "${player.name}" (${player.id}) left room "${room.name}" (${roomId}).`);

    if (room.owner.id === player.id) {
      delete rooms[roomId];
      log(`Player "${player.name}" (${player.id}) was owner of room`,
        `"${room.name}" (${roomId}). Server removed room.`);
      socket.to(roomId).emit('roomRemoved');
    } else {
      socket.to(roomId).emit('playerLeftRoom', player);
    }

    if (callback) {
      callback(room);
    }
  }

  if (callback) {
    callback(null);
  }
};
