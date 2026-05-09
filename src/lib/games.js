export const games = [
  { id: 'connect-four', title: '4 In A Row', description: 'Drop discs and connect four before the machine.', tags: ['strategy', 'classic'], category: 'Strategy', route: '/games/connect-four', bestScoreKey: 'connectFourBestScore', comingSoon: false },
  { id: 'xo', title: 'XO Battle', description: 'Classic tic-tac-toe against an adaptive bot.', tags: ['classic', 'strategy'], category: 'Classic', route: '/games/xo', bestScoreKey: 'xoBestScore', comingSoon: false },
  { id: 'memory-card', title: 'Memory Card', description: 'Match all pairs with the lowest moves.', tags: ['puzzle', 'classic'], category: 'Puzzle', route: '/games/memory-card', bestScoreKey: 'memoryCardBestScore', comingSoon: false },
  { id: 'snake', title: 'Snake', description: 'Arcade snake with score chase.', tags: ['arcade'], category: 'Arcade', route: '#', bestScoreKey: 'snakeBestScore', comingSoon: true },
];
