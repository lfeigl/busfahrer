import { PlayingCard } from './types';

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
