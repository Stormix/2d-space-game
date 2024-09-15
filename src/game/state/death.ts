import { Engine } from '@/core/engine';
import { GameState } from '@/core/state';
import { GameStates } from '@/types/state';
import { Scene } from 'three';

export class DeathScene extends GameState {
  scene = new Scene();

  constructor(readonly engine: Engine) {
    super(GameStates.Death, engine);
  }

  enter() {
    console.log('Entered Death Scene');
    // Initialization logic
  }

  exit() {
    console.log('Exited Death Scene');
    // Cleanup logic
  }
}
