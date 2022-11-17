/**
 * Capitalization style
 */
enum CapsStyle {
  unknown = 0,
  lowerCase = 1,
  upperCase = 2,
  titleCase = 3,
}

/**
 * Word category
 */
enum Category {
  unknown = 0,
}

/**
 * Grammatical gender
 */
enum Gender {
  unknown = 0,
  masculine = 1,
  feminine = 2,
}

/**
 * Noun declension group
 */
enum DeclensionGroup {
  unknown = 0,
  D1 = 1,
  D2 = 2,
  D3 = 3,
  D4 = 4,
  D5 = 5,
  D6 = 6,
  DReflexiveM = 7,
  DReflexiveF = 8,
  DDefiniteAdjectiveM = 9,
  DDefiniteAdjectiveF = 10,
  DPronoun = 11,
  DIndeclinable = 99,
}

/**
 * Grammatical number
 */
enum GNumber {
  singular = 0,
  plural = 1,
}

/**
 * Grammatical case
 */
enum Case {
  nominative = 0,
  genitive = 1,
  dative = 2,
  accusative = 3,
  instrumental = 4,
  locative = 5,
  vocative = 6,
}

export {
  CapsStyle,
  Category,
  Gender,
  DeclensionGroup,
  GNumber,
  Case,
};
