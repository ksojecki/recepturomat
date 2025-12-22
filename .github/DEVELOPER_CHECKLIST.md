# Developer Checklist - GitHub Copilot

Quick checklist for developers working with GitHub Copilot in this project.

## ✅ Before You Start

- [ ] Read [CONTRIBUTING.md](../CONTRIBUTING.md)
- [ ] Understand the **English-only policy** (all code, comments, variables)
- [ ] Review [.github/copilot-instructions.md](../copilot-instructions.md)
- [ ] Setup your IDE with GitHub Copilot extension

## ✅ When Writing Code

- [ ] Use **English** names for variables, functions, classes
- [ ] Write **English** comments (explain why, not what)
- [ ] Keep components under **~200 lines**
- [ ] Use **explicit TypeScript types** for public APIs
- [ ] Prefer **functional components** with hooks
- [ ] Extract complex logic into **custom hooks**

## ✅ When Writing Tests

- [ ] Test files: `*.test.ts` or `*.test.tsx`
- [ ] Use `describe`, `it`, `expect` (available globally)
- [ ] Write test descriptions in **English**
- [ ] Use `@testing-library/jest-dom` matchers (e.g., `toBeInTheDocument()`)
- [ ] Test behavior, not implementation
- [ ] Mock external dependencies

## ✅ Before Committing

- [ ] Run tests: `nx test ui` or `nx affected:test`
- [ ] Fix linting: `nx lint ui --fix` or `nx affected:lint --fix`
- [ ] All code and comments are in **English**
- [ ] Commit message follows [Conventional Commits](https://www.conventionalcommits.org/)
  - Format: `type(scope): description`
  - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- [ ] No console.logs left in code
- [ ] No hardcoded secrets or credentials

## ✅ When Creating PR

- [ ] Title and description in **English**
- [ ] Reference related issues
- [ ] Add screenshots for UI changes
- [ ] Update documentation if needed
- [ ] Request review from team members

## 🚫 Common Mistakes to Avoid

❌ **Polish names**
```typescript
const listaReceptur = []; // WRONG
const obliczSkladniki = () => {}; // WRONG
```

✅ **English names**
```typescript
const recipeList = []; // CORRECT
const calculateIngredients = () => {}; // CORRECT
```

❌ **Polish comments**
```typescript
// Pobierz receptury z API // WRONG
```

✅ **English comments**
```typescript
// Fetch recipes from API // CORRECT
```

❌ **Implicit types**
```typescript
function process(data: any) {} // WRONG
```

✅ **Explicit types**
```typescript
function processRecipe(data: Recipe): ProcessedRecipe {} // CORRECT
```

❌ **Large components**
```typescript
// Component with 500 lines // WRONG
```

✅ **Small, focused components**
```typescript
// Split into multiple components < 200 lines each // CORRECT
```

## 🤖 Working with Copilot

### Best Practices

1. **Write descriptive comments first**
   ```typescript
   // Hook for fetching recipe data with caching and error handling
   export function useRecipe(id: string) {
     // Copilot will suggest implementation
   ```

2. **Use meaningful names**
   ```typescript
   // Good naming helps Copilot understand context
   interface RecipeFormProps {
     // Copilot will suggest appropriate fields
   ```

3. **Accept and review suggestions**
   - Don't blindly accept all suggestions
   - Review generated code for quality
   - Ensure it follows project conventions

4. **Use Copilot for tests**
   ```typescript
   describe('RecipeForm', () => {
     it('should // Copilot suggests rest
   ```

### When Copilot Suggests Non-English

If Copilot suggests Polish code:
1. Reject the suggestion (Esc)
2. Add a comment: `// Use English names only`
3. Start typing in English
4. Copilot should adapt

### Getting Better Suggestions

- Add clear comments describing intent
- Use consistent naming patterns
- Structure code following project conventions
- Reference existing patterns in codebase

## 📚 Quick Reference

### Commands
```bash
# Start dev servers
nx serve backend
nx serve ui

# Run tests
nx test ui
nx test backend
nx affected:test

# Linting
nx lint ui --fix
nx affected:lint --fix

# Build
nx build ui
nx build backend

# View dependency graph
nx graph
```

### File Structure
```
apps/backend/    # Express API
apps/ui/         # React frontend
libs/data-model/ # Shared types
libs/app-toolkit/# Shared utilities
```

### Common Patterns
- Components: `PascalCase.tsx`
- Hooks: `useHookName.ts`
- Tests: `ComponentName.test.tsx`
- Utilities: `utilityName.ts`
- Types: `PascalCase` (e.g., `Recipe`, `User`)
- Constants: `UPPER_SNAKE_CASE`

## 📖 Documentation Links

- [CONTRIBUTING.md](../CONTRIBUTING.md) - Full contributing guide
- [Copilot Instructions](../copilot-instructions.md) - Quick reference
- [Detailed Instructions](./instructions/) - All instruction files
- [Nx Documentation](https://nx.dev) - Nx workspace docs

## 🆘 Need Help?

1. Check [CONTRIBUTING.md](../CONTRIBUTING.md)
2. Review [instruction files](./instructions/)
3. Ask in team chat or PR comments
4. Check existing code for patterns

---

**Remember**: All code, comments, and documentation MUST be in **English**! 🌐

