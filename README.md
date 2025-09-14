# AlgoVista — Algorithm Visualizer

An interactive, resume-ready algorithm visualizer built with modern web technologies. Features real-time animations and step-by-step visualizations of fundamental computer science algorithms.

[![GitHub stars](https://img.shields.io/github/stars/VoxHash/algovista-next?style=social)](https://github.com/VoxHash/algovista-next)
[![GitHub forks](https://img.shields.io/github/forks/VoxHash/algovista-next?style=social)](https://github.com/VoxHash/algovista-next/fork)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Live Demo**: [https://algovista.voxhash.dev/]

## 🚀 Features

- **Sorting Algorithms**: Quick Sort and Merge Sort with generator-driven animations
- **Pathfinding**: Dijkstra's and A* algorithms on an interactive clickable grid
- **String Matching**: Knuth-Morris-Pratt (KMP) algorithm with live LPS table visualization
- **Real-time Performance**: Step-by-step execution with speed controls
- **Interactive UI**: Clickable grids, customizable parameters, and responsive design
- **Modern Stack**: Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion

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

## 🏗️ Project Structure

```
algovista-next/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main page (dynamically loads AlgoVista)
├── components/            # React components
│   ├── AlgoVista.tsx     # Main visualizer component
│   └── ui/               # Reusable UI primitives
│       ├── button.tsx
│       ├── card.tsx
│       ├── slider.tsx
│       ├── tabs.tsx
│       └── tooltip.tsx
├── __tests__/            # Test files
│   └── algorithms.test.ts
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

### Sorting Algorithms
- **Quick Sort**: In-place sorting with pivot selection and partitioning
- **Merge Sort**: Divide-and-conquer approach with stable sorting

### Pathfinding Algorithms  
- **Dijkstra's Algorithm**: Shortest path finding with priority queue
- **A* Algorithm**: Heuristic-based pathfinding with Manhattan distance

### String Matching
- **KMP Algorithm**: Pattern matching with failure function optimization

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
