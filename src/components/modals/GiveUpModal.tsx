import { BaseModal } from './BaseModal'
import { CANCEL_TEXT, GIVE_UP_TEXT } from '../../constants/strings';

type Props = {
  isOpen: boolean
  giveUp: () => void
  handleClose: () => void
}

export const GiveUpModal = ({ isOpen, giveUp, handleClose }: Props) => {
  return (
    <BaseModal title={GIVE_UP_TEXT} isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Are you sure you want to give up?
      </p>

      <div className="flex justify-center mb-1">
        <button
          type="button"
          className="mt-7 mr-5 justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
          onClick={() => giveUp()}
        >
          {GIVE_UP_TEXT}
        </button>
        <button
          type="button"
          className="mt-7 justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:text-sm"
          onClick={() => handleClose()}
        >
          {CANCEL_TEXT}
        </button>
      </div>
    </BaseModal>
  )
}
