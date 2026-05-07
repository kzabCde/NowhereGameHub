import { GameModule } from '@/types/game';
import { manifest } from './manifest';
import Game from './Game';
export const ticTacToeModule: GameModule = { manifest, component: Game };
