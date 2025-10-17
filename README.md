#  TripKlik

TripKlik is a modern flight booking frontend application built with **React + Vite**, using **Tailwind CSS**, **React Query**, and **Zustand** for state management.
It simulates flight data using a **local JSON server** and supports multilingual interfaces via **i18next**.

---

## Tech Stack

**Frontend:**

* [React 19](https://react.dev/)
* [Vite 7](https://vitejs.dev/)
* [Tailwind CSS 4](https://tailwindcss.com/)
* [i18next](https://www.i18next.com/) for internationalization
* [Lucide React](https://lucide.dev/) for icons
* [Zustand](https://github.com/pmndrs/zustand) for global state management
* [React Query (TanStack)](https://tanstack.com/query/latest) for data fetching
* [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
* [React Hot Toast](https://react-hot-toast.com/) for notifications

**Development Tools:**

* [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
* [Concurrently](https://www.npmjs.com/package/concurrently) for running frontend and local server together
* [JSON Server](https://github.com/typicode/json-server) for local API mocking

---

## Features

* Browse and view flights and fare families
* Select and review trip fares dynamically
* Multilingual interface support (powered by i18next)
* Local API mock server for testing data
* Persistent state management with Zustand
* Client-side validation using Zod
* Fully responsive modern UI using Tailwind CSS
* Error handling and fallback page

---

## Installation & Setup

### Clone the repository

```bash
git clone https://github.com/Mohamed-Hamdy-Tobal/TripKlik-Task.git
cd TripKlik-Task
```

### Install dependencies

```bash
npm install
```

### Setup environment variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Then, edit `.env` and update any needed variables (like API URLs or keys).

Example:

```
VITE_API_URL=http://localhost:3000
```

---

## Local Mock Server

This project uses **JSON Server** to mock backend APIs.
The mock data lives in:

```
src/mock/db.json
```

You can customize this file to modify the local data for testing.

---

## Development

Run both **Vite frontend** and **JSON server** concurrently:

```bash
npm run dev
```

* Frontend: runs on [http://localhost:5173](http://localhost:5173)
* Local API: runs on [http://localhost:3000](http://localhost:3000)

If you want to run them separately:

```bash
npm run dev:app   # Start the Vite app only
npm run dev:api   # Start the mock API server only
```

---

## Folder Structure

```
src/
 ┣ app/               # Main app initialization and entry logic
 ┣ assets/            # Static assets like images, icons, or fonts
 ┣ components/        # Reusable UI components (buttons, modals, cards, etc.)
 ┣ config/            # App configuration files (API setup, constants, etc.)
 ┣ date/              # Date utilities or formatters used in flight times
 ┣ features/          # Feature-based modules (e.g., flights, fares, booking)
 ┣ hooks/             # Custom React hooks (e.g., useFetch, useToggle, etc.)
 ┣ lib/               # Helper libraries, axios instances, API clients
 ┣ mock/              # Local mock data (db.json used by JSON Server)
 ┣ pages/             # Route pages (Home, Dashboard, Error, etc.)
 ┣ routes/            # App routing and protected route logic
 ┣ store/             # Zustand stores for state management
 ┣ translations/      # Language files for i18next (en.json, ar.json, etc.)
 ┣ utils/             # General utility functions (formatters, helpers)
 ┣ index.css          # Global Tailwind CSS and base styles
 ┗ main.jsx           # Vite main entry point (renders <App />)
```

---

## Author

**Mohamed Tobal**
[mohamedtobal.dev@gmail.com](mailto:mohamedtobal.dev@gmail.com)
[Live Demo](https://fly-safely.netlify.app/)
