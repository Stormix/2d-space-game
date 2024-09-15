import { useUI } from '../provider';
import { cn } from '../utils';

const Score = ({ className }: { className?: string }) => {
  const { state } = useUI();

  const score = state.player?.score ?? 0;

  return (
    <div className={cn('flex gap-4', className)}>
      <span className="text-lg font-semibold">Score: {score}</span>
    </div>
  );
};

export default Score;
