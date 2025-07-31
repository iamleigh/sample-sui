# 👥 Contributing to the Design System

Welcome! This monorepo is the core of our React + TypeScript design system,
structured using **Atomic Design**, **BEM**, and powered by **Lerna** + **Storybook**.

This guide will walk you through how to set up and work with the project locally. 🧠

---

## ⚙️ Requirements

Before starting, ensure your environment matches the required versions:

- **Node.js** `>= 16.x` (LTS recommended)
- **Yarn** `v1.22.22` (required for monorepo compatibility)
- **Lerna** `^8.2.1` (locally installed)

---

## 📁 Project Structure

The project is organized as a Lerna + Yarn Workspaces monorepo with
strict separation between assets, documentation, and reusable logic.
Key folders include:

```
packages/
│
├── assets/                      # 🎨 Tokens, styles, and icons
│   ├── sui-css/                 # Global design tokens (color, spacing, typography)
│   └── sui-icons/               # Icon system (React-based, SVG)

├── docs/                        # 📚 Storybook + custom doc components
│   └── sui-docs/                # Visual documentation (uses Storybook Canvas)

├── react/                       # ⚛️ Core logic & UI components
│   ├── sui-hooks/               # Reusable React hooks
│   ├── sui-utils/               # Shared utility methods (formatters, helpers, types)
│   ├── sui-devtools/            # Developer utilities for testing, a11y, and CI
│   └── elements/                # 💡 Atomic component packages
│       ├── sui-button/          # Button component (standalone package)
│       ├── sui-input/           # Input component (standalone package)
│       ├── sui-checkbox/        # Checkbox component (standalone package)
│       └── ...                  # Many more standalone packages (individual components)
```

### 📦 `elements/` Folder Note

The `elements/` folder under `react/` includes all **individually packaged UI components**,
each with its own `package.json`, styles, logic, and stories (if available). This modular
approach allows product teams to:

- Import only the components they need
- Test and publish each element independently
- Apply consistent styling via `sui-css` (even outside React environment)

---

## 🚀 Getting Started

Clone the repo and install all dependencies:

```bash
git clone <this-repo>
cd your-project
yarn install
```

Bootstrap Lerna packages:

```bash
lerna bootstrap
```

Then you’re good to go! 🎉

---

## 🧪 Running Storybook

You can preview all shared components using:

```bash
yarn storybook
```

> ℹ️ Note:
The project uses Storybook v7.4.5 because it provides the best
support for full-page Canvas extensions.
**Upgrading to Storybook v8+ is not currently possible** due to restricted
custom rendering APIs. Some console warnings may appear about future
deprecations—these are expected and non-breaking.

---

## ⚙️ Tooling & Scripts

This monorepo uses `yarn` (v1.22.22) and `lerna` for managing packages, development, and documentation workflows.

> **✅ Make sure to install dependencies with `yarn` (not `npm`) to avoid version mismatches.**

| Command               | Description                                                 |
|-----------------------|-------------------------------------------------------------|
| `yarn storybook`      | 🔎 Starts Storybook for component development and preview   |
| `yarn test`           | 🧪 Runs all Jest unit tests once                            |
| `yarn test:dev`       | 🧪 Runs all Jest tests in watch mode                        |
| `yarn lint`           | 🔍 Lints the codebase using ESLint                          |
| `yarn format-files`   | 🎨 Formats files using Prettier                             |

---

## 📦 Lerna Commands

| Command                                | Description                                                      |
|----------------------------------------|------------------------------------------------------------------|
| `lerna bootstrap`                      | 🔄 Installs & links all dependencies across packages             |
| `lerna create <pkg-name> <loc> --yes`  | 📦 Creates a new package inside the specified folder             |
| `lerna run build:readme`               | 📝 Generates/updates README.md for each individual component     |
| `lerna run clean`                      | 🧹 Performs a basic cleanup (temp & build files)                 |
| `lerna run clean:deep`                 | 🧨 Packages deep clean, including node_modules in each package   |
| `lerna run prod`                       | 🚀 Builds all packages for production (Storybook, dist, etc.)    |

---

## 🧱 Development Guidelines

- Use Atomic Design principles to structure components.
- Apply BEM conventions for all class naming.
- Test components in isolation with Jest or Testing Library (where applicable).
- Use Storybook for visual test cases.

---

Thank you for contributing! 🙌
Let’s build consistent, accessible, and delightful UIs together.
