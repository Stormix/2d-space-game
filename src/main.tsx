import { Game } from '@/game';
import { Ui } from '@/ui';
import { UIProvider } from '@/ui/provider';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './style.scss';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const ui = document.getElementById('ui') as HTMLDivElement;
const game = new Game(canvas);

game.init();
game.start();

createRoot(ui).render(
  <StrictMode>
    <UIProvider game={game}>
      <Ui />
    </UIProvider>
  </StrictMode>
);
