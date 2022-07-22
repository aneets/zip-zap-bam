import {
  GameStats,
  loadStatsFromLocalStorage,
  saveStatsToLocalStorage,
} from './localStorage'
import { endWord, getMinPath, startWord } from './words'

// In stats array elements 0-5 are successes in 1-6 trys

export const addStatsForCompletedGame = (
  gameStats: GameStats,
  count: number
) => {
  // Count is number of incorrect guesses before end.
  const stats = { ...gameStats }

  stats.minPath = getMinPath(startWord, endWord).length
  stats.totalGames += 1
  stats.currentStreak += 1

  if (count >= stats.winDistribution.length) {
    stats.winDistribution = stats.winDistribution.concat(
      new Array(count + 1 - stats.winDistribution.length).fill(0)
    )
  }
  stats.winDistribution[count] += 1

  if (stats.bestStreak < stats.currentStreak) {
    stats.bestStreak = stats.currentStreak
  }

  saveStatsToLocalStorage(stats)
  return stats
}

const defaultStats: GameStats = {
  winDistribution: [],
  minPath: getMinPath(startWord, endWord).length,
  currentStreak: 0,
  bestStreak: 0,
  totalGames: 0,
}

export const loadStats = () => {
  return loadStatsFromLocalStorage() || defaultStats
}
