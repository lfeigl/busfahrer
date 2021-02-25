import { PlayingCard } from '@/types';

export function isEmptyString(string: string): boolean {
  return string.replaceAll(' ', '').length === 0;
}

export const playingCards: { [name: string]: PlayingCard } = {
  back1: {
    name: 'back1',
    value: 0,
    fileName: '01.svg',
  },
  back2: {
    name: 'back2',
    value: 0,
    fileName: '02.svg',
  },
  ace: {
    name: 'ace',
    value: 100,
    fileName: '01.svg',
  },
  two: {
    name: 'two',
    value: 2,
    fileName: '02.svg',
  },
  three: {
    name: 'three',
    value: 3,
    fileName: '03.svg',
  },
  four: {
    name: 'four',
    value: 4,
    fileName: '04.svg',
  },
  five: {
    name: 'five',
    value: 5,
    fileName: '05.svg',
  },
  six: {
    name: 'six',
    value: 6,
    fileName: '06.svg',
  },
  seven: {
    name: 'seven',
    value: 7,
    fileName: '07.svg',
  },
  eight: {
    name: 'eight',
    value: 8,
    fileName: '08.svg',
  },
  nine: {
    name: 'nine',
    value: 9,
    fileName: '09.svg',
  },
  ten: {
    name: 'ten',
    value: 10,
    fileName: '10.svg',
  },
  jack: {
    name: 'jack',
    value: 25,
    fileName: '11.svg',
  },
  queen: {
    name: 'queen',
    value: 50,
    fileName: '12.svg',
  },
  king: {
    name: 'king',
    value: 75,
    fileName: '13.svg',
  },
};
