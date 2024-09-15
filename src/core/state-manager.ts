import { Object3D } from 'three';
import { GameState } from './state';

export class StateManager {
  private current: GameState | null = null;

  get state() {
    return this.current;
  }

  change(state: GameState) {
    if (this.current) {
      this.current.exit();
    }

    this.current = state;
    this.current.enter();
  }

  update(delta: number) {
    if (this.current) {
      this.current.update(delta);
    }
  }

  render() {
    if (this.current) {
      this.current.render();
    }
  }

  addToScene(mesh: Object3D) {
    if (this.current) {
      this.current.scene.add(mesh);
    }
  }

  removeFromScene(mesh: Object3D) {
    if (this.current) {
      this.current.scene.remove(mesh);
    }
  }
}
