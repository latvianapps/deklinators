import {
  Noun, DeclensionGroup, Case, GNumber, Gender,
} from '../src';
import LatvianException from '../src/latvian/exception';

test('Bad input: invalid word', () => {
  try {
    const n = new Noun('ku-kū');
    n.analyze(); // will never happen
  } catch (error) {
    expect(error).toBeInstanceOf(LatvianException);
    if (error instanceof LatvianException) {
      expect(error.code).toBe('INVALID_WORD');
    }
  }
});

test('Bad input: invalid capitalization', () => {
  try {
    const n = new Noun('jOcĪgS');
    n.analyze(); // will never happen
  } catch (error) {
    expect(error).toBeInstanceOf(LatvianException);
    if (error instanceof LatvianException) {
      expect(error.code).toBe('MIXED_CAPS');
    }
  }
});

test('Detect I declension group', () => {
  const n = new Noun('robots');
  n.analyze();
  expect(n.declensionGroup).toBe(DeclensionGroup.D1);
});

test('Detect II declension group', () => {
  const n = new Noun('aplis');
  n.analyze();
  expect(n.declensionGroup).toBe(DeclensionGroup.D2);
});

test('Detect III declension group', () => {
  const n = new Noun('medus');
  n.analyze();
  expect(n.declensionGroup).toBe(DeclensionGroup.D3);
});

test('Detect IV declension group', () => {
  const n = new Noun('nauda');
  n.analyze();
  expect(n.declensionGroup).toBe(DeclensionGroup.D4);
});

test('Detect V declension group', () => {
  const n = new Noun('zemene');
  n.analyze();
  expect(n.declensionGroup).toBe(DeclensionGroup.D5);
});

test('Detect VI declension group', () => {
  const n = new Noun('govs');
  n.analyze();
  expect(n.declensionGroup).toBe(DeclensionGroup.D6);
});

test('Palatalization in singular genitives', () => {
  const genitives: { [key: string]: string } = {
    aplis: 'apļa',
    apinis: 'apiņa',
    urbis: 'urbja',
    ķirmis: 'ķirmja',
    ūpis: 'ūpja',
    burvis: 'burvja',
    briedis: 'brieža',
    ezis: 'eža',
    lācis: 'lāča',
    lācītis: 'lācīša',
    ķirsis: 'ķirša',
    zibsnis: 'zibšņa',
    pūznis: 'pūžņa',
    kauslis: 'kaušļa',
    zizlis: 'zižļa',
    vilnis: 'viļņa',
    bullis: 'buļļa',
    hunnis: 'huņņa',
  };
  for (const [nominative, genitive] of Object.entries(genitives)) {
    const n = new Noun(nominative);
    expect(n.declension(Case.genitive)).toBe(genitive);
  }
});

test('I group declensions', () => {
  const n1 = new Noun('robots');
  expect(n1.declension(Case.nominative)).toBe('robots');
  expect(n1.declension(Case.genitive)).toBe('robota');
  expect(n1.declension(Case.dative)).toBe('robotam');
  expect(n1.declension(Case.accusative)).toBe('robotu');
  expect(n1.declension(Case.instrumental)).toBe('ar robotu');
  expect(n1.declension(Case.locative)).toBe('robotā');
  expect(n1.declension(Case.vocative)).toBe('robots');
  expect(n1.declension(Case.nominative, GNumber.plural)).toBe('roboti');
  expect(n1.declension(Case.genitive, GNumber.plural)).toBe('robotu');
  expect(n1.declension(Case.dative, GNumber.plural)).toBe('robotiem');
  expect(n1.declension(Case.accusative, GNumber.plural)).toBe('robotus');
  expect(n1.declension(Case.instrumental, GNumber.plural)).toBe('ar robotiem');
  expect(n1.declension(Case.locative, GNumber.plural)).toBe('robotos');
  expect(n1.declension(Case.vocative, GNumber.plural)).toBe('roboti');
  // Exceptions in vocative case
  const n2 = new Noun('peldētājs');
  expect(n2.declension(Case.vocative)).toBe('peldētāj');
  const n3 = new Noun('biedrs');
  expect(n3.declension(Case.vocative)).toBe('biedri');
  const n4 = new Noun('saimnieks');
  expect(n4.declension(Case.vocative)).toBe('saimniek');
  const n5 = new Noun('kaimiņš');
  expect(n5.declension(Case.vocative)).toBe('kaimiņ');
});

test('II group declensions', () => {
  const n1 = new Noun('skaitlis');
  expect(n1.declension(Case.nominative)).toBe('skaitlis');
  expect(n1.declension(Case.genitive)).toBe('skaitļa');
  expect(n1.declension(Case.dative)).toBe('skaitlim');
  expect(n1.declension(Case.accusative)).toBe('skaitli');
  expect(n1.declension(Case.instrumental)).toBe('ar skaitli');
  expect(n1.declension(Case.locative)).toBe('skaitlī');
  expect(n1.declension(Case.vocative)).toBe('skaitli');
  expect(n1.declension(Case.nominative, GNumber.plural)).toBe('skaitļi');
  expect(n1.declension(Case.genitive, GNumber.plural)).toBe('skaitļu');
  expect(n1.declension(Case.dative, GNumber.plural)).toBe('skaitļiem');
  expect(n1.declension(Case.accusative, GNumber.plural)).toBe('skaitļus');
  expect(n1.declension(Case.instrumental, GNumber.plural)).toBe('ar skaitļiem');
  expect(n1.declension(Case.locative, GNumber.plural)).toBe('skaitļos');
  expect(n1.declension(Case.vocative, GNumber.plural)).toBe('skaitļi');
});

test('III group declensions', () => {
  const n = new Noun('medus');
  expect(n.declension(Case.nominative)).toBe('medus');
  expect(n.declension(Case.genitive)).toBe('medus');
  expect(n.declension(Case.dative)).toBe('medum');
  expect(n.declension(Case.accusative)).toBe('medu');
  expect(n.declension(Case.instrumental)).toBe('ar medu');
  expect(n.declension(Case.locative)).toBe('medū');
  expect(n.declension(Case.vocative)).toBe('medu');
  expect(n.declension(Case.nominative, GNumber.plural)).toBe('medi');
  expect(n.declension(Case.genitive, GNumber.plural)).toBe('medu');
  expect(n.declension(Case.dative, GNumber.plural)).toBe('mediem');
  expect(n.declension(Case.accusative, GNumber.plural)).toBe('medus');
  expect(n.declension(Case.instrumental, GNumber.plural)).toBe('ar mediem');
  expect(n.declension(Case.locative, GNumber.plural)).toBe('medos');
  expect(n.declension(Case.vocative, GNumber.plural)).toBe('medi');
});

test('IV group declensions', () => {
  const n0 = new Noun('galva');
  expect(n0.declension(Case.nominative)).toBe('galva');
  expect(n0.declension(Case.genitive)).toBe('galvas');
  expect(n0.declension(Case.dative)).toBe('galvai');
  expect(n0.declension(Case.accusative)).toBe('galvu');
  expect(n0.declension(Case.instrumental)).toBe('ar galvu');
  expect(n0.declension(Case.locative)).toBe('galvā');
  expect(n0.declension(Case.vocative)).toBe('galva');
  expect(n0.declension(Case.nominative, GNumber.plural)).toBe('galvas');
  expect(n0.declension(Case.genitive, GNumber.plural)).toBe('galvu');
  expect(n0.declension(Case.dative, GNumber.plural)).toBe('galvām');
  expect(n0.declension(Case.accusative, GNumber.plural)).toBe('galvas');
  expect(n0.declension(Case.instrumental, GNumber.plural)).toBe('ar galvām');
  expect(n0.declension(Case.locative, GNumber.plural)).toBe('galvās');
  expect(n0.declension(Case.vocative, GNumber.plural)).toBe('galvas');

  // Long (3 or mor syllables) noun
  const n2 = new Noun('grāmata');
  expect(n2.declension(Case.vocative)).toBe('grāmat');

  // With overriden gender
  const n4 = new Noun('pļāpa', { overrideGender: Gender.masculine });
  expect(n4.declension(Case.dative)).toBe('pļāpam');
});

test('V group declensions', () => {
  const n = new Noun('laime');
  expect(n.declension(Case.nominative)).toBe('laime');
  expect(n.declension(Case.genitive)).toBe('laimes');
  expect(n.declension(Case.dative)).toBe('laimei');
  expect(n.declension(Case.accusative)).toBe('laimi');
  expect(n.declension(Case.instrumental)).toBe('ar laimi');
  expect(n.declension(Case.locative)).toBe('laimē');
  expect(n.declension(Case.vocative)).toBe('laime');
  expect(n.declension(Case.nominative, GNumber.plural)).toBe('laimes');
  expect(n.declension(Case.genitive, GNumber.plural)).toBe('laimju');
  expect(n.declension(Case.dative, GNumber.plural)).toBe('laimēm');
  expect(n.declension(Case.accusative, GNumber.plural)).toBe('laimes');
  expect(n.declension(Case.instrumental, GNumber.plural)).toBe('ar laimēm');
  expect(n.declension(Case.locative, GNumber.plural)).toBe('laimēs');
  expect(n.declension(Case.vocative, GNumber.plural)).toBe('laimes');

  // Long (3 or mor syllables) noun
  const n1 = new Noun('dzirkstele');
  expect(n1.declension(Case.vocative)).toBe('dzirkstel');
});

test('VI group declensions', () => {
  const n1 = new Noun('zivs');
  expect(n1.declension(Case.nominative)).toBe('zivs');
  expect(n1.declension(Case.genitive)).toBe('zivs');
  expect(n1.declension(Case.dative)).toBe('zivij');
  expect(n1.declension(Case.accusative)).toBe('zivi');
  expect(n1.declension(Case.instrumental)).toBe('ar zivi');
  expect(n1.declension(Case.locative)).toBe('zivī');
  expect(n1.declension(Case.vocative)).toBe('zivs');
  expect(n1.declension(Case.nominative, GNumber.plural)).toBe('zivis');
  expect(n1.declension(Case.genitive, GNumber.plural)).toBe('zivju');
  expect(n1.declension(Case.dative, GNumber.plural)).toBe('zivīm');
  expect(n1.declension(Case.accusative, GNumber.plural)).toBe('zivis');
  expect(n1.declension(Case.instrumental, GNumber.plural)).toBe('ar zivīm');
  expect(n1.declension(Case.locative, GNumber.plural)).toBe('zivīs');
  expect(n1.declension(Case.vocative, GNumber.plural)).toBe('zivis');
  const n3 = new Noun('durvis');
  expect(n3.declension(Case.nominative)).toBe('durvis');
  expect(n3.declension(Case.genitive)).toBe('durvju');
  expect(n3.declension(Case.dative)).toBe('durvīm');
  expect(n3.declension(Case.accusative)).toBe('durvis');
  expect(n3.declension(Case.instrumental)).toBe('ar durvīm');
  expect(n3.declension(Case.locative)).toBe('durvīs');
  expect(n3.declension(Case.vocative)).toBe('durvis');
  expect(n3.declension(Case.nominative, GNumber.plural)).toBe('durvis');
  expect(n3.declension(Case.genitive, GNumber.plural)).toBe('durvju');
  expect(n3.declension(Case.dative, GNumber.plural)).toBe('durvīm');
  expect(n3.declension(Case.accusative, GNumber.plural)).toBe('durvis');
  expect(n3.declension(Case.instrumental, GNumber.plural)).toBe('ar durvīm');
  expect(n3.declension(Case.locative, GNumber.plural)).toBe('durvīs');
  expect(n3.declension(Case.vocative, GNumber.plural)).toBe('durvis');
});

test('ReflectiveM group declensions', () => {
  const n1 = new Noun('klausītājies');
  expect(n1.declension(Case.nominative)).toBe('klausītājies');
  expect(n1.declension(Case.accusative)).toBe('klausītājos');
  expect(() => n1.declension(Case.dative)).toThrow('not defined for word');
  const n2 = new Noun('vēlējumies');
  expect(n2.declension(Case.nominative)).toBe('vēlējumies');
  expect(n2.declension(Case.accusative)).toBe('vēlējumos');
  expect(() => n2.declension(Case.dative)).toThrow('not defined for word');
});

test('ReflectiveF group declensions', () => {
  const n1 = new Noun('atgriešanās');
  expect(n1.declension(Case.nominative)).toBe('atgriešanās');
  expect(() => n1.declension(Case.dative)).toThrow('not defined for word');
  expect(() => n1.declension(Case.locative)).toThrow('not defined for word');
});
