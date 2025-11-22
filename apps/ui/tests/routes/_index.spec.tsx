import { createRoutesStub } from 'react-router';
import { render, screen, waitFor } from '@testing-library/react';
import RecipesListPage from '../../app/recipes/RecipesListPage';

global.fetch = jest.fn();

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 'Ready', sources: [] }),
  })
) as jest.Mock;

test('Render main page', async () => {
  const ReactRouterStub = createRoutesStub([
    {
      path: '/',
      Component: RecipesListPage,
    },
  ]);

  render(<ReactRouterStub />);

  await waitFor(() => screen.findByText('Ready'));
});
