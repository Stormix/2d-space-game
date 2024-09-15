import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './__root';

const Pause = () => {
  return <h1>Pause</h1>;
};

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  component: Pause,
  path: '/pause'
});
