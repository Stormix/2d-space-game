import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './__root';

const Death = () => {
  return <h1>Death</h1>;
};

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  component: Death,
  path: '/death'
});
