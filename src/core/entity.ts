import { Mesh, Vector2 } from 'three';

export interface Entity {
  position: Vector2;
  velocity: Vector2;
  rotation: number;
  scale: Vector2;
  mesh: Mesh;
  input?: Input;
  shooting?: boolean;
  projectile?: boolean;
  enemy?: boolean;
  local?: boolean;
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
  D = 68
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
  Enemy = 'enemy'
}

export const defaultInput: Input = {
  mouseState: {
    left: false,
    right: false,
    position: new Vector2()
  },
  keyState: {}
};
