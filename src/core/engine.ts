import { World } from 'miniplex';
import Stats from 'stats.js';
import { OrthographicCamera, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { Entity } from './entity';
import { Factory } from './factory';
import { System } from './system';
import { BulletSystem } from './systems/bullet';
import { EnemyMovementSystem } from './systems/enemy-movement';
import { InputSystem } from './systems/input';
import { ObjectMovementSystem } from './systems/object-movement';
import { PlayerMovementSystem } from './systems/player-movement';
import { PositionSystem } from './systems/position';
import { ProjectileCleanupSystem } from './systems/projectile-cleanup';
import { RenderSystem } from './systems/render';
import { RotationSystem } from './systems/rotation';
import { ShootingSystem } from './systems/shooting';

export abstract class Engine {
  renderer: WebGLRenderer;
  canvas: HTMLCanvasElement;
  camera: OrthographicCamera | PerspectiveCamera;
  world: World = new World<Entity>();
  systems: System[];
  currentScene!: Scene;
  stats: Stats;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new WebGLRenderer({ antialias: true, canvas });
    this.camera = new OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      1,
      1000
    );
    this.systems = [
      new RenderSystem(this),
      new ShootingSystem(this),
      new RotationSystem(this),
      new PositionSystem(this),
      new InputSystem(this),
      new BulletSystem(this),
      new PlayerMovementSystem(this),
      new ObjectMovementSystem(this),
      new ProjectileCleanupSystem(this),
      new EnemyMovementSystem(this)
    ];

    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
  }

  init(scene: Scene) {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera.position.z = 5;
    this.currentScene = scene;
  }

  update(delta: number) {
    // Update game logic
    this.systems.forEach((system) => system.update(delta));
    this.world.entities.forEach((entity) => console.log(entity.toString()));
    this.updateGame(delta);
  }

  render() {
    this.renderer.render(this.currentScene, this.camera);
    this.renderGame();
  }

  abstract updateGame(delta: number): void;
  abstract renderGame(): void;

  addEntity(entity: Entity) {
    this.world.add(entity);
    this.currentScene.add(entity.mesh);
  }

  removeEntity(entity: Entity) {
    this.world.remove(entity);
    this.currentScene.remove(entity.mesh);
  }

  createEntity<E extends Entity>(factory: Factory<E>, components: Partial<E> = {}): E {
    const entity = factory.create(components);
    this.addEntity(entity);
    return entity;
  }

  start() {
    // requestAnimationFrame
    let lastTime = 0;
    const loop = (time: number) => {
      this.stats.begin();
      const delta = time - lastTime;
      lastTime = time;

      this.update(delta);
      this.render();

      this.stats.end();
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  get width() {
    return window.innerWidth;
  }

  get height() {
    return window.innerHeight;
  }

  get entities() {
    return this.world.entities;
  }
}
