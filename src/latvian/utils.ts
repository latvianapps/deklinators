import { CapsStyle } from './enums';

const VOWELS: string[] = ['a', 'ā', 'e', 'ē', 'i', 'ī', 'o', 'ō', 'u', 'ū'];
const VOWELS_STRING = VOWELS.join('');

function validateWord(word: string): boolean {
  return /^[a-zāčēģīķļņōŗšūž]+$/i.test(word);
}

function getCapsStyle(word: string): CapsStyle {
  if (!validateWord(word)) return CapsStyle.unknown;
  if (word === word.toLowerCase()) return CapsStyle.lowerCase;
  if (word === word.toUpperCase()) return CapsStyle.upperCase;
  const lowerCase = word.toLowerCase();
  if (word === `${lowerCase[0].toUpperCase()}${lowerCase.substring(1)}`) return CapsStyle.titleCase;
  return CapsStyle.unknown;
}

function setCapsStyle(word: string, capsStyle: CapsStyle): string {
  if (capsStyle === CapsStyle.lowerCase) return word.toLowerCase();
  if (capsStyle === CapsStyle.upperCase) return word.toUpperCase();
  if (capsStyle === CapsStyle.titleCase) return `${word[0].toUpperCase()}${word.substring(1).toLowerCase()}`;
  return word;
}

function getSyllableCount(word: string): number {
  // Returns approximate(!!) syllable count, based on the number of continuous stretches of vowels.
  // The real number of syllables is a much more complex matter.
  // To save performance, the word characters are not validated
  let wasVowel = false;
  let count = 0;
  word.toLowerCase().split('').forEach((ch) => {
    if (wasVowel) {
      if (!VOWELS_STRING.includes(ch)) {
        wasVowel = false;
      }
    } else if (VOWELS_STRING.includes(ch)) {
      count++;
      wasVowel = true;
    }
  });
  return count;
}

export {
  VOWELS,
  VOWELS_STRING,
  validateWord,
  getCapsStyle,
  setCapsStyle,
  getSyllableCount,
};
