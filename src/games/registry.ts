import { GameModule } from '@/types/game';
import { ticTacToeModule } from './tic-tac-toe';
import { memoryCardModule } from './memory-card';
import { reactionTimerModule } from './reaction-timer';
import { clickRushModule } from './click-rush';
import { numberPuzzleModule } from './number-puzzle';

export const gameRegistry: GameModule[] = [ticTacToeModule, memoryCardModule, reactionTimerModule, clickRushModule, numberPuzzleModule];
export const getGameModule = (gameId: string) => gameRegistry.find((m) => m.manifest.id === gameId);
