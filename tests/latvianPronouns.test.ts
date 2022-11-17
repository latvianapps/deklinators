import {
  Noun, Case, GNumber, Gender,
} from '../src';

test('Personal Pronouns: es', () => {
  const n = new Noun('es');
  expect(n.declension(Case.nominative)).toBe('es');
  expect(n.declension(Case.genitive)).toBe('manis');
  expect(n.declension(Case.dative)).toBe('man');
  expect(n.declension(Case.accusative)).toBe('mani');
  expect(n.declension(Case.instrumental)).toBe('ar mani');
  expect(n.declension(Case.locative)).toBe('manī');
  expect(() => n.declension(Case.vocative)).toThrow('not defined for word');
  expect(n.declension(Case.nominative, GNumber.plural)).toBe('mēs');
  expect(n.declension(Case.genitive, GNumber.plural)).toBe('mūsu');
  expect(n.declension(Case.dative, GNumber.plural)).toBe('mums');
  expect(n.declension(Case.accusative, GNumber.plural)).toBe('mūs');
  expect(n.declension(Case.instrumental, GNumber.plural)).toBe('ar mums');
  expect(n.declension(Case.locative, GNumber.plural)).toBe('mūsos');
  expect(() => n.declension(Case.vocative, GNumber.plural)).toThrow('not defined for word');
});

test('Personal Pronouns: tu', () => {
  const n2 = new Noun('tu');
  expect(n2.declension(Case.nominative)).toBe('tu');
  expect(n2.declension(Case.genitive)).toBe('tevis');
  expect(n2.declension(Case.dative)).toBe('tev');
  expect(n2.declension(Case.accusative)).toBe('tevi');
  expect(n2.declension(Case.instrumental)).toBe('ar tevi');
  expect(n2.declension(Case.locative)).toBe('tevī');
  expect(() => n2.declension(Case.vocative)).toThrow('not defined for word');
  expect(n2.declension(Case.nominative, GNumber.plural)).toBe('jūs');
  expect(n2.declension(Case.genitive, GNumber.plural)).toBe('jūsu');
  expect(n2.declension(Case.dative, GNumber.plural)).toBe('jums');
  expect(n2.declension(Case.accusative, GNumber.plural)).toBe('jūs');
  expect(n2.declension(Case.instrumental, GNumber.plural)).toBe('ar jums');
  expect(n2.declension(Case.locative, GNumber.plural)).toBe('jūsos');
  expect(() => n2.declension(Case.vocative, GNumber.plural)).toThrow('not defined for word');
});

test('Personal Pronouns: pats, pati', () => {
  const n3 = new Noun('pats');
  n3.analyze();
  expect(n3.gender).toBe(Gender.masculine);
  expect(n3.declension(Case.nominative)).toBe('pats');
  expect(n3.declension(Case.genitive)).toBe('paša');
  expect(n3.declension(Case.dative)).toBe('pašam');
  expect(n3.declension(Case.accusative)).toBe('pašu');
  expect(n3.declension(Case.instrumental)).toBe('ar pašu');
  expect(n3.declension(Case.locative)).toBe('pašā');
  expect(() => n3.declension(Case.vocative)).toThrow('not defined for word');
  expect(n3.declension(Case.nominative, GNumber.plural)).toBe('paši');
  expect(n3.declension(Case.genitive, GNumber.plural)).toBe('pašu');
  expect(n3.declension(Case.dative, GNumber.plural)).toBe('pašiem');
  expect(n3.declension(Case.accusative, GNumber.plural)).toBe('pašus');
  expect(n3.declension(Case.instrumental, GNumber.plural)).toBe('ar pašiem');
  expect(n3.declension(Case.locative, GNumber.plural)).toBe('pašos');
  expect(() => n3.declension(Case.vocative, GNumber.plural)).toThrow('not defined for word');

  const n4 = new Noun('pati');
  n4.analyze();
  expect(n4.gender).toBe(Gender.feminine);
  expect(n4.declension(Case.nominative)).toBe('pati');
  expect(n4.declension(Case.genitive)).toBe('pašas');
  expect(n4.declension(Case.dative)).toBe('pašai');
  expect(n4.declension(Case.accusative)).toBe('pašu');
  expect(n4.declension(Case.instrumental)).toBe('ar pašu');
  expect(n4.declension(Case.locative)).toBe('pašā');
  expect(() => n4.declension(Case.vocative)).toThrow('not defined for word');
  expect(n4.declension(Case.nominative, GNumber.plural)).toBe('pašas');
  expect(n4.declension(Case.genitive, GNumber.plural)).toBe('pašu');
  expect(n4.declension(Case.dative, GNumber.plural)).toBe('pašām');
  expect(n4.declension(Case.accusative, GNumber.plural)).toBe('pašas');
  expect(n4.declension(Case.instrumental, GNumber.plural)).toBe('ar pašām');
  expect(n4.declension(Case.locative, GNumber.plural)).toBe('pašās');
  expect(() => n4.declension(Case.vocative, GNumber.plural)).toThrow('not defined for word');
});

test('Demonstrative Pronouns: tas, tā', () => {
  const n1 = new Noun('tas');
  expect(n1.declension(Case.nominative)).toBe('tas');
  expect(n1.declension(Case.genitive)).toBe('tā');
  expect(n1.declension(Case.dative)).toBe('tam');
  expect(n1.declension(Case.accusative)).toBe('to');
  expect(n1.declension(Case.instrumental)).toBe('ar to');
  expect(n1.declension(Case.locative)).toBe('tajā');
  expect(() => n1.declension(Case.vocative)).toThrow('not defined for word');
  expect(n1.declension(Case.nominative, GNumber.plural)).toBe('tie');
  expect(n1.declension(Case.genitive, GNumber.plural)).toBe('to');
  expect(n1.declension(Case.dative, GNumber.plural)).toBe('tiem');
  expect(n1.declension(Case.accusative, GNumber.plural)).toBe('tos');
  expect(n1.declension(Case.instrumental, GNumber.plural)).toBe('ar tiem');
  expect(n1.declension(Case.locative, GNumber.plural)).toBe('tajos');
  expect(() => n1.declension(Case.vocative, GNumber.plural)).toThrow('not defined for word');

  const n2 = new Noun('tā');
  expect(n2.declension(Case.nominative)).toBe('tā');
  expect(n2.declension(Case.genitive)).toBe('tās');
  expect(n2.declension(Case.dative)).toBe('tai');
  expect(n2.declension(Case.accusative)).toBe('to');
  expect(n2.declension(Case.instrumental)).toBe('ar to');
  expect(n2.declension(Case.locative)).toBe('tajā');
  expect(() => n2.declension(Case.vocative)).toThrow('not defined for word');
  expect(n2.declension(Case.nominative, GNumber.plural)).toBe('tās');
  expect(n2.declension(Case.genitive, GNumber.plural)).toBe('to');
  expect(n2.declension(Case.dative, GNumber.plural)).toBe('tām');
  expect(n2.declension(Case.accusative, GNumber.plural)).toBe('tās');
  expect(n2.declension(Case.instrumental, GNumber.plural)).toBe('ar tām');
  expect(n2.declension(Case.locative, GNumber.plural)).toBe('tajās');
  expect(() => n2.declension(Case.vocative, GNumber.plural)).toThrow('not defined for word');
});

test('Demonstrative Pronouns: šis, šī', () => {
  const n3 = new Noun('šis');
  expect(n3.declension(Case.nominative)).toBe('šis');
  expect(n3.declension(Case.genitive)).toBe('šī');
  expect(n3.declension(Case.dative)).toBe('šim');
  expect(n3.declension(Case.accusative)).toBe('šo');
  expect(n3.declension(Case.instrumental)).toBe('ar šo');
  expect(n3.declension(Case.locative)).toBe('šajā');
  expect(() => n3.declension(Case.vocative)).toThrow('not defined for word');
  expect(n3.declension(Case.nominative, GNumber.plural)).toBe('šie');
  expect(n3.declension(Case.genitive, GNumber.plural)).toBe('šo');
  expect(n3.declension(Case.dative, GNumber.plural)).toBe('šiem');
  expect(n3.declension(Case.accusative, GNumber.plural)).toBe('šos');
  expect(n3.declension(Case.instrumental, GNumber.plural)).toBe('ar šiem');
  expect(n3.declension(Case.locative, GNumber.plural)).toBe('šajos');
  expect(() => n3.declension(Case.vocative, GNumber.plural)).toThrow('not defined for word');

  const n4 = new Noun('šī');
  expect(n4.declension(Case.nominative)).toBe('šī');
  expect(n4.declension(Case.genitive)).toBe('šīs');
  expect(n4.declension(Case.dative)).toBe('šai');
  expect(n4.declension(Case.accusative)).toBe('šo');
  expect(n4.declension(Case.instrumental)).toBe('ar šo');
  expect(n4.declension(Case.locative)).toBe('šajā');
  expect(() => n4.declension(Case.vocative)).toThrow('not defined for word');
  expect(n4.declension(Case.nominative, GNumber.plural)).toBe('šīs');
  expect(n4.declension(Case.genitive, GNumber.plural)).toBe('šo');
  expect(n4.declension(Case.dative, GNumber.plural)).toBe('šīm');
  expect(n4.declension(Case.accusative, GNumber.plural)).toBe('šīs');
  expect(n4.declension(Case.instrumental, GNumber.plural)).toBe('ar šīm');
  expect(n4.declension(Case.locative, GNumber.plural)).toBe('šajās');
  expect(() => n4.declension(Case.vocative, GNumber.plural)).toThrow('not defined for word');
});
