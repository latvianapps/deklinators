import {
  Noun, Case, GNumber,
} from '../src';

test('Usually derived from a foreign language and with suffixes -ē, -ī, -o, -ū', () => {
  const n1 = new Noun('radio');
  expect(n1.declension(Case.dative)).toBe('radio');
  expect(n1.declension(Case.locative)).toBe('radio');
  const n2 = new Noun('foajē');
  expect(n2.declension(Case.dative)).toBe('foajē');
  expect(n2.declension(Case.accusative)).toBe('foajē');
  const n3 = new Noun('ragū');
  expect(n3.declension(Case.dative)).toBe('ragū');
  expect(n3.declension(Case.genitive)).toBe('ragū');
  const n4 = new Noun('Kaprī', { properNoun: true });
  expect(n4.declension(Case.genitive)).toBe('Kaprī');
  expect(n4.declension(Case.dative)).toBe('Kaprī');
  const n5 = new Noun('bakarā', { properNoun: true });
  expect(n5.declension(Case.genitive)).toBe('bakarā');
  expect(n5.declension(Case.dative, GNumber.plural)).toBe('bakarā');
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
