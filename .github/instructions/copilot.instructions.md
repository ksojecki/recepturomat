---
applyTo: '**'
priority: 20
languages:
  - typescript
  - javascript
generateInEnglish: true
enforceCommentsInEnglish: true
---

# GitHub Copilot Instructions for Recepturomat

## Purpose
Ensure all generated or modified source files, comments, variable names, and documentation are written in **English**.
Follow TypeScript + React + Nx conventions, and maintain small, testable components.

## Core Rules

### 1. English Code and Comments (REQUIRED)
- **All** source code, variable names, function names, and comments must be written in **English**
- User-facing UI text should use i18n/localization functions
- Documentation and README files must be in English
- Git commit messages should be in English

**Examples:**
```typescript
// ✅ CORRECT
const recipeList = []; // List of recipes
function calculateIngredients() { }

// ❌ INCORRECT
const listaReceptur = []; // Lista receptur
function obliczSkladniki() { }
```

### 2. TypeScript + React Best Practices

#### Component Structure
- Prefer **functional components** with hooks over class components
- Use explicit TypeScript types for props, state, and return values
- Keep components under ~200 lines; split into smaller components if needed
- Use descriptive English names for components and hooks

**Example:**
```typescript
// ✅ CORRECT
interface RecipeFormProps {
  initialData?: Recipe;
  onSubmit: (data: Recipe) => void;
}

export function RecipeForm({ initialData, onSubmit }: RecipeFormProps) {
  // Implementation
}

// ❌ INCORRECT
export function RecipeForm(props: any) { // Missing explicit types
  // Implementation
}
```

#### Hooks
- Extract complex logic into custom hooks
- Name custom hooks with `use` prefix (e.g., `useRecipe`, `useLocalStorage`)
- Document hook parameters and return values in English

#### State Management
- Keep state as close to where it's used as possible
- Use React Context for shared state across multiple components
- Consider using reducers for complex state logic

### 3. File Organization

#### Naming Conventions
- Components: PascalCase (e.g., `RecipeForm.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useRecipe.ts`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Types: PascalCase (e.g., `Recipe`, `ApiResponse<T>`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

#### File Headers
Add a brief English comment at the top of new files:

```typescript
/**
 * English file header: brief description of purpose.
 * 
 * Key exports:
 * - RecipeForm: Component for creating/editing recipes
 * - useRecipeValidation: Hook for form validation
 */
```

### 4. Testing Requirements

#### Test Structure
- Use **Jest** + **React Testing Library** for all tests
- Test files: `*.test.ts` or `*.test.tsx`
- Place tests next to the files they test
- Write tests in English (descriptions, variable names, comments)

#### Coverage
- Add unit tests for new hooks and utility functions
- Add component tests for new UI components
- Include edge cases and error scenarios
- Mock external dependencies and API calls

**Example:**
```typescript
describe('useRecipe', () => {
  it('should fetch recipe data when id is provided', async () => {
    // Test implementation
  });

  it('should handle fetch errors gracefully', async () => {
    // Test implementation
  });
});
```

### 5. Nx Workspace

#### Project Structure
- Backend: `/apps/backend` (Express + MongoDB)
- UI: `/apps/ui` (React + Vite + React Router)
- Shared libraries: `/libs/*`

#### Commands
- Run dev: `nx serve backend` and `nx serve ui`
- Run tests: `nx test <project-name>`
- Build: `nx build <project-name>`

### 6. API and Data Flow

#### Backend (Express)
- Use async/await for asynchronous operations
- Handle errors with proper HTTP status codes
- Validate input data before processing
- Use TypeScript interfaces from shared data-model library

#### Frontend (React)
- Use custom hooks for API calls (e.g., `useRecipe`, `useRecipesList`)
- Handle loading, error, and success states
- Show user-friendly error messages
- Use React Query or similar for caching (if configured)

### 7. Code Style

#### Formatting
- Use Prettier/ESLint configured in the project
- 2-space indentation
- Single quotes for strings (unless JSX)
- Semicolons required
- Trailing commas in objects/arrays

#### Comments
- Write comments in English
- Explain **why**, not **what** (code should be self-documenting)
- Add JSDoc comments for exported functions/components
- Keep comments concise and up-to-date

**Example:**
```typescript
// ✅ CORRECT: Explains why
// Debounce search to avoid excessive API calls
const debouncedSearch = useMemo(() => debounce(search, 300), []);

// ❌ INCORRECT: States the obvious
// This is a variable
const x = 10;
```

### 8. Security and Best Practices

- Never commit secrets, API keys, or credentials
- Use environment variables for configuration
- Sanitize user input before processing
- Use HTTPS for local development (configured in Vite)
- Implement proper authentication and authorization checks

### 9. Internationalization (i18n)

- Do not hardcode user-facing text in components
- Use i18n functions for all UI strings
- Keep translation keys in English
- Document available translations

**Example:**
```typescript
// ✅ CORRECT
<button>{t('recipe.save')}</button>

// ❌ INCORRECT
<button>Zapisz</button>
```

### 10. Git Workflow

- Write commit messages in English
- Use conventional commit format: `type(scope): description`
  - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Keep commits atomic and focused
- Write descriptive pull request descriptions in English

**Examples:**
```
feat(ui): add recipe search functionality
fix(backend): resolve authentication token expiration issue
test(ui): add tests for RecipeForm component
docs: update setup instructions in README
```

## Common Patterns

### API Call Hook Pattern
```typescript
export function useRecipe(id: string | undefined) {
  const [data, setData] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;
    
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/recipe/${id}`);
        const recipe = await response.json();
        setData(recipe);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  return { data, loading, error };
}
```

### Form Component Pattern
```typescript
interface FormProps {
  initialValues?: Recipe;
  onSubmit: (values: Recipe) => Promise<void>;
}

export function RecipeForm({ initialValues, onSubmit }: FormProps) {
  const [formData, setFormData] = useState(initialValues || {});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validation logic
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

## Quick Reference

- 🌐 **Language**: English for all code, comments, and documentation
- ⚛️ **Framework**: React + TypeScript + Vite + React Router
- 🧪 **Testing**: Jest + React Testing Library
- 📦 **Monorepo**: Nx workspace
- 🎨 **Styling**: Tailwind CSS
- 🔧 **Backend**: Express + MongoDB
- 🔒 **Auth**: Custom authentication system

## Need Help?

- Nx documentation: https://nx.dev
- React documentation: https://react.dev
- TypeScript handbook: https://www.typescriptlang.org/docs/
- React Testing Library: https://testing-library.com/react

---

**Remember**: All code, comments, variable names, and documentation must be in **English**.

