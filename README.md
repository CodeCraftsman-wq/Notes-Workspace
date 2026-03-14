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

## 🛠️ Tech Stack

**Frontend:**
* React (Vite)
* Zustand (State Management)
* Tailwind CSS + Custom Design Tokens
* Framer Motion (Animations)
* Tiptap (Headless Rich Text Editor)
* Clerk React (Authentication)
* Lucide React (Icons)

**Backend & Infrastructure:**
* Node.js & Express
* PostgreSQL (Neon Serverless DB)
* Prisma (ORM)
* Cloudinary (Cloud Object Storage for Images)
* Multer (Multipart/form-data handling)

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed, as well as accounts setup for [Clerk](https://clerk.com/), [Neon](https://neon.tech/), and [Cloudinary](https://cloudinary.com/).

### 1. Clone the repository
```bash
git clone [https://github.com/yourusername/notes-workspace.git](https://github.com/yourusername/notes-workspace.git)
cd notes-workspace
