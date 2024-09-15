import { GameStates } from '@/types/state';
import { Entity } from './entity';

/**
 * GameWorldState is the state of the game world.
 */
export interface GameWorldState {
  state: GameStates;
  entities: Entity[];
  player: Entity | null;
}

export const defaultState: GameWorldState = {
  state: GameStates.Loading,
  entities: [],
  player: null
};
