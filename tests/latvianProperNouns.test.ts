import {
  Noun, Case, GNumber, Gender,
} from '../src';

test('I group proper nouns', () => {
  const n1 = new Noun('Toms', { properNoun: true });
  expect(n1.declension(Case.vocative)).toBe('Tom');
});

test('II group proper nouns', () => {
  const n1 = new Noun('Jankovskis', { properNoun: true });
  expect(n1.declension(Case.genitive)).toBe('Jankovska');
  expect(n1.declension(Case.vocative)).toBe('Jankovski');
  expect(n1.declension(Case.nominative, GNumber.plural)).toBe('Jankovski');
  const n2 = new Noun('Valdis', { properNoun: true });
  expect(n2.declension(Case.genitive)).toBe('Valda');
  const n3 = new Noun('Miervaldis', { properNoun: true });
  expect(n3.declension(Case.genitive)).toBe('Miervalža');
});

// Māra Dejus
test('III group proper nouns', () => {
  const n1 = new Noun('Dejus', { properNoun: true, overrideGender: Gender.feminine });
  expect(n1.declension(Case.dative)).toBe('Dejui');
  expect(n1.declension(Case.nominative, GNumber.plural)).toBe('Dejus');
  expect(n1.declension(Case.dative, GNumber.plural)).toBe('Dejūm');
  expect(n1.declension(Case.instrumental, GNumber.plural)).toBe('ar Dejūm');
  expect(n1.declension(Case.locative, GNumber.plural)).toBe('Dejūs');
  expect(n1.declension(Case.vocative, GNumber.plural)).toBe('Dejus');
});

test('IV group proper nouns', () => {
  const n1 = new Noun('Liepa', { properNoun: true, overrideGender: Gender.masculine });
  expect(n1.declension(Case.dative)).toBe('Liepam');
  const n2 = new Noun('Janka', { properNoun: true, overrideGender: Gender.masculine });
  expect(n2.declension(Case.dative)).toBe('Jankam');
});

test('VI group proper nouns', () => {
  // Jānis Sirds
  const n1 = new Noun('Sirds', { properNoun: true, overrideGender: Gender.masculine });
  expect(n1.declension(Case.dative)).toBe('Sirdim');
});
