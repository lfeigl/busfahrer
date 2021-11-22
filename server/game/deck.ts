import { PlayingCard } from './types';

const names = [
  'ace',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'jack',
  'queen',
  'king',
];

const suits = [
  'clubs',
  'diamonds',
  'hearts',
  'spades',
];

const values: { [name: string]: number } = {
  ace: 100,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  jack: 25,
  queen: 50,
  king: 75,
};

const fullDeck = ((): PlayingCard[] => {
  const playingCards: PlayingCard[] = [];

  names.forEach((name: string) => {
    suits.forEach((suit: string) => {
      const playingCard: PlayingCard = {
        name,
        suit,
        value: values[name],
      };

      playingCards.push(playingCard);
    });
  });

  return playingCards;
})();

export default function getFullDeck(): PlayingCard[] {
  return [...fullDeck];
}
