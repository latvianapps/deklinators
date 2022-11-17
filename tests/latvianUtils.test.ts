import {
  CapsStyle,
} from '../src/latvian/enums';
import {
  validateWord, getCapsStyle, setCapsStyle, getSyllableCount,
} from '../src/latvian/utils';

test('Validate valid word', () => {
  expect(validateWord('vārdiņš')).toBe(true);
  expect(validateWord('a')).toBe(true);
});

test('Validate invalid word', () => {
  expect(validateWord('nederīgs!')).toBe(false);
  expect(validateWord('divi vārdi')).toBe(false);
  expect(validateWord(' un ')).toBe(false);
  expect(validateWord('123')).toBe(false);
  expect(validateWord('')).toBe(false);
});

test('Detect word capitalization', () => {
  expect(getCapsStyle('mazie')).toBe(CapsStyle.lowerCase);
  expect(getCapsStyle('LIELIE')).toBe(CapsStyle.upperCase);
  expect(getCapsStyle('Īpašvārds')).toBe(CapsStyle.titleCase);
  expect(getCapsStyle('JoCīGs')).toBe(CapsStyle.unknown);
});

test('Apply word capitalization', () => {
  expect(setCapsStyle('mAZIe', CapsStyle.lowerCase)).toBe('mazie');
  expect(setCapsStyle('liELie', CapsStyle.upperCase)).toBe('LIELIE');
  expect(setCapsStyle('kalniņš', CapsStyle.titleCase)).toBe('Kalniņš');
});

test('Count word syllables', () => {
  expect(getSyllableCount('kapitālisms')).toBe(4);
  expect(getSyllableCount('spēle')).toBe(2);
  expect(getSyllableCount('x')).toBe(0);
  // Special cases
  // expect(getSyllableCount('visneiedomājamākais')).toBe(8);
  // expect(getSyllableCount('ābols')).toBe(1);
  // expect(getSyllableCount('apelsīns')).toBe(2);
});
