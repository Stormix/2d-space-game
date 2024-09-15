import { SCALE, TEXTURE_SIZE } from '@/config';
import { Engine } from '@/core/engine';
import { Enemy } from '@/game/entities/enemy';
import { Player } from '@/game/entities/player';
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  NearestFilter,
  Scene,
  SRGBColorSpace,
  TextureLoader,
  Vector2
} from 'three';
import { GameScene } from './state/game';

export class Game extends Engine {
  scene: Scene = new Scene();

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  async init() {
    super.init(new GameScene(this));

    this.loadTextures();
    this.setupBackground();

    this.add(new Player());
    this.add(new Enemy(new Vector2(0, 100)));

    for (let i = 0; i < 10; i++) {
      this.add(new Enemy(new Vector2(Math.random() * 500 - 100, Math.random() * 500)));
    }
  }

  loadTextures() {
    const loader = new TextureLoader();
    const textures = ['background', 'dust', 'planets', 'stars'];

    textures.forEach((key) => {
      const texture = loader.load(`assets/sprites/${key}.png`);

      texture.minFilter = NearestFilter;
      texture.magFilter = NearestFilter;
      texture.needsUpdate = true;
      texture.colorSpace = SRGBColorSpace;

      this.textures.set(key, texture);
    });
  }

  setupBackground() {
    const texture = this.textures.get('background');
    if (!texture) return;

    const geometry = new BoxGeometry(SCALE * TEXTURE_SIZE, SCALE * TEXTURE_SIZE, 1, 1);
    const backgroundLayers = ['planets', 'dust', 'stars', 'background'];

    backgroundLayers.forEach((key, index) => {
      const material = new MeshBasicMaterial({ map: this.textures.get(key) });
      material.transparent = true;
      const layer = new Mesh(geometry, material);
      layer.position.z = -index - 1;
      this.stateManager.addToScene(layer);
    });
  }
}
