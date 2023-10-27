# Deklinators

Deklinators is a Node.js module that allows declination of nouns, pronouns, proper nouns, adjectives, and numerals in the Latvian language. It is possible to derive all cases (nominative, genitive, dative, accusative, instrumental, locative, vocative in both the singular and plural). Deklinators will also handle irregularities and exceptions such as *suns*, *ūdens*, *bende*, *puika*, *ļaudis*, *auss* and many others.

Deklinators is written in TypeScript, and the package includes all the necessary type declarations.

The following authoritative Latvian grammar references were used:

- Latviešu valodas gramatika, LU Latviešu valodas institūts, Rīga, 2013
- Latvian Grammar, University of Latvia Press, Rīga, 2021
- Latvian, An Essential Grammar, Dace Prauliņš, Routledge, 2012
- Latviešu valodas gramatika, V. Baltiņa-Bērziņa, Apgāds Zvaigzne, 1994
- Latviešu gramatika un pareizrakstība, Lidija Ziemele, LAA Skolu nodaļa, 1967
- A Grammar of Modern Latvian, T.G. Fennell, H. Gelsen, Mouton Publishers, 1980

## Installation

```
npm install deklinators
```

## Usage

### Basic Example

The input word must be in the singular nominative case.

```
import { Noun, Case, GNumber } from 'deklinators';

const n = new Noun('ozols');
console.log(n.declension(Case.nominative));
console.log(n.declension(Case.genitive));
console.log(n.declension(Case.dative));
console.log(n.declension(Case.accusative));
console.log(n.declension(Case.instrumental));
console.log(n.declension(Case.locative));
console.log(n.declension(Case.vocative));
console.log(n.declension(Case.nominative, GNumber.plural));
console.log(n.declension(Case.genitive, GNumber.plural));
console.log(n.declension(Case.dative, GNumber.plural));
console.log(n.declension(Case.accusative, GNumber.plural));
console.log(n.declension(Case.instrumental, GNumber.plural));
console.log(n.declension(Case.locative, GNumber.plural));
console.log(n.declension(Case.vocative, GNumber.plural));
```

### Proper nouns

Certain proper nouns have additional rules, for example, it is possible to override the gender for male last names that would normally be detected as feminine gender.

```
import { Noun, Case, Gender } from 'deklinators';

const firstName1 = new Noun('Jānis', {properNoun: true});
const lastName1 = new Noun('Liepa', {properNoun: true, overrideGender: Gender.masculine});
console.log(firstName1.declension(Case.dative), lastName1.declension(Case.dative));

const firstName2 = new Noun('Andris', {properNoun: true});
const lastName2 = new Noun('Sirds', {properNoun: true, overrideGender: Gender.masculine});
console.log(firstName2.declension(Case.dative), lastName2.declension(Case.dative));
```

### Phrases

Here’s an example of how to decline a phrase with nouns and related entities.

```
import { Noun, Case, GNumber } from 'deklinators';

const phrase1 = 'Vaira Vīķe-Freiberga';
console.log(phrase1.split(/([- ])/).map((noun) => /^[- ]$/.test(noun) ? noun : new Noun(noun).declension(Case.dative)).join(''));
const phrase2 = 'šis varenais ozols';
console.log('ar ' + phrase2.split(/([- ])/).map((noun) => /^[- ]$/.test(noun) ? noun : new Noun(noun, {useArWithInstrumental: false}).declension(Case.instrumental, GNumber.plural)).join(''));
```
## Exceptions

In certain circumstances the Deklinators module will throw an exception of `LatvianException` type.

| Type                | Description                                                            |
|---------------------|------------------------------------------------------------------------|
| INVALID_WORD        | Declinable word contains non-Latvian characters.                        |
| NO_CASE             | The word cannot be declined in the requested case. |
| MIXED_CAPS          | Declinable word has mixed character capitalization therefore capitalization style cannot be detected. |
| INVALID_PLURAL_FORM | Special case definition cannot refer to itself as the plural form. Use pluralOnly property instead. |

## Scope

Deklinators includes the following declensions. Special focus is given to the vocative case which is often neglected in Latvian grammar texts.

### First declension (D1)

D1 contains masculine nouns ending in *-s* and *-š*.

The following masculine word groups also follow the D1 declension rules:

1. Indefinite adjectives, eg., *liels*, *skaists*, *apaļš*, *vesels* including all words ending with *-āds*, *-ējs*, *-īgs*, *-isks*, *-ošs*, *-ams*, *-āms*, *-ains*;
2. Proper nouns, eg. *Andrejs*, *Pāvils*, *Egīls*, etc.

The vocative case is identical to the nominative case except for the following:

1. *tēvs* (*tēv!*), *cilvēks* (*cilvēk!*), *biedrs* (*biedri!*);
2. All nouns with ending *-ējs*, *-ājs*, *-iņš*, *-nieks*, *-ums*, *-iens*, *-ēns* will not include the *-s* or *-š* ending (*skolniek!* *mēnestiņ!*);
3. All proper nouns will not include the *-s* or *-š* ending, eg. *Ozoliņš* (*Ozoliņ!*), *Egīls* (*Egīl!*), *Ozols* (*Ozol!*).

### Second declension (D2)

D2 contains masculine nouns ending in *-is* as well as a small group of masculine nouns ending with *-s* (*asmens, mēness, rudens, sāls, ūdens, zibens*).

Palatalisation or consonant change does not occur (Genitive singular and all plural cases) for:
1.	Words ending in *-ckis, -skis, -atis, -astis*;
2.	Words ending in *-tis, -dis* including proper nouns with no more than 2 syllables, eg. *Valdis* (gen. sing. *Valda*), *Atis* (*Ata*);
3.	*tētis, viesis*.

Nouns ending in *-ns* will drop the ending *-s* in the vocative singular case eg. *akmens* (*akmen!*), *rudens* (*ruden!*)

### Third declension (D3)

D3 contains masculine nouns ending in *-us* including the less common feminine plurals *pelus, ragus, dzirnus*.

### Fourth declension (D4)

D4 contains feminine nouns ending in *-a*.

The following feminine word groups also follow the D4 declension rules:

1.	Indefinite adjectives, eg., *liela, skaista, vesela* including all words ending with *-āda, -ēja, -īga, -iska, -oša, -ama, -āma, -aina*;
2.	Proper nouns, eg. *Marta, Daina, Sanita* and others.

Exceptions:

1.	Masculine proper nouns ending with *-a*, eg. *Janka, Ješka, Dauka, Aļoša* and others;
2.	A small set of masculine nouns ending with *-a*, eg. *puika, lauva, pašpuika* and others;
3.	Nouns with both genders, eg. *pļāpa, nejēga, tiepša, nelga, nepraša, plēsoņa* and others.

The vocative case is identical to the nominative case except for the following:

1.	Feminine nouns with more than 2 syllables will drop the *-a* ending;
2.	*Māsa, meita, sieva* will drop the *-a* ending in the vocative (*mās!, meit! siev!*).

### Fifth declension (D5)

D5 contains feminine nouns ending in *-e*.

Variations:

1.	*bende* (*bendem* or *bendei*) in the dative singular. Also applies to masculine proper nouns, eg. *Egle* (*Eglem*)
2.	*liste, aste, azote, māte, kaste, pase, gāze, mute, kase, balle, bāze, flote* and all words ending with -kste do not have a consonant change in the genitive plural, eg. *pase* (*pasu*), *aste* (*astu*)

Feminine nouns with more than 2 syllables will drop the -e ending in the vocative case, other the vocative case is identical to the nominative case.

### Sixth declension (D6)

D6 contains a small set of feminine nouns ending in *-s*.

Variations:
1.	Plural only feminine nouns, *durvis* (gen.pl. *durvju*), *brokastis* (*brokastu*), *Cēsis* (*Cēsu*), *ļaudis* (*ļaužu*)
2.	*acs, akts, auss, uts, debess, zoss, ass, pirksts, pults* and others do not have consonant change in genitive plural, eg. *acu* (not *aču*), *aktu, ausu* etc

### Reflexive nouns (DReflexiveM, DReflexiveF)

Nouns ending in *-šanās, -tājies* and *-ējies*. Reflexive nouns do not belong to any of the six declensions and only the nominative, genitive and accusative cases exist.

### Definite adjectives (DDefiniteAdjectiveM, DDefiniteAdjectiveF)

Masculine adjectives ending in *-ais*. Adjectives with either the nominative ending in *-amais, -ējais* or where there is more than 3 syllables will have the shorter form in the dative and locative cases, eg. *lielais* → *lielajam*, but *pēdējais* → *pēdējam* (not *pēdējajam*), *lējamais* → *lejamā* (not *lejamamā*).

Feminine adjectives ending in *-ā*. Adjectives with either the nominative ending in *-amā, -ējā* or where there is more than 3 syllables will have the shorter form in the dative and locative cases, eg. *lielā* → *lielajai*, but *pēdējā* → *pēdējai* (not *pēdējajai*), *braucamā* → *braucamai* (not *braucamajai*).

### Indeclinable nouns (DIndeclinable)

Proper nouns ending with *-ā, -ē, -ī, -o* or *-ū* are not declined, i.e. are the same in all cases. It is not possible to distinguish between the *-ā* indeclinable noun and the feminine definitive adjective (also ending in *-ā*) and these must be entered as exceptions.

### Pronouns (DPronoun)

Personal pronouns (*viņš, viņa*), interrogative pronouns (*kurš, kura, kāds, kāda*), possessive pronouns (*mans, mana, tavs, tava, savs, sava, manējs, manēja, tavējs, tavēja, viņējs, viņēja*) and demonstrative pronouns (*šāds, šāda, šitāds, šitāda*) follow the declension rules of D1 or D4 depending on the gender.

The pronouns *šis, šī, šie, šīs, tas, tā, tie, tās* are exceptions.

### Numerals

Numerals *viens* (singular) and plurals *divi, divas, četri, četras, pieci, piecas, seši, sešas, septiņi, septiņas, astoņi, astoņas, deviņi, deviņas* follow the declension rules of D1 or D4 depending on the gender.

*trīs* is an exception and all *desmit* and *padsmit* forms are indeclinable.

## Special cases

In the Latvian language there are many special cases when the declension group, gender or number of a noun cannot be detected by analyzing the suffix. To handle these cases there is a list of special case definitions in [src/latvian/nounSpecialCases.ts](src/latvian/nounSpecialCases.ts) file. If you find that this list is missing some word(s), please consider submitting an issue.

If your application requires to use some unusual/custom special case noun that is currently not in the list, you can add your definition at runtime:

```
import { Noun, Case, DeclensionGroup } from 'deklinators';

Noun.addSpecialCase('superkrāsns', { declensionGroup: DeclensionGroup.D6 });
const ns = new Noun('superkrāsns');
console.log(ns.declension(Case.dative));
```

## Contributors

The Deklinators algorithm was developed by Arnis Gross, refactored and adapted for TypeScript by Pāvils Jurjāns.

## Contacts

Project coordinator: deklinators@latvianapps.com

## License

This repository is licensed under the "MIT" license. See [LICENSE](LICENSE).

Please, let us know if you use Deklinators in your products or services. Your feedback is important for the further development of Deklinators.
