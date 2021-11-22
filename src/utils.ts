export function isEmptyString(string: string): boolean {
  return string.replaceAll(' ', '').length === 0;
}

export const playingCardFilenames: { [cardName: string]: string } = {
  back1: '01.svg',
  back2: '02.svg',
  ace: '01.svg',
  two: '02.svg',
  three: '03.svg',
  four: '04.svg',
  five: '05.svg',
  six: '06.svg',
  seven: '07.svg',
  eight: '08.svg',
  nine: '09.svg',
  ten: '10.svg',
  jack: '11.svg',
  queen: '12.svg',
  king: '13.svg',
};
