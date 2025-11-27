// Additional sorting algorithms
export function* bubbleSortSteps(arr: number[]): Generator<any> {
  const a = [...arr];
  yield { type: "start", array: [...a] };
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      yield { type: "compare", a: j, b: j + 1, array: [...a] };
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        yield { type: "swap", i: j, j: j + 1, array: [...a] };
      }
    }
  }
  yield { type: "done", array: [...a] };
}

export function* insertionSortSteps(arr: number[]): Generator<any> {
  const a = [...arr];
  yield { type: "start", array: [...a] };
  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;
    yield { type: "compare", a: i, b: j, array: [...a] };
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      yield { type: "write", index: j + 1, value: a[j + 1], array: [...a] };
      j--;
    }
    a[j + 1] = key;
    yield { type: "write", index: j + 1, value: key, array: [...a] };
  }
  yield { type: "done", array: [...a] };
}

export function* selectionSortSteps(arr: number[]): Generator<any> {
  const a = [...arr];
  yield { type: "start", array: [...a] };
  for (let i = 0; i < a.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < a.length; j++) {
      yield { type: "compare", a: minIdx, b: j, array: [...a] };
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      yield { type: "swap", i, j: minIdx, array: [...a] };
    }
  }
  yield { type: "done", array: [...a] };
}

export function* heapSortSteps(arr: number[]): Generator<any> {
  const a = [...arr];
  function* heapify(n: number, i: number): Generator<any> {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < n) {
      yield { type: "compare", a: largest, b: left, array: [...a] };
      if (a[left] > a[largest]) largest = left;
    }
    if (right < n) {
      yield { type: "compare", a: largest, b: right, array: [...a] };
      if (a[right] > a[largest]) largest = right;
    }
    if (largest !== i) {
      [a[i], a[largest]] = [a[largest], a[i]];
      yield { type: "swap", i, j: largest, array: [...a] };
      yield* heapify(n, largest);
    }
  }
  yield { type: "start", array: [...a] };
  for (let i = Math.floor(a.length / 2) - 1; i >= 0; i--) {
    yield* heapify(a.length, i);
  }
  for (let i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    yield { type: "swap", i: 0, j: i, array: [...a] };
    yield* heapify(i, 0);
  }
  yield { type: "done", array: [...a] };
}

export function* radixSortSteps(arr: number[]): Generator<any> {
  const a = [...arr];
  yield { type: "start", array: [...a] };
  const max = Math.max(...a);
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    const output = Array(a.length).fill(0);
    const count = Array(10).fill(0);
    for (let i = 0; i < a.length; i++) {
      count[Math.floor(a[i] / exp) % 10]++;
    }
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }
    for (let i = a.length - 1; i >= 0; i--) {
      const digit = Math.floor(a[i] / exp) % 10;
      output[count[digit] - 1] = a[i];
      count[digit]--;
      yield { type: "write", index: count[digit], value: a[i], array: [...output] };
    }
    for (let i = 0; i < a.length; i++) {
      a[i] = output[i];
      yield { type: "write", index: i, value: a[i], array: [...a] };
    }
  }
  yield { type: "done", array: [...a] };
}

export function* countingSortSteps(arr: number[]): Generator<any> {
  const a = [...arr];
  yield { type: "start", array: [...a] };
  const max = Math.max(...a);
  const count = Array(max + 1).fill(0);
  for (let i = 0; i < a.length; i++) {
    count[a[i]]++;
  }
  let idx = 0;
  for (let i = 0; i <= max; i++) {
    while (count[i] > 0) {
      a[idx] = i;
      yield { type: "write", index: idx, value: i, array: [...a] };
      idx++;
      count[i]--;
    }
  }
  yield { type: "done", array: [...a] };
}

export function* bucketSortSteps(arr: number[]): Generator<any> {
  const a = [...arr];
  yield { type: "start", array: [...a] };
  const n = a.length;
  const buckets: number[][] = Array(n).fill(null).map(() => []);
  for (let i = 0; i < n; i++) {
    const bi = Math.floor(n * a[i] / (Math.max(...a) + 1));
    buckets[bi].push(a[i]);
  }
  for (let i = 0; i < n; i++) {
    buckets[i].sort((x, y) => x - y);
  }
  let idx = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < buckets[i].length; j++) {
      a[idx] = buckets[i][j];
      yield { type: "write", index: idx, value: a[idx], array: [...a] };
      idx++;
    }
  }
  yield { type: "done", array: [...a] };
}

export function* shellSortSteps(arr: number[]): Generator<any> {
  const a = [...arr];
  yield { type: "start", array: [...a] };
  const n = a.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = a[i];
      let j = i;
      while (j >= gap && a[j - gap] > temp) {
        yield { type: "compare", a: j, b: j - gap, array: [...a] };
        a[j] = a[j - gap];
        yield { type: "write", index: j, value: a[j], array: [...a] };
        j -= gap;
      }
      a[j] = temp;
      yield { type: "write", index: j, value: temp, array: [...a] };
    }
  }
  yield { type: "done", array: [...a] };
}

// Pathfinding algorithms
const DIRS = [[1,0],[0,1],[-1,0],[0,-1]] as const;

export function* bfsSteps(grid: number[][], start:{x:number,y:number}, goal:{x:number,y:number}): Generator<any> {
  if (!grid || grid.length === 0 || !grid[0]) return;
  const h = grid.length, w = grid[0].length;
  const queue: {x:number,y:number}[] = [start];
  const visited = new Set<string>();
  const prev = new Map<string, {x:number,y:number}>();
  visited.add(`${start.x},${start.y}`);
  
  while (queue.length > 0) {
    const {x, y} = queue.shift()!;
    yield { type: "visit", x, y };
    if (x === goal.x && y === goal.y) break;
    
    for (const [dx,dy] of DIRS) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      if (grid[ny][nx] === 1) continue;
      const key = `${nx},${ny}`;
      if (!visited.has(key)) {
        visited.add(key);
        prev.set(key, {x,y});
        queue.push({x:nx, y:ny});
        yield { type: "relax", from:{x,y}, to:{x:nx,y:ny} };
      }
    }
  }
  
  const path: {x:number,y:number}[] = [];
  let cx = goal.x, cy = goal.y;
  while (true) {
    path.push({x:cx,y:cy});
    const p = prev.get(`${cx},${cy}`);
    if (!p) break;
    cx = p.x; cy = p.y;
  }
  yield { type: "done", path: path.reverse() };
}

export function* dfsSteps(grid: number[][], start:{x:number,y:number}, goal:{x:number,y:number}): Generator<any> {
  if (!grid || grid.length === 0 || !grid[0]) return;
  const h = grid.length, w = grid[0].length;
  const stack: {x:number,y:number}[] = [start];
  const visited = new Set<string>();
  const prev = new Map<string, {x:number,y:number}>();
  
  while (stack.length > 0) {
    const {x, y} = stack.pop()!;
    if (visited.has(`${x},${y}`)) continue;
    visited.add(`${x},${y}`);
    yield { type: "visit", x, y };
    if (x === goal.x && y === goal.y) break;
    
    for (const [dx,dy] of DIRS) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      if (grid[ny][nx] === 1) continue;
      const key = `${nx},${ny}`;
      if (!visited.has(key)) {
        prev.set(key, {x,y});
        stack.push({x:nx, y:ny});
        yield { type: "relax", from:{x,y}, to:{x:nx,y:ny} };
      }
    }
  }
  
  const path: {x:number,y:number}[] = [];
  let cx = goal.x, cy = goal.y;
  while (true) {
    path.push({x:cx,y:cy});
    const p = prev.get(`${cx},${cy}`);
    if (!p) break;
    cx = p.x; cy = p.y;
  }
  yield { type: "done", path: path.reverse() };
}

// String matching algorithms
export function* rabinKarpSteps(text: string, pat: string): Generator<any> {
  const n = text.length, m = pat.length;
  const d = 256, q = 101;
  let h = 1;
  for (let i = 0; i < m - 1; i++) h = (h * d) % q;
  
  let p = 0, t = 0;
  for (let i = 0; i < m; i++) {
    p = (d * p + pat.charCodeAt(i)) % q;
    t = (d * t + text.charCodeAt(i)) % q;
  }
  
  for (let i = 0; i <= n - m; i++) {
    yield { type: "compare", i, j: 0 };
    if (p === t) {
      let j = 0;
      while (j < m && text[i + j] === pat[j]) {
        yield { type: "compare", i: i + j, j };
        j++;
      }
      if (j === m) {
        yield { type: "match", index: i };
      }
    }
    if (i < n - m) {
      t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
      if (t < 0) t = (t + q);
    }
  }
  yield { type: "done" };
}

export function* boyerMooreSteps(text: string, pat: string): Generator<any> {
  const badChar: Record<string, number> = {};
  for (let i = 0; i < pat.length; i++) {
    badChar[pat[i]] = i;
  }
  
  let s = 0;
  while (s <= text.length - pat.length) {
    let j = pat.length - 1;
    while (j >= 0 && pat[j] === text[s + j]) {
      yield { type: "compare", i: s + j, j };
      j--;
    }
    if (j < 0) {
      yield { type: "match", index: s };
      s += (s + pat.length < text.length) ? pat.length - (badChar[text[s + pat.length]] ?? -1) : 1;
    } else {
      s += Math.max(1, j - (badChar[text[s + j]] ?? -1));
    }
  }
  yield { type: "done" };
}

export function* zAlgorithmSteps(text: string, pat: string): Generator<any> {
  const s = pat + '$' + text;
  const z = Array(s.length).fill(0);
  let l = 0, r = 0;
  
  for (let i = 1; i < s.length; i++) {
    if (i <= r) z[i] = Math.min(r - i + 1, z[i - l]);
    while (i + z[i] < s.length && s[z[i]] === s[i + z[i]]) {
      yield { type: "compare", i, j: z[i] };
      z[i]++;
    }
    if (i + z[i] - 1 > r) {
      l = i;
      r = i + z[i] - 1;
    }
    if (z[i] === pat.length) {
      yield { type: "match", index: i - pat.length - 1 };
    }
  }
  yield { type: "done" };
}

export function* naiveStringSteps(text: string, pat: string): Generator<any> {
  for (let i = 0; i <= text.length - pat.length; i++) {
    let j = 0;
    while (j < pat.length) {
      yield { type: "compare", i: i + j, j };
      if (text[i + j] !== pat[j]) break;
      j++;
    }
    if (j === pat.length) {
      yield { type: "match", index: i };
    }
  }
  yield { type: "done" };
}

// Additional Pathfinding Algorithms
export function* bellmanFordSteps(grid: number[][], start:{x:number,y:number}, goal:{x:number,y:number}): Generator<any> {
  if (!grid || grid.length === 0 || !grid[0]) return;
  const h = grid.length, w = grid[0].length;
  const dist = Array.from({length: h}, () => Array(w).fill(Infinity));
  const prev = Array.from({length: h}, () => Array(w).fill(null as null | {x:number,y:number}));
  dist[start.y][start.x] = 0;
  
  const edges: Array<{from:{x:number,y:number}, to:{x:number,y:number}, weight:number}> = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (grid[y][x] === 1) continue;
      for (const [dx,dy] of DIRS) {
        const nx = x + dx, ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < w && ny < h && grid[ny][nx] !== 1) {
          edges.push({from:{x,y}, to:{x:nx,y:ny}, weight:1});
        }
      }
    }
  }
  
  for (let i = 0; i < h * w - 1; i++) {
    let relaxed = false;
    for (const edge of edges) {
      const {from, to, weight} = edge;
      if (dist[from.y][from.x] !== Infinity) {
        const newDist = dist[from.y][from.x] + weight;
        if (newDist < dist[to.y][to.x]) {
          dist[to.y][to.x] = newDist;
          prev[to.y][to.x] = from;
          relaxed = true;
          yield { type: "relax", from, to, dist: newDist };
        }
      }
    }
    if (!relaxed) break;
  }
  
  const path: {x:number,y:number}[] = [];
  let cx = goal.x, cy = goal.y;
  if (dist[cy][cx] !== Infinity) {
    while (true) {
      path.push({x:cx,y:cy});
      const p = prev[cy][cx];
      if (!p) break;
      cx = p.x; cy = p.y;
    }
  }
  yield { type: "done", path: path.reverse() };
}

export function* floydWarshallSteps(grid: number[][], start:{x:number,y:number}, goal:{x:number,y:number}): Generator<any> {
  if (!grid || grid.length === 0 || !grid[0]) return;
  const h = grid.length, w = grid[0].length;
  const nodes: {x:number,y:number}[] = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (grid[y][x] !== 1) nodes.push({x,y});
    }
  }
  
  const n = nodes.length;
  const dist = Array(n).fill(null).map(() => Array(n).fill(Infinity));
  const next = Array(n).fill(null).map(() => Array(n).fill(null));
  
  for (let i = 0; i < n; i++) {
    dist[i][i] = 0;
    next[i][i] = i;
  }
  
  for (let i = 0; i < n; i++) {
    const node = nodes[i];
    for (const [dx,dy] of DIRS) {
      const nx = node.x + dx, ny = node.y + dy;
      if (nx >= 0 && ny >= 0 && nx < w && ny < h && grid[ny][nx] !== 1) {
        const j = nodes.findIndex(n => n.x === nx && n.y === ny);
        if (j >= 0) {
          dist[i][j] = 1;
          next[i][j] = j;
        }
      }
    }
  }
  
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
          next[i][j] = next[i][k];
          yield { type: "relax", from: nodes[i], to: nodes[j], dist: dist[i][j] };
        }
      }
    }
  }
  
  const startIdx = nodes.findIndex(n => n.x === start.x && n.y === start.y);
  const goalIdx = nodes.findIndex(n => n.x === goal.x && n.y === goal.y);
  const path: {x:number,y:number}[] = [];
  if (startIdx >= 0 && goalIdx >= 0 && dist[startIdx][goalIdx] !== Infinity) {
    let u = startIdx;
    while (u !== null && u !== goalIdx) {
      path.push(nodes[u]);
      u = next[u][goalIdx];
    }
    if (u === goalIdx) path.push(nodes[goalIdx]);
  }
  yield { type: "done", path };
}

export function* greedyBestFirstSteps(grid: number[][], start:{x:number,y:number}, goal:{x:number,y:number}): Generator<any> {
  if (!grid || grid.length === 0 || !grid[0]) return;
  const h = grid.length, w = grid[0].length;
  const hManhattan = (a:{x:number,y:number}, b:{x:number,y:number}) => Math.abs(a.x-b.x)+Math.abs(a.y-b.y);
  const open: {fx:number,x:number,y:number}[] = [];
  const closed = new Set<string>();
  const prev = new Map<string, {x:number,y:number}>();
  const push = (fx:number,x:number,y:number) => { open.push({fx,x,y}); open.sort((A,B)=>A.fx-B.fx); };
  
  push(hManhattan(start, goal), start.x, start.y);
  
  while (open.length > 0) {
    const { x, y } = open.shift()!;
    const key = `${x},${y}`;
    if (closed.has(key)) continue;
    closed.add(key);
    yield { type: "visit", x, y };
    if (x === goal.x && y === goal.y) break;
    
    for (const [dx,dy] of DIRS) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      if (grid[ny][nx] === 1) continue;
      const nkey = `${nx},${ny}`;
      if (!closed.has(nkey)) {
        prev.set(nkey, {x,y});
        push(hManhattan({x:nx,y:ny}, goal), nx, ny);
        yield { type: "relax", from:{x,y}, to:{x:nx,y:ny} };
      }
    }
  }
  
  const path: {x:number,y:number}[] = [];
  let cx = goal.x, cy = goal.y;
  while (true) {
    path.push({x:cx,y:cy});
    const p = prev.get(`${cx},${cy}`);
    if (!p) break;
    cx = p.x; cy = p.y;
  }
  yield { type: "done", path: path.reverse() };
}

export function* bidirectionalSteps(grid: number[][], start:{x:number,y:number}, goal:{x:number,y:number}): Generator<any> {
  if (!grid || grid.length === 0 || !grid[0]) return;
  const h = grid.length, w = grid[0].length;
  const queueStart: {x:number,y:number}[] = [start];
  const queueGoal: {x:number,y:number}[] = [goal];
  const visitedStart = new Map<string, {x:number,y:number}>();
  const visitedGoal = new Map<string, {x:number,y:number}>();
  visitedStart.set(`${start.x},${start.y}`, {x:-1,y:-1});
  visitedGoal.set(`${goal.x},${goal.y}`, {x:-1,y:-1});
  
  while (queueStart.length > 0 || queueGoal.length > 0) {
    if (queueStart.length > 0) {
      const {x, y} = queueStart.shift()!;
      yield { type: "visit", x, y };
      const key = `${x},${y}`;
      if (visitedGoal.has(key)) {
        const path: {x:number,y:number}[] = [];
        let cx = x, cy = y;
        while (cx !== -1) {
          path.push({x:cx,y:cy});
          const p = visitedStart.get(`${cx},${cy}`);
          if (!p) break;
          cx = p.x; cy = p.y;
        }
        path.reverse();
        cx = x; cy = y;
        const p = visitedGoal.get(key);
        if (p) {
          cx = p.x; cy = p.y;
          while (cx !== -1) {
            path.push({x:cx,y:cy});
            const next = visitedGoal.get(`${cx},${cy}`);
            if (!next) break;
            cx = next.x; cy = next.y;
          }
        }
        yield { type: "done", path };
        return;
      }
      
      for (const [dx,dy] of DIRS) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        if (grid[ny][nx] === 1) continue;
        const nkey = `${nx},${ny}`;
        if (!visitedStart.has(nkey)) {
          visitedStart.set(nkey, {x,y});
          queueStart.push({x:nx, y:ny});
          yield { type: "relax", from:{x,y}, to:{x:nx,y:ny} };
        }
      }
    }
    
    if (queueGoal.length > 0) {
      const {x, y} = queueGoal.shift()!;
      yield { type: "visit", x, y };
      const key = `${x},${y}`;
      if (visitedStart.has(key)) {
        const path: {x:number,y:number}[] = [];
        let cx = x, cy = y;
        while (cx !== -1) {
          path.push({x:cx,y:cy});
          const p = visitedStart.get(`${cx},${cy}`);
          if (!p) break;
          cx = p.x; cy = p.y;
        }
        path.reverse();
        cx = x; cy = y;
        const p = visitedGoal.get(key);
        if (p) {
          cx = p.x; cy = p.y;
          while (cx !== -1) {
            path.push({x:cx,y:cy});
            const next = visitedGoal.get(`${cx},${cy}`);
            if (!next) break;
            cx = next.x; cy = next.y;
          }
        }
        yield { type: "done", path };
        return;
      }
      
      for (const [dx,dy] of DIRS) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        if (grid[ny][nx] === 1) continue;
        const nkey = `${nx},${ny}`;
        if (!visitedGoal.has(nkey)) {
          visitedGoal.set(nkey, {x,y});
          queueGoal.push({x:nx, y:ny});
          yield { type: "relax", from:{x,y}, to:{x:nx,y:ny} };
        }
      }
    }
  }
  
  yield { type: "done", path: [] };
}

export function* jumpPointSearchSteps(grid: number[][], start:{x:number,y:number}, goal:{x:number,y:number}): Generator<any> {
  if (!grid || grid.length === 0 || !grid[0]) return;
  const h = grid.length, w = grid[0].length;
  const hManhattan = (a:{x:number,y:number}, b:{x:number,y:number}) => Math.abs(a.x-b.x)+Math.abs(a.y-b.y);
  const open: {fx:number,gx:number,x:number,y:number}[] = [];
  const closed = new Set<string>();
  const prev = new Map<string, {x:number,y:number}>();
  const push = (fx:number,gx:number,x:number,y:number) => { open.push({fx,gx,x,y}); open.sort((A,B)=>A.fx-B.fx); };
  
  function* jump(x:number, y:number, dx:number, dy:number): Generator<{x:number,y:number} | null> {
    if (x < 0 || y < 0 || x >= w || y >= h || grid[y][x] === 1) return;
    if (x === goal.x && y === goal.y) { yield {x,y}; return; }
    
    if (dx !== 0 && dy !== 0) {
      if ((x + dx < 0 || x + dx >= w || grid[y][x + dx] === 1) && 
          (y + dy < 0 || y + dy >= h || grid[y + dy][x] === 1)) return;
      if (x - dx >= 0 && x - dx < w && y - dy >= 0 && y - dy < h && 
          grid[y - dy][x - dx] === 1 && grid[y][x - dx] !== 1 && grid[y - dy][x] !== 1) {
        yield {x,y};
        return;
      }
    } else {
      if (dx !== 0) {
        if ((x + dx >= 0 && x + dx < w && grid[y][x + dx] === 1 && 
             x + dx - dx >= 0 && x + dx - dx < w && grid[y][x + dx - dx] !== 1) ||
            (x + dx < 0 || x + dx >= w)) {
          yield {x,y};
          return;
        }
      } else {
        if ((y + dy >= 0 && y + dy < h && grid[y + dy][x] === 1 && 
             y + dy - dy >= 0 && y + dy - dy < h && grid[y + dy - dy][x] !== 1) ||
            (y + dy < 0 || y + dy >= h)) {
          yield {x,y};
          return;
        }
      }
    }
    
    if (dx !== 0 && dy !== 0) {
      for (const jp of jump(x + dx, y, dx, 0)) if (jp) yield jp;
      for (const jp of jump(x, y + dy, 0, dy)) if (jp) yield jp;
    }
    const next = jump(x + dx, y + dy, dx, dy).next();
    if (!next.done && next.value) yield next.value;
  }
  
  push(hManhattan(start, goal), 0, start.x, start.y);
  
  while (open.length > 0) {
    const { x, y, gx } = open.shift()!;
    const key = `${x},${y}`;
    if (closed.has(key)) continue;
    closed.add(key);
    yield { type: "visit", x, y };
    if (x === goal.x && y === goal.y) break;
    
    const dirs = [[1,0],[0,1],[-1,0],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
    for (const [dx,dy] of dirs) {
      for (const jp of jump(x + dx, y + dy, dx, dy)) {
        if (!jp) continue;
        const nkey = `${jp.x},${jp.y}`;
        if (closed.has(nkey)) continue;
        const ng = gx + Math.abs(jp.x - x) + Math.abs(jp.y - y);
        const nf = ng + hManhattan(jp, goal);
        prev.set(nkey, {x,y});
        push(nf, ng, jp.x, jp.y);
        yield { type: "relax", from:{x,y}, to:jp };
      }
    }
  }
  
  const path: {x:number,y:number}[] = [];
  let cx = goal.x, cy = goal.y;
  while (true) {
    path.push({x:cx,y:cy});
    const p = prev.get(`${cx},${cy}`);
    if (!p) break;
    cx = p.x; cy = p.y;
  }
  yield { type: "done", path: path.reverse() };
}

export function* thetaStarSteps(grid: number[][], start:{x:number,y:number}, goal:{x:number,y:number}): Generator<any> {
  if (!grid || grid.length === 0 || !grid[0]) return;
  const h = grid.length, w = grid[0].length;
  const hManhattan = (a:{x:number,y:number}, b:{x:number,y:number}) => Math.abs(a.x-b.x)+Math.abs(a.y-b.y);
  const g = Array.from({length: h}, () => Array(w).fill(Infinity));
  const f = Array.from({length: h}, () => Array(w).fill(Infinity));
  const parent = Array.from({length: h}, () => Array(w).fill(null as null | {x:number,y:number}));
  const open: {fx:number,x:number,y:number}[] = [];
  const push = (fx:number,x:number,y:number) => { open.push({fx,x,y}); open.sort((A,B)=>A.fx-B.fx); };
  
  g[start.y][start.x] = 0;
  f[start.y][start.x] = hManhattan(start, goal);
  push(f[start.y][start.x], start.x, start.y);
  
  const lineOfSight = (a:{x:number,y:number}, b:{x:number,y:number}): boolean => {
    let x0 = a.x, y0 = a.y, x1 = b.x, y1 = b.y;
    const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
    while (true) {
      if (x0 < 0 || y0 < 0 || x0 >= w || y0 >= h || grid[y0][x0] === 1) return false;
      if (x0 === x1 && y0 === y1) return true;
      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; x0 += sx; }
      if (e2 < dx) { err += dx; y0 += sy; }
    }
  };
  
  while (open.length > 0) {
    const { x, y } = open.shift()!;
    yield { type: "visit", x, y };
    if (x === goal.x && y === goal.y) break;
    
    for (const [dx,dy] of DIRS) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      if (grid[ny][nx] === 1) continue;
      
      const parentNode = parent[y][x];
      let newG = g[y][x] + 1;
      if (parentNode && lineOfSight(parentNode, {x:nx,y:ny})) {
        newG = g[parentNode.y][parentNode.x] + Math.abs(nx - parentNode.x) + Math.abs(ny - parentNode.y);
      }
      
      if (newG < g[ny][nx]) {
        if (parentNode && lineOfSight(parentNode, {x:nx,y:ny})) {
          parent[ny][nx] = parentNode;
        } else {
          parent[ny][nx] = {x,y};
        }
        g[ny][nx] = newG;
        f[ny][nx] = newG + hManhattan({x:nx,y:ny}, goal);
        push(f[ny][nx], nx, ny);
        yield { type: "relax", from:{x,y}, to:{x:nx,y:ny}, g: newG, f: f[ny][nx] };
      }
    }
  }
  
  const path: {x:number,y:number}[] = [];
  let cx = goal.x, cy = goal.y;
  while (true) {
    path.push({x:cx,y:cy});
    const p = parent[cy][cx];
    if (!p) break;
    cx = p.x; cy = p.y;
  }
  yield { type: "done", path: path.reverse() };
}

// Additional String Matching Algorithms
export function* ahoCorasickSteps(text: string, patterns: string[]): Generator<any> {
  class TrieNode {
    children: Map<string, TrieNode> = new Map();
    fail: TrieNode | null = null;
    output: number[] = [];
  }
  
  const root = new TrieNode();
  for (let pi = 0; pi < patterns.length; pi++) {
    const pat = patterns[pi];
    let node = root;
    for (let i = 0; i < pat.length; i++) {
      const ch = pat[i];
      if (!node.children.has(ch)) {
        node.children.set(ch, new TrieNode());
      }
      node = node.children.get(ch)!;
    }
    node.output.push(pi);
  }
  
  const queue: TrieNode[] = [];
  for (const [ch, child] of root.children) {
    child.fail = root;
    queue.push(child);
  }
  
  while (queue.length > 0) {
    const node = queue.shift()!;
    for (const [ch, child] of node.children) {
      let fail = node.fail;
      while (fail && !fail.children.has(ch)) {
        fail = fail.fail;
      }
      child.fail = fail?.children.get(ch) || root;
      child.output = [...child.output, ...(child.fail?.output || [])];
      queue.push(child);
    }
  }
  
  let node = root;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    yield { type: "compare", i, j: 0 };
    while (node && !node.children.has(ch) && node !== root) {
      node = node.fail || root;
    }
    if (node && node.children.has(ch)) {
      node = node.children.get(ch)!;
    } else {
      node = root;
    }
    for (const pi of node.output) {
      yield { type: "match", index: i - patterns[pi].length + 1, pattern: pi };
    }
  }
  yield { type: "done" };
}

export function* finiteAutomatonSteps(text: string, pat: string): Generator<any> {
  const m = pat.length;
  const chars = new Set([...text, ...pat]);
  const transition: Record<number, Record<string, number>> = {};
  
  for (let q = 0; q <= m; q++) {
    transition[q] = {};
    for (const ch of chars) {
      let k = Math.min(m, q + 1);
      while (k > 0 && pat.slice(0, k) !== (pat.slice(0, q) + ch).slice(-k)) {
        k--;
      }
      transition[q][ch] = k;
    }
  }
  
  let q = 0;
  for (let i = 0; i < text.length; i++) {
    yield { type: "compare", i, j: q };
    q = transition[q][text[i]] || 0;
    if (q === m) {
      yield { type: "match", index: i - m + 1 };
    }
  }
  yield { type: "done" };
}

export function* manacherSteps(text: string): Generator<any> {
  const s = '#' + text.split('').join('#') + '#';
  const p = Array(s.length).fill(0);
  let center = 0, right = 0;
  
  for (let i = 1; i < s.length - 1; i++) {
    yield { type: "compare", i, j: 0 };
    if (i < right) {
      p[i] = Math.min(right - i, p[2 * center - i]);
    }
    
    while (i + p[i] + 1 < s.length && i - p[i] - 1 >= 0 && 
           s[i + p[i] + 1] === s[i - p[i] - 1]) {
      p[i]++;
      yield { type: "compare", i: i + p[i], j: i - p[i] };
    }
    
    if (i + p[i] > right) {
      center = i;
      right = i + p[i];
    }
    
    if (p[i] > 0 && s[i] === '#') {
      const start = (i - p[i]) / 2;
      yield { type: "match", index: start, length: p[i] };
    }
  }
  yield { type: "done" };
}

export function* horspoolSteps(text: string, pat: string): Generator<any> {
  const shift: Record<string, number> = {};
  const m = pat.length;
  for (let i = 0; i < m - 1; i++) {
    shift[pat[i]] = m - 1 - i;
  }
  
  let i = 0;
  while (i <= text.length - m) {
    let j = m - 1;
    while (j >= 0 && pat[j] === text[i + j]) {
      yield { type: "compare", i: i + j, j };
      j--;
    }
    if (j < 0) {
      yield { type: "match", index: i };
      i += m;
    } else {
      i += shift[text[i + m - 1]] || m;
    }
  }
  yield { type: "done" };
}

export function* suffixArraySteps(text: string, pat: string): Generator<any> {
  const buildSuffixArray = (s: string): number[] => {
    const n = s.length;
    const suffixes = Array.from({length: n}, (_, i) => ({index: i, rank: [s.charCodeAt(i), i < n - 1 ? s.charCodeAt(i + 1) : -1]}));
    suffixes.sort((a, b) => a.rank[0] - b.rank[0] || a.rank[1] - b.rank[1]);
    
    for (let k = 2; k < n; k *= 2) {
      let rank = 0;
      let prevRank = suffixes[0].rank[0];
      suffixes[0].rank[0] = rank;
      const ind = Array(n).fill(0);
      ind[suffixes[0].index] = 0;
      
      for (let i = 1; i < n; i++) {
        if (suffixes[i].rank[0] === prevRank && 
            suffixes[i].rank[1] === suffixes[i - 1].rank[1]) {
          suffixes[i].rank[0] = rank;
        } else {
          prevRank = suffixes[i].rank[0];
          suffixes[i].rank[0] = ++rank;
        }
        ind[suffixes[i].index] = i;
      }
      
      for (let i = 0; i < n; i++) {
        const nextIndex = suffixes[i].index + k;
        suffixes[i].rank[1] = (nextIndex < n) ? suffixes[ind[nextIndex]].rank[0] : -1;
      }
      
      suffixes.sort((a, b) => a.rank[0] - b.rank[0] || a.rank[1] - b.rank[1]);
    }
    
    return suffixes.map(s => s.index);
  };
  
  const suffixArray = buildSuffixArray(text);
  
  let left = 0, right = text.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    const suffix = suffixArray[mid];
    yield { type: "compare", i: suffix, j: 0 };
    
    let cmp = 0;
    for (let i = 0; i < pat.length && suffix + i < text.length; i++) {
      if (pat[i] !== text[suffix + i]) {
        cmp = pat[i].charCodeAt(0) - text[suffix + i].charCodeAt(0);
        yield { type: "compare", i: suffix + i, j: i };
        break;
      }
    }
    
    if (cmp === 0 && pat.length <= text.length - suffix) {
      let start = mid;
      while (start > 0) {
        const s = suffixArray[start - 1];
        if (text.slice(s, s + pat.length) === pat) {
          yield { type: "match", index: s };
          start--;
        } else break;
      }
      while (mid < suffixArray.length) {
        const s = suffixArray[mid];
        if (text.slice(s, s + pat.length) === pat) {
          yield { type: "match", index: s };
          mid++;
        } else break;
      }
      break;
    } else if (cmp < 0) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  yield { type: "done" };
}

// Search algorithms
export function* binarySearchSteps(arr: number[], target: number): Generator<any> {
  let left = 0, right = arr.length - 1;
  yield { type: "start", array: [...arr], target };
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    yield { type: "compare", a: mid, b: null, value: arr[mid], target, array: [...arr] };
    if (arr[mid] === target) {
      yield { type: "found", index: mid, array: [...arr] };
      return;
    }
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  yield { type: "notFound", array: [...arr] };
}

export function* linearSearchSteps(arr: number[], target: number): Generator<any> {
  yield { type: "start", array: [...arr], target };
  for (let i = 0; i < arr.length; i++) {
    yield { type: "compare", a: i, b: null, value: arr[i], target, array: [...arr] };
    if (arr[i] === target) {
      yield { type: "found", index: i, array: [...arr] };
      return;
    }
  }
  yield { type: "notFound", array: [...arr] };
}

