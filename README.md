# AlgoVista — Algorithm Visualizer

An interactive, algorithm visualizer built with modern web technologies. Features real-time animations and step-by-step visualizations of fundamental computer science algorithms.

[![GitHub stars](https://img.shields.io/github/stars/VoxHash/algovista-next?style=social)](https://github.com/VoxHash/algovista-next)
[![GitHub forks](https://img.shields.io/github/forks/VoxHash/algovista-next?style=social)](https://github.com/VoxHash/algovista-next/fork)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Live Demo**: [https://algovista.voxhash.dev/]

## 🚀 Features

- **30+ Algorithms**: Comprehensive collection of sorting, pathfinding, and string matching algorithms
  - **Sorting (10)**: Quick Sort, Merge Sort, Bubble Sort, Insertion Sort, Selection Sort, Heap Sort, Radix Sort, Counting Sort, Bucket Sort, Shell Sort
  - **Pathfinding (10)**: Dijkstra's, A*, BFS, DFS, Bellman-Ford, Floyd-Warshall, Greedy Best-First, Bidirectional Search, Jump Point Search, Theta*
  - **String Matching (10)**: KMP, Rabin-Karp, Boyer-Moore, Z Algorithm, Naive String Matching, Aho-Corasick, Finite Automaton, Manacher's Algorithm, Horspool, Suffix Array
- **Multi-language Support**: Full i18n with 11 languages (English, Russian, Portuguese, Spanish, Estonian, French, German, Japanese, Chinese, Korean, Indonesian)
- **Real-time Performance**: Step-by-step execution with speed controls
- **Interactive UI**: Glassmorphism design, clickable grids, customizable parameters, and responsive design
- **Modern Stack**: Built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and next-intl

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Testing**: Jest + Testing Library

## 🚀 Quickstart

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000 in your browser
```

> **Note**: The visualizer loads dynamically on the client for smooth animations and optimal performance.

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on http://localhost:3000 |
| `npm run build` | Build production-ready application |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality checks |
| `npm test` | Run unit tests with Jest |

## 🧪 Testing

The project includes comprehensive unit tests for core algorithms:

```bash
npm test
```

**Test Coverage:**
- Quick Sort algorithm correctness
- Merge Sort algorithm correctness  
- KMP string matching LPS table generation

## 🌍 Internationalization

AlgoVista supports 11 languages with full i18n:
- 🇺🇸 English
- 🇷🇺 Russian (Русский)
- 🇵🇹 Portuguese (Português)
- 🇪🇸 Spanish (Español)
- 🇪🇪 Estonian (Eesti)
- 🇫🇷 French (Français)
- 🇩🇪 German (Deutsch)
- 🇯🇵 Japanese (日本語)
- 🇨🇳 Chinese (中文)
- 🇰🇷 Korean (한국어)
- 🇮🇩 Indonesian (Bahasa Indonesia)

Users can switch languages using the language selector in the header. The UI automatically adapts to the selected language.

## 🏗️ Project Structure

```
algovista-next/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Locale-based routing
│   │   ├── layout.tsx     # Locale-aware layout
│   │   └── page.tsx       # Main page
│   ├── globals.css        # Global styles with glassmorphism
│   ├── layout.tsx         # Root layout (redirects to /en)
│   └── page.tsx           # Root page (redirects)
├── components/            # React components
│   ├── AlgoVista.tsx     # Main visualizer component
│   ├── LanguageSwitcher.tsx # i18n language switcher
│   └── ui/               # Reusable UI primitives
│       ├── button.tsx
│       ├── card.tsx
│       ├── slider.tsx
│       ├── tabs.tsx
│       └── tooltip.tsx
├── lib/                   # Algorithm implementations
│   └── algorithms.ts     # All algorithm generators
├── messages/              # i18n translation files
│   ├── en.json           # English
│   ├── ru.json           # Russian
│   ├── pt.json           # Portuguese
│   ├── es.json           # Spanish
│   ├── et.json           # Estonian
│   ├── fr.json           # French
│   ├── de.json           # German
│   ├── ja.json           # Japanese
│   ├── zh.json           # Chinese
│   ├── ko.json           # Korean
│   └── id.json           # Indonesian
├── __tests__/            # Test files
│   └── algorithms.test.ts
├── i18n.ts               # i18n configuration
├── middleware.ts          # Next.js middleware for i18n
├── jest.config.cjs       # Jest configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🚀 Deployment

### Vercel (Recommended)
1. Import this repository to Vercel
2. Deploy with zero configuration needed

### Docker
```dockerfile
# Multi-stage build for production
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package.json .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🎯 Algorithm Implementations

### Sorting Algorithms (10)
- **Quick Sort**: In-place sorting with pivot selection and partitioning
- **Merge Sort**: Divide-and-conquer approach with stable sorting
- **Bubble Sort**: Simple comparison-based sorting
- **Insertion Sort**: Efficient for small datasets
- **Selection Sort**: Simple in-place sorting
- **Heap Sort**: Heap-based sorting with O(n log n) guarantee
- **Radix Sort**: Non-comparison sorting by digits
- **Counting Sort**: Integer sorting with range constraints
- **Bucket Sort**: Distribution-based sorting
- **Shell Sort**: Improved insertion sort with gaps

### Pathfinding Algorithms (10)
- **Dijkstra's Algorithm**: Shortest path finding with priority queue
- **A* Algorithm**: Heuristic-based pathfinding with Manhattan distance
- **BFS**: Breadth-first search for unweighted graphs
- **DFS**: Depth-first search exploration
- **Bellman-Ford**: Handles negative weights, detects negative cycles
- **Floyd-Warshall**: All pairs shortest path algorithm
- **Greedy Best-First**: Heuristic-based greedy search
- **Bidirectional Search**: Search from both start and goal simultaneously
- **Jump Point Search**: Optimized A* for uniform-cost grids
- **Theta***: Any-angle pathfinding with line-of-sight optimization

### String Matching (10)
- **KMP Algorithm**: Pattern matching with failure function optimization
- **Rabin-Karp**: Rolling hash-based pattern matching
- **Boyer-Moore**: Efficient pattern matching with bad character rule
- **Z Algorithm**: Linear-time pattern matching
- **Naive String Matching**: Simple brute-force approach
- **Aho-Corasick**: Multiple pattern matching with trie and failure links
- **Finite Automaton**: DFA-based pattern matching
- **Manacher's Algorithm**: Longest palindromic substring finder
- **Horspool**: Simplified Boyer-Moore variant
- **Suffix Array**: Efficient pattern matching using suffix arrays

## 🎨 UI Features

- **Interactive Controls**: Play, pause, step-through, and speed adjustment
- **Real-time Visualization**: Live algorithm state updates
- **Responsive Design**: Works on desktop and mobile devices
- **Customizable Parameters**: Adjustable array sizes, grid dimensions, and speeds
- **Performance Metrics**: Real-time operation counting and complexity analysis

## 🔧 Development

### Adding New Algorithms
1. Implement algorithm as a generator function in `AlgoVista.tsx`
2. Add corresponding UI panel component
3. Include algorithm in the main component render
4. Add unit tests for algorithm correctness

### UI Components
The project uses custom UI primitives that mimic shadcn/ui APIs for easy portability and customization.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Connect with Me

- **GitHub**: [@VoxHash](https://github.com/VoxHash)
- **LinkedIn**: [Connect with me](https://linkedin.com/in/voxhash)
- **Portfolio**: [View my work](https://voxhash.dev)
- **Email**: [Get in touch](mailto:contact@voxhash.dev)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=VoxHash/algovista-next&type=Date)](https://star-history.com/#VoxHash/algovista-next&Date)

---

<div align="center">

**Built with ❤️ by [@VoxHash](https://github.com/VoxHash)**

*AI Engineer | Blockchain, Web3 and Smart Contracts*

[![GitHub followers](https://img.shields.io/github/followers/VoxHash?style=social)](https://github.com/VoxHash)
[![Twitter Follow](https://img.shields.io/twitter/follow/VoxHash?style=social)](https://twitter.com/VoxHash)

</div>
