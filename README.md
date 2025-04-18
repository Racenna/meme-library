# Meme Handbook

This is a [Next.js](https://nextjs.org) project designed to showcase a library of memes with a smooth and interactive slider interface for mobile. The project uses modern web technologies like React, Framer Motion, and Tailwind CSS to deliver a responsive and visually appealing user experience.

To check this app in your browser, use [this link](https://meme-library-production.up.railway.app/)

## Features

- **Interactive Slider**: A draggable slider to navigate through meme entries. (only mobile)
- **Responsive Design**: Fully optimized for different screen sizes using Tailwind CSS.
- **Framer Motion Animations**: Smooth animations for transitions and interactions.
- **Next.js Framework**: Server-side rendering and optimized performance.
- **Reusable Components**: Modular and reusable components for scalability.

## Getting Started

Follow these steps to run the project locally:

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/meme-library.git
   cd meme-library
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Project Structure

- **`app/`**: Next.js app directory for routing and pages.
- **`components/`**: Contains reusable React components like `HomePageSlider` and `MemeEntryCard`.
- **`constants/`**: Stores static data like `menuItems`.
- **`actions/`**: Contains functions and utilities for managing application logic and state updates.
- **`data/`**: Includes static JSON files or other data sources used across the application.
- **`hooks/`**: Custom React hooks to encapsulate reusable logic and state management.
- **`types/`**: TypeScript type definitions and interfaces for ensuring type safety throughout the project.
