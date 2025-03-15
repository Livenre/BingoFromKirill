import { state, winConditionMet, handleCellClick, saveStateToHash, loadStateFromHash, hasError } from "./logic.js";

  export function render(table) {
  const tableElement = table ?? document.querySelector("table");
  const cells = [...tableElement.querySelectorAll("td")];

  cells.forEach((cell, idx) => {
    cell.textContent = state.texts[idx] ?? idx;

    adjustFontSize(cell);

    if (state.texts[idx] === "*" && !state.selected.includes(idx)) {
      state.selected.push(idx);
    }

    const authorSwitcher = document.querySelector(".author-switcher");
    
   
    if (state.isAuthorMode) {
      if (!document.querySelector(".share-button")) {
        const shareButton = document.createElement("button");
        shareButton.textContent = "Поділитися";
        shareButton.classList.add("share-button");
  
        shareButton.addEventListener("click", () => {
          const encodedState = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
          console.log(encodedState);
          const url = '${window.location.origin}${window.location.pathname}#${encodedState}';
        
          navigator.clipboard.writeText(url)
            .then(() => alert("Посилання скопійовано!"))
            .catch(err => console.error("Не вдалося скопіювати посилання", err));
        });
  
        authorSwitcher.appendChild(shareButton);
      }
    } else {
      const shareButton = document.querySelector(".share-button");
      if (shareButton) {
        shareButton.remove();
      }
    }
   

    cell.classList.toggle("selected", state.selected.includes(idx));

    if (state.isAuthorMode && state.currentlyEditing === idx) {
      const textarea = document.createElement("textarea");
      textarea.value = state.texts[idx] ?? "";
      textarea.addEventListener("blur", (e) => {
        state.texts[idx] = e.target.value.trim();
        state.currentlyEditing = null;
        render();
      });
      cell.textContent = "";
      cell.appendChild(textarea);
      textarea.focus();
    }

    
    cell.classList.toggle("error", hasError(idx));
    //console.log("error", hasError(idx), idx);
  });

  document.querySelector(".bingo").toggleAttribute("hidden", !winConditionMet());

  saveStateToHash();
  updateFavicon();
}


  function updateFavicon() {
  let color = "yellow";
  if (winConditionMet()) color = "green";
  else {
    const hasErrors = state.texts.some((text) =>
      (text && state.texts.filter((t) => t === text).length > 1) || (text && text.length > 50)
    );
    if (hasErrors) color = "red";
  }

  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 32, 32);

  const favicon = document.querySelector("link[rel='icon']");
  favicon.href = canvas.toDataURL();
}


export function generateTable(num) {
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  for (let i = 0; i < num; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < num; j++) {
      const td = document.createElement("td");

      td.textContent = i * num + j;
      td.addEventListener("click", () => {
        handleCellClick(i * num + j);
        render();
      });
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }

  document.querySelector('form[action="#new"]').addEventListener("submit", (e) => {
    e.preventDefault();
    state.selected.length = 0;
    render();
  });


  loadStateFromHash();
  render(table);
  return table;
}

document.querySelector(".switch input").addEventListener("change", (e) => {
  state.isAuthorMode = e.target.checked;
  if (state.isAuthorMode) state.selected = [];
  render();
});


function adjustFontSize(cell) {
  const minFontSize = 5;  
  const maxFontSize = 30; 
  let fontSize = minFontSize;
  
  cell.style.fontSize = `${fontSize}px`;

  const cellWidth = cell.offsetWidth;
  const cellHeight = cell.offsetHeight;

  //function doesTextFit() {
  //  const textRect = cell.getBoundingClientRect();
  //  return textRect.width <= cellWidth && textRect.height <= cellHeight;
  //}
  function doesTextFit() {
    return cell.scrollWidth <= cellWidth && cell.scrollHeight <= cellHeight;
  }
  
  while (fontSize < maxFontSize) {
    fontSize++;
    cell.style.fontSize = `${fontSize}px`;
    
    if (!doesTextFit()) {
      fontSize--; 
      break;
    }
  }
  
  cell.style.fontSize = `${fontSize}px`;
}

window.onload = function() {
    document.querySelectorAll("td").forEach(cell => {
      cell.offsetHeight; // Форсируем ререндер
      adjustFontSize(cell);
    });
};
