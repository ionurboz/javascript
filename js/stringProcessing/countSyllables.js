/** @module stringProcessing/countSyllables */

var syllableMatchers = require( "../config/syllables.js" );

var getWords = require( "../stringProcessing/getWords.js" );

var forEach = require( "lodash/forEach" );
var filter = require( "lodash/filter" );
var find = require( "lodash/find" );
var isUndefined = require( "lodash/isUndefined" );

var SyllableCountIterator = require( "../helpers/syllableCountIterator.js" );
var ExclusionCountIterator = require( "../helpers/exclusionCountIterator.js" );

/**
 * Counts the syllables by splitting on consonants, leaving groups of vowels.
 *
 * @param {string} word A text with words to count syllables.
 * @param {String} locale The locale to use for counting syllables.
 * @returns {number} the syllable count.
 */
var countUsingVowels = function( word, locale ) {
	var numberOfSyllables = 0;
	var vowelRegex = new RegExp( "[^" + syllableMatchers( locale ).vowels + "]", "ig" );
	var foundVowels = word.split( vowelRegex );
	var filteredWords = filter( foundVowels, function( vowel ) {
		return vowel !== "";
	} );
	numberOfSyllables += filteredWords.length;

	return numberOfSyllables;
};

/**
 * Counts the syllables using vowel exclusions. These are used for groups of vowels that are more or less
 * then 1 syllable.
 *
 * @param {String} word The word to count syllables in.
 * @param {String} locale The locale to use for counting syllables.
 * @returns {number} The number of syllables found in the given word.
 */
var countVowelExclusions = function( word, locale ) {
	var syllableCountIterator = new SyllableCountIterator( syllableMatchers( locale ) );
	return syllableCountIterator.countSyllables( word );
};

/**
 * Returns the number of syllables for the word if it is in the list of full word deviations.
 *
 * @param {String} word The word to retrieve the syllables for.
 * @param {String} locale The locale to use for counting syllables.
 * @returns {number} The number of syllables found.
 */
var countFullWordDeviations = function( word, locale ) {
	var fullWordDeviations = syllableMatchers( locale ).deviations.words.full;

	var deviation = find( fullWordDeviations, function( fullWordDeviation ) {
		return fullWordDeviation.word === word;
	} );

	if ( ! isUndefined( deviation ) ) {
		return deviation.syllables;
	}

	return 0;
};

/**
 * Counts syllables in partial exclusions. If these are found, returns the number of syllables  found, and the modified word.
 * The word is modified so the excluded part isn't counted by the normal syllable counter.
 *
 * @param {String} word The word to count syllables in.
 * @param {String} locale The locale to use for counting syllables.
 * @returns {object} The number of syllables found and the modified word.
 */
var countSyllablesInPartialExclusions = function( word, locale ) {
	var exclusionCountIterator = new ExclusionCountIterator( syllableMatchers( locale ) );
	return exclusionCountIterator.countSyllables( word );
};

/**
 * Count the number of syllables in a word, using vowels and exceptions.
 *
 * @param {String} word The word to count the number of syllables.
 * @param {String} locale The locale to use for counting syllables.
 * @returns {number} The number of syllables found in a word.
 */
var countSyllables = function( word, locale ) {
	var syllableCount = 0;
	syllableCount += countUsingVowels( word, locale );
	syllableCount += countVowelExclusions( word, locale );
	return syllableCount;
};

/**
 * Counts the number of syllables in a textstring per word based on vowels.
 * Uses exclusion words for words that cannot be matched with vowel matching.
 *
 * @param {String} text The text to count the syllables in.
 * @param {String} locale The locale to use for counting syllables.
 * @returns {int} The total number of syllables found in the text.
 */
module.exports = function( text, locale ) {
	text = text.toLocaleLowerCase();
	var words = getWords( text );
	var syllableCount = 0;

	forEach( words, function( word ) {
		var exclusions = countFullWordDeviations( word, locale );
		if ( exclusions !== 0 ) {
			syllableCount += exclusions;
			return;
		}
		var partialExclusions = countSyllablesInPartialExclusions( word, locale );
		word = partialExclusions.word;
		syllableCount += partialExclusions.syllableCount;
		syllableCount += countSyllables( word, locale );
	} );
	return syllableCount;
};

