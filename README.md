# React vs SolidJS - Performance Comparison

A side-by-side comparison project demonstrating the reactivity differences between React and SolidJS using identical UI implementations. This project showcases how each framework handles state management, re-rendering, and performance optimization.

## 📋 Project Overview

This repository contains two parallel implementations of the same application:

- **`react-tanstack/`** - Built with React 19, TanStack Router, and TanStack Start
- **`solid-tanstack/`** - Built with SolidJS, TanStack Solid Router, and TanStack Solid Start

Both applications feature a dashboard with a large data table (10,000+ rows) and multiple counters to demonstrate reactivity patterns and performance characteristics.

## 🎯 Key Comparison Points

### Main Dashboard Comparison (`dashboard/index.tsx`)

The dashboard implementation highlights the fundamental differences between React and SolidJS:

#### **React Implementation** (`react-tanstack/src/routes/dashboard/index.tsx`)

```tsx
function BigTablePage() {
  const [sortField, setSortField] = useState<keyof Person>('id')
  const sortedPeople = sortPeople(people, sortField) // Re-computes on every render
  
  const [count, setCount] = useState(0)
  // Component re-renders entirely when state changes
}
```

**Key characteristics:**
- Uses `useState` for state management
- Entire component re-renders when any state changes
- `sortedPeople` is recalculated on every render (unless memoized)
- Includes React `Profiler` to measure render performance
- Re-rendering cascades through child components by default

#### **SolidJS Implementation** (`solid-tanstack/src/routes/dashboard/index.tsx`)

```tsx
function BigTablePage() {
  const [sortField, setSortField] = createSignal<keyof Person>('id')
  const sortedPeople = () => sortPeople(people, sortField()) // Reactive computation
  
  const [count, setCount] = createSignal(0)
  // Only affected DOM nodes update when signals change
}
```

**Key characteristics:**
- Uses `createSignal` for fine-grained reactivity
- No component re-renders - only affected DOM nodes update
- `sortedPeople` is a reactive computation that only runs when `sortField` changes
- Components are essentially "run once" - signals handle all updates
- No virtual DOM diffing overhead

### State Management Patterns

| Aspect | React | SolidJS |
|--------|-------|---------|
| **State primitive** | `useState` | `createSignal` |
| **Reading state** | Direct value access | Function call `signal()` |
| **Setting state** | `setState(value)` | `setSignal(value)` |
| **Reactivity model** | Virtual DOM + reconciliation | Fine-grained reactive updates |
| **Re-render behavior** | Entire component tree | Only affected DOM nodes |
| **Optimization needed** | `memo`, `useMemo`, `useCallback` | Built-in (no optimization needed) |

### Component Props

**React:**
```tsx
// Props are destructured, children is ReactNode
const Counter = ({ count, setCount, children }: Props) => { ... }
```

**SolidJS:**
```tsx
// Props accessed via props object, children is JSX.Element
const Counter = (props: Props) => {
  return <div>{props.count}</div>
}
```

### JSX Differences

| Feature | React | SolidJS |
|---------|-------|---------|
| **Class attribute** | `className` | `class` |
| **Props access** | Destructured | Via `props` object |
| **Event handlers** | Synthetic events | Native DOM events |
| **Children** | `React.ReactNode` | `JSX.Element` |

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** 18+ or **Bun** 1.0+
- Package manager: npm, yarn, pnpm, or bun

### Installing React Version

```bash
cd react-tanstack
bun install  # or npm install / yarn / pnpm install
```

### Installing SolidJS Version

```bash
cd solid-tanstack
bun install  # or npm install / yarn / pnpm install
```

## 🏃 Running the Applications

### React Application

```bash
cd react-tanstack
bun run dev  # or npm run dev
```

The React app will start on **http://localhost:3000**

### SolidJS Application

```bash
cd solid-tanstack
bun run dev  # or npm run dev
```

The SolidJS app will start on **http://localhost:3000**

> **Note:** Both apps use port 3000 by default. Run them separately or modify the port in `package.json`.

## 📊 Performance Testing

### What to Test

1. **Counter Updates**: Click the counters and observe:
   - React: Check browser console for Profiler logs showing render duration
   - SolidJS: Notice instant updates with no re-render overhead

2. **Table Sorting**: Click different sort buttons and observe:
   - React: Entire table re-renders (check console logs)
   - SolidJS: Only the table rows update reactively

3. **Nested State**: Update the page-level counter vs table-level counter:
   - React: Parent state changes cause child re-renders
   - SolidJS: Only the specific counter updates

### Performance Observations

Open browser DevTools console to see:
- **React**: `actualDuration: Xms` logs from the Profiler component
- **Both**: `sorting people by [field]` logs when sort changes

Expected results:
- SolidJS typically shows faster updates due to no virtual DOM overhead
- React may show re-render cascades affecting unrelated components
- SolidJS maintains consistent performance regardless of component tree depth

## 🏗️ Project Structure

### React Project (`react-tanstack/`)

```
react-tanstack/
├── src/
│   ├── routes/
│   │   ├── dashboard/
│   │   │   └── index.tsx          # Main comparison component
│   │   ├── __root.tsx
│   │   └── index.tsx
│   ├── components/
│   │   ├── counter.tsx            # Counter component
│   │   ├── person-table.tsx       # Table display
│   │   └── sort-table.tsx         # Sort controls
│   ├── data/
│   │   └── people.ts              # 10,000+ person records
│   └── router.tsx
├── package.json
└── vite.config.ts
```

### SolidJS Project (`solid-tanstack/`)

```
solid-tanstack/
├── src/
│   ├── routes/
│   │   ├── dashboard/
│   │   │   └── index.tsx          # Main comparison component
│   │   ├── __root.tsx
│   │   └── index.tsx
│   ├── components/
│   │   ├── counter.tsx            # Counter component
│   │   ├── person-table.tsx       # Table display
│   │   └── sort-table.tsx         # Sort controls
│   └── data/
│       └── people.ts              # 10,000+ person records
├── package.json
└── vite.config.ts
```

## 🔧 Tech Stack

### React Stack
- **React 19.2** - UI library with virtual DOM
- **TanStack Router** - Type-safe routing
- **TanStack Start** - Full-stack React framework
- **TailwindCSS 4** - Utility-first CSS
- **Vite 7** - Build tool
- **TypeScript 5.7** - Type safety

### SolidJS Stack
- **SolidJS 1.9** - Fine-grained reactive UI library
- **TanStack Solid Router** - Type-safe routing for Solid
- **TanStack Solid Start** - Full-stack Solid framework
- **TailwindCSS 4** - Utility-first CSS
- **Vite 7** - Build tool
- **TypeScript 5.7** - Type safety

## 📝 Available Scripts

Both projects share the same scripts:

```bash
bun run dev      # Start development server
bun run build    # Build for production
bun run serve    # Preview production build
bun run lint     # Run ESLint
bun run format   # Run Prettier
bun run check    # Format and lint fix
```

## 🎓 Learning Points

### When to Use React
- Large ecosystem and community
- Extensive third-party library support
- Team familiarity with React patterns
- Need for React-specific tools (React Native, etc.)

### When to Use SolidJS
- Performance-critical applications
- Real-time data updates
- Complex state management without optimization overhead
- Smaller bundle sizes needed
- Prefer fine-grained reactivity over virtual DOM

### Key Takeaways

1. **React's strength**: Mature ecosystem, familiar patterns, extensive tooling
2. **SolidJS's strength**: Superior performance, simpler mental model, no re-render optimization needed
3. **Both**: Can achieve similar results, but with different approaches and trade-offs

## 🤝 Contributing

Feel free to explore both implementations and experiment with:
- Adding more complex state scenarios
- Implementing additional performance tests
- Comparing bundle sizes
- Testing with larger datasets

## 📄 License

This project is for educational and comparison purposes.

## 🔗 Resources

- [React Documentation](https://react.dev)
- [SolidJS Documentation](https://www.solidjs.com)
- [TanStack Router](https://tanstack.com/router)
- [TanStack Start](https://tanstack.com/start)
