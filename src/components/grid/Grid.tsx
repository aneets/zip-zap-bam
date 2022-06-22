import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EndRow } from './EndRow'

type Props = {
  startWord: string
  endWord: string
  guesses: string[]
  currentGuess: string
  isRevealing?: boolean
  currentRowClassName: string
  isGameWon: boolean
}

export const Grid = ({
  startWord,
  endWord,
  guesses,
  currentGuess,
  isRevealing,
  currentRowClassName,
  isGameWon,
}: Props) => {

  return (
    <>
      <EndRow word={startWord} />
      {guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          endWord={endWord}
          guess={guess}
          isRevealing={isRevealing && guesses.length - 1 === i}
        />
      ))}
      {!isGameWon && (
        <CurrentRow guess={currentGuess} className={currentRowClassName} />
      )}
      <EndRow word={endWord} />
    </>
  )
}
