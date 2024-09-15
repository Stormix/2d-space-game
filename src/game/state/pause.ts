import { Engine } from '@/core/engine';
import { GameState } from '@/core/state';
import { GameStates } from '@/types/state';
import { Scene } from 'three';

export class PauseScene extends GameState {
  scene = new Scene();

  constructor(readonly engine: Engine) {
    super(GameStates.Pause, engine);
  }

  enter() {
    console.log('Entering pause scene');
  }

  exit() {
    console.log('Exiting pause scene');
  }

  update() {
    // console.log('Updating pause scene');
  }

  render() {
    // console.log('Rendering pause scene');
  }
}
