export const state = {
  texts: [],
  selected: [],
  isAuthorMode: false,
  currentlyEditing: null,
};

export function winConditionMet() {
  for (let i = 0; i < 5; i++) {
    if (state.selected.filter((item) => item % 5 === i).length === 5) return true;
    if (state.selected.filter((item) => Math.floor(item / 5) === i).length === 5) return true;
  }
    if (state.selected.filter((item) => item % 6 === 0).length === 5) return true;
    if (state.selected.filter((item) => item % 4 === 0).length === 5) return true;
  return false;
}


export function handleCellClick(idx) {
  if (state.isAuthorMode) {
    state.currentlyEditing = idx;
  } else {
    if (state.texts[idx] === "*") return;
    state.selected = state.selected.includes(idx)
      ? state.selected.filter((item) => item !== idx)
      : [...state.selected, idx];
  }
}

export function saveStateToHash() {
  const encodedState = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
  if (window.location.hash.substring(1) !== encodedState) {
    window.location.hash = encodedState;
  }
}

export function loadStateFromHash() {
  const hash = window.location.hash.substring(1);
  if (hash) {
    try {
      Object.assign(state, JSON.parse(decodeURIComponent(escape(atob(hash)))));
      state.isAuthorMode = false;
    } catch (err) {
      console.error("Ошибка загрузки состояния", err);
    }
  }
}

export function hasError(idx){
  return Boolean(state.isAuthorMode &&
  ((state.texts[idx] && state.texts.filter((t) => t === state.texts[idx]).length > 1) ||
  (state.texts[idx] && state.texts[idx].length > 50)));
}

