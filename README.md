# React Virtualized Table Demo

This project demonstrates the performance and implementation differences between a virtualized and a non-virtualized table in React.

## Tech Stack

- **React** (with hooks)
- **TypeScript**
- **Vite** (bootstrapped from the official Vite template)
- **react-window** (for virtualization)
- **@dnd-kit** (for drag-and-drop column reordering)
- **faker** (for generating realistic user data)

## Features

- **Virtualized vs Non-virtualized Table Toggle** - Compare performance with 500+ rows
- **Column Sorting** - Click headers to sort by any column (asc/desc)
- **Drag-and-Drop Column Reordering** - Drag column headers to reorder
- **Data Persistence** - User data and column order saved in localStorage

## Approach

- App is broken into types, hooks for state logic, utils for data manipulation, components for UI which can be broken down further for testability.
- **Used Cursor for initial setup and assisted development.**
- Development time was around 1.5 hours cumulative.

## Technical Decisions

- **react-window** for virtualization - Industry standard, handles large datasets efficiently
- **@dnd-kit** for drag-and-drop - Modern, accessible, performant
- **Custom hooks** for state management - Reusable, testable logic separation
- **TypeScript** for type safety - Prevents runtime errors, better developer experience

## Performance Observations

Toggle between virtualized and non-virtualized tables to observe:
- **DOM nodes**: Virtualized renders ~10-12 rows, non-virtualized renders all 500 rows
- **Console logs**: Check browser console for row rendering messages
- **Scrolling performance**: Virtualized remains smooth, non-virtualized may lag
- **Memory usage**: Virtualized uses significantly less memory

## Running the App

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.