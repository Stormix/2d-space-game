import { nanoid } from 'nanoid';
import { Body } from 'planck';
import { Group, Mesh, MeshBasicMaterial, Vector2 } from 'three';

export enum EntityType {
  Ship = 'ship',
  Bullet = 'bullet',
  Static = 'static'
}

export abstract class Entity {
  abstract size: Vector2;
  abstract position: Vector2;
  abstract velocity: Vector2;
  abstract rotation: number;
  abstract scale: Vector2;
  abstract mesh: Group;

  input?: Input;
  shooting?: boolean;
  projectile?: boolean;
  enemy?: boolean;
  local?: boolean;
  lockCamera?: boolean;

  protected _health?: number | undefined;

  public get health(): number | undefined {
    return this._health;
  }

  public set health(value: number | undefined) {
    this._health = value;
  }

  physics?: Body;
  lifetime?: number;
  parent?: string | null;
  score?: number;

  id: string;
  type: EntityType;

  constructor(type = EntityType.Static) {
    this.id = `${type || ''}:${nanoid()}`;
    this.type = type;
  }

  toString() {
    return `Entity: ${JSON.stringify(this.position)}, v=${JSON.stringify(this.velocity)}, r=${this.rotation}`;
  }

  get name() {
    return this.constructor.name;
  }

  set color(color: number) {
    (this.mesh.children[0] as Mesh).material = new MeshBasicMaterial({ color });
  }

  get color() {
    return ((this.mesh.children[0] as Mesh).material as MeshBasicMaterial).color.getHex();
  }
}

export interface MouseState {
  left: boolean;
  right: boolean;

  position: Vector2;
}

export enum Key {
  W = 90,
  A = 81,
  S = 83,
  D = 68,
  Space = 32
}

export enum ButtonState {
  PRESSED = 'PRESSED',
  RELEASED = 'RELEASED'
}

export interface Input {
  mouseState: MouseState;
  keyState: {
    [key: number]: ButtonState;
  };
}

export enum Component {
  Renderable = 'mesh',
  Positionable = 'position',
  Rotatable = 'rotation',
  Scalable = 'scale',
  Moving = 'velocity',
  Inputable = 'input',
  Shooter = 'shooting',
  Projectile = 'projectile',
  Enemy = 'enemy',
  CameraLocked = 'lockCamera',
  Health = 'health',
  Physics = 'physics',
  Expires = 'lifetime'
}

export const defaultInput: Input = {
  mouseState: {
    left: false,
    right: false,
    position: new Vector2()
  },
  keyState: {}
};

export interface UserData {
  id: string;
}
