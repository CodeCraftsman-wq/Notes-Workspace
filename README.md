# 📝 Notes Workspace

> A high-performance, workspace built with a modern full-stack architecture.

Notes Workspace is a premium note-taking application engineered for speed, reliability, and beautiful design. It features a completely custom rich-text editor, offline-first capabilities, and seamless cloud synchronization.

## ✨ Key Features

* **Advanced Rich-Text Editor:** Built on top of Tiptap, featuring custom React Node Views.
* **Interactive Media:** Upload images directly to the cloud, with Notion-style drag-to-resize and drag-and-drop repositioning.
* **Offline-First Architecture:** Keep writing even when the Wi-Fi drops. Data saves locally and syncs automatically upon reconnection.
* **Instant Cloud Sync:** Powered by a high-performance Neon PostgreSQL database.
* **Enterprise-Grade Security:** Seamless and secure user authentication handled by Clerk.
* **Beautiful UI/UX:** Frosted glassmorphism, responsive sidebar, and a buttery-smooth Dark/Light mode toggle powered by Tailwind CSS and Framer Motion.
* **Slash Commands:** Type `/` to instantly open a floating formatting menu.

## 🚀 Getting Started

## Prerequisites

Before setting up **Notes Workspace**, make sure you have the following installed on your machine:

### Required Software

- **[Node.js](https://nodejs.org/)**: Version `18.x` or `20.x` LTS
- **Package Manager**: One of the following:
  - **[npm](https://www.npmjs.com/)**: `v9.x` or higher (bundled with Node.js)
  - **[pnpm](https://pnpm.io/)** *(recommended)*: `v8.x` or higher
  - **[yarn](https://yarnpkg.com/)**: `v1.22+` (Classic) or `v3.x+` (Berry)
- **[Git](https://git-scm.com/)**: `v2.30+` for version control

### Database & Storage (Choose based on your deployment)

- **SQLite**: No extra installation required (runs locally via file driver).
- **[PostgreSQL](https://www.postgresql.org/)** *(optional for production)*: `v14` or higher if running a centralized database.
- **[Docker](https://www.docker.com/) & Docker Compose** *(optional)*: For running services (PostgreSQL, Redis) in containerized environments.

### System Verification

Verify that your environment meets the minimum version requirements by running:

```bash
node -v    # Should return v18.0.0 or higher
npm -v     # Or 'pnpm -v' / 'yarn -v'
git --version

