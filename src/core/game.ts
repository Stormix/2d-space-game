import { Scene } from 'three';
import { Enemy } from '../game/entities/enemy';
import { Ship } from '../game/entities/ship';
import { Engine } from './engine';

export class Game extends Engine {
  scene: Scene = new Scene();

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  init() {
    super.init(this.scene);

    this.addEntity(new Ship());
    this.addEntity(new Enemy());
  }

  updateGame(delta: number) {}
  renderGame() {}
}
