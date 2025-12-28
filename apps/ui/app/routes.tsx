import {
  type RouteConfig,
  index,
  route,
  layout,
} from '@react-router/dev/routes';


export default [
  layout('./ApiLayout.tsx', [
    index('./recipes/RecipesListPage.tsx'),
    route( '/recipe/:recipeId','./recipes/RecipePage.tsx'),
    route( '/recipe/:recipeId/edit','./recipes/EditRecipePage.tsx'),
    route( '/recipe/new','./recipes/NewRecipePage.tsx'),
    route('/login', './authentication/loginPage.tsx'),
  ]),
] satisfies RouteConfig;
