import {
  Noun, Case, GNumber,
} from '../src';

test('Numeral: trīs', () => {
  const n = new Noun('trīs');
  expect(n.declension(Case.nominative, GNumber.plural)).toBe('trīs');
  expect(n.declension(Case.genitive, GNumber.plural)).toBe('triju');
  expect(n.declension(Case.dative, GNumber.plural)).toBe('trim');
  expect(n.declension(Case.accusative, GNumber.plural)).toBe('trīs');
  expect(n.declension(Case.instrumental, GNumber.plural)).toBe('ar trim');
  expect(n.declension(Case.locative, GNumber.plural)).toBe('trīs');
  expect(n.declension(Case.vocative, GNumber.plural)).toBe('trīs');
});

test('Selected numerals with suffixes -padsmit, -desmit', () => {
  const n1 = new Noun('desmit');
  expect(n1.declension(Case.dative)).toBe('desmit');
  expect(n1.declension(Case.accusative, GNumber.plural)).toBe('desmit');
  const n2 = new Noun('septiņpadsmit');
  expect(n2.declension(Case.dative)).toBe('septiņpadsmit');
  expect(n2.declension(Case.locative)).toBe('septiņpadsmit');
  const n3 = new Noun('piecdesmit');
  expect(n3.declension(Case.dative)).toBe('piecdesmit');
  expect(n3.declension(Case.locative)).toBe('piecdesmit');
});

test('Plural numerals', () => {
  const n1 = new Noun('četri');
  expect(n1.declension(Case.dative, GNumber.plural)).toBe('četriem');
  const n2= new Noun('deviņi');
  expect(n2.declension(Case.genitive, GNumber.plural)).toBe('deviņu');

});
