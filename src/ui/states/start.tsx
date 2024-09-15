import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './__root';

const Start = () => {
  return <h1>Start</h1>;
};

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  component: Start,
  path: '/'
});
