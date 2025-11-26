'use client';

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, StepForward, Shuffle, Github, Code2, Cpu, Route, ListOrdered, Binary, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip as RTooltip } from "recharts";
import { useTranslations } from 'next-intl';
import LanguageSwitcher from "@/components/LanguageSwitcher";
import * as algoLib from "@/lib/algorithms";

const rand = (n: number, min = 5, max = 99) => Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + min);
const BIGO: any = {
  quicksort: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n^2)", space: "O(log n)" },
  mergesort: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
  bubblesort: { best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
  insertionsort: { best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
  selectionsort: { best: "O(n²)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
  heapsort: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(1)" },
  radixsort: { best: "O(d(n+k))", avg: "O(d(n+k))", worst: "O(d(n+k))", space: "O(n+k)" },
  countingsort: { best: "O(n+k)", avg: "O(n+k)", worst: "O(n+k)", space: "O(k)" },
  bucketsort: { best: "O(n+k)", avg: "O(n+k)", worst: "O(n²)", space: "O(n)" },
  shellsort: { best: "O(n log n)", avg: "O(n^1.3)", worst: "O(n²)", space: "O(1)" },
  dijkstra: { best: "O((V+E) log V)", avg: "O((V+E) log V)", worst: "O((V+E) log V)", space: "O(V)" },
  astar: { best: "O(E)", avg: "O(E)", worst: "O(E)", space: "O(V)" },
  bfs: { best: "O(V+E)", avg: "O(V+E)", worst: "O(V+E)", space: "O(V)" },
  dfs: { best: "O(V+E)", avg: "O(V+E)", worst: "O(V+E)", space: "O(V)" },
  bellmanford: { best: "O(VE)", avg: "O(VE)", worst: "O(VE)", space: "O(V)" },
  floydwarshall: { best: "O(V³)", avg: "O(V³)", worst: "O(V³)", space: "O(V²)" },
  greedybestfirst: { best: "O(V log V)", avg: "O(V log V)", worst: "O(V log V)", space: "O(V)" },
  bidirectional: { best: "O(b^(d/2))", avg: "O(b^(d/2))", worst: "O(b^(d/2))", space: "O(b^(d/2))" },
  jumppointsearch: { best: "O(V log V)", avg: "O(V log V)", worst: "O(V log V)", space: "O(V)" },
  thetastar: { best: "O(V log V)", avg: "O(V log V)", worst: "O(V log V)", space: "O(V)" },
  kmp: { best: "O(n+m)", avg: "O(n+m)", worst: "O(n+m)", space: "O(m)" },
  rabinkarp: { best: "O(n+m)", avg: "O(n+m)", worst: "O(nm)", space: "O(1)" },
  boyermoore: { best: "O(n/m)", avg: "O(n)", worst: "O(nm)", space: "O(m)" },
  zalgorithm: { best: "O(n+m)", avg: "O(n+m)", worst: "O(n+m)", space: "O(n+m)" },
  naivestring: { best: "O(n)", avg: "O(nm)", worst: "O(nm)", space: "O(1)" },
  ahocorasick: { best: "O(n+m+z)", avg: "O(n+m+z)", worst: "O(n+m+z)", space: "O(m)" },
  finiteautomaton: { best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(m|Σ|)" },
  manacher: { best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" },
  horspool: { best: "O(n/m)", avg: "O(n)", worst: "O(nm)", space: "O(m)" },
  suffixarray: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
  binarysearch: { best: "O(1)", avg: "O(log n)", worst: "O(log n)", space: "O(1)" },
  linearsearch: { best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
};

function* quickSortSteps(arr: number[]): Generator<any> {
  const a = [...arr];
  function* partition(low: number, high: number): Generator<any, number, any> {
    const pivot = a[high];
    let i = low;
    for (let j = low; j < high; j++) {
      yield { type: "compare", a: j, b: high, pivotIndex: high, array: [...a] };
      if (a[j] < pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        yield { type: "swap", i, j, pivotIndex: high, array: [...a] };
        i++;
      }
    }
    [a[i], a[high]] = [a[high], a[i]];
    yield { type: "swap", i, j: high, pivotIndex: i, array: [...a] };
    return i;
  }
  function* qs(low: number, high: number): Generator<any> {
    if (low < high) {
      const p: number = (yield* partition(low, high)) as number;
      yield { type: "partition", low, high, p, array: [...a] };
      yield* qs(low, p - 1);
      yield* qs(p + 1, high);
    }
  }
  yield { type: "start", array: [...a] };
  yield* qs(0, a.length - 1);
  yield { type: "done", array: [...a] };
}

function* mergeSortSteps(arr: number[]): Generator<any> {
  const a = [...arr];
  function* merge(l: number, m: number, r: number) {
    const left = a.slice(l, m + 1);
    const right = a.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
      yield { type: "compare", a: k, b: null, array: [...a], range: [l, r] };
      if (left[i] <= right[j]) a[k++] = left[i++]; else a[k++] = right[j++];
      yield { type: "write", index: k - 1, value: a[k - 1], array: [...a], range: [l, r] };
    }
    while (i < left.length) { a[k++] = left[i++]; yield { type: "write", index: k - 1, value: a[k - 1], array: [...a], range: [l, r] }; }
    while (j < right.length) { a[k++] = right[j++]; yield { type: "write", index: k - 1, value: a[k - 1], array: [...a], range: [l, r] }; }
  }
  function* ms(l: number, r: number): Generator<any> {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    yield* ms(l, m);
    yield* ms(m + 1, r);
    yield { type: "merge", l, m, r, array: [...a] };
    yield* merge(l, m, r);
  }
  yield { type: "start", array: [...a] };
  yield* ms(0, a.length - 1);
  yield { type: "done", array: [...a] };
}

function buildLPS(pat: string) {
  const lps = Array(pat.length).fill(0);
  let len = 0, i = 1;
  while (i < pat.length) {
    if (pat[i] === pat[len]) { lps[i++] = ++len; }
    else if (len !== 0) { len = lps[len - 1]; }
    else { lps[i++] = 0; }
  }
  return lps;
}
function* kmpSteps(text: string, pat: string): Generator<any> {
  const lps = buildLPS(pat);
  let i = 0, j = 0;
  yield { type: "lps", lps: [...lps] };
  while (i < text.length) {
    yield { type: "compare", i, j };
    if (text[i] === pat[j]) { i++; j++; }
    else if (j !== 0) { j = lps[j - 1]; }
    else { i++; }
    if (j === pat.length) {
      yield { type: "match", index: i - j };
      j = lps[j - 1];
    }
  }
  yield { type: "done" };
}

const DIRS = [ [1,0],[0,1],[-1,0],[0,-1] ] as const;
const hManhattan = (a:{x:number,y:number}, b:{x:number,y:number}) => Math.abs(a.x-b.x)+Math.abs(a.y-b.y);

function* dijkstraSteps(grid: number[][], start:{x:number,y:number}, goal:{x:number,y:number}): Generator<any> {
  if (!grid || grid.length === 0 || !grid[0]) return;
  const h = grid.length, w = grid[0].length;
  const dist = Array.from({length: h}, () => Array(w).fill(Infinity));
  const prev = Array.from({length: h}, () => Array(w).fill(null as null | {x:number,y:number}));
  const pq: {d:number,x:number,y:number}[] = [];
  const push = (d:number,x:number,y:number) => { pq.push({d,x,y}); pq.sort((A,B)=>A.d-B.d); };
  push(0, start.x, start.y); dist[start.y][start.x] = 0;
  const visited = new Set<string>();
  while (pq.length) {
    const { d, x, y } = pq.shift()!;
    const key = `${x},${y}`;
    if (visited.has(key)) continue;
    visited.add(key);
    yield { type: "visit", x, y, dist: d };
    if (x===goal.x && y===goal.y) break;
    for (const [dx,dy] of DIRS) {
      const nx=x+dx, ny=y+dy;
      if (nx<0||ny<0||nx>=w||ny>=h) continue;
      if (grid[ny][nx]===1) continue;
      const nd = d + 1;
      if (nd < dist[ny][nx]) {
        dist[ny][nx] = nd; prev[ny][nx] = {x,y};
        push(nd, nx, ny);
        yield { type: "relax", from:{x,y}, to:{x:nx,y:ny}, nd };
      }
    }
  }
  const path: {x:number,y:number}[] = [];
  let cx=goal.x, cy=goal.y;
  if (prev[cy][cx] || (cx===start.x && cy===start.y)) {
    while (true) {
      path.push({x:cx,y:cy});
      const p = prev[cy][cx];
      if (!p) break; cx=p.x; cy=p.y;
    }
  }
  yield { type: "done", path: path.reverse() };
}

function* aStarSteps(grid: number[][], start:{x:number,y:number}, goal:{x:number,y:number}): Generator<any> {
  if (!grid || grid.length === 0 || !grid[0]) return;
  const h = grid.length, w = grid[0].length;
  const g = Array.from({length: h}, () => Array(w).fill(Infinity));
  const f = Array.from({length: h}, () => Array(w).fill(Infinity));
  const prev = Array.from({length: h}, () => Array(w).fill(null as null | {x:number,y:number}));
  const open: {fx:number,x:number,y:number}[] = [];
  const push = (fx:number,x:number,y:number) => { open.push({fx,x,y}); open.sort((A,B)=>A.fx-B.fx); };
  g[start.y][start.x]=0; f[start.y][start.x]=hManhattan(start,goal);
  push(f[start.y][start.x], start.x, start.y);
  const inOpen = (x:number,y:number)=>open.findIndex(n=>n.x===x&&n.y===y)>=0;

  while (open.length) {
    const { x, y } = open.shift()!;
    yield { type: "visit", x, y, f: f[y][x], g: g[y][x] };
    if (x===goal.x && y===goal.y) break;
    for (const [dx,dy] of DIRS) {
      const nx=x+dx, ny=y+dy;
      if (nx<0||ny<0||nx>=w||ny>=h) continue;
      if (grid[ny][nx]===1) continue;
      const tentative = g[y][x] + 1;
      if (tentative < g[ny][nx]) {
        prev[ny][nx] = {x,y};
        g[ny][nx] = tentative;
        f[ny][nx] = tentative + hManhattan({x:nx,y:ny}, goal);
        if (!inOpen(nx,ny)) push(f[ny][nx], nx, ny);
        yield { type: "relax", from:{x,y}, to:{x:nx,y:ny}, g: g[ny][nx], f: f[ny][nx] };
      }
    }
  }
  const path: {x:number,y:number}[] = []; let cx=goal.x, cy=goal.y;
  while (true) {
    path.push({x:cx,y:cy});
    const p = prev[cy][cx];
    if (!p) break; cx=p.x; cy=p.y;
  }
  yield { type: "done", path: path.reverse() };
}

const Pill: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="px-2 py-1 rounded-full bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20 backdrop-blur-sm text-indigo-200 text-xs border border-white/20 shadow-sm">
    {children}
  </span>
);

function ControlBar({ running, onPlay, onPause, onStep, onShuffle, speed, setSpeed, size, setSize }:
  { running:boolean, onPlay:()=>void, onPause:()=>void, onStep:()=>void, onShuffle:()=>void,
    speed:number, setSpeed:(n:number)=>void, size?:number, setSize?:(n:number)=>void }) {
  const t = useTranslations('common');
  return (
    <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl glass-light">
      <div className="flex items-center gap-2">
        <Button onClick={running ? onPause : onPlay} variant={running ? "secondary" : "default"}>
          {running ? <Pause className="mr-2 h-4 w-4"/> : <Play className="mr-2 h-4 w-4"/>}
          {running ? t('pause') : t('play')}
        </Button>
        <Button onClick={onStep} variant="outline"><StepForward className="mr-2 h-4 w-4"/>{t('step')}</Button>
        <Button onClick={onShuffle} variant="ghost"><Shuffle className="mr-2 h-4 w-4"/>{t('shuffle')}</Button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-300">{t('speed')}</span>
        <div className="w-36"><Slider value={[speed]} min={10} max={800} step={10} onValueChange={(v)=>v && v[0] !== undefined && setSpeed(v[0])}/></div>
      </div>
      {typeof size === 'number' && setSize && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-300">{t('size')}</span>
          <div className="w-36"><Slider value={[size]} min={5} max={80} step={1} onValueChange={(v)=>v && v[0] !== undefined && setSize(v[0])}/></div>
        </div>
      )}
    </div>
  );
}

// Sorting Panel
function SortingPanel() {
  const t = useTranslations();
  const [algo, setAlgo] = useState<"quicksort"|"mergesort"|"bubblesort"|"insertionsort"|"selectionsort"|"heapsort"|"radixsort"|"countingsort"|"bucketsort"|"shellsort">("quicksort");
  const [size, setSize] = useState(30);
  const [arr, setArr] = useState<number[]>(() => rand(30));
  const [gen, setGen] = useState<Generator<any> | null>(null);
  const [highlight, setHighlight] = useState<any>({});
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(120);
  const [ops, setOps] = useState<{t:number,op:string}[]>([]);

  useEffect(()=>{ setArr(rand(size)); setOps([]); setHighlight({}); setRunning(false); setGen(null); }, [size]);

  const makeGen = () => {
    let g: Generator<any>;
    switch(algo) {
      case "quicksort": g = quickSortSteps(arr); break;
      case "mergesort": g = mergeSortSteps(arr); break;
      case "bubblesort": g = algoLib.bubbleSortSteps(arr); break;
      case "insertionsort": g = algoLib.insertionSortSteps(arr); break;
      case "selectionsort": g = algoLib.selectionSortSteps(arr); break;
      case "heapsort": g = algoLib.heapSortSteps(arr); break;
      case "radixsort": g = algoLib.radixSortSteps(arr); break;
      case "countingsort": g = algoLib.countingSortSteps(arr); break;
      case "bucketsort": g = algoLib.bucketSortSteps(arr); break;
      case "shellsort": g = algoLib.shellSortSteps(arr); break;
      default: g = quickSortSteps(arr);
    }
    setGen(g);
  };

  const step = () => {
    if (!gen) makeGen();
    const { value, done } = (gen || { next: ()=>({done:true}) } as any).next();
    if (done) { setRunning(false); return; }
    if (value?.array) setArr(value.array as number[]);
    setHighlight(value || {});
    setOps((o)=>[...o, { t: Date.now(), op: value?.type || "tick" }].slice(-120));
  };

  useEffect(()=>{
    if (!running) return; let id: any;
    const tick = ()=>{ step(); id = setTimeout(tick, speed); };
    id = setTimeout(tick, speed);
    return ()=>clearTimeout(id);
  }, [running, speed, gen]);

  const bars = arr.map((v, i) => {
    const isA = (highlight as any).a === i || (highlight as any).i === i;
    const isB = (highlight as any).b === i || (highlight as any).j === i;
    const isRange = (highlight as any).range && Array.isArray((highlight as any).range) && (highlight as any).range.length >= 2 && i >= (highlight as any).range[0] && i <= (highlight as any).range[1];
    const hue = isA || isB ? 'bg-gradient-to-t from-fuchsia-500 to-fuchsia-400 shadow-lg shadow-fuchsia-500/50' : isRange ? 'bg-gradient-to-t from-indigo-500/80 to-indigo-400/70 shadow-md shadow-indigo-500/30' : 'bg-gradient-to-t from-slate-400/60 to-slate-300/50';
    return (
      <motion.div key={i} layout className={`rounded-t ${hue} backdrop-blur-sm border border-white/10`} style={{ height: v*2 }} />
    );
  });

  const onShuffle = () => { setArr(rand(size)); setHighlight({}); setGen(null); setRunning(false); setOps([]); };

  const perfData = ops.map((o,i)=>({ x: i, y: o.op === 'swap' || o.op==='write' ? 1 : 0 }));

  return (
    <Card>
      <CardHeader className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <ListOrdered className="h-5 w-5 text-indigo-400 drop-shadow-lg"/>
          <CardTitle className="text-indigo-100">{t('sorting.title')}</CardTitle>
          <Pill>{t(`algorithms.${algo}`)}</Pill>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={algo} onValueChange={setAlgo} >
            <TabsList className="max-w-full overflow-x-auto">
              <TabsTrigger value="quicksort">{t('sorting.quick')}</TabsTrigger>
              <TabsTrigger value="mergesort">{t('sorting.merge')}</TabsTrigger>
              <TabsTrigger value="bubblesort">{t('algorithms.bubbleSort')}</TabsTrigger>
              <TabsTrigger value="insertionsort">{t('algorithms.insertionSort')}</TabsTrigger>
              <TabsTrigger value="selectionsort">{t('algorithms.selectionSort')}</TabsTrigger>
              <TabsTrigger value="heapsort">{t('algorithms.heapSort')}</TabsTrigger>
              <TabsTrigger value="radixsort">{t('algorithms.radixSort')}</TabsTrigger>
              <TabsTrigger value="countingsort">{t('algorithms.countingSort')}</TabsTrigger>
              <TabsTrigger value="bucketsort">{t('algorithms.bucketSort')}</TabsTrigger>
              <TabsTrigger value="shellsort">{t('algorithms.shellSort')}</TabsTrigger>
            </TabsList>
          </Tabs>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a href="https://github.com/VoxHash" target="_blank" rel="noreferrer">
                  <Button aria-label="GitHub" className="p-2" variant="ghost"><Github className="h-4 w-4"/></Button>
                </a>
              </TooltipTrigger>
              <TooltipContent>{t('footer.openSourcePortfolio')}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ControlBar
          running={running}
          onPlay={()=>{ if(!gen) makeGen(); setRunning(true); }}
          onPause={()=>setRunning(false)}
          onStep={step}
          onShuffle={onShuffle}
          speed={speed}
          setSpeed={setSpeed}
          size={size}
          setSize={setSize}
        />
        <div className="h-64 flex items-end gap-1 p-2 rounded-xl glass-light overflow-hidden">
          <AnimatePresence>{bars}</AnimatePresence>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-xl p-3 glass-light">
            <div className="text-xs text-slate-300 mb-2">{t('common.complexity')}</div>
            <div className="text-sm text-slate-200">{t('common.best')}: {BIGO[algo].best}</div>
            <div className="text-sm text-slate-200">{t('common.average')}: {BIGO[algo].avg}</div>
            <div className="text-sm text-slate-200">{t('common.worst')}: {BIGO[algo].worst}</div>
            <div className="text-sm text-slate-200">{t('common.space')}: {BIGO[algo].space}</div>
          </div>
          <div className="rounded-xl p-3 glass-light">
            <div className="text-xs text-slate-300 mb-2">{t('sorting.writesPerStep')}</div>
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={perfData}>
                  <XAxis dataKey="x" hide/>
                  <YAxis hide/>
                  <RTooltip/>
                  <Line type="monotone" dataKey="y" dot={false} strokeWidth={2} stroke="rgba(139, 92, 246, 0.8)"/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-xl p-3 glass-light">
            <div className="text-xs text-slate-300 mb-2">{t('sorting.currentEvent')}</div>
            <div className="text-sm text-slate-200 font-mono">
              {(highlight as any)?.type ? JSON.stringify((highlight as any).type) : "—"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Pathfinding helpers
function makeGrid(r:number, c:number, wallProb=0.2) {
  return Array.from({length:r}, ()=>Array.from({length:c}, ()=> (Math.random()<wallProb?1:0)));
}

function PathfindingPanel() {
  const t = useTranslations();
  const [rows, setRows] = useState(14);
  const [cols, setCols] = useState(24);
  const [grid, setGrid] = useState<number[][]>(()=>makeGrid(14,24));
  const [algo, setAlgo] = useState<"dijkstra"|"astar"|"bfs"|"dfs"|"bellmanford"|"floydwarshall"|"greedybestfirst"|"bidirectional"|"jumppointsearch"|"thetastar">("dijkstra");
  const [speed, setSpeed] = useState(60);
  const [running, setRunning] = useState(false);
  const [start] = useState({x: 2, y: 6});
  const [goal] = useState({x: 21, y: 6});
  const [gen, setGen] = useState<Generator<any> | null>(null);
  const [state, setState] = useState<{ visit:Set<string>, relax:Set<string>, path:Set<string> }>(
    { visit: new Set(), relax: new Set(), path: new Set() }
  );

  useEffect(()=>{ setGrid(makeGrid(rows, cols)); setState({visit:new Set(),relax:new Set(),path:new Set()}); setGen(null); setRunning(false); }, [rows, cols]);

  const buildGen = () => {
    let g: Generator<any>;
    switch(algo) {
      case "dijkstra": g = dijkstraSteps(grid, start, goal); break;
      case "astar": g = aStarSteps(grid, start, goal); break;
      case "bfs": g = algoLib.bfsSteps(grid, start, goal); break;
      case "dfs": g = algoLib.dfsSteps(grid, start, goal); break;
      case "bellmanford": g = algoLib.bellmanFordSteps(grid, start, goal); break;
      case "floydwarshall": g = algoLib.floydWarshallSteps(grid, start, goal); break;
      case "greedybestfirst": g = algoLib.greedyBestFirstSteps(grid, start, goal); break;
      case "bidirectional": g = algoLib.bidirectionalSteps(grid, start, goal); break;
      case "jumppointsearch": g = algoLib.jumpPointSearchSteps(grid, start, goal); break;
      case "thetastar": g = algoLib.thetaStarSteps(grid, start, goal); break;
      default: g = dijkstraSteps(grid, start, goal);
    }
    setGen(g);
  };
  const key = (x:number,y:number)=>`${x},${y}`;

  const step = () => {
    if (!gen) buildGen();
    const { value, done } = (gen || { next: ()=>({done:true}) } as any).next();
    if (done) { setRunning(false); return; }
    if (value?.type === 'visit') {
      setState((s)=>({ ...s, visit: new Set(s.visit).add(key(value.x, value.y)) }));
    } else if (value?.type === 'relax') {
      setState((s)=>({ ...s, relax: new Set(s.relax).add(key(value.to.x, value.to.y)) }));
    } else if (value?.type === 'done') {
      setState((s)=>({ ...s, path: new Set(value.path.map((p:any)=>key(p.x,p.y))) }));
    }
  };

  useEffect(()=>{
    if (!running) return; let id:any;
    const tick=()=>{ step(); id=setTimeout(tick, speed); };
    id=setTimeout(tick, speed);
    return ()=>clearTimeout(id);
  }, [running, speed, gen]);

  const toggleWall = (x:number,y:number) => {
    if ((x===start.x&&y===start.y)||(x===goal.x&&y===goal.y)) return;
    const g = grid.map(r=>[...r]); g[y][x] = g[y][x]===1?0:1; setGrid(g); setState({visit:new Set(), relax:new Set(), path:new Set()}); setGen(null);
  };

  const cells: React.ReactNode[] = [];
  for (let y=0;y<rows;y++) for (let x=0;x<cols;x++) {
    const isStart = x===start.x && y===start.y;
    const isGoal = x===goal.x && y===goal.y;
    const isWall = grid[y][x]===1;
    const visited = state.visit.has(`${x},${y}`);
    const relaxed = state.relax.has(`${x},${y}`);
    const inPath = state.path.has(`${x},${y}`);
    let cls = 'bg-white/5 backdrop-blur-sm border-white/10';
    if (isWall) cls = 'bg-slate-700/70 backdrop-blur-sm border-white/20 shadow-inner';
    if (visited) cls = 'bg-indigo-600/50 backdrop-blur-sm border-indigo-400/30 shadow-md shadow-indigo-500/30';
    if (relaxed) cls = 'bg-fuchsia-600/50 backdrop-blur-sm border-fuchsia-400/30 shadow-md shadow-fuchsia-500/30';
    if (inPath) cls = 'bg-emerald-500/60 backdrop-blur-sm border-emerald-400/40 shadow-lg shadow-emerald-500/40';
    if (isStart) cls = 'bg-blue-500/70 backdrop-blur-sm border-blue-400/50 shadow-lg shadow-blue-500/40';
    if (isGoal) cls = 'bg-pink-500/70 backdrop-blur-sm border-pink-400/50 shadow-lg shadow-pink-500/40';
    cells.push(<div key={`${x}-${y}`} onClick={()=>toggleWall(x,y)} className={`cursor-pointer border ${cls} rounded-sm transition-all duration-200 hover:scale-105`} />);
  }

  const onRandomize = () => {
    const g = makeGrid(rows, cols, 0.28);
    setGrid(g); setState({visit:new Set(), relax:new Set(), path:new Set()}); setGen(null); setRunning(false);
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <Route className="h-5 w-5 text-fuchsia-400 drop-shadow-lg"/>
          <CardTitle className="text-indigo-100">{t('pathfinding.title')}</CardTitle>
          <Pill>{t(`algorithms.${algo}`)}</Pill>
        </div>
        <Tabs value={algo} onValueChange={setAlgo}>
          <TabsList className="max-w-full overflow-x-auto">
            <TabsTrigger value="dijkstra">{t('pathfinding.dijkstra')}</TabsTrigger>
            <TabsTrigger value="astar">{t('pathfinding.astar')}</TabsTrigger>
            <TabsTrigger value="bfs">{t('algorithms.bfs')}</TabsTrigger>
            <TabsTrigger value="dfs">{t('algorithms.dfs')}</TabsTrigger>
            <TabsTrigger value="bellmanford">{t('algorithms.bellmanFord')}</TabsTrigger>
            <TabsTrigger value="floydwarshall">{t('algorithms.floydWarshall')}</TabsTrigger>
            <TabsTrigger value="greedybestfirst">{t('algorithms.greedyBestFirst')}</TabsTrigger>
            <TabsTrigger value="bidirectional">{t('algorithms.bidirectional')}</TabsTrigger>
            <TabsTrigger value="jumppointsearch">{t('algorithms.jumpPointSearch')}</TabsTrigger>
            <TabsTrigger value="thetastar">{t('algorithms.thetaStar')}</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="space-y-4">
        <ControlBar
          running={running}
          onPlay={()=>{ if(!gen) buildGen(); setRunning(true); }}
          onPause={()=>setRunning(false)}
          onStep={step}
          onShuffle={onRandomize}
          speed={speed}
          setSpeed={setSpeed}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-xl p-3 glass-light space-y-2">
            <div className="text-xs text-slate-300">{t('pathfinding.gridSize')}</div>
            <div className="flex items-center gap-2"><Label className="text-xs">{t('pathfinding.rows')}</Label><div className="w-36"><Slider value={[rows]} min={8} max={24} step={1} onValueChange={(v)=>v && v[0] !== undefined && setRows(v[0])}/></div></div>
            <div className="flex items-center gap-2"><Label className="text-xs">{t('pathfinding.cols')}</Label><div className="w-36"><Slider value={[cols]} min={12} max={36} step={1} onValueChange={(v)=>v && v[0] !== undefined && setCols(v[0])}/></div></div>
          </div>
          <div className="rounded-xl p-3 glass-light">
            <div className="text-xs text-slate-300">{t('pathfinding.legend')}</div>
            <div className="flex flex-wrap gap-2 mt-2 text-xs">
              <Pill>{t('pathfinding.start')}</Pill><Pill>{t('pathfinding.goal')}</Pill><Pill>{t('pathfinding.visited')}</Pill><Pill>{t('pathfinding.relaxed')}</Pill><Pill>{t('pathfinding.path')}</Pill>
            </div>
          </div>
          <div className="rounded-xl p-3 glass-light md:col-span-2">
            <div className="text-xs text-slate-300 mb-2">{t('common.complexity')}</div>
            <div className="grid grid-cols-2 gap-2 text-sm text-slate-200">
              <div>{t('common.best')}: {BIGO[algo].best}</div>
              <div>{t('pathfinding.avg')}: {BIGO[algo].avg}</div>
              <div>{t('common.worst')}: {BIGO[algo].worst}</div>
              <div>{t('common.space')}: {BIGO[algo].space}</div>
            </div>
          </div>
        </div>
        <div className="grid gap-1 p-2 rounded-xl glass-light" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {cells}
        </div>
      </CardContent>
    </Card>
  );
}

function KMPPanel() {
  const t = useTranslations();
  const [text, setText] = useState("lorem ipsum dolor sit amet ipsum");
  const [pat, setPat] = useState("ipsum");
  const [algo, setAlgo] = useState<"kmp"|"rabinkarp"|"boyermoore"|"zalgorithm"|"naivestring"|"ahocorasick"|"finiteautomaton"|"manacher"|"horspool"|"suffixarray">("kmp");
  const [matches, setMatches] = useState<number[]>([]);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(120);
  const [gen, setGen] = useState<Generator<any> | null>(null);
  const [lps, setLps] = useState<number[]>([]);
  const [pos, setPos] = useState<{ i:number, j:number }>({ i: -1, j: -1 });

  const reset = () => { setMatches([]); setGen(null); setRunning(false); setLps([]); setPos({i:-1,j:-1}); };

  const step = () => {
    if (!gen) {
      let g: Generator<any>;
      switch(algo) {
        case "kmp": g = kmpSteps(text, pat); break;
        case "rabinkarp": g = algoLib.rabinKarpSteps(text, pat); break;
        case "boyermoore": g = algoLib.boyerMooreSteps(text, pat); break;
        case "zalgorithm": g = algoLib.zAlgorithmSteps(text, pat); break;
        case "naivestring": g = algoLib.naiveStringSteps(text, pat); break;
        case "ahocorasick": g = algoLib.ahoCorasickSteps(text, [pat]); break;
        case "finiteautomaton": g = algoLib.finiteAutomatonSteps(text, pat); break;
        case "manacher": g = algoLib.manacherSteps(text); break;
        case "horspool": g = algoLib.horspoolSteps(text, pat); break;
        case "suffixarray": g = algoLib.suffixArraySteps(text, pat); break;
        default: g = kmpSteps(text, pat);
      }
      setGen(g);
    }
    const { value, done } = (gen || { next: ()=>({done:true}) } as any).next();
    if (done) { setRunning(false); return; }
    if (value?.type === 'lps') setLps(value.lps);
    if (value?.type === 'compare') setPos({ i: value.i, j: value.j });
    if (value?.type === 'match') setMatches((m)=>[...m, value.index]);
  };

  useEffect(()=>{ if(!running) return; let id:any; const tick=()=>{ step(); id=setTimeout(tick, speed); }; id=setTimeout(tick, speed); return ()=>clearTimeout(id); }, [running, speed, gen]);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <Binary className="h-5 w-5 text-emerald-400 drop-shadow-lg"/>
          <CardTitle className="text-indigo-100">{t('kmp.title')}</CardTitle>
          <Pill>{t(`algorithms.${algo}`)}</Pill>
        </div>
        <Tabs value={algo} onValueChange={setAlgo}>
          <TabsList className="max-w-full overflow-x-auto">
            <TabsTrigger value="kmp">{t('kmp.kmp')}</TabsTrigger>
            <TabsTrigger value="rabinkarp">{t('algorithms.rabinKarp')}</TabsTrigger>
            <TabsTrigger value="boyermoore">{t('algorithms.boyerMoore')}</TabsTrigger>
            <TabsTrigger value="zalgorithm">{t('algorithms.zAlgorithm')}</TabsTrigger>
            <TabsTrigger value="naivestring">{t('algorithms.naiveString')}</TabsTrigger>
            <TabsTrigger value="ahocorasick">{t('algorithms.ahoCorasick')}</TabsTrigger>
            <TabsTrigger value="finiteautomaton">{t('algorithms.finiteAutomaton')}</TabsTrigger>
            <TabsTrigger value="manacher">{t('algorithms.manacher')}</TabsTrigger>
            <TabsTrigger value="horspool">{t('algorithms.horspool')}</TabsTrigger>
            <TabsTrigger value="suffixarray">{t('algorithms.suffixArray')}</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="space-y-4">
        <ControlBar
          running={running}
          onPlay={()=>{ if(!gen) step(); setRunning(true); }}
          onPause={()=>setRunning(false)}
          onStep={step}
          onShuffle={()=>{ reset(); }}
          speed={speed}
          setSpeed={setSpeed}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-xl p-3 glass-light md:col-span-2">
            <div className="text-xs text-slate-300 mb-2">{t('kmp.input')}</div>
            <div className="flex flex-col gap-2">
              <input className="px-3 py-2 rounded-lg glass-light border-white/10 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/30 transition-all" value={text} onChange={(e)=>{ setText(e.target.value); reset(); }} placeholder={t('kmp.enterText')} />
              <input className="px-3 py-2 rounded-lg glass-light border-white/10 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/30 transition-all" value={pat} onChange={(e)=>{ setPat(e.target.value); reset(); }} placeholder={t('kmp.enterPattern')} />
            </div>
            <div className="mt-3 text-sm text-slate-200 font-mono break-words p-2 rounded-lg glass-light">
              {text.split("").map((ch, idx)=>{
                const active = idx===pos.i;
                const hit = matches.includes(idx);
                return <span key={idx} className={`${active?'bg-indigo-600/60 rounded px-1':''} ${hit?'underline decoration-emerald-400 decoration-2':''} px-0.5 transition-all`}>{ch}</span>
              })}
            </div>
            <div className="mt-2 text-sm text-slate-200 font-mono p-2 rounded-lg glass-light">
              {Array.from({length: text.length}).map((_, idx)=>{
                const j = pos.j;
                const ch = pat[j] || " ";
                const under = idx===pos.i ? ch : " ";
                return <span key={idx} className="px-0.5">{under}</span>
              })}
            </div>
          </div>
          <div className="rounded-xl p-3 glass-light">
            <div className="text-xs text-slate-300 mb-2">{t('kmp.lpsTable')}</div>
            <div className="flex flex-wrap gap-1 text-sm font-mono">
              {pat.split("").map((c,i)=> (
                <div key={i} className="px-2 py-1 rounded glass-light border-white/10 flex items-center gap-2">
                  <span className="text-slate-200">{c}</span>
                  <span className="text-emerald-400 font-bold">{lps[i] ?? "·"}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-slate-300">{t('kmp.complexityNote', { best: BIGO[algo].best, space: BIGO[algo].space })}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
const currentDate: Date = new Date();
const formattedDate: string = currentDate.toLocaleDateString('en-US', {
  weekday: 'short',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
export default function AlgoVista() {
  const t = useTranslations();
  const currentDate: Date = new Date();
  const formattedDate: string = currentDate.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div className="min-h-screen w-full text-slate-100 relative z-10">
      <header className="sticky top-0 z-50 glass-strong border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cpu className="h-5 w-5 text-fuchsia-400 drop-shadow-lg"/>
            <h1 className="text-lg font-semibold tracking-tight bg-gradient-to-r from-indigo-200 to-fuchsia-200 bg-clip-text text-transparent">{t('header.title')}</h1>
            <Pill>{formattedDate}</Pill>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <a href="https://voxhash.dev/" target="_blank" rel="noreferrer"><Button variant="ghost">{t('common.portfolio')}</Button></a>
            <Button variant="outline"><Code2 className="h-4 w-4"/></Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6 relative z-10">
        <IntroCard />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SortingPanel />
          <PathfindingPanel />
        </div>
        <KMPPanel />
        <FooterCard />
      </main>
    </div>
  );
}

function IntroCard() {
  const t = useTranslations();
  return (
    <Card>
      <CardHeader className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <Activity className="h-5 w-5 text-indigo-400 drop-shadow-lg"/>
          <CardTitle className="text-indigo-100">{t('intro.title')}</CardTitle>
          <Pill>{t('header.madeBy')}</Pill>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-slate-200 leading-relaxed">
        <ul className="list-disc pl-6 space-y-1">
          <li>{t('intro.feature1')}</li>
          <li>{t('intro.feature2')}</li>
          <li>{t('intro.feature3')}</li>
          <li>{t('intro.feature4')}</li>
          <li>{t('intro.feature5')}</li>
        </ul>
      </CardContent>
    </Card>
  );
}

function FooterCard() {
  const t = useTranslations();
  return (
    <Card>
      <CardContent className="py-4 text-xs text-slate-300 flex flex-wrap items-center justify-between">
        <div>
          {t('footer.copyright')}
        </div>
        <div className="flex items-center gap-2">
          <a className="underline-offset-4 hover:underline hover:text-indigo-300 transition-colors" href="https://github.com/VoxHash" target="_blank" rel="noreferrer">{t('common.github')}</a>
          <a className="underline-offset-4 hover:underline hover:text-indigo-300 transition-colors" href="https://youtube.com/@VoxHash" target="_blank" rel="noreferrer">{t('common.youtube')}</a>
        </div>
      </CardContent>
    </Card>
  );
}