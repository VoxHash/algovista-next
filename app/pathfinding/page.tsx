import { PathfindingAlgorithmCard, type PathfindingAlgo } from "@/components/AlgoVista";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Route } from "lucide-react";

const pathfindingAlgorithms: PathfindingAlgo[] = [
  "dijkstra", 
  "astar", 
  "bfs", 
  "dfs", 
  "bellmanford", 
  "floydwarshall", 
  "greedybestfirst", 
  "bidirectional", 
  "jumppointsearch", 
  "thetastar"
];

export default function PathfindingPage() {
  return (
    <div className="min-h-screen w-full text-slate-100 relative z-10">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <Navigation />
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Route className="h-6 w-6 text-fuchsia-400 drop-shadow-lg"/>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-200 to-fuchsia-200 bg-clip-text text-transparent">Pathfinding Algorithms</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {pathfindingAlgorithms.map((algo) => (
              <PathfindingAlgorithmCard key={algo} algo={algo} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

