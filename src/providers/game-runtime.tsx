'use client';
import { createContext, useContext } from 'react';
import { db } from '@/lib/db';
import { GameRuntime, SessionResult } from '@/types/game';

type Ctx = { activePlayerId: string; activePlayerName: string };
const GameRuntimeContext = createContext<Ctx | null>(null);

export function GameRuntimeProvider({ playerId, playerName, children }: { playerId: string; playerName: string; children: React.ReactNode }) {
  return <GameRuntimeContext.Provider value={{ activePlayerId: playerId, activePlayerName: playerName }}>{children}</GameRuntimeContext.Provider>;
}

export function useGameRuntime(gameId: string): GameRuntime {
  const ctx = useContext(GameRuntimeContext);
  if (!ctx) throw new Error('GameRuntimeProvider missing');
  let currentSessionId: string | null = null;

  const writeEvent = (type: string, payload: unknown) => db.events.add({ id: crypto.randomUUID(), type, payload, createdAt: new Date().toISOString() });

  return {
    playerId: ctx.activePlayerId,
    playerName: ctx.activePlayerName,
    startSession: async () => {
      currentSessionId = crypto.randomUUID();
      await db.sessions.add({ id: currentSessionId, gameId, playerId: ctx.activePlayerId, startedAt: new Date().toISOString(), status: 'active' });
      await writeEvent('session.started', { gameId, sessionId: currentSessionId });
      return currentSessionId;
    },
    pauseSession: async () => currentSessionId ? db.sessions.update(currentSessionId, { status: 'paused' }) : undefined,
    resumeSession: async () => currentSessionId ? db.sessions.update(currentSessionId, { status: 'active' }) : undefined,
    endSession: async (result: SessionResult) => {
      if (!currentSessionId) return;
      await db.sessions.update(currentSessionId, { status: 'ended', endedAt: new Date().toISOString(), result });
      await writeEvent('session.ended', { gameId, sessionId: currentSessionId, result });
    },
    saveState: async (state) => db.saveStates.put({ id: `${gameId}:${ctx.activePlayerId}`, gameId, playerId: ctx.activePlayerId, state, updatedAt: new Date().toISOString() }),
    loadState: async () => (await db.saveStates.get(`${gameId}:${ctx.activePlayerId}`))?.state ?? null,
    unlockAchievement: async (achievementId) => db.achievements.put({ id: `${gameId}:${ctx.activePlayerId}:${achievementId}`, gameId, playerId: ctx.activePlayerId, achievementId, unlockedAt: new Date().toISOString() }),
  };
}
