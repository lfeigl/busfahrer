import rooms from '../rooms';
import getFullDeck from '../../game/deck';
import * as gameUtils from '../../game/utils';
import { log } from '../../utils';
import {
  GameCallback,
  PlayerSocket,
} from '../types';

export default (socket: PlayerSocket, roomId: string, callback?: GameCallback): void => {
  const { player } = socket;
  const room = rooms[roomId];

  if (room && room.owner.id === player.id) {
    const playerCount = Object.keys(room.players).length;
    const deck = getFullDeck();

    room.isOpen = false;
    room.deck = gameUtils.shuffleDeck(deck);
    room.firCards = room.deck.splice(0, 15);
    room.currentFirCard = room.firCards.pop();

    const dealtCards = gameUtils.dealCards(room.deck, playerCount);

    Object.values(room.players).forEach((coPlayer) => {
      if (coPlayer.socketId) {
        const hand = dealtCards.pop();

        coPlayer.hand = hand;

        if (coPlayer.id === player.id) {
          socket.emit('dealtHand', hand);
        } else {
          socket.to(coPlayer.socketId).emit('dealtHand', hand);
        }
      }
    });

    socket.to(roomId).emit('flippedFirCard', room.currentFirCard);
    log(`Game in room "${room.name}" (${roomId}) started.`);
    socket.to(roomId).emit('gameStarted');

    if (callback) {
      callback(room.currentFirCard);
    }
  }

  if (callback) {
    callback(null);
  }
};
