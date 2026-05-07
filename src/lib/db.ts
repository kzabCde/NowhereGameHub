import Dexie, { Table } from 'dexie';
import { SessionResult } from '@/types/game';

export type Player = { id: string; name: string; createdAt: string; lastActiveAt: string };
export type GameSession = { id: string; gameId: string; playerId: string; startedAt: string; endedAt?: string; status: 'active' | 'paused' | 'ended'; result?: SessionResult };
export type SaveState = { id: string; gameId: string; playerId: string; state: unknown; updatedAt: string };
export type AchievementUnlock = { id: string; gameId: string; playerId: string; achievementId: string; unlockedAt: string };
export type LocalEvent = { id: string; type: string; payload: unknown; createdAt: string };

class NowhereDB extends Dexie {
  players!: Table<Player, string>;
  sessions!: Table<GameSession, string>;
  saveStates!: Table<SaveState, string>;
  achievements!: Table<AchievementUnlock, string>;
  events!: Table<LocalEvent, string>;

  constructor() {
    super('nowhere_arcade_os');
    this.version(1).stores({
      players: 'id,name,lastActiveAt',
      sessions: 'id,gameId,playerId,status,startedAt,endedAt',
      saveStates: 'id,gameId,playerId,updatedAt',
      achievements: 'id,gameId,playerId,achievementId,unlockedAt',
      events: 'id,type,createdAt',
    });
  }
}

export const db = new NowhereDB();
