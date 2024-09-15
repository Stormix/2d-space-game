import { Engine } from '@/core/engine';
import { GameState } from '@/core/state';
import { GameStates } from '@/types/state';
import { Scene } from 'three';

export class GameScene extends GameState {
  scene = new Scene();

  constructor(readonly engine: Engine) {
    super(GameStates.Play, engine);
  }

  enter() {
    console.log('Entering start scene');
  }

  exit() {
    console.log('Exiting start scene');
  }

  update() {
    // console.log('Updating start scene');
  }
}