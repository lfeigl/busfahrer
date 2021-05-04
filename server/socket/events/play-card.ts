import rooms from '../rooms';
import { PlayerSocket, PlayCallback } from '../types';
import { PlayingCard } from '../../game/types';
import { validatePlay } from '../../game/utils';

export default (socket: PlayerSocket, card: PlayingCard, callback?: PlayCallback): void => {
  const { player } = socket;
  const { roomId } = player;

  if (callback && roomId) {
    const room = rooms[roomId];

    if (room) {
      if (validatePlay(socket, card)) {
        callback(card.value === room.currentFirCard?.value);
      }
    }
  }
};
