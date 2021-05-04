import rooms from '../rooms';
import { PlayerSocket, PlayCallback } from '../types';
import { PlayingCard } from '../../game/types';
import { checkIfPlayerIsInRoom } from '../utils';

export default (socket: PlayerSocket, card: PlayingCard, callback?: PlayCallback): void => {
  const { player } = socket;
  const { roomId } = player;

  if (callback && roomId) {
    const room = rooms[roomId];

    if (room) {
      if (checkIfPlayerIsInRoom(socket)) {
        callback(card.value === room.currentFirCard?.value);
      }
    }
  }
};
