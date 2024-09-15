import { GameStates } from '@/types/state';
import { World } from 'miniplex';
import Stats from 'stats.js';
import { OrthographicCamera, PerspectiveCamera, Texture, WebGLRenderer } from 'three';
import { Font } from 'three/examples/jsm/loaders/FontLoader.js';
import { FIXED_TIMESTEP } from '../config';
import { Entity } from './entity';
import { EventManager } from './event-manager';
import { EventQueue } from './events';
import { Factory } from './factory';
import { PhysicsEngine } from './physics';
import { GameState } from './state';
import { StateManager } from './state-manager';
import { System } from './system';
import { AiPathingSystem } from './systems/ai-pathing';
import { CameraSystem } from './systems/camera';
import { CollisionSystem } from './systems/collision';
import { HealthSystem } from './systems/health';
import { InputSystem } from './systems/input';
import { PlayerMovementSystem } from './systems/movement';
import { PositionSystem } from './systems/position';
import { ProjectileSystem } from './systems/projectile';
import { ProjectileCleanupSystem } from './systems/projectile-cleanup';
import { RenderSystem } from './systems/render';
import { RotationSystem } from './systems/rotation';
import { ShootingSystem } from './systems/shooting';
import { GameWorldState } from './ui';

export abstract class Engine {
  renderer: WebGLRenderer;
  canvas: HTMLCanvasElement;
  camera: OrthographicCamera | PerspectiveCamera;
  world: World = new World<Entity>();
  systems: System[];
  stats: Stats;
  physics: PhysicsEngine = PhysicsEngine.instance;
  queue: EventQueue;
  eventManager: EventManager = new EventManager();
  stateManager: StateManager = new StateManager();
  textures: Map<string, Texture> = new Map();
  fonts: Map<string, Font> = new Map();

  uiCallback: (state: GameWorldState) => void = () => {};

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new WebGLRenderer({ antialias: false, canvas });
    this.camera = new OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      1,
      1000
    );
    this.systems = [
      RenderSystem,
      ShootingSystem,
      RotationSystem,
      PositionSystem,
      InputSystem,
      ProjectileSystem,
      PlayerMovementSystem,
      ProjectileCleanupSystem,
      AiPathingSystem,
      CameraSystem,
      CollisionSystem,
      HealthSystem
    ].map((System) => new System(this));

    this.stats = new Stats();
    this.queue = new EventQueue(this);

    document.body.appendChild(this.stats.dom);
  }

  init(state: GameState) {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera.position.z = 5;

    this.stateManager.change(state);
  }

  update(delta: number) {
    this.stateManager.update(delta);
    this.queue.update();
    this.physics.update(delta);
    this.systems.forEach((system) => system.update(delta));

    this.onUpdate({
      state: this.stateManager.state?.name ?? GameStates.Loading,
      entities: this.entities,
      player: this.entities.find((entity) => entity.local) ?? null
    });
  }

  onUpdate(state: GameWorldState) {
    this.uiCallback(state);
  }

  render() {
    this.stateManager.render();
  }

  add(entity: Entity) {
    this.world.add(entity);
    this.stateManager.addToScene(entity.mesh);
  }

  remove(entity: Entity) {
    this.world.remove(entity);
    this.stateManager.removeFromScene(entity.mesh);

    if (entity.physics) {
      this.physics.world.destroyBody(entity.physics);
    }
  }

  create<E extends Entity>(factory: Factory<E>, components: Partial<E> = {}): E {
    const entity = factory.create(components);
    this.add(entity);
    return entity;
  }

  start() {
    let lastTime = 0;
    let lag = 0;

    const loop = (time: number) => {
      this.stats.begin();
      const delta = time - lastTime;

      lastTime = time;
      lag += delta;

      while (lag >= FIXED_TIMESTEP) {
        this.update(FIXED_TIMESTEP);
        lag -= FIXED_TIMESTEP;
      }

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

  get entities(): Entity[] {
    return this.world.entities;
  }

  registerUiCallback(uiCallback: (state: GameWorldState) => void) {
    this.uiCallback = uiCallback;
  }

  unregisterUiCallback() {
    this.uiCallback = () => {};
  }
}
