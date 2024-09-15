import { defaultState, GameWorldState } from '@/core/ui';
import { Game } from '@/game';
import { EventType } from '@/types/events';
import { createContext, useContext, useEffect, useState } from 'react';

interface UIContextType {
  game: Game;
  state: GameWorldState;
  pushEvent: <T>(payload: T, mouseEvent: React.MouseEvent | TouchEvent | null) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ game, children }: { game: Game; children: React.ReactNode }) => {
  function pushEvent<T = unknown>(payload: T, mouseEvent: React.MouseEvent | TouchEvent | null = null) {
    if (mouseEvent) {
      mouseEvent.preventDefault();
      mouseEvent.stopPropagation();
    }

    game.queue.push({
      priority: 0,
      type: EventType.UI,
      data: payload
    });
  }

  const [state, setState] = useState<GameWorldState>(defaultState);

  useEffect(() => {
    game.registerUiCallback(setState);
    return () => {
      game.unregisterUiCallback();
    };
  }, [game]);

  return <UIContext.Provider value={{ game, pushEvent, state }}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }

  return context;
};
