# Recepturomat

A recipe management application built with React, TypeScript, and MongoDB. This is an Nx monorepo containing both the frontend UI and backend API.

## 🌐 Language Policy

**All code, comments, and documentation in this project must be written in English.**

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## 📁 Project Structure

```
recepturomat/
├── apps/
│   ├── backend/        # Express.js + MongoDB API
│   └── ui/             # React frontend (Vite + React Router + Tailwind)
├── libs/
│   ├── data-model/     # Shared TypeScript types and interfaces
│   └── app-toolkit/    # Shared utilities and middleware
└── .github/
    └── instructions/   # GitHub Copilot configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm
- MongoDB

### Installation

```sh
npm install
```

### Development

Run both backend and UI in separate terminals:

```sh
# Terminal 1: Start backend API server
npx nx serve backend

# Terminal 2: Start frontend dev server
npx nx serve ui
```

Access the application:
- Frontend: https://localhost:4200
- Backend API: http://localhost:3000

## 📋 Available Commands

### Run tasks

To run the dev server for your app, use:

```sh
npx nx serve recepturomat-ui
```

### Testing

```sh
# Run all tests
npx nx run-many --target=test --all

# Run tests for specific project
npx nx test ui
npx nx test backend

# Run tests in watch mode
npx nx test ui --watch

# Run with coverage
npx nx test ui --coverage
```

### Linting

```sh
# Lint all projects
npx nx run-many --target=lint --all

# Lint specific project
npx nx lint ui

# Auto-fix linting issues
npx nx lint ui --fix
```

### Building

```sh
npx nx build recepturomat-ui
```

To see all available targets to run for a project, run:

```sh
npx nx show project recepturomat-ui
```

## 🤖 GitHub Copilot Configuration

This project is configured for use with GitHub Copilot. Instructions are located in `.github/instructions/`:

- **copilot.instructions.md** - Core coding standards and best practices
- **testing.instructions.md** - Testing guidelines with Jest + React Testing Library
- **nx-workspace.instructions.md** - Nx-specific commands and patterns

### Key Guidelines for Copilot

- Generate all code and comments in **English**
- Follow TypeScript + React best practices
- Use functional components with hooks
- Write tests using Jest + React Testing Library
- Keep components small and focused (~200 lines max)
- Use explicit TypeScript types

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](./CONTRIBUTING.md) before submitting a pull request.

**Important**: All contributions must follow our English-only policy for code and documentation.

### Quick Contribution Checklist

- [ ] All code and comments are in English
- [ ] Tests pass (`nx affected:test`)
- [ ] No lint errors (`nx affected:lint`)
- [ ] Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/)
- [ ] Documentation updated (if needed)

## 🧰 Technology Stack

- **Frontend**: React, TypeScript, Vite, React Router, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB, TypeScript
- **Testing**: Jest, React Testing Library
- **Build Tool**: Nx
- **Code Quality**: ESLint, Prettier

## 📚 Documentation

- [Contributing Guidelines](./CONTRIBUTING.md)
- [GitHub Copilot Instructions](./.github/instructions/)
- [Nx Documentation](https://nx.dev)

## 📝 License

[Your License Here]

---

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/react:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/react:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
