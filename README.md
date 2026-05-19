# Global Pass Launchpad

Welcome to the Global Pass Launchpad project. This is a modern, responsive, and performance-optimized React application designed for seamless user experiences, scalability, and maintainability.

## 🚀 Brief Overview

Built on **React 18** and **Vite**, this project offers blazing-fast development and optimized production builds. It leverages a rigorous, component-driven architecture using **Tailwind CSS** and **shadcn/ui** to ensure visual consistency, accessibility, and an excellent developer experience.

## 🛡️ Tech Stack

- **Framework:** React 18, Vite, TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Routing:** React Router v6
- **State Management & Data Fetching:** TanStack React Query (`react-query`)
- **Forms & Validation:** React Hook Form + Zod
- **Icons:** Lucide React
- **Charts & Carousels:** Recharts, Embla Carousel

## ✨ Key Features

- **Modern Architecture:** Next-generation frontend tooling with Vite for lightning-fast Hot Module Replacement (HMR).
- **Robust Component Library:** Accessibility-first interfaces utilizing `shadcn/ui` and `Radix UI`.
- **Type-Safe:** End-to-end type safety handled by TypeScript and schemas strictly validated by `Zod`.
- **Client-Friendly:** Modular directory structure allowing for fast iteration, easy team handovers, and scalable feature additions.

## 🛠️ Basic Setup

Ensure you have [Node.js](https://nodejs.org/) (v18+ recommended) and `npm` installed.

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build locally:**
   ```bash
   npm run preview
   ```

## 📝 Important Notes for Client Handover

- **Configuration:** The project configuration is managed in `vite.config.ts`. Any branding, colors, or global design tokens can be easily customized in `tailwind.config.ts` and `src/index.css`.
- **Deployment:** The application is built as a static site. The `./dist` folder (generated via `npm run build`) can be seamlessly deployed to any static hosting provider like **Vercel**, **Netlify**, or **AWS S3/CloudFront**.
- **Environment Variables:** If extending the app to connect with APIs or services, all secrets should be managed securely via `.env` files. Ensure you do not commit sensitive keys to the remote repository.
- **Code Linter:** Before pushing to production, run `npm run lint` to enforce formatting rules and eliminate hidden errors across the codebase.
