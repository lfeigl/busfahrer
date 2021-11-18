import rooms from '../rooms';
import { PlayerSocket, GameCallback } from '../types';
import { log } from '../../utils';

export default (socket: PlayerSocket, callback?: GameCallback): void => {
  const { player } = socket;
  const { roomId } = player;

  if (roomId) {
    const room = rooms[roomId];

    if (room) {
      room.players[player.id].playFinished = true;
      socket.to(roomId).emit('coPlayerFinishedPlay', player.id);

      const allPlaysFinished = !Object.values(room.players)
        .some((coPlayer) => !coPlayer.playFinished);

      if (allPlaysFinished) {
        room.currentFirCard = room.firCards.pop();
        socket.to(roomId).emit('flippedFirCard', room.currentFirCard);
        log(`Round ${room.activeRow} in room "${room.name}" (${roomId}) is finished.`);

        if (callback) {
          callback(room.currentFirCard);
        }
      } else if (callback) {
        callback(null);
      }
    }
  }
};
