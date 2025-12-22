---
applyTo: '**/*.test.{ts,tsx,js,jsx}'
priority: 25
---

# Testing Instructions for Recepturomat

## Test Framework Configuration

This project uses:
- **Jest** as the test runner
- **React Testing Library** for component testing
- **@testing-library/jest-dom** for enhanced matchers
- TypeScript for all test files

## Global Test Setup

### Automatic Imports
The following are automatically available in all test files (no manual import needed):
- `describe`, `it`, `test`, `expect` (Jest globals)
- `beforeEach`, `afterEach`, `beforeAll`, `afterAll`
- Jest matchers from `@testing-library/jest-dom` (e.g., `toBeInTheDocument`)

### TypeScript Configuration
Types are configured in `tsconfig.spec.json`:
```json
{
  "compilerOptions": {
    "types": ["jest", "node"]
  }
}
```

## Writing Tests

### Test File Naming
- Component tests: `ComponentName.test.tsx`
- Hook tests: `useHookName.test.ts`
- Utility tests: `utilityName.test.ts`

### Test Structure (English Only)
```typescript
describe('ComponentName or functionName', () => {
  it('should do something specific', () => {
    // Arrange: Set up test data and conditions
    const mockData = { id: '1', name: 'Test Recipe' };
    
    // Act: Execute the code being tested
    const result = processRecipe(mockData);
    
    // Assert: Verify the expected outcome
    expect(result).toBeDefined();
  });
});
```

### Testing React Components

#### Basic Component Test
```typescript
import { render, screen } from '@testing-library/react';
import { RecipeCard } from './RecipeCard';

describe('RecipeCard', () => {
  it('should render recipe name', () => {
    const recipe = { id: '1', name: 'Chocolate Cake', ingredients: [] };
    
    render(<RecipeCard recipe={recipe} />);
    
    expect(screen.getByText('Chocolate Cake')).toBeInTheDocument();
  });

  it('should call onEdit when edit button is clicked', async () => {
    const mockOnEdit = jest.fn();
    const recipe = { id: '1', name: 'Chocolate Cake', ingredients: [] };
    
    render(<RecipeCard recipe={recipe} onEdit={mockOnEdit} />);
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    await userEvent.click(editButton);
    
    expect(mockOnEdit).toHaveBeenCalledWith(recipe);
  });
});
```

### Testing Custom Hooks

#### Hook Test Pattern
```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useRecipe } from './useRecipe';

describe('useRecipe', () => {
  it('should fetch recipe data successfully', async () => {
    const mockRecipe = { id: '1', name: 'Test Recipe' };
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => mockRecipe,
    });

    const { result } = renderHook(() => useRecipe('1'));

    // Initially loading
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();

    // Wait for data to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockRecipe);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch errors', async () => {
    const mockError = new Error('Network error');
    global.fetch = jest.fn().mockRejectedValue(mockError);

    const { result } = renderHook(() => useRecipe('1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBeNull();
  });
});
```

### Testing with User Interactions

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecipeForm } from './RecipeForm';

describe('RecipeForm', () => {
  it('should submit form with entered data', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();
    
    render(<RecipeForm onSubmit={mockOnSubmit} />);
    
    // Fill in the form
    await user.type(screen.getByLabelText(/recipe name/i), 'New Recipe');
    await user.type(screen.getByLabelText(/description/i), 'Delicious recipe');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /save/i }));
    
    // Verify submission
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'New Recipe',
      description: 'Delicious recipe',
    });
  });
});
```

## Best Practices

### 1. Use English for Everything
```typescript
// ✅ CORRECT
describe('RecipeList', () => {
  it('should display empty state when no recipes exist', () => {
    // Test implementation
  });
});

// ❌ INCORRECT
describe('ListaReceptur', () => {
  it('powinien wyświetlić pusty stan gdy nie ma receptur', () => {
    // Test implementation
  });
});
```

### 2. Mock External Dependencies
```typescript
// Mock fetch API
global.fetch = jest.fn();

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

// Mock custom hooks
jest.mock('./useRecipe', () => ({
  useRecipe: jest.fn(),
}));
```

### 3. Test Behavior, Not Implementation
```typescript
// ✅ CORRECT: Tests behavior
it('should show error message when submission fails', async () => {
  render(<RecipeForm onSubmit={jest.fn().mockRejectedValue(new Error())} />);
  
  await userEvent.click(screen.getByRole('button', { name: /save/i }));
  
  expect(screen.getByText(/error/i)).toBeInTheDocument();
});

// ❌ INCORRECT: Tests implementation details
it('should set error state to true', () => {
  const { result } = renderHook(() => useState(false));
  // Testing internal state directly
});
```

### 4. Use Proper Queries
Priority order (from React Testing Library):
1. `getByRole` - Most accessible
2. `getByLabelText` - For form fields
3. `getByPlaceholderText` - If no label
4. `getByText` - For non-interactive elements
5. `getByTestId` - Last resort

```typescript
// ✅ CORRECT
screen.getByRole('button', { name: /save/i });
screen.getByLabelText(/recipe name/i);

// ❌ AVOID
screen.getByTestId('save-button');
```

### 5. Clean Up After Tests
```typescript
afterEach(() => {
  jest.clearAllMocks();
  // Clean up any global state
});
```

### 6. Use Async Utilities
```typescript
// ✅ CORRECT: Wait for async updates
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});

// ❌ INCORRECT: Direct assertion on async result
expect(screen.getByText('Loaded')).toBeInTheDocument();
```

## Common Testing Patterns

### Testing Loading States
```typescript
it('should show loading spinner while fetching data', () => {
  render(<RecipeList />);
  
  expect(screen.getByRole('status')).toBeInTheDocument();
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
```

### Testing Error States
```typescript
it('should display error message when fetch fails', async () => {
  global.fetch = jest.fn().mockRejectedValue(new Error('API Error'));
  
  render(<RecipeList />);
  
  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
```

### Testing Conditional Rendering
```typescript
it('should show edit button only when user is authenticated', () => {
  const { rerender } = render(<RecipeCard isAuthenticated={false} />);
  
  expect(screen.queryByRole('button', { name: /edit/i })).not.toBeInTheDocument();
  
  rerender(<RecipeCard isAuthenticated={true} />);
  
  expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
});
```

## Running Tests

```bash
# Run all tests
nx test ui

# Run tests in watch mode
nx test ui --watch

# Run tests with coverage
nx test ui --coverage

# Run specific test file
nx test ui --testFile=RecipeForm.test.tsx
```

## Coverage Requirements

- Aim for >80% code coverage
- Focus on critical paths and edge cases
- Don't sacrifice quality for coverage percentage

## Remember

- Write tests in **English** (descriptions, variables, comments)
- Test behavior, not implementation
- Keep tests simple and focused
- Mock external dependencies
- Use proper async utilities
- Follow AAA pattern: Arrange, Act, Assert

