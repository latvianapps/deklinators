import {
  Noun, DeclensionGroup, Case, GNumber,
} from '../src';

test('II group declensions', () => {
  const n2 = new Noun('suns');
  expect(n2.declension(Case.nominative)).toBe('suns');
  expect(n2.declension(Case.genitive)).toBe('suņa');
  expect(n2.declension(Case.dative)).toBe('sunim');
  expect(n2.declension(Case.accusative)).toBe('suni');
  expect(n2.declension(Case.instrumental)).toBe('ar suni');
  expect(n2.declension(Case.locative)).toBe('sunī');
  expect(n2.declension(Case.vocative)).toBe('suni');
  expect(n2.declension(Case.nominative, GNumber.plural)).toBe('suņi');
  expect(n2.declension(Case.genitive, GNumber.plural)).toBe('suņu');
  expect(n2.declension(Case.dative, GNumber.plural)).toBe('suņiem');
  expect(n2.declension(Case.accusative, GNumber.plural)).toBe('suņus');
  expect(n2.declension(Case.instrumental, GNumber.plural)).toBe('ar suņiem');
  expect(n2.declension(Case.locative, GNumber.plural)).toBe('suņos');
  expect(n2.declension(Case.vocative, GNumber.plural)).toBe('suņi');
  const n3 = new Noun('akmens');
  expect(n3.declension(Case.nominative)).toBe('akmens');
  expect(n3.declension(Case.genitive)).toBe('akmens');
  expect(n3.declension(Case.dative)).toBe('akmenim');
  expect(n3.declension(Case.accusative)).toBe('akmeni');
  expect(n3.declension(Case.instrumental)).toBe('ar akmeni');
  expect(n3.declension(Case.locative)).toBe('akmenī');
  expect(n3.declension(Case.vocative)).toBe('akmen');
  expect(n3.declension(Case.nominative, GNumber.plural)).toBe('akmeņi');
  expect(n3.declension(Case.genitive, GNumber.plural)).toBe('akmeņu');
  expect(n3.declension(Case.dative, GNumber.plural)).toBe('akmeņiem');
  expect(n3.declension(Case.accusative, GNumber.plural)).toBe('akmeņus');
  expect(n3.declension(Case.instrumental, GNumber.plural)).toBe('ar akmeņiem');
  expect(n3.declension(Case.locative, GNumber.plural)).toBe('akmeņos');
  expect(n3.declension(Case.vocative, GNumber.plural)).toBe('akmeņi');
  const n4 = new Noun('briedis');
  expect(n4.declension(Case.genitive)).toBe('brieža');
  const n5 = new Noun('tētis');
  expect(n5.declension(Case.genitive)).toBe('tēta');
  expect(n5.declension(Case.dative, GNumber.plural)).toBe('tētiem');
  const n6 = new Noun('viesis');
  expect(n6.declension(Case.nominative, GNumber.plural)).toBe('viesi');
  expect(n6.declension(Case.dative, GNumber.plural)).toBe('viesiem');
  const n7 = new Noun('tumšmatis');
  expect(n7.declension(Case.nominative, GNumber.plural)).toBe('tumšmati');
});

test('III group declensions', () => {
  const n2 = new Noun('pelus');
  expect(n2.declension(Case.dative, GNumber.plural)).toBe('pelūm');
  expect(n2.declension(Case.genitive, GNumber.plural)).toBe('pelu');
  expect(n2.declension(Case.dative, GNumber.plural)).toBe('pelūm');
  expect(n2.declension(Case.accusative, GNumber.plural)).toBe('pelus');
  expect(n2.declension(Case.locative, GNumber.plural)).toBe('pelūs');
});

test('IV group declensions', () => {
  const n1 = new Noun('lauva');
  expect(n1.declension(Case.nominative)).toBe('lauva');
  expect(n1.declension(Case.genitive)).toBe('lauvas');
  expect(n1.declension(Case.dative)).toBe('lauvam');
  expect(n1.declension(Case.accusative)).toBe('lauvu');
  expect(n1.declension(Case.instrumental)).toBe('ar lauvu');
  expect(n1.declension(Case.locative)).toBe('lauvā');
  expect(n1.declension(Case.vocative)).toBe('lauva');
  expect(n1.declension(Case.nominative, GNumber.plural)).toBe('lauvas');
  expect(n1.declension(Case.genitive, GNumber.plural)).toBe('lauvu');
  expect(n1.declension(Case.dative, GNumber.plural)).toBe('lauvām');
  expect(n1.declension(Case.accusative, GNumber.plural)).toBe('lauvas');
  expect(n1.declension(Case.instrumental, GNumber.plural)).toBe('ar lauvām');
  expect(n1.declension(Case.locative, GNumber.plural)).toBe('lauvās');
  expect(n1.declension(Case.vocative, GNumber.plural)).toBe('lauvas');

  const n3 = new Noun('puika');
  expect(n3.declension(Case.nominative)).toBe('puika');
  expect(n3.declension(Case.genitive)).toBe('puikas');
  expect(n3.declension(Case.dative)).toBe('puikam');
  expect(n3.declension(Case.accusative)).toBe('puiku');
  expect(n3.declension(Case.instrumental)).toBe('ar puiku');
  expect(n3.declension(Case.locative)).toBe('puikā');
  expect(n3.declension(Case.vocative)).toBe('puika');
  expect(n3.declension(Case.nominative, GNumber.plural)).toBe('puikas');
  expect(n3.declension(Case.genitive, GNumber.plural)).toBe('puiku');
  expect(n3.declension(Case.dative, GNumber.plural)).toBe('puikām');
  expect(n3.declension(Case.accusative, GNumber.plural)).toBe('puikas');
  expect(n3.declension(Case.instrumental, GNumber.plural)).toBe('ar puikām');
  expect(n3.declension(Case.locative, GNumber.plural)).toBe('puikās');
  expect(n3.declension(Case.vocative, GNumber.plural)).toBe('puikas');
});

test('V group declensions', () => {
  const n2 = new Noun('kase');
  expect(n2.declension(Case.genitive, GNumber.plural)).toBe('kasu');
});

test('VI group declensions', () => {
  const n1 = new Noun('brokastis');
  expect(n1.declension(Case.genitive, GNumber.plural)).toBe('brokastu');
});

test('Add unknown special case', () => {
  Noun.addSpecialCase('superkrāsns', { declensionGroup: DeclensionGroup.D6 });
  const n = new Noun('superkrāsns');
  n.analyze();
  expect(n.declensionGroup).toBe(DeclensionGroup.D6);
  expect(n.declension(Case.dative)).toBe('superkrāsnij');
});
