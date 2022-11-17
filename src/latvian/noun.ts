import LatvianException from './exception';
import {
  CapsStyle, Category, Gender, DeclensionGroup, GNumber, Case,
} from './enums';
import {
  validateWord, getCapsStyle, setCapsStyle, getSyllableCount,
} from './utils';
import specialCases, { SpecialCaseProperties } from './nounSpecialCases';

const declensionSuffixLen: { [key in DeclensionGroup]: number } = {
  0: 0, // unknown
  1: 1, // D1: mast-s, vēj-š
  2: 2, // D2: apl-is
  3: 2, // D3: med-us
  4: 1, // D4: naud-a
  5: 1, // D5: zemen-e
  6: 1, // D6: krāsn-s
  7: 3, // DReflexiveM: klausītāj-ies
  8: 2, // DReflexiveF: atgriešan-ās
  9: 3, // DDefiniteAdjectiveM: liel-ais
  10: 1, // DDefiniteAdjectiveF: skaist-ā
  11: 0, // DPronoun: es, tu, etc.
  99: 0, // DIndeclinable: kino, desmit
};

const declensionGender: { [key in DeclensionGroup]: Gender } = {
  0: Gender.unknown, // unknown
  1: Gender.masculine, // masculine1: mast-s, vēj-š
  2: Gender.masculine, // masculine2: apl-is
  3: Gender.masculine, // masculine3: med-us
  4: Gender.feminine, // feminine4: naud-a
  5: Gender.feminine, // feminine5: zemen-e
  6: Gender.feminine, // feminine6: krāsn-s
  7: Gender.masculine, // masculineReflexive: klausītāj-ies
  8: Gender.feminine, // feminineReflexive: atgriešan-ās
  9: Gender.masculine, // DDefiniteAdjectiveM: liel-ais
  10: Gender.feminine, // DDefiniteAdjectiveF: skaist-ā
  11: Gender.unknown, // DPronoun: es, tu, etc.
  99: Gender.unknown, // DIndeclinable: desmit
};

export type NounOptions = {
  overrideGender?: Gender,
  properNoun?: boolean,
  useArWithInstrumental?: boolean,
  usePalatalizedR?: boolean
};

/**
 * Represents a noun in Latvian language
 */
class Noun {
  /**
   * The base form of the noun: singular, nominative
   */
  base: string;

  options: NounOptions;

  root = '';

  rootPalatalised = '';

  capsStyle: CapsStyle = 0;

  isAnalyzed = false;

  hasInflections = false;

  inflections: string[][] = [[], []];

  category: Category = Category.unknown;

  gender: Gender = Gender.unknown;

  declensionGroup: DeclensionGroup = DeclensionGroup.unknown;

  suffixLen = 0;

  singularOnly = false;

  pluralOnly = false;

  usePalatalized?: boolean;

  /**
   * @param word  Noun The noun in the base form: singular, nominative
   * @param knownGender  Pre-set gender, used in special cases when auto-detected gender is wrong.
   */
  constructor(word:string, options?: NounOptions) {
    // Store the options
    const defaultOptionsSet: NounOptions = {
      overrideGender: Gender.unknown,
      properNoun: false,
      useArWithInstrumental: true,
    };
    const optionsSet = { ...defaultOptionsSet, ...options };
    this.options = optionsSet;
    if (optionsSet.overrideGender !== undefined) this.gender = optionsSet.overrideGender;

    if (!validateWord(word)) throw new LatvianException('INVALID_WORD', `Invalid Latvian word: ${word}.`);

    this.base = word.toLowerCase();

    this.capsStyle = getCapsStyle(word);
    if (this.capsStyle === 0) throw new LatvianException('MIXED_CAPS', `Mixed capitalization style: ${word}.`);
  }

  /**
   * Analyze the noun to detect its properties: category, gender, declension and number.
   */
  analyze(): void {
    if (this.isAnalyzed) return;

    if (this.base in specialCases) {
      // With special cases, their properties override the defaults
      const specialCaseProperties = specialCases[this.base];
      this.analyzeSpecialCase(specialCaseProperties);
    } else {
      // Normal case
      this.analyzeNormalCase();
    }

    this.root = this.base.substring(0, this.base.length - this.suffixLen);

    this.rootPalatalised = Noun.palatalize(this.root, this.options.usePalatalizedR);

    this.isAnalyzed = true;
  }

  /**
   * Analyze the noun as a normal case.
   */
  private analyzeNormalCase(): void {
    if (this.base.endsWith('ais')) {
      this.declensionGroup = DeclensionGroup.DDefiniteAdjectiveM;
    } else if (this.base.endsWith('is')) {
      // Ends with -is, except D6 nouns in plural (finite list added in exceptions)
      this.declensionGroup = DeclensionGroup.D2;
    } else if (this.base.endsWith('us')) {
      // Ends with -us
      this.declensionGroup = DeclensionGroup.D3;
    } else if (this.base.endsWith('tājies') || this.base.endsWith('ējies') || this.base.endsWith('umies')) {
      // Ends with -tājies, -ējies, -umies
      this.declensionGroup = DeclensionGroup.DReflexiveM;
    } else if (this.base.endsWith('šanās') || this.base.endsWith('tājās') || this.base.endsWith('ējās')) {
      // Ends with -tājās, -ējās, -šanās
      this.declensionGroup = DeclensionGroup.DReflexiveF;
    } else if (this.base.endsWith('s') || this.base.endsWith('š')) {
      // Ends with -s (Wardning: check all the other -xs suffixes before this last case)
      this.declensionGroup = DeclensionGroup.D1;
    } else if (this.base.endsWith('a')) {
      // Ends with -a
      this.declensionGroup = DeclensionGroup.D4;
    } else if (this.base.endsWith('e')) {
      // Ends with -e
      this.declensionGroup = DeclensionGroup.D5;
    } else if (this.base.endsWith('ā')) {
      // Ends with -ā
      this.declensionGroup = DeclensionGroup.DDefiniteAdjectiveF;
    } else if (this.base.endsWith('o') || this.base.endsWith('ē') || this.base.endsWith('ī') || this.base.endsWith('ū') || this.base.endsWith('padsmit') || this.base.endsWith('desmit')) {
      // Ends with -o, -ē, -ī, -ū, -padsmit, -desmit
      this.declensionGroup = DeclensionGroup.DIndeclinable;
    }

    this.suffixLen = declensionSuffixLen[this.declensionGroup];
    if (!this.gender) {
      this.gender = declensionGender[this.declensionGroup];
    }
  }

  /**
   * Analyze the noun according to the special case properties.
   */
  private analyzeSpecialCase(properties: SpecialCaseProperties): void {
    if (properties.declensionGroup) {
      this.declensionGroup = properties.declensionGroup;
      if (properties.suffixLen) {
        // Use special suffix length value
        this.suffixLen = properties.suffixLen;
      } else {
        // Use default suffix length value, according to the given declension
        this.suffixLen = declensionSuffixLen[properties.declensionGroup];
      }
      // Unless the gender is overriden by noun options, or it is specified in the special
      // case spec, derive the gender from the declension group.
      if (!this.gender && properties.gender === undefined) {
        this.gender = declensionGender[properties.declensionGroup];
      }
    }
    if (!this.gender && properties.gender !== undefined) {
      this.gender = properties.gender;
    }
    if (properties.caseGenitive) {
      this.setDeclension(GNumber.singular, Case.genitive, properties.caseGenitive);
    }
    if (properties.caseDative) {
      this.setDeclension(GNumber.singular, Case.dative, properties.caseDative);
    }
    if (properties.caseAccusative) {
      this.setDeclension(GNumber.singular, Case.accusative, properties.caseAccusative);
    }
    if (properties.caseInstrumental) {
      this.setDeclension(GNumber.singular, Case.instrumental, properties.caseInstrumental);
    }
    if (properties.caseLocative) {
      this.setDeclension(GNumber.singular, Case.locative, properties.caseLocative);
    }
    if (properties.caseVocative) {
      this.setDeclension(GNumber.singular, Case.vocative, properties.caseVocative);
    }
    if (properties.linkedPlural) {
      if (properties.linkedPlural === this.base) throw new LatvianException('INVALID_PLURAL_FORM', `Plural form can not be identical to the base word: ${this.base}.`);
      const plural = new Noun(properties.linkedPlural, { useArWithInstrumental: false });
      [
        Case.nominative,
        Case.genitive,
        Case.dative,
        Case.accusative,
        Case.instrumental,
        Case.locative,
        Case.vocative,
      ].forEach((nounCase) => {
        try {
          // Particular singular declention might not exist
          this.setDeclension(GNumber.plural, nounCase, plural.declension(nounCase));
        } catch (e) {
          // empty
        }
      });
    }
    if (properties.pluralOnly) {
      this.pluralOnly = properties.pluralOnly;
      this.setDeclension(GNumber.plural, Case.nominative, this.base);
      if (properties.caseGenitive) {
        this.setDeclension(GNumber.plural, Case.genitive, properties.caseGenitive);
      }
      if (properties.caseDative) {
        this.setDeclension(GNumber.plural, Case.dative, properties.caseDative);
      }
      if (properties.caseAccusative) {
        this.setDeclension(GNumber.plural, Case.accusative, properties.caseAccusative);
      }
      if (properties.caseInstrumental) {
        this.setDeclension(GNumber.plural, Case.instrumental, properties.caseInstrumental);
      }
      if (properties.caseLocative) {
        this.setDeclension(GNumber.plural, Case.locative, properties.caseLocative);
      }
      if (properties.caseVocative) {
        this.setDeclension(GNumber.plural, Case.vocative, properties.caseVocative);
      }
    }
    if ('usePalatalized' in properties) {
      this.usePalatalized = properties.usePalatalized;
    }
  }

  setDeclension(gNumber: GNumber, caseIndex: Case, word: string): void {
    if (this.pluralOnly && gNumber === GNumber.singular) return;
    if (this.inflections[gNumber][caseIndex]) return;
    this.inflections[gNumber][caseIndex] = word;
  }

  /**
   * Populate the inflections according to the noun properties.
   */
  decline(): void {
    if (this.hasInflections) return;

    if (!this.isAnalyzed) {
      this.analyze();
    }

    this.setDeclension(GNumber.singular, Case.nominative, this.base);

    if (this.declensionGroup === DeclensionGroup.D1) {
      // mast-s, vēj-š
      let shortVocative = false;
      if (
        this.options.properNoun
        || this.base.endsWith('ējs')
        || this.base.endsWith('ājs')
        || this.base.endsWith('iņš')
        || this.base.endsWith('nieks')
      ) shortVocative = true;
      this.setDeclension(GNumber.singular, Case.genitive, `${this.root}a`);
      this.setDeclension(GNumber.singular, Case.dative, `${this.root}am`);
      this.setDeclension(GNumber.singular, Case.accusative, `${this.root}u`);
      this.setDeclension(GNumber.singular, Case.instrumental, `${this.root}u`);
      this.setDeclension(GNumber.singular, Case.locative, `${this.root}ā`);
      this.setDeclension(GNumber.singular, Case.vocative, shortVocative ? this.root : this.base);
      this.setDeclension(GNumber.plural, Case.nominative, `${this.root}i`);
      this.setDeclension(GNumber.plural, Case.genitive, `${this.root}u`);
      this.setDeclension(GNumber.plural, Case.dative, `${this.root}iem`);
      this.setDeclension(GNumber.plural, Case.accusative, `${this.root}us`);
      this.setDeclension(GNumber.plural, Case.instrumental, `${this.root}iem`);
      this.setDeclension(GNumber.plural, Case.locative, `${this.root}os`);
      this.setDeclension(GNumber.plural, Case.vocative, `${this.root}i`);
    }

    if (this.declensionGroup === DeclensionGroup.D2) {
      // apl-is
      if (this.usePalatalized === undefined) {
        this.usePalatalized = true;
        if (
          this.base.endsWith('ckis')
          || this.base.endsWith('skis')
          || this.base.endsWith('astis')
          || this.base.endsWith('atis')
          || (this.options.properNoun && this.base.endsWith('tis') && getSyllableCount(this.base) < 3)
          || (this.options.properNoun && this.base.endsWith('dis') && getSyllableCount(this.base) < 3)
        ) this.usePalatalized = false;
      }
      this.setDeclension(GNumber.singular, Case.genitive, `${this.usePalatalized ? this.rootPalatalised : this.root}a`);
      this.setDeclension(GNumber.singular, Case.dative, `${this.root}im`);
      this.setDeclension(GNumber.singular, Case.accusative, `${this.root}i`);
      this.setDeclension(GNumber.singular, Case.instrumental, `${this.root}i`);
      this.setDeclension(GNumber.singular, Case.locative, `${this.root}ī`);
      this.setDeclension(GNumber.singular, Case.vocative, `${this.root}i`);
      this.setDeclension(GNumber.plural, Case.nominative, `${this.usePalatalized ? this.rootPalatalised : this.root}i`);
      this.setDeclension(GNumber.plural, Case.genitive, `${this.usePalatalized ? this.rootPalatalised : this.root}u`);
      this.setDeclension(GNumber.plural, Case.dative, `${this.usePalatalized ? this.rootPalatalised : this.root}iem`);
      this.setDeclension(GNumber.plural, Case.accusative, `${this.usePalatalized ? this.rootPalatalised : this.root}us`);
      this.setDeclension(GNumber.plural, Case.instrumental, `${this.usePalatalized ? this.rootPalatalised : this.root}iem`);
      this.setDeclension(GNumber.plural, Case.locative, `${this.usePalatalized ? this.rootPalatalised : this.root}os`);
      this.setDeclension(GNumber.plural, Case.vocative, `${this.usePalatalized ? this.rootPalatalised : this.root}i`);
    }

    if (this.declensionGroup === DeclensionGroup.D3) {
      // med-us
      const dativeSuffix = this.gender === Gender.masculine ? 'um' : 'ui';
      this.setDeclension(GNumber.singular, Case.genitive, this.base);
      this.setDeclension(GNumber.singular, Case.dative, `${this.root}${dativeSuffix}`);
      this.setDeclension(GNumber.singular, Case.accusative, `${this.root}u`);
      this.setDeclension(GNumber.singular, Case.instrumental, `${this.root}u`);
      this.setDeclension(GNumber.singular, Case.locative, `${this.root}ū`);
      this.setDeclension(GNumber.singular, Case.vocative, `${this.root}u`);
      this.setDeclension(GNumber.plural, Case.genitive, `${this.root}u`);
      this.setDeclension(GNumber.plural, Case.accusative, `${this.root}us`);
      if (this.gender === Gender.masculine) {
        this.setDeclension(GNumber.plural, Case.nominative, `${this.root}i`);
        this.setDeclension(GNumber.plural, Case.dative, `${this.root}iem`);
        this.setDeclension(GNumber.plural, Case.instrumental, `${this.root}iem`);
        this.setDeclension(GNumber.plural, Case.locative, `${this.root}os`);
        this.setDeclension(GNumber.plural, Case.vocative, `${this.root}i`);
      } else {
        this.setDeclension(GNumber.plural, Case.nominative, `${this.root}us`);
        this.setDeclension(GNumber.plural, Case.dative, `${this.root}ūm`);
        this.setDeclension(GNumber.plural, Case.instrumental, `${this.root}ūm`);
        this.setDeclension(GNumber.plural, Case.locative, `${this.root}ūs`);
        this.setDeclension(GNumber.plural, Case.vocative, `${this.root}us`);
      }
    }

    if (this.declensionGroup === DeclensionGroup.D4) {
      // naud-a
      const dativeSuffix = this.gender === Gender.masculine ? 'am' : 'ai';
      const vocativeSuffix = getSyllableCount(this.base) < 3 ? 'a' : '';
      this.setDeclension(GNumber.singular, Case.genitive, `${this.root}as`);
      this.setDeclension(GNumber.singular, Case.dative, `${this.root}${dativeSuffix}`);
      this.setDeclension(GNumber.singular, Case.accusative, `${this.root}u`);
      this.setDeclension(GNumber.singular, Case.instrumental, `${this.root}u`);
      this.setDeclension(GNumber.singular, Case.locative, `${this.root}ā`);
      this.setDeclension(GNumber.singular, Case.vocative, `${this.root}${vocativeSuffix}`);
      this.setDeclension(GNumber.plural, Case.nominative, `${this.root}as`);
      this.setDeclension(GNumber.plural, Case.genitive, `${this.root}u`);
      this.setDeclension(GNumber.plural, Case.dative, `${this.root}ām`);
      this.setDeclension(GNumber.plural, Case.accusative, `${this.root}as`);
      this.setDeclension(GNumber.plural, Case.instrumental, `${this.root}ām`);
      this.setDeclension(GNumber.plural, Case.locative, `${this.root}ās`);
      this.setDeclension(GNumber.plural, Case.vocative, `${this.root}as`);
    }

    if (this.declensionGroup === DeclensionGroup.D5) {
      // zemen-e
      if (this.usePalatalized === undefined) this.usePalatalized = true;
      const dativeSuffix = this.gender === Gender.masculine ? 'em' : 'ei';
      const vocativeSuffix = getSyllableCount(this.base) < 3 ? 'e' : '';
      this.setDeclension(GNumber.singular, Case.genitive, `${this.root}es`);
      this.setDeclension(GNumber.singular, Case.dative, `${this.root}${dativeSuffix}`);
      this.setDeclension(GNumber.singular, Case.accusative, `${this.root}i`);
      this.setDeclension(GNumber.singular, Case.instrumental, `${this.root}i`);
      this.setDeclension(GNumber.singular, Case.locative, `${this.root}ē`);
      this.setDeclension(GNumber.singular, Case.vocative, `${this.root}${vocativeSuffix}`);
      this.setDeclension(GNumber.plural, Case.nominative, `${this.root}es`);
      this.setDeclension(GNumber.plural, Case.genitive, `${this.usePalatalized ? this.rootPalatalised : this.root}u`);
      this.setDeclension(GNumber.plural, Case.dative, `${this.root}ēm`);
      this.setDeclension(GNumber.plural, Case.accusative, `${this.root}es`);
      this.setDeclension(GNumber.plural, Case.instrumental, `${this.root}ēm`);
      this.setDeclension(GNumber.plural, Case.locative, `${this.root}ēs`);
      this.setDeclension(GNumber.plural, Case.vocative, `${this.root}es`);
    }

    if (this.declensionGroup === DeclensionGroup.D6) {
      // krāsn-s
      if (this.usePalatalized === undefined) this.usePalatalized = true;
      const dativeSuffix = this.gender === Gender.feminine ? 'ij' : 'im';
      this.setDeclension(GNumber.singular, Case.genitive, `${this.root}s`);
      this.setDeclension(GNumber.singular, Case.dative, `${this.root}${dativeSuffix}`);
      this.setDeclension(GNumber.singular, Case.accusative, `${this.root}i`);
      this.setDeclension(GNumber.singular, Case.instrumental, `${this.root}i`);
      this.setDeclension(GNumber.singular, Case.locative, `${this.root}ī`);
      this.setDeclension(GNumber.singular, Case.vocative, this.base);
      this.setDeclension(GNumber.plural, Case.nominative, `${this.root}is`);
      this.setDeclension(GNumber.plural, Case.genitive, `${this.usePalatalized ? this.rootPalatalised : this.root}u`);
      this.setDeclension(GNumber.plural, Case.dative, `${this.root}īm`);
      this.setDeclension(GNumber.plural, Case.accusative, `${this.root}is`);
      this.setDeclension(GNumber.plural, Case.instrumental, `${this.root}īm`);
      this.setDeclension(GNumber.plural, Case.locative, `${this.root}īs`);
      this.setDeclension(GNumber.plural, Case.vocative, `${this.root}is`);
    }

    if (this.declensionGroup === DeclensionGroup.DReflexiveM) {
      // klausītāj-ies
      this.setDeclension(GNumber.singular, Case.genitive, `${this.root}ās`);
      this.setDeclension(GNumber.singular, Case.accusative, `${this.root}os`);
      this.setDeclension(GNumber.singular, Case.instrumental, `${this.root}os`);
      this.setDeclension(GNumber.plural, Case.nominative, this.base);
      this.setDeclension(GNumber.plural, Case.genitive, `${this.root}os`);
      this.setDeclension(GNumber.plural, Case.accusative, `${this.root}os`);
    }

    if (this.declensionGroup === DeclensionGroup.DReflexiveF) {
      // atgriešan-ās
      this.setDeclension(GNumber.singular, Case.genitive, this.base);
      this.setDeclension(GNumber.singular, Case.accusative, `${this.root}os`);
      this.setDeclension(GNumber.singular, Case.instrumental, `${this.root}os`);
      this.setDeclension(GNumber.plural, Case.nominative, this.base);
      this.setDeclension(GNumber.plural, Case.genitive, `${this.root}os`);
      this.setDeclension(GNumber.plural, Case.accusative, this.base);
    }

    if (this.declensionGroup === DeclensionGroup.DDefiniteAdjectiveM) {
      // liel-ais
      let singularDativeSuffix = 'ajam';
      let singularLocativeSuffix = 'ajā';
      let pluralDativeSuffix = 'ajiem';
      let pluralLocativeSuffix = 'ajos';
      if (this.base.endsWith('amais') || this.base.endsWith('ējais') || getSyllableCount(this.base) > 3) {
        singularDativeSuffix = 'am';
        singularLocativeSuffix = 'ā';
        pluralDativeSuffix = 'iem';
        pluralLocativeSuffix = 'os';
      }
      this.setDeclension(GNumber.singular, Case.genitive, `${this.root}ā`);
      this.setDeclension(GNumber.singular, Case.dative, `${this.root}${singularDativeSuffix}`);
      this.setDeclension(GNumber.singular, Case.accusative, `${this.root}o`);
      this.setDeclension(GNumber.singular, Case.instrumental, `${this.root}o`);
      this.setDeclension(GNumber.singular, Case.locative, `${this.root}${singularLocativeSuffix}`);
      this.setDeclension(GNumber.singular, Case.vocative, `${this.base}`);
      this.setDeclension(GNumber.plural, Case.nominative, `${this.root}ie`);
      this.setDeclension(GNumber.plural, Case.genitive, `${this.root}o`);
      this.setDeclension(GNumber.plural, Case.dative, `${this.root}${pluralDativeSuffix}`);
      this.setDeclension(GNumber.plural, Case.accusative, `${this.root}os`);
      this.setDeclension(GNumber.plural, Case.instrumental, `${this.root}${pluralDativeSuffix}`);
      this.setDeclension(GNumber.plural, Case.locative, `${this.root}${pluralLocativeSuffix}`);
      this.setDeclension(GNumber.plural, Case.vocative, `${this.root}ie`);
    }

    if (this.declensionGroup === DeclensionGroup.DDefiniteAdjectiveF) {
      // skaist-ā
      let singularDativeSuffix = 'ajai';
      let singularLocativeSuffix = 'ajā';
      let pluralDativeSuffix = 'ajām';
      let pluralLocativeSuffix = 'ajās';
      if (this.base.endsWith('amā') || this.base.endsWith('ējā') || getSyllableCount(this.base) > 3) {
        singularDativeSuffix = 'ai';
        singularLocativeSuffix = 'ā';
        pluralDativeSuffix = 'ām';
        pluralLocativeSuffix = 'ās';
      }
      this.setDeclension(GNumber.singular, Case.genitive, `${this.root}ās`);
      this.setDeclension(GNumber.singular, Case.dative, `${this.root}${singularDativeSuffix}`);
      this.setDeclension(GNumber.singular, Case.accusative, `${this.root}o`);
      this.setDeclension(GNumber.singular, Case.instrumental, `${this.root}o`);
      this.setDeclension(GNumber.singular, Case.locative, `${this.root}${singularLocativeSuffix}`);
      this.setDeclension(GNumber.singular, Case.vocative, `${this.base}`);
      this.setDeclension(GNumber.plural, Case.nominative, `${this.root}ās`);
      this.setDeclension(GNumber.plural, Case.genitive, `${this.root}o`);
      this.setDeclension(GNumber.plural, Case.dative, `${this.root}${pluralDativeSuffix}`);
      this.setDeclension(GNumber.plural, Case.accusative, `${this.root}ās`);
      this.setDeclension(GNumber.plural, Case.instrumental, `${this.root}${pluralDativeSuffix}`);
      this.setDeclension(GNumber.plural, Case.locative, `${this.root}${pluralLocativeSuffix}`);
      this.setDeclension(GNumber.plural, Case.vocative, `${this.root}ās`);
    }

    if (this.declensionGroup === DeclensionGroup.DIndeclinable) {
      // figar-o
      this.setDeclension(GNumber.singular, Case.genitive, this.base);
      this.setDeclension(GNumber.singular, Case.dative, this.base);
      this.setDeclension(GNumber.singular, Case.accusative, this.base);
      this.setDeclension(GNumber.singular, Case.instrumental, this.base);
      this.setDeclension(GNumber.singular, Case.locative, this.base);
      this.setDeclension(GNumber.singular, Case.vocative, this.base);
      this.setDeclension(GNumber.plural, Case.nominative, this.base);
      this.setDeclension(GNumber.plural, Case.genitive, this.base);
      this.setDeclension(GNumber.plural, Case.dative, this.base);
      this.setDeclension(GNumber.plural, Case.accusative, this.base);
      this.setDeclension(GNumber.plural, Case.instrumental, this.base);
      this.setDeclension(GNumber.plural, Case.locative, this.base);
      this.setDeclension(GNumber.plural, Case.vocative, this.base);
    }

    this.hasInflections = true;
  }

  /**
   * Returns the noun inflection, according to the given grammatical case.
   *
   * @param case  grammatical case
   */
  declension(caseIndex:Case, numberIndexP?:GNumber): string {
    if (!this.hasInflections) {
      this.decline();
    }

    const numberIndex = this.pluralOnly ? GNumber.plural : (numberIndexP || GNumber.singular);
    if (!(caseIndex in this.inflections[numberIndex])) {
      throw new LatvianException('NO_CASE', `Case ${caseIndex} is not defined for word ${this.base}.`);
    }
    const inflection = this.inflections[numberIndex][caseIndex];
    const inflectionCapitalized = setCapsStyle(inflection, this.capsStyle);
    if (caseIndex === Case.instrumental && this.options.useArWithInstrumental) {
      return `ar ${inflectionCapitalized}`;
    }
    return inflectionCapitalized;
  }

  /**
   * Palatalizes the root.
   *
   * @param root noun's root
   */
  static palatalize(root: string, usePalatalizedR?: boolean): string {
    if (root.endsWith('sn')) return `${root.slice(0, -2)}šņ`;
    if (root.endsWith('zn')) return `${root.slice(0, -2)}žņ`;
    if (root.endsWith('sl')) return `${root.slice(0, -2)}šļ`;
    if (root.endsWith('zl')) return `${root.slice(0, -2)}žļ`;
    if (root.endsWith('ln')) return `${root.slice(0, -2)}ļņ`;
    if (root.endsWith('st')) return `${root.slice(0, -2)}šķ`;
    if (root.endsWith('ll')) return `${root.slice(0, -2)}ļļ`;
    if (root.endsWith('nn')) return `${root.slice(0, -2)}ņņ`;
    if (root.endsWith('l')) return `${root.slice(0, -1)}ļ`;
    if (usePalatalizedR && root.endsWith('r')) return `${root.slice(0, -1)}ŗ`;
    if (root.endsWith('n')) return `${root.slice(0, -1)}ņ`;
    if (root.endsWith('b')) return `${root.slice(0, -1)}bj`;
    if (root.endsWith('m')) return `${root.slice(0, -1)}mj`;
    if (root.endsWith('p')) return `${root.slice(0, -1)}pj`;
    if (root.endsWith('v')) return `${root.slice(0, -1)}vj`;
    if (root.endsWith('d')) return `${root.slice(0, -1)}ž`;
    if (root.endsWith('z')) return `${root.slice(0, -1)}ž`;
    if (root.endsWith('c')) return `${root.slice(0, -1)}č`;
    if (root.endsWith('k')) return `${root.slice(0, -1)}ķ`;
    if (root.endsWith('g')) return `${root.slice(0, -1)}ģ`;
    if (root.endsWith('t')) return `${root.slice(0, -1)}š`;
    if (root.endsWith('s')) return `${root.slice(0, -1)}š`;

    return root;
  }

  static addSpecialCase(word:string, properties: SpecialCaseProperties): void {
    specialCases[word] = properties;
  }
}

export default Noun;
