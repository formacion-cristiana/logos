// Crossword generator: places a list of words into a grid, intersecting when possible.

function dirDelta(dir) {
  return dir === 0 ? { dr: 0, dc: 1 } : { dr: 1, dc: 0 }; // 0 = across, 1 = down
}

function inGrid(grid, r, c) {
  return r >= 0 && r < grid.length && c >= 0 && c < grid[0].length;
}

// Returns { intersections } if placeable, else null.
function canPlace(grid, letters, row, col, dir, requireIntersection) {
  const { dr, dc } = dirDelta(dir);
  const len = letters.length;
  const br = row - dr, bc = col - dc;
  if (inGrid(grid, br, bc) && grid[br][bc] !== null) return null;
  const er = row + dr * len, ec = col + dc * len;
  if (inGrid(grid, er, ec) && grid[er][ec] !== null) return null;
  let intersections = 0;
  for (let j = 0; j < len; j++) {
    const r = row + dr * j, c = col + dc * j;
    if (!inGrid(grid, r, c)) return null;
    const cur = grid[r][c];
    if (cur !== null) {
      if (cur !== letters[j]) return null;
      intersections++;
    } else if (dir === 0) {
      if (inGrid(grid, r - 1, c) && grid[r - 1][c] !== null) return null;
      if (inGrid(grid, r + 1, c) && grid[r + 1][c] !== null) return null;
    } else {
      if (inGrid(grid, r, c - 1) && grid[r][c - 1] !== null) return null;
      if (inGrid(grid, r, c + 1) && grid[r][c + 1] !== null) return null;
    }
  }
  if (requireIntersection && intersections < 1) return null;
  return { intersections };
}

function writeWord(grid, letters, row, col, dir) {
  const { dr, dc } = dirDelta(dir);
  for (let j = 0; j < letters.length; j++) {
    grid[row + dr * j][col + dc * j] = letters[j];
  }
}

export function generateCrossword(words, maxSize = 22) {
  const sorted = [...words]
    .filter((w) => w.normalized && w.normalized.length >= 2)
    .sort((a, b) => b.normalized.length - a.normalized.length);
  if (!sorted.length)
    return { grid: [], placed: [], rows: 0, cols: 0, across: [], down: [], numberMap: new Map() };

  const grid = Array.from({ length: maxSize }, () => Array(maxSize).fill(null));
  const placed = [];

  const first = sorted[0];
  const fRow = Math.floor(maxSize / 2);
  const fCol = Math.floor((maxSize - first.normalized.length) / 2);
  writeWord(grid, first.normalized.split(""), fRow, fCol, 0);
  placed.push({ ...first, row: fRow, col: fCol, dir: 0 });

  for (let i = 1; i < sorted.length; i++) {
    const w = sorted[i];
    const letters = w.normalized.split("");
    let best = null;
    for (const p of placed) {
      const pLetters = p.normalized.split("");
      const { dr: pdr, dc: pdc } = dirDelta(p.dir);
      for (let k = 0; k < letters.length; k++) {
        for (let m = 0; m < pLetters.length; m++) {
          if (letters[k] !== pLetters[m]) continue;
          const newDir = p.dir === 0 ? 1 : 0;
          const { dr, dc } = dirDelta(newDir);
          const cellR = p.row + pdr * m;
          const cellC = p.col + pdc * m;
          const row = cellR - k * dr;
          const col = cellC - k * dc;
          const res = canPlace(grid, letters, row, col, newDir, true);
          if (res && (!best || res.intersections > best.score)) {
            best = { row, col, dir: newDir, score: res.intersections };
          }
        }
      }
    }
    if (best) {
      writeWord(grid, letters, best.row, best.col, best.dir);
      placed.push({ ...w, row: best.row, col: best.col, dir: best.dir });
    }
  }

  let minR = maxSize, maxR = -1, minC = maxSize, maxC = -1;
  for (let r = 0; r < maxSize; r++) {
    for (let c = 0; c < maxSize; c++) {
      if (grid[r][c] !== null) {
        minR = Math.min(minR, r);
        maxR = Math.max(maxR, r);
        minC = Math.min(minC, c);
        maxC = Math.max(maxC, c);
      }
    }
  }
  if (maxR < 0)
    return { grid: [], placed: [], rows: 0, cols: 0, across: [], down: [], numberMap: new Map() };

  const rows = maxR - minR + 1;
  const cols = maxC - minC + 1;
  const trimmed = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => grid[r + minR][c + minC])
  );
  const shifted = placed.map((p) => ({ ...p, row: p.row - minR, col: p.col - minC }));

  const numberMap = new Map();
  let num = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (trimmed[r][c] === null) continue;
      const startsAcross =
        (c === 0 || trimmed[r][c - 1] === null) && c + 1 < cols && trimmed[r][c + 1] !== null;
      const startsDown =
        (r === 0 || trimmed[r - 1][c] === null) && r + 1 < rows && trimmed[r + 1][c] !== null;
      if (startsAcross || startsDown) {
        num++;
        numberMap.set(`${r},${c}`, num);
      }
    }
  }
  const withNums = shifted.map((p) => ({ ...p, number: numberMap.get(`${p.row},${p.col}`) }));
  const across = withNums.filter((p) => p.dir === 0).sort((a, b) => a.number - b.number);
  const down = withNums.filter((p) => p.dir === 1).sort((a, b) => a.number - b.number);

  return { grid: trimmed, placed: withNums, rows, cols, across, down, numberMap };
}