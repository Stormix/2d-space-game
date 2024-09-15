import HealthBar from '../widgets/health-bar';
import Score from '../widgets/score';

export const InGame = () => {
  return (
    <>
      <HealthBar className="bottom-4 absolute" />
      <Score className="top-4 right-4 absolute" />
    </>
  );
};
