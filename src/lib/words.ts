import { WORDS } from '../constants/wordlist'
import { VALID_GUESSES } from '../constants/validGuesses'
import { WRONG_SPOT_MESSAGE, NOT_CONTAINED_MESSAGE } from '../constants/strings'
import { getGuessStatuses } from './statuses'
import { default as GraphemeSplitter } from 'grapheme-splitter'
import { MAX_EDIT_DISTANCE, MAX_MIN_PATH_LENGTH } from '../constants/settings'

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(localeAwareLowerCase(word)) ||
    VALID_GUESSES.includes(localeAwareLowerCase(word))
  )
}

export const isWinningWord = (word: string) => {
  return startWord === word
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
// also check if all revealed instances of a letter are used (i.e. two C's)
export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  if (guesses.length === 0) {
    return false
  }

  const lettersLeftArray = new Array<string>()
  const guess = guesses[guesses.length - 1]
  const statuses = getGuessStatuses(startWord, guess)
  const splitWord = unicodeSplit(word)
  const splitGuess = unicodeSplit(guess)

  for (let i = 0; i < splitGuess.length; i++) {
    if (statuses[i] === 'correct' || statuses[i] === 'present') {
      lettersLeftArray.push(splitGuess[i])
    }
    if (statuses[i] === 'correct' && splitWord[i] !== splitGuess[i]) {
      return WRONG_SPOT_MESSAGE(splitGuess[i], i + 1)
    }
  }

  // check for the first unused letter, taking duplicate letters
  // into account - see issue #198
  let n
  for (const letter of splitWord) {
    n = lettersLeftArray.indexOf(letter)
    if (n !== -1) {
      lettersLeftArray.splice(n, 1)
    }
  }

  if (lettersLeftArray.length > 0) {
    return NOT_CONTAINED_MESSAGE(lettersLeftArray[0])
  }
  return false
}

export const unicodeSplit = (word: string) => {
  return new GraphemeSplitter().splitGraphemes(word)
}

export const unicodeLength = (word: string) => {
  return unicodeSplit(word).length
}

export const localeAwareLowerCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toLowerCase()
}

export const localeAwareUpperCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toUpperCase()
}

export const getEditDistance = (a: string, b: string) => {
  let dist = 0
  for (let i = 0; i < a.length; i++) {
    if (a.charAt(i) !== b.charAt(i)) {
      dist++
    }
  }
  return dist
}

type Node = {
  value: string
  path: number
  prev: Node | null
}

export const getMinPath = (a: string, b: string) => {
  const start = a.toLowerCase()
  const end = b.toLowerCase()

  if (start === end) {
    return []
  }
  const visited = new Set()
  const words = [...VALID_GUESSES]
  const queue: [Node] = [{ value: start, path: 0, prev: null }]
  while (queue.length > 0) {
    let currentNode: Node | undefined | null = queue.shift()
    let j = 0
    while (j < words.length) {
      if (getEditDistance(currentNode!.value, words[j]) <= MAX_EDIT_DISTANCE) {
        visited.add(words[j])
        if (currentNode!.path < MAX_MIN_PATH_LENGTH) {
          if (words[j] === end) {
            const path = []
            while (currentNode !== null) {
              path.push(currentNode!.value)
              currentNode = currentNode!.prev
            }
            return path
          }
          queue.push({
            value: words[j],
            path: currentNode!.path + 1,
            prev: currentNode!,
          })
          words.splice(j, 1)
        }
      } else {
        j++
      }
    }
  }
  return []
}

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epoch = new Date(2022, 0)
  const start = new Date(epoch)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  let index = 0
  while (start < today) {
    index++
    start.setDate(start.getDate() + 1)
  }

  const nextDay = new Date(today)
  nextDay.setDate(today.getDate() + 1)

  return {
    startWord: localeAwareUpperCase(WORDS[index % WORDS.length]),
    startIndex: index,
    endWord: localeAwareUpperCase(WORDS[(index + 10) % WORDS.length]),
    endIndex: index + 10,
    tomorrow: nextDay.valueOf(),
  }
}

export const { startWord, startIndex, endWord, endIndex, tomorrow } =
  getWordOfDay()
