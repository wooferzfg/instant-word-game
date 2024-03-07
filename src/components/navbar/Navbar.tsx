import {
  CalendarIcon,
  ChartBarIcon,
  CogIcon,
  InformationCircleIcon,
  LightningBoltIcon,
  XCircleIcon,
} from '@heroicons/react/outline'
import { Tooltip } from 'react-tooltip'
import { GAME_TITLE, DAILY_MODE_TITLE, RANDOM_MODE_TITLE } from '../../constants/strings'
import { isRandomMode } from '../../lib/words'

import 'react-tooltip/dist/react-tooltip.css'

type Props = {
  showGiveUpButton: boolean,
  setIsGiveUpModalOpen: (value: boolean) => void
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
  setIsSettingsModalOpen: (value: boolean) => void,
  isDarkMode: boolean,
}

export const Navbar = ({
  showGiveUpButton,
  setIsGiveUpModalOpen,
  setIsInfoModalOpen,
  setIsStatsModalOpen,
  setIsSettingsModalOpen,
  isDarkMode,
}: Props) => {
  const randomMode = isRandomMode()
  const tooltipVariant = isDarkMode ? "light" : "dark"

  return (
    <div className="navbar">
      <div className="navbar-content px-5">
        <div className="left-icons">
          <InformationCircleIcon
            className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
            onClick={() => setIsInfoModalOpen(true)}
          />
          {showGiveUpButton && (
            <XCircleIcon
              className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
              onClick={() => setIsGiveUpModalOpen(true)}
            />
          )}
        </div>
        <div className="navbar-title">
          <p className="text-xl font-bold dark:text-white">{GAME_TITLE}</p>
          <p className="text-xs dark:text-white mode-title">{randomMode ? RANDOM_MODE_TITLE : DAILY_MODE_TITLE}</p>
        </div>
        <div className="right-icons">
          {randomMode ? (
              <>
                <div
                  data-tooltip-content="Switch to Daily Mode"
                  data-tooltip-id="mode-tooltip"
                  data-tooltip-place="bottom"
                  data-tooltip-variant={tooltipVariant}
                >
                  <LightningBoltIcon
                    className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
                    onClick={() => { window.location.href = "./?" }}
                  />
                  <Tooltip id="mode-tooltip" />
                </div>
              </>
              
            ) : (
              <>
                
                <div
                  data-tooltip-content="Switch to Infinite Mode"
                  data-tooltip-id="mode-tooltip"
                  data-tooltip-place="bottom"
                  data-tooltip-variant={tooltipVariant}
                >
                  <CalendarIcon
                    className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
                    onClick={() => { window.location.href = "./?mode=random" }}
                  />
                  <Tooltip id="mode-tooltip" />
                </div>
              </>
            )
          }
          <ChartBarIcon
            className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
            onClick={() => setIsStatsModalOpen(true)}
          />
          <CogIcon
            className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsSettingsModalOpen(true)}
          />
        </div>
      </div>
      <hr></hr>
    </div>
  )
}
