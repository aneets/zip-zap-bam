import { Cell } from '../grid/Cell'
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
        Get from the start word to the end word by entering intermediate words.
        Each word should differ from the last by a <a href="https://en.wikipedia.org/wiki/Levenshtein_distance">Levenshtein distance</a> of
        at most {MAX_EDIT_DISTANCE}.
        The good news is you may use as many words as you like to complete the path!
      </p>
    </BaseModal>
  )
}
