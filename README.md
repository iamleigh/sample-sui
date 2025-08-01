# 🧩 WPMU DEV Design System – UI Library Monorepo (React + TypeScript)

This repository is an **extracted and self-contained code sample** from a **real-world Design System**
I led and helped build as **Team Lead & Principal Developer** at WPMU DEV. The system unifies UI elements
across multiple products using a robust, scalable component architecture based on **React**, **TypeScript**,
**Atomic Design**, and **BEM**.

The project originally started with **Storybook 6**, **JavaScript**, and **Lerna** as the monorepo tool.
Over time, it was progressively migrated to **TypeScript** to support type-safety and improved maintainability,
though you may still find some isolated JavaScript files from earlier iterations.

The Storybook showcase was 100% designed by me based on Storybook 6 and its constraints. You can take a look
at an extraction of the original Figma file at the link below:<br/>
[SUI 3.0.0 / Storybook](https://www.figma.com/design/sYCLaqTKOebt9N3duZNPXY/SUI-3.0.0---Storybook?node-id=0-1&t=RO7OQvIFtOYjSAcB-1)

**The design varies from the final implementation in some parts since I had to adjust it when we migrated
from Storybook 6 to Storybook 7, since it introduced new constraints to the showcase personalization.**

🔐 **Note:** This is a production codebase. The original UI system was deployed across WPMU DEV's
plugin suite (Forminator, Smush, Hustle, and more). The submitted code samples were
**solely coded by me (including the architecture I created for this project)** but authored
by WPMU DEV and is free of sensitive business logic or proprietary APIs.

---

## 📦 What is this project?

This is a **component library monorepo**, powered by:

- 🔧 React (w/ functional components and hooks)
- ⚙️ TypeScript (strict mode + isolated packages)
- 🧱 Atomic Design structure
- 📚 Storybook v7.4.5 (component explorer)
- 🧪 TDD-ready setup with isolated logic
- 🧩 Full BEM CSS methodology

The monorepo includes reusable components such as buttons, dropdowns, icons, tooltips, inputs,
and context providers — all designed for a **consistent developer and UX experience** across
an enterprise-grade product suite.

> 🔶 **Note**: This is a **working Storybook project**, but **not all components include stories**
here — since I'm only sharing **content I coded exclusively**. In some cases, I wrote the component
and its story; in others, I only authored the component.

---

## 🧠 Why am I sharing this?

> As part of the application process, this repository serves as a **code sample** to demonstrate my:
- React & TypeScript proficiency
- Component library architecture skills
- Monorepo organization
- Storybook integration and customization
- TDD patterns and separation of logic vs UI
- Ownership and leadership in large-scale codebases

---

## 🧑‍💻 Key Technical Highlights

- 💼 **Role**: Team Lead & Principal Developer of the design system
- 🏗️ **Monorepo Architecture**: Created and maintained the full structure (packages, build scripts, Lerna/Yarn workspaces)
- 🔄 **Component Ownership**: Personally wrote and documented dozens of components
- 📐 **BEM & Atomic Design**: Used for scalable naming and visual system consistency
- 📖 **Storybook Integration**: Customized for our workflow (see caveats below)
- 🧩 **No `@wordpress/components` usage**: Due to company strategy, we **avoided relying on WordPress UI packages** to ensure **total flexibility and independence** across our products. All components are fully custom-built.

## ✨ Key Ecosystem Highlights

- ⚛️ **React + TypeScript** UI library with isolated, testable packages
- 🧪 Built with **Jest** and **Testing Library** for test coverage
- 📚 **Storybook 7 (migrated from v6)** with full custom theming and WordPress visual emulation
- 📦 Monorepo managed via **Lerna** for dependency isolation and consistent cross-package builds
- 🎨 CSS styles compiled via **Gulp**, chosen for its granular control and build-time performance
- 📁 Components follow **Atomic Design** principles, BEM naming, and composable architecture

### 📦 Why Lerna?

Despite the rise of alternatives like Turborepo and Nx, **Lerna's simplicity and zero-config linking**
made it an ideal choice (at the time the project started) for a team working across dozens of packages
with minimal overhead. It allowed consistent builds, scoped commands, and easy dependency updates
without friction.

### 🛠️ Why Gulp for CSS?

The project uses **Gulp** to compile and package its design tokens and CSS framework because of its ability
to **precisely control file output**, support SCSS pipelines, and handle global tasks like RTL generation
and package-specific styles in a highly customizable way.

---

## ⚠️ Setup Notes

> This code sample uses **legacy dependencies** to reflect the exact environment used in production.

- Node version: **20.19.4**
- Yarn version: **1.22.22**
- Storybook version: **7.4.5**

```bash
# Install all the required dependencies
yarn install

# Run the project locally
yarn storybook
```

### 🌐 Prefer a Live Preview?

If you'd rather explore the project without installing dependencies locally,
you can view a hosted Storybook build here:<br/>
👉 [Live Preview on GitHub Pages](https://iamleigh.github.io/sample-sui/)

---

## 🛠️ Why not Storybook 8+?

This design system **relies heavily on** Canvas **and internal APIs** that were flexible and powerful
in Storybook 6.x and most of them still workable in 7.x. However, in version 8.x, those APIs have been
restricted or deprecated, breaking critical preview functionality. For this reason,
***along with the team, we made the decision (at the moment) to postpone the upgrade** to maintain a
better editing experience and avoid rewriting half the rendering logic.

You might see ***console warnings in red** about deprecations in the Storybook UI — these are known and
tracked internally. They are not runtime errors and do not affect functionality in 7.x.

### 🧱 Why Custom Storybook?

Later versions of Storybook 7 introduced constraints that limited low-level customization—particularly
around the Docs addon, Canvas behavior, and layout overrides. Since we needed to
**simulate the WordPress block editor and plugin environment**, full control over Storybook internals
was required. For this reason, we remained on early 7.x versions where this flexibility was still possible.

---

## ✅ Submission Criteria Alignment

| ✅ Requirement                               | 💬 Explanation                                                                                          |
|---------------------------------------------|------------------------------------------------------------------------------------------------------|
| **Semantic HTML**                           | Components follow semantic markup with roles (e.g., `dialog`, `aria-modal`) and structural tags for accessibility. |
| **CSS and custom UI architecture**          | Fully custom BEM-based CSS and Atomic Design structure, no CSS frameworks, ensuring scalability and consistency. |
| **Component architecture**                  | Modular monorepo design system with isolated packages and reusable utilities, built for enterprise-scale apps. |
| **Design & QA**                             | Entirely designed and implemented by me; includes Storybook integration to validate design fidelity and UX quality. |
| **JavaScript without jQuery**               | Pure React + TypeScript implementation, no legacy jQuery dependencies.                                  |
| **React**                                   | Built entirely with React functional components and hooks, leveraging context and custom hooks where needed. |
| **Accessibility**                           | Implements ARIA roles, keyboard interactions, and focus management in core components for better a11y support. |
| **WordPress/PHP (recommended)**             | Although this repo is React-only, these components were designed for and deployed in WordPress plugins (Forminator, Hustle, etc.). |

## 📂 What to Look For

- Explore any component folder (e.g., `@wpmudev/sui-button`) to see real implementation details.
- Review **prop typing** with TypeScript, including JSDoc-style comments for DX and Storybook controls.
- Inspect **Storybook stories** to see how components are documented, demoed, and tested visually.
- Note the **adherence to best practices** in naming conventions, accessibility (a11y), and architectural consistency.
- Check how **logic is decoupled from UI**, using utilities, hooks, and context providers to keep components reusable and maintainable.

If you'd like to dive deeper into any piece, I'd be happy to walk you through it.

— **Leighton Quito**
