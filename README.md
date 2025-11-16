# Storybook App

A modern React TypeScript application for managing your storybook collection. Built with shadcn/ui components and Tailwind CSS. Add stories with details like author, designer, reference, and the story content itself.

## Features

- ✨ Add new stories with author, designer, reference, and story content
- 📋 View all your stories in a beautiful card layout
- 🗑️ Delete stories with confirmation dialog
- 📱 Responsive design that works on all devices
- 🎨 Modern UI built with shadcn/ui and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **shadcn/ui** - Beautiful component library
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

## Project Structure

```
src/
  ├── components/
  │   ├── ui/                  # shadcn/ui components
  │   │   ├── button.tsx
  │   │   ├── card.tsx
  │   │   ├── input.tsx
  │   │   ├── textarea.tsx
  │   │   ├── label.tsx
  │   │   └── alert-dialog.tsx
  │   ├── StoryForm.tsx        # Form for adding new stories
  │   └── StoryList.tsx        # List of all stories
  ├── lib/
  │   └── utils.ts             # Utility functions (cn helper)
  ├── types/
  │   └── index.ts             # TypeScript type definitions
  ├── App.tsx                  # Main app component
  ├── index.css                # Global styles with Tailwind
  └── main.tsx                 # Entry point
```

## Usage

1. Fill in the form with:
   - **Author**: The author of the story
   - **Designer**: The designer of the storybook
   - **Reference**: Reference information
   - **Story**: The story content itself

2. Click "Add Story" to save your story

3. View all your stories in the responsive grid below

4. Delete stories by clicking the trash icon on any story card (with confirmation dialog)

## License

MIT
