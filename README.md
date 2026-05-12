# NowhereGameHub
A local-first mini game hub built with Next.js, Tailwind CSS, and localStorage.

## Tagline
Play small games anywhere, even nowhere.

## Features
- Home game hub
- Game detail modal
- Favorite games
- Recent played games
- Best scores
- Theme toggle
- Sound toggle
- Connect Four
- XO Battle
- Memory Card
- Snake
- Reaction Rush
- Number Ninja
- Aim Grid
- Grid Runner
- Math Rain
- Laser Maze
- Code Breaker
- Cipher Typing
- Responsive UI
- Reflex timing game
- Fast mental math game
- Math Rain: falling math questions arcade brain game
- Laser Maze: randomized solvable mirror reflection puzzle with rotation-based scoring
- Aim Grid: reflex and accuracy target-click game
- Grid Runner: tactical grid maze/pathfinding game
- Local-first persistence
- Vercel-ready deployment

## Tech Stack
- Next.js App Router
- JavaScript
- Tailwind CSS
- localStorage
- Vercel

## Development
npm install
npm run dev

## Build
npm run build

## Deploy to Vercel
1. Push project to GitHub
2. Import GitHub repository into Vercel
3. Framework preset: Next.js
4. Build command: npm run build
5. Deploy

## Folder Structure
See `src/app`, `src/components`, `src/lib` separated by pages, UI components, and game logic modules.

## localStorage Keys
- nowhereGameHubFavorites
- nowhereGameHubRecentPlayed
- nowhereGameHubTheme
- nowhereGameHubSound
- connectFourBestScore
- xoBestScore
- memoryCardBestScore
- snakeBestScore
- reactionRushBestScore
- numberNinjaBestScore
- aimGridBestScore
- aimGridBestAccuracy
- aimGridTotalPlays
- gridRunnerBestScore
- gridRunnerBestSteps
- gridRunnerBestTime
- mathRainBestScore
- mathRainBestStreak
- mathRainTotalPlays
- laserMazeBestScore
- laserMazeBestMoves (legacy)
- laserMazeBestRotations
- laserMazeBestTime
- connectFourPlayerWins
- connectFourMachineWins
- connectFourDraws
- xoPlayerWins
- xoMachineWins
- xoDraws
- memoryCardBestMoves
- memoryCardBestTime
- codeBreakerBestScore
- codeBreakerBestAttempts
- codeBreakerBestTime
- codeBreakerTotalWins
- codeBreakerTotalPlays
- cipherTypingBestScore
- cipherTypingBestAccuracy
- cipherTypingBestStreak
- cipherTypingTotalPlays

## Future Improvements
- Add Pong
- Add achievements
- Add local leaderboard
- Add PWA
- Add offline support
- Add local multiplayer mode
- Add more AI difficulty tuning


## Playable Routes
- /games/connect-four
- /games/xo
- /games/memory-card
- /games/snake
- /games/reaction-rush
- /games/number-ninja
- /games/aim-grid
- /games/grid-runner
- /games/math-rain
- /games/laser-maze
- /games/code-breaker
- /games/cipher-typing

## New Game Features
- Code Breaker: sci-fi deduction code cracking game
- Cipher Typing: terminal command typing speed game
