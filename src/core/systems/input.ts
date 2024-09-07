import { Engine } from '../engine';
import { ButtonState, Component, defaultInput, Input } from '../entity';
import { System } from '../system';

export class InputSystem extends System {
  _state: Input;

  constructor(engine: Engine) {
    super(engine, [Component.Inputable]);

    document.addEventListener('keydown', (event) => {
      this.handleKeyboardInput(event, ButtonState.PRESSED);
    });

    document.addEventListener('keyup', (event) => {
      this.handleKeyboardInput(event, ButtonState.RELEASED);
    });

    document.addEventListener('mousemove', (event) => {
      this.handleMouseMoveInput(event);
    });

    document.addEventListener('mousedown', (event) => {
      this.handleMouseInput(event, ButtonState.PRESSED);
    });

    document.addEventListener('mouseup', (event) => {
      this.handleMouseInput(event, ButtonState.RELEASED);
    });

    this._state = defaultInput;
  }

  handleKeyboardInput(event: KeyboardEvent, type: ButtonState) {
    const key = event.keyCode;
    this._state.keyState[key] = type;
  }

  handleMouseMoveInput(event: MouseEvent) {
    this._state.mouseState.position.x = event.clientX - window.innerWidth / 2;
    this._state.mouseState.position.y = window.innerHeight / 2 - event.clientY;
  }

  handleMouseInput(event: MouseEvent, type: ButtonState) {
    event.preventDefault();
    switch (event.button) {
      case 0:
        this._state.mouseState.left = type === ButtonState.PRESSED;
        break;
      case 2:
        this._state.mouseState.right = type === ButtonState.PRESSED;
        break;
    }
  }

  update() {
    this.entities.forEach((entity) => {
      const input = entity.input;
      if (input) {
        input.mouseState = this._state.mouseState;
        input.keyState = this._state.keyState;
      }
    });
  }
}
