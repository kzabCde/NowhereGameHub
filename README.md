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
- Responsive UI
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
- connectFourPlayerWins
- connectFourMachineWins
- connectFourDraws
- xoPlayerWins
- xoMachineWins
- xoDraws
- memoryCardBestMoves
- memoryCardBestTime

## Future Improvements
- Add Pong
- Add achievements
- Add local leaderboard
- Add PWA
- Add offline support
- Add local multiplayer mode
- Add more AI difficulty tuning
