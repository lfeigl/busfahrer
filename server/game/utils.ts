import rooms from '../socket/rooms';
import { checkIfPlayerIsInRoom } from '../socket/utils';
import { PlayingCard } from './types';
import { PlayerSocket, Room } from '../socket/types';

export function checkCardsForEquality(cardA: PlayingCard, cardB: PlayingCard): boolean {
  return cardA.name === cardB.name && cardA.suit === cardB.suit;
}

export function shuffleDeck(deck: PlayingCard[]): PlayingCard[] {
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

export function dealCards(deck: PlayingCard[], playerCount: number): PlayingCard[][] {
  const dealtCards: PlayingCard[][] = [];
  const cardCountPerPlayer = Math.floor(deck.length / playerCount);

  for (let i = 1; i <= playerCount; i += 1) {
    const cards: PlayingCard[] = [];

    for (let j = 1; j <= cardCountPerPlayer; j += 1) {
      const card = deck.pop();
      if (card) cards.push(card);
    }

    dealtCards.push(cards);
  }

  return dealtCards;
}

export function checkIfPlayerHasCard(socket: PlayerSocket, card: PlayingCard): boolean {
  const { player } = socket;
  const { roomId } = player;

  if (roomId) {
    const room = rooms[roomId];

    if (room) {
      const { hand } = room.players[player.id];

      if (hand) {
        return hand.some(
          (handCard: PlayingCard) => checkCardsForEquality(handCard, card),
        );
      }
    }
  }

  return false;
}

export function checkIfPlayIsValid(room: Room, card: PlayingCard): boolean {
  return card.value === room.currentFirCard?.value;
}

export function validatePlay(socket: PlayerSocket, room: Room, card: PlayingCard): boolean {
  return checkIfPlayerIsInRoom(socket)
    && checkIfPlayerHasCard(socket, card)
    && checkIfPlayIsValid(room, card);
}
