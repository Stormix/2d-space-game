import { GameWorldState } from '@/core/ui';
import { GameStates } from '@/types/state';
import { useUI } from './provider';
import { InGame } from './states/game';

const SceneUi = (gameState: Pick<GameWorldState, 'state'>) => {
  const { state } = gameState;

  switch (state) {
    case GameStates.Start:
      return <div>Start</div>;
    case GameStates.Pause:
      return <div>Pause</div>;
    case GameStates.Death:
      return <div>Death</div>;
    case GameStates.Play:
      return <InGame />;
    default:
      return <div>Loading...</div>;
  }
};

export const Ui = () => {
  const { state } = useUI();

  return (
    <div className="w-full h-full p-4">
      <SceneUi state={state.state} />
    </div>
  );
};
