export const PASSPORT_KEY = 'history-soul-passport-v1';
const KEYS = ['O', 'C', 'E', 'A', 'S'];

// Injectable storage keeps recovery and deduplication testable without a browser.
export function createPassportStore(storage, ids) {
  const valid = new Set(ids);
  const empty = () => ({ version: 1, discovered: [], favorites: [], results: [], games: 0 });
  const cleanIds = list => [...new Set(Array.isArray(list) ? list.filter(id => valid.has(id)) : [])];
  function read() {
    try {
      const raw = JSON.parse(storage.getItem(PASSPORT_KEY));
      if (!raw || raw.version !== 1) return empty();
      return {
        version: 1,
        discovered: cleanIds(raw.discovered),
        favorites: cleanIds(raw.favorites),
        results: (Array.isArray(raw.results) ? raw.results : []).filter(r => valid.has(r.id) && typeof r.date === 'string' && Number.isFinite(Date.parse(r.date))).slice(0, 12).map(r => ({ id: r.id, date: r.date, scores: Object.fromEntries(KEYS.map(k => [k, Math.max(0, Math.min(100, Number(r.scores?.[k]) || 0))])) })),
        games: Number.isSafeInteger(raw.games) ? Math.max(0, Math.min(1000000, raw.games)) : 0,
      };
    } catch { return empty(); }
  }
  let state = read(), persistent = true;
  const snapshot = () => structuredClone({ ...state, persistent });
  function save() {
    try { storage.setItem(PASSPORT_KEY, JSON.stringify(state)); persistent = true; }
    catch { persistent = false; }
    return snapshot();
  }
  return {
    get: snapshot,
    discover(list) {
      const previous = new Set(state.discovered);
      state.discovered = cleanIds([...state.discovered, ...list]);
      const added = state.discovered.filter(id => !previous.has(id));
      save(); return added;
    },
    favorite(id) {
      if (!valid.has(id)) return snapshot();
      state.favorites = state.favorites.includes(id) ? state.favorites.filter(x => x !== id) : [...state.favorites, id];
      return save();
    },
    recordQuiz(id, scores, record = true) {
      if (!valid.has(id)) return snapshot();
      state.discovered = cleanIds([...state.discovered, id]);
      if (record) state.results = [{ id, date: new Date().toISOString(), scores: Object.fromEntries(KEYS.map(k => [k, Math.max(0, Math.min(100, Number(scores[k]) || 0))])) }, ...state.results].slice(0, 12);
      return save();
    },
    recordGame(list) {
      state.games++;
      const previous = new Set(state.discovered);
      state.discovered = cleanIds([...state.discovered, ...list]);
      const added = state.discovered.filter(id => !previous.has(id));
      save(); return added;
    },
    clear() { state = empty(); return save(); },
  };
}
