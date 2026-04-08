# TaskFlow Dashboard

A premium, production-ready **Task Management Dashboard** built with React 18 and Vite. Features a dark SaaS UI inspired by Linear and Vercel, complete with optimistic updates, debounced search, skeleton loaders, toast notifications, and a fully modular component architecture.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework (functional components + hooks only) |
| Vite 5 | Dev server & bundler |
| CSS Modules | Scoped component styling |
| JSONPlaceholder API | Mock task data (100 todos) |

---

## Project Structure

```
taskflow-dashboard/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── AddTaskForm/
│   │   │   ├── AddTaskForm.jsx       # Collapsible form with validation
│   │   │   └── AddTaskForm.module.css
│   │   ├── common/
│   │   │   ├── Avatar.jsx            # User avatar circle (color by userId)
│   │   │   ├── Badge.jsx             # Completed / Pending status pill
│   │   │   └── Spinner.jsx           # Inline loading spinner
│   │   ├── FilterSortControls/
│   │   │   ├── FilterSortControls.jsx  # Filter chips + sort dropdown
│   │   │   └── FilterSortControls.module.css
│   │   ├── Header/
│   │   │   ├── Header.jsx            # Sticky top nav with search + CTA
│   │   │   └── Header.module.css
│   │   ├── Loader/
│   │   │   ├── Loader.jsx            # Shimmer skeleton grid
│   │   │   └── Loader.module.css
│   │   ├── SearchBar/
│   │   │   ├── SearchBar.jsx         # Search input (Ctrl+K shortcut)
│   │   │   └── SearchBar.module.css
│   │   ├── StatsBar/
│   │   │   ├── StatsBar.jsx          # Summary metric cards + progress
│   │   │   └── StatsBar.module.css
│   │   ├── TaskCard/
│   │   │   ├── TaskCard.jsx          # Individual task card (click to open modal)
│   │   │   └── TaskCard.module.css
│   │   ├── TaskList/
│   │   │   ├── TaskList.jsx          # Responsive grid + empty state
│   │   │   └── TaskList.module.css
│   │   ├── TaskModal/
│   │   │   ├── TaskModal.jsx         # Detail modal with optimistic toggle
│   │   │   └── TaskModal.module.css
│   │   └── Toast/
│   │       ├── Toast.jsx             # Toast notification container
│   │       └── Toast.module.css
│   ├── hooks/
│   │   ├── useDebounce.js            # Debounce hook (350ms default)
│   │   └── useToast.js               # Toast queue hook
│   ├── services/
│   │   └── api.js                    # API calls (fetchTodos, updateTodo)
│   ├── styles/
│   │   └── global.css                # Design tokens + global styles
│   ├── utils/
│   │   └── helpers.js                # Pure utility functions
│   ├── App.jsx                       # Root component
│   └── main.jsx                      # React entry point
├── index.html
├── package.json
└── vite.config.js
```



## Features

### Core Functionality
- **Fetches 100 tasks** from `jsonplaceholder.typicode.com/todos` on load
- **Search** — debounced (350ms), case-insensitive title filtering
- **Filter** — All / Completed / Pending chips (composable with search)
- **Sort** — Default / A→Z / Z→A (composable with filter + search)
- **Task Modal** — click any card to view full details
- **Optimistic Toggle** — instant UI update on status change, ~18% simulated rollback
- **Add Task** — local form with validation (title ≥ 5 chars, userId numeric)

### UI/UX
- Dark SaaS theme (`#0B1120` base, `#1E293B` cards)
- `DM Sans` + `JetBrains Mono` typography
- Dot-grid background + ambient glow blobs
- Glassmorphic sticky header
- Shimmer skeleton loaders
- Staggered card entrance animations
- Hover lift + blue border highlight on cards
- Toast notifications (spring-curve animation)
- Responsive grid (`auto-fill, minmax(285px, 1fr)`)
- Body scroll lock while modal is open
- `Ctrl/Cmd + K` to focus search
- `Esc` to close modal
- ARIA roles, `aria-label`, `aria-live` throughout

### Performance
- `useMemo` for filtered tasks and stats (no redundant recalculation)
- `useCallback` for all event handlers (stable references)
- `useDebounce` prevents filtering on every keystroke
- Fetch cancellation via `cancelled` flag (no stale state)
- CSS Modules — zero style leakage between components

---

## Design Tokens

All design tokens are defined as CSS custom properties in `src/styles/global.css`:

```css
--bg-base:        #0B1120   /* Page background     */
--bg-surface:     #111827   /* Panels, modals       */
--bg-card:        #141C2E   /* Task cards           */
--color-blue:     #3B82F6   /* Primary / CTA        */
--color-green:    #22C55E   /* Success / Completed  */
--color-amber:    #F59E0B   /* Warning / Pending    */
--color-red:      #EF4444   /* Error / Danger       */
--color-purple:   #A78BFA   /* Accent / Progress    */
--text-primary:   #E2E8F0
--text-secondary: #94A3B8
--text-muted:     #4B5563
```

---

## Customization

**Connect a real backend** — update `src/services/api.js`:
```js
export const fetchTodos  = () => fetch('https://your-api.com/tasks').then(r => r.json());
export const updateTodo  = (id, patch) => fetch(`/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(patch) }).then(r => r.json());
export const createTodo  = (data) => fetch('/tasks', { method: 'POST', body: JSON.stringify(data) }).then(r => r.json());
```

**Change theme colors** — edit the CSS custom properties in `src/styles/global.css`.

---

## License

MIT — free to use, modify, and distribute.
# task-management-dashboard
