import { Cell } from './Cell'
import { unicodeSplit } from '../../lib/words'

type Props = {
  word: string
}

export const EndRow = ({ word }: Props) => {
  const splitWord = unicodeSplit(word)

  return (
    <div className="flex justify-center mb-1">
      {splitWord.map((letter, i) => (
        <Cell key={i} value={letter} status="correct" position={i} />
      ))}
    </div>
  )
}
