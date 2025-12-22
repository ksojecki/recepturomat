# GitHub Copilot Instructions

This file provides quick reference for GitHub Copilot when working in this repository.

For detailed instructions, see:
- [Copilot Instructions](.github/instructions/copilot.instructions.md)
- [Testing Instructions](.github/instructions/testing.instructions.md)
- [Nx Workspace Instructions](.github/instructions/nx-workspace.instructions.md)
- [Contributing Guidelines](CONTRIBUTING.md)

## 🌐 Critical Rule: English Only

**All generated code, comments, variable names, and documentation MUST be in English.**

## ⚡ Quick Reference

### Project Type
- Nx monorepo with React (TypeScript + Vite + React Router) and Express (TypeScript + MongoDB)

### Code Style
- Functional React components with hooks
- Explicit TypeScript types
- Small components (~200 lines max)
- English names for everything

### Testing
- Jest + React Testing Library
- Test files: `*.test.ts` or `*.test.tsx`
- Write tests in English

### Common Patterns

#### Component
```typescript
interface RecipeCardProps {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
}

export function RecipeCard({ recipe, onEdit }: RecipeCardProps) {
  // Implementation
}
```

#### Custom Hook
```typescript
export function useRecipe(id: string | undefined) {
  const [data, setData] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Implementation
  
  return { data, loading, error };
}
```

#### Test
```typescript
describe('RecipeCard', () => {
  it('should render recipe name', () => {
    const recipe = { id: '1', name: 'Chocolate Cake' };
    render(<RecipeCard recipe={recipe} />);
    expect(screen.getByText('Chocolate Cake')).toBeInTheDocument();
  });
});
```

## 🚫 Don't Do

- ❌ Use Polish names: `listaReceptur`, `obliczSkladniki`
- ❌ Write comments in Polish
- ❌ Create large components (>200 lines)
- ❌ Use `any` type without justification
- ❌ Skip tests for new features

## ✅ Do

- ✅ Use English names: `recipeList`, `calculateIngredients`
- ✅ Write comments in English
- ✅ Split large components
- ✅ Use explicit TypeScript types
- ✅ Write tests for new features

## 📁 Project Structure

```
apps/
  backend/          # Express + MongoDB API
  ui/               # React frontend
libs/
  data-model/       # Shared types
  app-toolkit/      # Shared utilities
```

## 🔧 Common Commands

```bash
nx serve ui          # Start frontend
nx serve backend     # Start backend
nx test ui           # Run tests
nx lint ui --fix     # Fix linting
```

