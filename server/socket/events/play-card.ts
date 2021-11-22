import rooms from '../rooms';
import { PlayerSocket, PlayCallback } from '../types';
import { PlayingCard } from '../../game/types';
import { checkCardsForEquality, validatePlay } from '../../game/utils';

export default (socket: PlayerSocket, card: PlayingCard, callback?: PlayCallback): void => {
  const { id: playerId, roomId } = socket.player;

  if (callback && roomId) {
    const room = rooms[roomId];

    if (room) {
      if (validatePlay(socket, room, card)) {
        const player = room.players[playerId];
        if (player.distributableGulps || player.distributableGulps === 0) {
          if (room.activeRow) {
            player.distributableGulps += room.activeRow;

            const cardIndex = player.hand?.findIndex(
              (handCard: PlayingCard) => checkCardsForEquality(handCard, card),
            );

            if (cardIndex) {
              player.hand?.splice(cardIndex, 1);
              callback(true, player.hand);
              socket.emit('newDistributableGulps', player.distributableGulps);
            }
          }
        }
      } else {
        callback(false);
      }
    }
  }
};
