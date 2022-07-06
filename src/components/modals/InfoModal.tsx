import { CompletedRow } from '../grid/CompletedRow'
import { EndRow } from '../grid/EndRow'
import { BaseModal } from './BaseModal'
import { MAX_EDIT_DISTANCE } from '../../constants/settings'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        {/* <p className="flex justify-left text-sm text-gray-500 dark:text-gray-300"> */}
        This is a word ladder game. The goal is to get from the start word to
        the end word by entering intermediate words. Each word should differ
        from the last by at most {MAX_EDIT_DISTANCE}{' '}
        <a href="https://en.wikipedia.org/wiki/Hamming_distance">
          letter substitutions
        </a>
        . The good news is you may use as many words as you like to complete the
        path from the start word to the end word!
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <EndRow word="WEARY" />
      </div>
      <div>
        <CompletedRow
          key={0}
          endWord="LEANS"
          guess="LEAR_"
          isRevealing={true}
        />
      </div>
      <div className="flex justify-center mb-1 mt-4">
        <EndRow word="LEANS" />
      </div>
    </BaseModal>
  )
}
