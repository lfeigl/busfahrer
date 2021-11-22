import rooms from '../rooms';
import { log } from '../../utils';
import {
  PlayerSocket,
  GameCallback,
  PlayerGulps,
} from '../types';

export default (socket: PlayerSocket, playerGulps: PlayerGulps, callback?: GameCallback): void => {
  const { player } = socket;
  const { roomId } = player;

  if (roomId) {
    const room = rooms[roomId];

    if (room) {
      room.players[player.id].playFinished = true;
      socket.to(roomId).emit('coPlayerFinishedPlay', player.id);

      Object.keys(playerGulps).forEach((playerId: string) => {
        const gulps = playerGulps[playerId];

        if (gulps > 0) {
          const coPlayer = room.players[playerId];

          if (coPlayer.socketId) {
            socket.to(coPlayer.socketId).emit('receivedGulps', {
              playerName: player.name,
              gulps,
            });
          }
        }
      });

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
