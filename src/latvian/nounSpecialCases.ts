import {
  Gender, DeclensionGroup,
} from './enums';

type SpecialCaseProperties = {
  declensionGroup?: DeclensionGroup,
  suffixLen?: number,
  gender?: Gender,
  caseGenitive?: string,
  caseDative?: string,
  caseAccusative?: string,
  caseInstrumental?: string,
  caseLocative?: string,
  caseVocative?: string,
  usePalatalized?: boolean,
  pluralOnly?: boolean,
  linkedPlural?: string,
};

/* eslint-disable max-len, object-curly-newline */

const specialCases:{ [key: string]: SpecialCaseProperties } = {
  // D1
  biedrs: { declensionGroup: DeclensionGroup.D1, suffixLen: 1, caseVocative: 'biedri' },
  tēvs: { declensionGroup: DeclensionGroup.D1, suffixLen: 1, caseVocative: 'tēv' },
  cilvēks: { declensionGroup: DeclensionGroup.D1, suffixLen: 1, caseVocative: 'cilvēk' },

  // D2
  tētis: { declensionGroup: DeclensionGroup.D2, usePalatalized: false },
  viesis: { declensionGroup: DeclensionGroup.D2, usePalatalized: false },
  suns: { declensionGroup: DeclensionGroup.D2, suffixLen: 1, caseGenitive: 'suņa' },
  akmens: { declensionGroup: DeclensionGroup.D2, suffixLen: 1, caseGenitive: 'akmens', caseVocative: 'akmen' },
  asmens: { declensionGroup: DeclensionGroup.D2, suffixLen: 1, caseGenitive: 'asmens', caseVocative: 'asmen' },
  rudens: { declensionGroup: DeclensionGroup.D2, suffixLen: 1, caseGenitive: 'rudens', caseVocative: 'ruden' },
  tesmens: { declensionGroup: DeclensionGroup.D2, suffixLen: 1, caseGenitive: 'tesmens', caseVocative: 'tesmen' },
  ūdens: { declensionGroup: DeclensionGroup.D2, suffixLen: 1, caseGenitive: 'ūdens', caseVocative: 'ūden' },
  zibens: { declensionGroup: DeclensionGroup.D2, suffixLen: 1, caseGenitive: 'zibens', caseVocative: 'ziben' },
  mēness: { declensionGroup: DeclensionGroup.D2, suffixLen: 1, caseGenitive: 'mēness', caseVocative: 'mēness' },
  sāls: { declensionGroup: DeclensionGroup.D2, suffixLen: 1, caseGenitive: 'sāls', caseVocative: 'sāl' },

  // D3
  pelus: { declensionGroup: DeclensionGroup.D3, gender: Gender.feminine, caseDative: 'pelūm', caseLocative: 'pelūs', pluralOnly: true },
  ragus: { declensionGroup: DeclensionGroup.D3, gender: Gender.feminine, caseDative: 'ragūm', caseLocative: 'ragūs', pluralOnly: true },
  dzirnus: { declensionGroup: DeclensionGroup.D3, gender: Gender.feminine, caseDative: 'dzirnūm', caseLocative: 'dzirnūs', pluralOnly: true },

  // D4
  puika: { declensionGroup: DeclensionGroup.D4, gender: Gender.masculine },
  lauva: { declensionGroup: DeclensionGroup.D4, gender: Gender.masculine },
  janka: { declensionGroup: DeclensionGroup.D4, gender: Gender.masculine },
  meita: { declensionGroup: DeclensionGroup.D4, gender: Gender.masculine, caseVocative: 'meit' },
  māsa: { declensionGroup: DeclensionGroup.D4, gender: Gender.masculine, caseVocative: 'mās' },
  ragavas: { declensionGroup: DeclensionGroup.D4, suffixLen: 2, pluralOnly: true },
  sieva: { declensionGroup: DeclensionGroup.D4, gender: Gender.masculine, caseVocative: 'siev' },

  // D5
  bikses: { declensionGroup: DeclensionGroup.D5, suffixLen: 2, pluralOnly: true },
  bende: { declensionGroup: DeclensionGroup.D5, gender: Gender.masculine },
  kase: { declensionGroup: DeclensionGroup.D5, usePalatalized: false },

  // D6 (including plural-only)
  acs: { declensionGroup: DeclensionGroup.D6, usePalatalized: false },
  asins: { declensionGroup: DeclensionGroup.D6 },
  auss: { declensionGroup: DeclensionGroup.D6, usePalatalized: false },
  avs: { declensionGroup: DeclensionGroup.D6 },
  azots: { declensionGroup: DeclensionGroup.D6 },
  balss: { declensionGroup: DeclensionGroup.D6, usePalatalized: false },
  birzs: { declensionGroup: DeclensionGroup.D6 },
  blakts: { declensionGroup: DeclensionGroup.D6 },
  brokastis: { declensionGroup: DeclensionGroup.D6, usePalatalized: false, suffixLen: 2, pluralOnly: true },
  cēsis: { declensionGroup: DeclensionGroup.D6, usePalatalized: false, suffixLen: 2, pluralOnly: true },
  cilts: { declensionGroup: DeclensionGroup.D6 },
  dakts: { declensionGroup: DeclensionGroup.D6 },
  debess: { declensionGroup: DeclensionGroup.D6, usePalatalized: false },
  durvis: { declensionGroup: DeclensionGroup.D6, suffixLen: 2, pluralOnly: true },
  dūksts: { declensionGroup: DeclensionGroup.D6, usePalatalized: false },
  dzelzs: { declensionGroup: DeclensionGroup.D6, usePalatalized: false },
  govs: { declensionGroup: DeclensionGroup.D6 },
  ilkss: { declensionGroup: DeclensionGroup.D6 },
  izkapts: { declensionGroup: DeclensionGroup.D6 },
  jūtis: { declensionGroup: DeclensionGroup.D6, usePalatalized: false, suffixLen: 2, pluralOnly: true },
  kārts: { declensionGroup: DeclensionGroup.D6 },
  klēts: { declensionGroup: DeclensionGroup.D6 },
  klints: { declensionGroup: DeclensionGroup.D6 },
  krāsns: { declensionGroup: DeclensionGroup.D6 },
  krūts: { declensionGroup: DeclensionGroup.D6 },
  kūts: { declensionGroup: DeclensionGroup.D6 },
  līksts: { declensionGroup: DeclensionGroup.D6 },
  lecekts: { declensionGroup: DeclensionGroup.D6 },
  ļaudis: { declensionGroup: DeclensionGroup.D6, suffixLen: 2, gender: Gender.masculine, pluralOnly: true },
  maksts: { declensionGroup: DeclensionGroup.D6, usePalatalized: false },
  nāss: { declensionGroup: DeclensionGroup.D6 },
  nakts: { declensionGroup: DeclensionGroup.D6 },
  nots: { declensionGroup: DeclensionGroup.D6 },
  olekts: { declensionGroup: DeclensionGroup.D6 },
  pāksts: { declensionGroup: DeclensionGroup.D6 },
  palts: { declensionGroup: DeclensionGroup.D6 },
  pils: { declensionGroup: DeclensionGroup.D6 },
  pirts: { declensionGroup: DeclensionGroup.D6 },
  plīts: { declensionGroup: DeclensionGroup.D6 },
  pults: { declensionGroup: DeclensionGroup.D6, usePalatalized: false },
  sakts: { declensionGroup: DeclensionGroup.D6 },
  šalts: { declensionGroup: DeclensionGroup.D6 },
  sirds: { declensionGroup: DeclensionGroup.D6 },
  smilts: { declensionGroup: DeclensionGroup.D6 },
  telts: { declensionGroup: DeclensionGroup.D6 },
  takts: { declensionGroup: DeclensionGroup.D6 },
  tāss: { declensionGroup: DeclensionGroup.D6 },
  uguns: { declensionGroup: DeclensionGroup.D6 },
  uts: { declensionGroup: DeclensionGroup.D6, usePalatalized: false },
  valsts: { declensionGroup: DeclensionGroup.D6, usePalatalized: false },
  vāts: { declensionGroup: DeclensionGroup.D6 },
  vēsts: { declensionGroup: DeclensionGroup.D6, usePalatalized: false },
  zivs: { declensionGroup: DeclensionGroup.D6 },
  zoss: { declensionGroup: DeclensionGroup.D6, usePalatalized: false },
  žults: { declensionGroup: DeclensionGroup.D6, usePalatalized: false },

  // DIndeclinable
  bakarā: { declensionGroup: DeclensionGroup.DIndeclinable, pluralOnly: true },

  // DPronoun
  es: { declensionGroup: DeclensionGroup.DPronoun, gender: Gender.unknown, caseGenitive: 'manis', caseDative: 'man', caseAccusative: 'mani', caseInstrumental: 'mani', caseLocative: 'manī', linkedPlural: 'mēs' },
  mēs: { declensionGroup: DeclensionGroup.DPronoun, gender: Gender.unknown, caseGenitive: 'mūsu', caseDative: 'mums', caseAccusative: 'mūs', caseInstrumental: 'mums', caseLocative: 'mūsos', pluralOnly: true },
  tu: { declensionGroup: DeclensionGroup.DPronoun, gender: Gender.unknown, caseGenitive: 'tevis', caseDative: 'tev', caseAccusative: 'tevi', caseInstrumental: 'tevi', caseLocative: 'tevī', linkedPlural: 'jūs' },
  jūs: { declensionGroup: DeclensionGroup.DPronoun, gender: Gender.unknown, caseGenitive: 'jūsu', caseDative: 'jums', caseAccusative: 'jūs', caseInstrumental: 'jums', caseLocative: 'jūsos', pluralOnly: true },
  pats: { declensionGroup: DeclensionGroup.DPronoun, gender: Gender.masculine, caseGenitive: 'paša', caseDative: 'pašam', caseAccusative: 'pašu', caseInstrumental: 'pašu', caseLocative: 'pašā', linkedPlural: 'paši' },
  paši: { declensionGroup: DeclensionGroup.DPronoun, gender: Gender.masculine, caseGenitive: 'pašu', caseDative: 'pašiem', caseAccusative: 'pašus', caseInstrumental: 'pašiem', caseLocative: 'pašos', pluralOnly: true },
  pati: { declensionGroup: DeclensionGroup.DPronoun, gender: Gender.feminine, caseGenitive: 'pašas', caseDative: 'pašai', caseAccusative: 'pašu', caseInstrumental: 'pašu', caseLocative: 'pašā', linkedPlural: 'pašas' },
  pašas: { declensionGroup: DeclensionGroup.DPronoun, gender: Gender.feminine, caseGenitive: 'pašu', caseDative: 'pašām', caseAccusative: 'pašas', caseInstrumental: 'pašām', caseLocative: 'pašās', pluralOnly: true },
  tas: { declensionGroup: DeclensionGroup.DPronoun, gender: Gender.masculine, caseGenitive: 'tā', caseDative: 'tam', caseAccusative: 'to', caseInstrumental: 'to', caseLocative: 'tajā', linkedPlural: 'tie' },
  tie: { declensionGroup: DeclensionGroup.DPronoun, gender: Gender.masculine, caseGenitive: 'to', caseDative: 'tiem', caseAccusative: 'tos', caseInstrumental: 'tiem', caseLocative: 'tajos', pluralOnly: true },
  tā: { declensionGroup: DeclensionGroup.DPronoun, gender: Gender.masculine, caseGenitive: 'tās', caseDative: 'tai', caseAccusative: 'to', caseInstrumental: 'to', caseLocative: 'tajā', linkedPlural: 'tās' },
  tās: { declensionGroup: DeclensionGroup.DPronoun, gender: Gender.masculine, caseGenitive: 'to', caseDative: 'tām', caseAccusative: 'tās', caseInstrumental: 'tām', caseLocative: 'tajās', pluralOnly: true },
  šis: { declensionGroup: DeclensionGroup.DPronoun, gender: Gender.masculine, caseGenitive: 'šī', caseDative: 'šim', caseAccusative: 'šo', caseInstrumental: 'šo', caseLocative: 'šajā', linkedPlural: 'šie' },
  šie: { declensionGroup: DeclensionGroup.DPronoun, gender: Gender.masculine, caseGenitive: 'šo', caseDative: 'šiem', caseAccusative: 'šos', caseInstrumental: 'šiem', caseLocative: 'šajos', pluralOnly: true },
  šī: { declensionGroup: DeclensionGroup.DPronoun, gender: Gender.feminine, caseGenitive: 'šīs', caseDative: 'šai', caseAccusative: 'šo', caseInstrumental: 'šo', caseLocative: 'šajā', linkedPlural: 'šīs' },
  šīs: { declensionGroup: DeclensionGroup.DPronoun, gender: Gender.feminine, caseGenitive: 'šo', caseDative: 'šīm', caseAccusative: 'šīs', caseInstrumental: 'šīm', caseLocative: 'šajās', pluralOnly: true },

  // Numerals
  divi: { declensionGroup: DeclensionGroup.D1, pluralOnly: true },
  trīs: { declensionGroup: DeclensionGroup.unknown, caseGenitive: 'triju', caseDative: 'trim', caseAccusative: 'trīs', caseInstrumental: 'trim', caseLocative: 'trīs', caseVocative: 'trīs', pluralOnly: true },
  četri: { declensionGroup: DeclensionGroup.D1, pluralOnly: true },
  pieci: { declensionGroup: DeclensionGroup.D1, pluralOnly: true },
  seši: { declensionGroup: DeclensionGroup.D1, pluralOnly: true },
  septiņi: { declensionGroup: DeclensionGroup.D1, pluralOnly: true },
  astoņi: { declensionGroup: DeclensionGroup.D1, pluralOnly: true },
  deviņi: { declensionGroup: DeclensionGroup.D1, pluralOnly: true },
  divas: { declensionGroup: DeclensionGroup.D4, pluralOnly: true },
  četras: { declensionGroup: DeclensionGroup.D4, pluralOnly: true },
  piecas: { declensionGroup: DeclensionGroup.D4, pluralOnly: true },
  sešas: { declensionGroup: DeclensionGroup.D4, pluralOnly: true },
  septiņas: { declensionGroup: DeclensionGroup.D4, pluralOnly: true },
  astoņas: { declensionGroup: DeclensionGroup.D4, pluralOnly: true },
  deviņas: { declensionGroup: DeclensionGroup.D4, pluralOnly: true },
};

export default specialCases;
export {
  SpecialCaseProperties,
};
