import { describe, it, expect } from '@jest/globals';

// re-implement minimal helpers for pure tests
function quicksort(arr:number[]):number[]{
  const a=[...arr];
  function part(l:number,h:number){const p=a[h]; let i=l; for(let j=l;j<h;j++){ if(a[j]<p){[a[i],a[j]]=[a[j],a[i]]; i++;}} [a[i],a[h]]=[a[h],a[i]]; return i;}
  function qs(l:number,h:number){ if(l<h){ const p=part(l,h); qs(l,p-1); qs(p+1,h);}}
  qs(0,a.length-1); return a;
}
function mergesort(arr:number[]):number[]{
  if(arr.length<=1) return arr;
  const m=Math.floor(arr.length/2); const L=mergesort(arr.slice(0,m)), R=mergesort(arr.slice(m));
  const out:number[]=[]; let i=0,j=0; while(i<L.length||j<R.length){ if(j>=R.length || (i<L.length && L[i]<=R[j])) out.push(L[i++]); else out.push(R[j++]); }
  return out;
}
function buildLPS(pat:string){ const lps=Array(pat.length).fill(0); let len=0,i=1; while(i<pat.length){ if(pat[i]===pat[len]) lps[i++]=++len; else if(len!==0) len=lps[len-1]; else lps[i++]=0; } return lps; }

describe('Algorithms', ()=>{
  it('quicksort sorts correctly', ()=>{
    const a=[5,3,8,1,2,9,4,7,6];
    expect(quicksort(a)).toEqual([1,2,3,4,5,6,7,8,9]);
  });
  it('mergesort sorts correctly', ()=>{
    const a=[9,1,5,3,7,2,6,4,8];
    expect(mergesort(a)).toEqual([1,2,3,4,5,6,7,8,9]);
  });
  it('buildLPS works for KMP', ()=>{
    expect(buildLPS('ababaca')).toEqual([0,0,1,2,3,0,1]);
  });
});
