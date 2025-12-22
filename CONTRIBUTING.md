# Contributing to Recepturomat

Thank you for your interest in contributing to Recepturomat! This document provides guidelines and instructions for contributing to this project.

## 🌐 Language Requirements

**All code, comments, documentation, and commit messages MUST be written in English.**

This includes:
- Variable names, function names, class names
- Code comments and documentation
- Git commit messages
- Pull request descriptions
- Issue descriptions
- README and documentation files

User-facing UI text should use internationalization (i18n) functions rather than hardcoded strings.

## 🏗️ Project Structure

This is an Nx monorepo with the following structure:

```
recepturomat/
├── apps/
│   ├── backend/        # Express.js + MongoDB API
│   └── ui/             # React frontend (Vite + React Router)
├── libs/
│   ├── data-model/     # Shared TypeScript types
│   └── app-toolkit/    # Shared utilities
└── .github/
    └── instructions/   # GitHub Copilot instructions
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (for backend development)
- Git

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/recepturomat.git
cd recepturomat
```

2. Install dependencies:
```bash
npm install
```

3. Start development servers:
```bash
# Terminal 1: Start backend
nx serve backend

# Terminal 2: Start UI
nx serve ui
```

4. Access the application:
- Frontend: https://localhost:4200
- Backend API: http://localhost:3000

## 💻 Development Workflow

### Code Style

- **Language**: Write all code and comments in English
- **TypeScript**: Use explicit types for function parameters and return values
- **React**: Prefer functional components with hooks
- **Formatting**: Use Prettier/ESLint (configured in project)
- **Component Size**: Keep components under ~200 lines

### Creating a New Feature

1. Create a new branch:
```bash
git checkout -b feat/your-feature-name
```

2. Implement your feature:
   - Add types to `/libs/data-model` if needed
   - Implement backend API in `/apps/backend`
   - Implement UI components in `/apps/ui`
   - Add tests for both backend and UI

3. Write tests:
```bash
nx test ui
nx test backend
```

4. Lint your code:
```bash
nx lint ui --fix
nx lint backend --fix
```

5. Commit your changes:
```bash
git add .
git commit -m "feat: add new feature description"
```

### Commit Message Convention

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(ui): add recipe search functionality
fix(backend): resolve authentication token expiration
test(ui): add tests for RecipeForm component
docs: update setup instructions in README
refactor(ui): extract RecipeCard component
```

### Pull Request Process

1. Ensure all tests pass:
```bash
nx affected:test
```

2. Update documentation if needed

3. Create a pull request with:
   - Clear description of changes (in English)
   - Reference to related issues
   - Screenshots (for UI changes)

4. Wait for code review and address feedback

## 🧪 Testing

### Running Tests

```bash
# Run all tests
nx run-many --target=test --all

# Run tests for specific project
nx test ui
nx test backend

# Run tests in watch mode
nx test ui --watch

# Run with coverage
nx test ui --coverage
```

### Writing Tests

- Use Jest + React Testing Library for UI tests
- Write tests in English (descriptions, variables, comments)
- Follow AAA pattern: Arrange, Act, Assert
- Mock external dependencies
- Test behavior, not implementation

**Example:**
```typescript
describe('RecipeForm', () => {
  it('should submit form with entered data', async () => {
    // Arrange
    const mockOnSubmit = jest.fn();
    render(<RecipeForm onSubmit={mockOnSubmit} />);
    
    // Act
    await userEvent.type(screen.getByLabelText(/name/i), 'New Recipe');
    await userEvent.click(screen.getByRole('button', { name: /save/i }));
    
    // Assert
    expect(mockOnSubmit).toHaveBeenCalledWith({ name: 'New Recipe' });
  });
});
```

## 📝 Code Review Guidelines

### For Authors
- Write clear, descriptive commit messages (in English)
- Keep pull requests focused and small
- Add tests for new features
- Update documentation
- Respond to feedback promptly

### For Reviewers
- Be respectful and constructive
- Focus on code quality and maintainability
- Check for test coverage
- Verify English language usage in code/comments
- Suggest improvements, don't just criticize

## 🤖 GitHub Copilot Usage

This project is configured for use with GitHub Copilot. The AI assistant will:

- Generate code and comments in English
- Follow TypeScript and React best practices
- Suggest tests using Jest + React Testing Library
- Respect project structure and conventions

Instructions for Copilot are located in `/.github/instructions/`.

## 🐛 Reporting Issues

When reporting issues:

1. Use English for issue title and description
2. Provide clear steps to reproduce
3. Include relevant code snippets or screenshots
4. Specify your environment (OS, Node version, etc.)

## 📚 Resources

- [Developer Checklist](./.github/DEVELOPER_CHECKLIST.md) - Quick checklist for daily work
- [Nx Documentation](https://nx.dev)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Testing Library](https://testing-library.com/react)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 📞 Getting Help

If you need help:
- Check existing issues and discussions
- Read the documentation in `/.github/instructions/`
- Ask questions in pull request comments
- Contact the maintainers

## ✅ Checklist Before Submitting

- [ ] All code and comments are in English
- [ ] Tests pass locally (`nx affected:test`)
- [ ] Code follows project conventions
- [ ] Commit messages follow Conventional Commits format
- [ ] Documentation is updated (if needed)
- [ ] No lint errors (`nx affected:lint`)
- [ ] Pull request has clear description

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the project's license.

---

Thank you for contributing to Recepturomat! 🎉

