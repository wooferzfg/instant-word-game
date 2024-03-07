export const GAME_TITLE = 'Instant Word Game'

export const WIN_MESSAGES = ['Great Job!', 'Awesome', 'Well done!']
export const GAME_COPIED_MESSAGE = 'Game copied to clipboard'
export const NOT_ENOUGH_LETTERS_MESSAGE = 'Not enough letters'
export const WORD_NOT_FOUND_MESSAGE = 'Word not found'
export const HARD_MODE_DESCRIPTION = 'A wrong guess will end your streak'
export const HIGH_CONTRAST_MODE_DESCRIPTION = 'For improved color vision'
export const CORRECT_WORD_MESSAGE = (solution: string) =>
  `The word was ${solution}`
export const WRONG_SPOT_MESSAGE = (letter: string, position: number) =>
  `Must use ${letter} in position ${position}`
export const LETTER_CANNOT_BE_MESSAGE = (letter: string, position: number) =>
  `Letter in position ${position} cannot be ${letter}`
export const MUST_CONTAIN_MESSAGE = (letter: string) =>
  `Guess must contain ${letter}`
export const MUST_NOT_CONTAIN_MESSAGE = (letter: string) =>
  `Guess must not contain ${letter}`
export const MUST_CONTAIN_EXACTLY_MESSAGE = (letter: string, count: number) =>
  `Guess must contain exactly ${count} ${letter}`
export const ENTER_TEXT = 'Enter'
export const DELETE_TEXT = 'Delete'
export const STATISTICS_TITLE = 'Statistics'
export const NEW_WORD_TEXT = 'New word in'
export const PLAY_AGAIN_TEXT = 'Play Again'
export const SHARE_TEXT = 'Share'
export const TOTAL_TRIES_TEXT = 'Total tries'
export const SUCCESS_RATE_TEXT = 'Success rate'
export const CURRENT_STREAK_TEXT = 'Current streak'
export const BEST_STREAK_TEXT = 'Best streak'
export const GIVE_UP_TEXT = 'Give Up'
export const CANCEL_TEXT = 'Cancel'
export const DAILY_MODE_TITLE = 'Daily Mode'
export const RANDOM_MODE_TITLE = 'Infinite Mode'
export const GAME_LINK = 'https://www.wooferzfg.me/instant-word-game/'
export const INFINITE_MODE_LINK = '?mode=random'
export const SHARE_INTRO = (lost: boolean) =>
  `I ${lost ? 'failed' : 'solved'}`
