import { shuffle } from "@/lib/words";

export const MAX_ROWS = 6;
export const PTS_PER_WORD = 3;

// Standard Wordle evaluation: green = correct position, yellow = in word elsewhere, gray = absent.
export function evaluate(guess, solution) {
  const n = solution.length;
  const status = Array(n).fill("gray");
  const counts = {};
  for (const ch of solution) counts[ch] = (counts[ch] || 0) + 1;
  for (let i = 0; i < n; i++) {
    if (guess[i] === solution[i]) { status[i] = "green"; counts[guess[i]]--; }
  }
  for (let i = 0; i < n; i++) {
    if (status[i] === "green") continue;
    if (counts[guess[i]] > 0) { status[i] = "yellow"; counts[guess[i]]--; }
  }
  return status;
}

// Choose `toReveal` letter positions to pre-show for long words.
// Prefer non-adjacent positions; allow adjacency only when unavoidable (very long word).
export function pickRevealed(total, toReveal) {
  if (toReveal <= 0) return new Set();
  if (toReveal >= total) return new Set([...Array(total).keys()]);
  const needNonAdjacent = toReveal <= Math.ceil(total / 2);
  for (let attempt = 0; attempt < 80; attempt++) {
    const order = shuffle([...Array(total).keys()]);
    const picked = new Set();
    for (const idx of order) {
      if (picked.size >= toReveal) break;
      if (needNonAdjacent && (picked.has(idx - 1) || picked.has(idx + 1))) continue;
      picked.add(idx);
    }
    if (picked.size >= toReveal) return picked;
  }
  return new Set([...Array(total).keys()].slice(0, toReveal));
}

// Flatten a word object (which may have multiple &-separated segments) into a single
// letter array plus per-segment lengths (so the & can be drawn between segments).
export function buildWord(wObj) {
  const segments = wObj.normTokens;
  const letters = segments.join("").split("");
  const segLens = segments.map((s) => s.length);
  return { ...wObj, letters, segLens };
}

// Indices after which an & separator should be displayed.
export function ampersandAfter(segLens) {
  const set = new Set();
  let acc = 0;
  segLens.forEach((len, i) => {
    acc += len;
    if (i < segLens.length - 1) set.add(acc - 1);
  });
  return set;
}

export function firstEmpty(input, revealed) {
  for (let i = 0; i < input.length; i++) if (!revealed.has(i) && !input[i]) return i;
  return null;
}
export function nextEmpty(input, revealed, from) {
  for (let i = from + 1; i < input.length; i++) if (!revealed.has(i) && !input[i]) return i;
  for (let i = 0; i < from; i++) if (!revealed.has(i) && !input[i]) return i;
  return null;
}
export function prevEmpty(input, revealed, from) {
  for (let i = from - 1; i >= 0; i--) if (!revealed.has(i) && !input[i]) return i;
  for (let i = input.length - 1; i > from; i--) if (!revealed.has(i) && !input[i]) return i;
  return null;
}