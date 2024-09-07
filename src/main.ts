import { Game } from './core/game';
import './style.css';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const game = new Game(canvas);

game.init();
game.start();
