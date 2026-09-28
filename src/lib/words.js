import { isNameWord } from "@/lib/nombres";
import { WORD_DATA as WORD_DATA_ES } from "@/data/palabras-es";
import { WORD_DATA as WORD_DATA_EN } from "@/data/palabras-en";
import { TEXT as TEXT_ES, EMOJI_MAP as EMOJI_ES, t as tEs } from "@/data/texto-es";
import { TEXT as TEXT_EN, EMOJI_MAP as EMOJI_EN, t as tEn } from "@/data/texto-en";

// Language registry. EN/IT data fall back to ES until their files exist.
export const LANGS = ["es", "en", "it"];

export const LANG_LABELS = {
  es: "🇪🇸 ES",
  en: "🇬🇧 EN",
  it: "🇮🇹 IT"
};

export function getWordData(lang) {
  if (lang === "en") return WORD_DATA_EN;
  if (lang === "it") return WORD_DATA_ES; // IT not yet available — fall back to ES
  return WORD_DATA_ES;
}

export function getTextBundle(lang) {
  if (lang === "en") return { TEXT: TEXT_EN, EMOJI_MAP: EMOJI_EN, t: tEn };
  return { TEXT: TEXT_ES, EMOJI_MAP: EMOJI_ES, t: tEs };
}

export function t(lang, key, vars = {}) {
  if (lang === "en") return tEn(key, vars);
  return tEs(key, vars);
}

// ---- Word parsing utilities ----
// A "word string" from the data may be:
//   - simple:  "BAUTISMO"  (all uppercase)  -> one simple word
//   - mixed:   "ORDEN sacerdotal"          -> uppercase run "ORDEN" is the guessable part
//   - compound: "RÍO & MAR"                -> two uppercase parts joined by &
// We extract the guessable uppercase tokens.

const ACCENTS = { Á: "A", É: "E", Í: "I", Ó: "O", Ú: "U", Ü: "U", Ñ: "N" };

export function normalizeLetter(ch) {
  return ACCENTS[ch] ?? ch;
}

// Un "token" (palabra simple) es una corrida de 2+ letras mayúsculas (con acentos),
// permitiendo guiones que unen partes mayúsculas en una sola palabra
// (p.ej. "CO-PARTICIPACIÓN", "ONLY-BEGOTTEN"). Las mayúsculas aisladas de 1 letra
// (como la "T" de "Te") NO son palabras: no hay palabras de una sola letra.
const TOKEN_RE = /[A-ZÁÉÍÓÚÑÜ]{2,}(?:-[A-ZÁÉÍÓÚÑÜ]+)*/g;

// Forma de juego: se omite el guión (p.ej. "CO-PARTICIPACIÓN" -> "COPARTICIPACIÓN").
function gameForm(tok) {
  return tok.replace(/-/g, "");
}

// Forma normalizada: sin acentos ni guiones (para comparar letras).
function normForm(tok) {
  return [...tok].map(normalizeLetter).join("").replace(/-/g, "");
}

// Returns true if a string (no spaces) is entirely uppercase letters (A-Z + accents).
export function isAllUpper(s) {
  const noSpace = s.replace(/\s+/g, "");
  if (!noSpace) return false;
  return [...noSpace].every((c) => /[A-ZÁÉÍÓÚÑÜ]/.test(c));
}

// Extract guessable uppercase tokens from a word string.
// e.g. "ORDEN sacerdotal" -> ["ORDEN"]
//      "RÍO & MAR"        -> ["RÍO", "MAR"]
//      "JUAN hijo de ZACARÍAS" -> ["JUAN", "ZACARÍAS"]
export function extractUpperTokens(wordStr) {
  const parts = wordStr.split("&");
  const tokens = [];
  for (const part of parts) {
    const matches = part.match(TOKEN_RE);
    if (matches) tokens.push(...matches);
  }
  return tokens;
}

// Build a flat list of "simple words" usable by letter games (Wordle, Sopa, etc.)
// Each item: { word, display, category, subcategory, fortext, help, tags, difficulty }
export function getSimpleWords(lang) {
  const data = getWordData(lang);
  const out = [];
  for (const cat of data) {
    for (const sub of cat.words) {
      sub.words.forEach((w, i) => {
        const tokens = extractUpperTokens(w);
        tokens.forEach((tok) => {
          out.push({
            word: gameForm(tok),
            display: tok,
            normalized: normForm(tok),
            category: cat.category,
            subcategory: sub.category,
            fortext: cat.fortext,
            subFortext: sub.fortext,
            help: sub.help?.[i] ?? "",
            tags: (cat.tags || []).map(normalizeTag),
            difficulty: cat.dificultad ?? 1
          });
        });
      });
    }
  }
  return out;
}

// Build a flat list of "compound words" (the full word string with &), for games
// that use compounds (Crucigrama, Categorizar, Sopa).
export function getCompoundWords(lang) {
  const data = getWordData(lang);
  const out = [];
  for (const cat of data) {
    for (const sub of cat.words) {
      sub.words.forEach((w, i) => {
        // only include entries that have at least one uppercase token
        const tokens = extractUpperTokens(w);
        if (!tokens.length) return;
        out.push({
          word: w,
          // compound form: uppercase tokens joined by " & " (lowercase connectors dropped)
          compound: tokens.map(gameForm).join(" & "),
          tokens: tokens.map(gameForm),
          normTokens: tokens.map(normForm),
          category: cat.category,
          subcategory: sub.category,
          fortext: cat.fortext,
          subFortext: sub.fortext,
          help: sub.help?.[i] ?? "",
          tags: (cat.tags || []).map(normalizeTag),
          difficulty: cat.dificultad ?? 1
        });
      });
    }
  }
  return out;
}

// Subcategorías (nombres) de una categoría top-level dada.
export function getSubcategories(lang, category) {
  const cats = getCategories(lang);
  const cat = cats.find((c) => c.category === category);
  if (!cat) return [];
  return cat.subcategories.map((s) => s.category);
}

// Flat list of categories (top-level) with their subcategories.
export function getCategories(lang) {
  const data = getWordData(lang);
  return data.map((cat) => ({
    category: cat.category,
    fortext: cat.fortext,
    tags: (cat.tags || []).map(normalizeTag),
    difficulty: cat.dificultad ?? 1,
    subcategories: cat.words.map((sub) => ({
      category: sub.category,
      fortext: sub.fortext,
      words: sub.words,
      help: sub.help || []
    }))
  }));
}

// Normalize a tag so duplicates written slightly differently merge into one.
// Rule: first letter capitalized, rest lowercase — except acronyms (contain a dot,
// e.g. "A.T."), which are uppercased and kept as-is.
export function normalizeTag(tag) {
  const t = (tag || "").trim();
  if (!t) return t;
  if (/\./.test(t)) return t.toUpperCase();
  const lower = t.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

// All unique tags across the dataset (normalized + de-duplicated).
export function getAllTags(lang) {
  const data = getWordData(lang);
  const set = new Set();
  data.forEach((cat) => (cat.tags || []).forEach((tag) => set.add(normalizeTag(tag))));
  return [...set].sort((a, b) => a.localeCompare(b));
}

// Pick `n` random categories.
export function pickRandomCategories(lang, n) {
  const cats = getCategories(lang);
  const shuffled = [...cats].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, cats.length));
}

// Tag display rules: hide parent tags when a more specific child is present.
// Hierarchy: Biblia > N.T. > Evangelio ; Biblia > A.T.
const TAG_CONCEPTS = {
  es: { top: "Biblia", nt: "N.T.", gospel: "Evangelio", ot: "A.T." },
  en: { top: "Bible", nt: "N.T.", gospel: "Gospels", ot: "O.T." },
  it: { top: "Bibbia", nt: "N.T.", gospel: "Vangelo", ot: "A.T." }
};

export function displayTags(tags, lang) {
  const c = TAG_CONCEPTS[lang] || TAG_CONCEPTS.es;
  let out = [...tags];
  if (out.includes(c.gospel)) out = out.filter((t) => t !== c.nt && t !== c.top);
  if (out.includes(c.ot)) out = out.filter((t) => t !== c.top);
  return out;
}

// ---- Simple-word parsing for glossaries ----
// Decompose a word string into its uppercase tokens, keeping any lowercase
// connector text as a parenthesized prefix/suffix of the token it attaches to.
// e.g. "amar a DIOS"        -> [{ token: "DIOS", prefix: "amar a", suffix: "" }]  -> "(amar a) DIOS"
//      "ORDEN sacerdotal"   -> [{ token: "ORDEN", prefix: "", suffix: "sacerdotal" }] -> "ORDEN (sacerdotal)"
//      "BENDITA sea tu PUREZA" -> [{ token: "BENDITA", prefix: "", suffix: "" }, { token: "PUREZA", prefix: "sea tu", suffix: "" }]
//      "DÍA & NOCHE"        -> [{ token: "DÍA", ... }, { token: "NOCHE", ... }]  (& is a separator, not a connector)
export function parseSimple(wordStr) {
  const parts = [];
  let lastEnd = 0;
  let m;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(wordStr)) !== null) {
    if (m.index > lastEnd) parts.push({ text: wordStr.slice(lastEnd, m.index), isToken: false });
    parts.push({ text: m[0], isToken: true });
    lastEnd = m.index + m[0].length;
  }
  if (lastEnd < wordStr.length) parts.push({ text: wordStr.slice(lastEnd), isToken: false });
  const entries = [];
  let pendingPrefix = "";
  for (const p of parts) {
    if (p.isToken) {
      entries.push({ token: p.text, prefix: pendingPrefix, suffix: "" });
      pendingPrefix = "";
    } else {
      // connector text between/around tokens; "&" is a separator, not a connector
      const c = p.text.replace(/&/g, "").trim();
      pendingPrefix = c;
    }
  }
  if (pendingPrefix && entries.length) entries[entries.length - 1].suffix = pendingPrefix;
  return entries;
}

export function simpleDisplay(entry) {
  const pre = entry.prefix ? `(${entry.prefix}) ` : "";
  const suf = entry.suffix ? ` (${entry.suffix})` : "";
  return `${pre}${entry.token}${suf}`;
}

// ---- Glossaries (footer) ----
// All glossaries are ordered alphabetically by the uppercase term.
// Repeated terms are merged, showing the definition for each category.
// Clave de agrupación de categorías: ignora el contenido entre corchetes [xxx]
// para presentar juntas en el glosario las categorías que solo difieren en eso.
function categoryBase(name) {
  return name.replace(/\s*\[[^\]]*\]\s*/g, "").trim();
}

export function getCategoryGlossary(lang) {
  const map = new Map();
  getCategories(lang).forEach((c) => {
    const base = categoryBase(c.category);
    if (!map.has(base)) map.set(base, { term: base, defs: [] });
    map.get(base).defs.push(c.fortext);
  });
  return [...map.values()]
    .map((g) => ({ term: g.term, defs: [...new Set(g.defs)] }))
    .sort((a, b) => a.term.localeCompare(b.term, lang));
}

export function getNameGlossary(lang) {
  const data = getWordData(lang);
  const map = new Map();
  for (const cat of data) {
    const tags = (cat.tags || []).map(normalizeTag);
    const hasNameTag = tags.some((t) => {
      const tl = t.toLowerCase();
      return tl === "names" || tl === "nombres" || tl === "nomi";
    });
    cat.words.forEach((sub, si) => {
      sub.words.forEach((w, wi) => {
        const entries = parseSimple(w);
        entries.forEach((e) => {
          if (!(hasNameTag || isNameWord(e.token, lang))) return;
          const key = e.token;
          if (!map.has(key)) map.set(key, { term: simpleDisplay(e), token: e.token, defs: [] });
          const rec = map.get(key);
          const def = sub.help?.[wi] || sub.category;
          rec.defs.push({ category: cat.category, def });
        });
      });
    });
  }
  return [...map.values()].sort((a, b) => a.token.localeCompare(b.token, lang));
}

export function getWordGlossary(lang) {
  const data = getWordData(lang);
  const map = new Map();
  for (const cat of data) {
    cat.words.forEach((sub, si) => {
      sub.words.forEach((w, wi) => {
        const entries = parseSimple(w);
        entries.forEach((e) => {
          if (isNameWord(e.token, lang)) return; // names go in the names glossary
          const key = e.token;
          if (!map.has(key)) map.set(key, { term: simpleDisplay(e), token: e.token, defs: [] });
          const rec = map.get(key);
          const def = sub.help?.[wi] || sub.category;
          rec.defs.push({ category: cat.category, def });
        });
      });
    });
  }
  return [...map.values()].sort((a, b) => a.token.localeCompare(b.token, lang));
}

// Shuffle helper
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}