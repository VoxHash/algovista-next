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

