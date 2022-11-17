import {
  Noun, Case,
} from '../src';

test('Definite adjectives masculine short', () => {
  const n1 = new Noun('lielais');
  expect(n1.declension(Case.dative)).toBe('lielajam');
  expect(n1.declension(Case.locative)).toBe('lielajā');
  const n2 = new Noun('pēdējais');
  expect(n2.declension(Case.dative)).toBe('pēdējam');
  expect(n2.declension(Case.locative)).toBe('pēdējā');
  const n3 = new Noun('lējamais');
  expect(n3.declension(Case.accusative)).toBe('lējamo');
  expect(n3.declension(Case.locative)).toBe('lējamā');
  const n4 = new Noun('braucamais');
  expect(n4.declension(Case.accusative)).toBe('braucamo');
  expect(n4.declension(Case.dative)).toBe('braucamam');
});

test('Definite adjectives masculine long', () => {
  const n = new Noun('brīnišķīgais');
  expect(n.declension(Case.dative)).toBe('brīnišķīgam');
  expect(n.declension(Case.locative)).toBe('brīnišķīgā');
});

test('Definite adjectives feminine short', () => {
  const n1 = new Noun('skaistā');
  expect(n1.declension(Case.dative)).toBe('skaistajai');
  expect(n1.declension(Case.locative)).toBe('skaistajā');
  const n2 = new Noun('pēdējā');
  expect(n2.declension(Case.dative)).toBe('pēdējai');
  expect(n2.declension(Case.locative)).toBe('pēdējā');
  const n3 = new Noun('vidējā');
  expect(n3.declension(Case.dative)).toBe('vidējai');
  expect(n3.declension(Case.locative)).toBe('vidējā');
  const n4 = new Noun('braucamā');
  expect(n4.declension(Case.genitive)).toBe('braucamās');
  expect(n4.declension(Case.accusative)).toBe('braucamo');
  expect(n4.declension(Case.locative)).toBe('braucamā');
});

test('Definite adjectives feminine long', () => {
  const n = new Noun('brīnišķīgā');
  expect(n.declension(Case.dative)).toBe('brīnišķīgai');
  expect(n.declension(Case.locative)).toBe('brīnišķīgā');
});

test('Definite adjectives, feminine degrees short', () => {
  const n1 = new Noun('krāšņā');
  expect(n1.declension(Case.dative)).toBe('krāšņajai');
  expect(n1.declension(Case.locative)).toBe('krāšņajā');
  const n2 = new Noun('krāšņākā');
  expect(n2.declension(Case.dative)).toBe('krāšņākajai');
  expect(n2.declension(Case.locative)).toBe('krāšņākajā');
  const n3 = new Noun('viskrāšņākā');
  expect(n3.declension(Case.dative)).toBe('viskrāšņākai');
  expect(n3.declension(Case.locative)).toBe('viskrāšņākā');
});

test('Definite adjectives, feminine degrees long', () => {
  const n1 = new Noun('pēdējā');
  expect(n1.declension(Case.dative)).toBe('pēdējai');
  expect(n1.declension(Case.locative)).toBe('pēdējā');
  const n2 = new Noun('pēdējākā');
  expect(n2.declension(Case.dative)).toBe('pēdējākai');
  expect(n2.declension(Case.locative)).toBe('pēdējākā');
  const n3 = new Noun('vispēdējākā');
  expect(n3.declension(Case.dative)).toBe('vispēdējākai');
  expect(n3.declension(Case.locative)).toBe('vispēdējākā');
});
