import PUZZLES from '../constants/puzzles.json'
import { VALID_GUESSES } from '../constants/validGuesses'
import { WRONG_SPOT_MESSAGE, LETTER_CANNOT_BE_MESSAGE, MUST_CONTAIN_MESSAGE, MUST_NOT_CONTAIN_MESSAGE, MUST_CONTAIN_EXACTLY_MESSAGE } from '../constants/strings'
import { getGuessStatuses } from './statuses'
import { default as GraphemeSplitter } from 'grapheme-splitter'

export const isWordInWordList = (word: string) => {
  return (
    VALID_GUESSES.includes(localeAwareLowerCase(word))
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
// also check if all revealed instances of a letter are used (i.e. two C's)
export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  let returnMessage: string = ''

  guesses.forEach((guess) => {
    if (returnMessage) {
      return
    }

    const statuses = getGuessStatuses(guess)
    const previousGuessCounts: any = {}
    const currentGuessCounts: any = {}
    const currentGuess = unicodeSplit(word)
    const previousGuess = unicodeSplit(guess)

    for (let i = 0; i < previousGuess.length; i++) {
      const letter = previousGuess[i] as keyof typeof previousGuessCounts & string

      if (statuses[i] === 'correct' || statuses[i] === 'present') {
        previousGuessCounts[letter] = 1 + (currentGuessCounts[letter] || 0)
      }
    }

    for (const letter of currentGuess) {
      currentGuessCounts[letter] = 1 + (currentGuessCounts[letter] || 0)
    }
  
    for (let i = 0; i < previousGuess.length; i++) {
      const previousGuessLetter = previousGuess[i] as keyof typeof previousGuessCounts & keyof typeof currentGuessCounts & string
      const clueCount = previousGuessCounts[previousGuessLetter] || 0
      const guessCount = currentGuessCounts[previousGuessLetter] || 0

      if (statuses[i] === 'correct' && currentGuess[i] !== previousGuessLetter) {
        returnMessage = WRONG_SPOT_MESSAGE(previousGuessLetter, i + 1)
        return
      }
      if (guessCount < clueCount) {
        returnMessage = MUST_CONTAIN_MESSAGE(previousGuessLetter)
        return
      }
      if (statuses[i] !== 'correct' && currentGuess[i] === previousGuessLetter) {
        returnMessage = LETTER_CANNOT_BE_MESSAGE(previousGuessLetter, i + 1)
        return
      }
      if (statuses[i] === 'absent' && guessCount !== clueCount) {
        if (clueCount === 0) {
          returnMessage = MUST_NOT_CONTAIN_MESSAGE(previousGuessLetter)
        } else {
          returnMessage = MUST_CONTAIN_EXACTLY_MESSAGE(previousGuessLetter, clueCount)
        }
        return
      }
    }
  })

  return returnMessage
}

export const unicodeSplit = (word: string) => {
  return new GraphemeSplitter().splitGraphemes(word)
}

export const unicodeLength = (word: string) => {
  return unicodeSplit(word).length
}

export const localeAwareLowerCase = (text: string) => {
  return text.toLowerCase()
}

export const localeAwareUpperCase = (text: string) => {
  return text.toUpperCase()
}

const mulberry32 = (a: number) => {
  return function() {
    var t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const isRandomMode = () => {
  return new URLSearchParams(window.location.search).get('mode') === 'random';
};

export const getWordOfDay = () => {  
  // April 24, 2022 Game Epoch
  const epochMs = new Date(2022, 3, 23).valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs

  let getRandomNum

  if (isRandomMode()) {
    getRandomNum = () => Math.random()
  } else {
    getRandomNum = mulberry32(index + 12345)
  }

  const solutionsList = Object.keys(PUZZLES);
  const solution = solutionsList[Math.floor(getRandomNum() * solutionsList.length)] as keyof typeof PUZZLES

  const potentialStartingGuesses = PUZZLES[solution]
  const startingGuesses = potentialStartingGuesses[Math.floor(getRandomNum() * potentialStartingGuesses.length)]

  return {
    startingGuesses: startingGuesses.map((guess: string) => localeAwareUpperCase(guess)),
    solution: localeAwareUpperCase(solution),
    solutionIndex: index,
    tomorrow: nextday,
  }
}

export const { startingGuesses, solution, solutionIndex, tomorrow } = getWordOfDay()
