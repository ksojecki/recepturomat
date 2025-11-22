import {
  type RouteConfig,
  index,
  route,
  layout,
} from '@react-router/dev/routes';

export default [
  layout('./ApiLayout.tsx', [
    index('./dashboard/dashboardPage.tsx'),
    route('/login', './authentication/loginPage.tsx'),
  ]),
] satisfies RouteConfig;
