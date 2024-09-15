import { useUI } from '../provider';
import { cn } from '../utils';

const HealthBar = ({ className }: { className?: string }) => {
  const { state } = useUI();

  const health = state.player?.health ?? 0;

  return (
    <div className={cn('flex gap-4 w-96', className)}>
      <span className="text-lg font-semibold">Health: {health}</span>
      <div className="border-2 border-red-400 p-0.5 flex-grow">
        <div className="bg-red-400 h-full" style={{ width: `${health}%` }} />
      </div>
    </div>
  );
};

export default HealthBar;
