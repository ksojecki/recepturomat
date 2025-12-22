---
applyTo: '{apps,libs}/**'
priority: 15
---

# Nx Workspace Instructions

## Workspace Structure

This is an **Nx monorepo** containing multiple applications and shared libraries.

### Applications (`/apps`)
- **backend**: Express.js + MongoDB API server
  - Path: `/apps/backend`
  - Port: 3000
  - Technology: Node.js, Express, MongoDB, TypeScript
  
- **ui**: React frontend application
  - Path: `/apps/ui`
  - Port: 4200 (dev), 4300 (preview)
  - Technology: React, TypeScript, Vite, React Router, Tailwind CSS

### Libraries (`/libs`)
- **app-toolkit**: Shared utilities and middleware
  - Express middlewares
  - App settings helpers
  
- **data-model**: Shared data types and models
  - TypeScript interfaces
  - Data validation schemas
  - Shared between backend and frontend

## Nx Commands

### Development
```bash
# Serve backend (API server)
nx serve backend

# Serve UI (frontend dev server)
nx serve ui

# Serve both (use separate terminals)
nx serve backend & nx serve ui
```

### Testing
```bash
# Run tests for specific project
nx test ui
nx test backend
nx test data-model

# Run all tests
nx run-many --target=test --all

# Run tests with coverage
nx test ui --coverage
```

### Building
```bash
# Build specific project
nx build ui
nx build backend

# Build all projects
nx run-many --target=build --all

# Build with production configuration
nx build ui --configuration=production
```

### Linting
```bash
# Lint specific project
nx lint ui
nx lint backend

# Lint all projects
nx run-many --target=lint --all

# Fix linting issues automatically
nx lint ui --fix
```

### Code Generation
```bash
# Generate new component in UI
nx generate @nx/react:component ComponentName --project=ui

# Generate new library
nx generate @nx/js:library library-name

# Generate new hook
nx generate @nx/react:hook useHookName --project=ui
```

### Dependency Graph
```bash
# View dependency graph
nx graph

# View affected projects
nx affected:graph
```

## Project Configuration

### Adding Dependencies

#### Workspace-wide dependency
```bash
npm install <package-name> -W
```

#### Project-specific dependency
```bash
# Add to UI project
cd apps/ui
npm install <package-name>

# Add to backend project
cd apps/backend
npm install <package-name>
```

### Importing from Libraries

Libraries can be imported using TypeScript path mappings:

```typescript
// Import from data-model library
import { Recipe, Ingredient } from '@recepturomat/data-model';

// Import from app-toolkit library
import { appSettingsFromEnv } from '@recepturomat/app-toolkit';
```

Path mappings are defined in `/tsconfig.base.json`.

## Best Practices

### 1. Shared Code
- Put shared types in `/libs/data-model`
- Put shared utilities in `/libs/app-toolkit`
- Don't duplicate code between apps

### 2. Dependencies
- Keep dependencies up to date
- Use consistent versions across projects
- Avoid circular dependencies between libraries

### 3. Project Boundaries
- Backend should not import UI code
- UI can import from shared libraries
- Libraries should be independent and reusable

### 4. Testing Strategy
- Test shared libraries thoroughly
- Mock library imports in app tests
- Use dependency injection for better testability

### 5. Code Organization
```
apps/
  backend/
    src/
      api/           # API route handlers
      dataModel/     # MongoDB models and database logic
      main.ts        # Application entry point
  ui/
    app/
      routes.tsx     # Route definitions
      api/           # API client hooks
      components/    # Shared UI components
      recipes/       # Recipe-specific features
      authentication/# Auth-specific features

libs/
  data-model/
    src/
      lib/           # Shared types and interfaces
  app-toolkit/
    src/
      lib/           # Shared utilities
```

## Common Tasks

### Adding a New Feature

1. **Determine scope**: Is it UI-only, backend-only, or shared?
2. **Create types** (if needed) in `/libs/data-model`
3. **Implement backend** API in `/apps/backend/src/api`
4. **Implement UI** components in `/apps/ui/app`
5. **Add tests** for both backend and UI
6. **Update routes** if needed

### Refactoring Shared Code

1. Identify duplicated code across projects
2. Create new file in appropriate library (`/libs/data-model` or `/libs/app-toolkit`)
3. Export from library's `index.ts`
4. Update imports in consuming projects
5. Run `nx affected:test` to verify nothing broke
6. Update tests

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all dependencies (carefully!)
nx migrate latest

# Run migrations
nx migrate --run-migrations

# Test everything after updates
nx run-many --target=test --all
```

## Troubleshooting

### Build Cache Issues
```bash
# Clear Nx cache
nx reset

# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### Type Errors in Shared Libraries
- Ensure library is built: `nx build data-model`
- Check TypeScript path mappings in `tsconfig.base.json`
- Verify exports in library's `index.ts`

### Test Failures After Refactoring
```bash
# See which projects are affected
nx affected:test

# Run tests for affected projects
nx affected --target=test
```

## Key Files

- `/nx.json` - Nx workspace configuration
- `/tsconfig.base.json` - Base TypeScript config with path mappings
- `/package.json` - Root package.json with workspace scripts
- `/{apps,libs}/*/project.json` - Individual project configurations

## Environment Variables

### Backend
- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- Environment-specific config in `/apps/backend/src/settings.ts`

### UI
- Vite environment variables (prefix with `VITE_`)
- Configuration in `/apps/ui/vite.config.ts`

## Remember

- Use Nx commands (`nx`) instead of direct npm scripts
- Run tests before committing: `nx affected:test`
- Check dependency graph: `nx graph`
- Keep libraries focused and independent
- Write all code and comments in **English**

