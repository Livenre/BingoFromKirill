const state = {
  texts: ["тест", "foo"],
  selected: [],
  isAuthorMode: false,
  currentlyEditing: null,
};

function winConditionMet() {
  for (let i = 0; i < 5; i++) {
    const selectedColumn = state.selected.filter((item) => item % 5 === i);
    if (selectedColumn.length === 5) {
      return true;
    }
    const selectedRow = state.selected.filter(
      (item) => Math.floor(item / 5) === i,
    );
    if (selectedRow.length === 5) {
      return true;
    }
  }

  const mainDiagonal = state.selected.filter((item) => item % 6 === 0);
  if (mainDiagonal.length === 5) {
    return true;
  }

  const secondaryDiagonal = state.selected.filter((item) => item % 4 === 0);
  if (secondaryDiagonal.length === 5) {
    return true;
  }

  return false;
}


function updateFavicon() {
  let color = "yellow";

  if (winConditionMet()) {
    color = "green";
  } else {
    const hasErrors = state.texts.some((text) =>
      (text && state.texts.filter((t) => t === text).length > 1) || (text && text.length > 50) );
    if (hasErrors) {
      color = "red"; 
    }
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


export function render(table) {
  //console.log(structuredClone(state));
  const tableElement = table ?? document.querySelector("table");
  const cells = [...tableElement.querySelectorAll("td")];

  
  const textCount = {};
  state.texts.forEach((text) => {
    if (text) {
      textCount[text] = (textCount[text] || 0) + 1;
    }
  });

  cells.forEach((cell, idx) => {
    cell.textContent = state.texts[idx] ?? idx;


    if (state.texts[idx] === "*") {
      if (!state.selected.includes(idx)) {
        state.selected.push(idx);
      }
    }
    
    if (state.selected.includes(idx)) {
      cell.classList.add("selected");
    } else {
      cell.classList.remove("selected");
    }

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

    
    if (
      state.isAuthorMode &&
      ((state.texts[idx] && textCount[state.texts[idx]] > 1) || (state.texts[idx] && state.texts[idx].length > 50))
    ) {
      cell.classList.add("error");
    } else {
      cell.classList.remove("error");
    }

  });

  const bingo = document.querySelector(".bingo");
  if (winConditionMet()) {
    //alert("win");
    bingo.removeAttribute("hidden");
    // ...
  } else {
    bingo.setAttribute("hidden", "hidden");
    // ...
  }


 
  const authorSwitcher = document.querySelector(".author-switcher");

  if (state.isAuthorMode) {
    if (!document.querySelector(".share-button")) {
      const shareButton = document.createElement("button");
      shareButton.textContent = "Поділитися";
      shareButton.classList.add("share-button");

      shareButton.addEventListener("click", () => {
        const encodedState = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
        const url = `${window.location.origin}${window.location.pathname}#${encodedState}`;
      
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
 


  const newHash = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
if (window.location.hash.substring(1) !== newHash) {
  window.location.hash = newHash;
}
  
updateFavicon();
}


document.querySelector(".switch input").addEventListener("change", (e) => {
  state.isAuthorMode = e.target.checked;

  if (state.isAuthorMode) {
    state.selected = [];
  }

  render();

  
  const encodedState = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
  window.location.hash = encodedState;
});

function handleCellClick(idx) {
  if (state.isAuthorMode) {
    state.currentlyEditing = idx;
    
  } else {
    if (state.texts[idx] === "*") {
      return;
    }
    
    if (!state.selected.includes(idx)) {
      state.selected.push(idx);
    } else {
      state.selected = state.selected.filter((item) => item !== idx);
    }
  }

  render();
}

export function generateTable(num){
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);


  document.querySelector(".switch input").checked = state.isAuthorMode;

  for (let i = 0; i < num; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < num; j++) {
      const td = document.createElement("td");
      td.textContent = i * num + j;
      td.addEventListener("click", () => handleCellClick(i * num + j));
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  } 

  document
    .querySelector('form[action="#new"]')
    .addEventListener("submit", (e) => {
      e.preventDefault();
      state.selected.length = 0;
      render();
    });

    const hash = window.location.hash.substring(1);
if (hash) {
  try {
    const decodedState = JSON.parse(decodeURIComponent(escape(atob(hash))));
    Object.assign(state, decodedState);
  } catch (err) {
    console.error("Не вдалося завантажити збережене бінго", err);
  }
}

document.querySelector(".switch input").checked = state.isAuthorMode;

  render(table);
  return table;
}


window.addEventListener("beforeunload", (event) => {
  if (state.isAuthorMode && state.currentlyEditing !== null) {
    event.preventDefault();
    event.returnValue = "";
  }
});

/*
function checkWin(table) {
  const rows = table.querySelectorAll("tr");

  for (let i = 0; i < rows.length; i++) {
    let win = true;
    const cells = rows[i].querySelectorAll("td");
    for (let j = 0; j < cells.length; j++) {
      if (!cells[j].classList.contains("selected")) {
        win = false;
        break;
      }
    }
    if (win) {
      alert("BINGO");
      const bingoelement = document.querySelector(".bingo");
      bingoelement.removeAttribute("hidden");
      return;
    }
  }

  const num = rows.length;

  for (let i = 0; i < num; i++) {
    let win = true;

    for (let j = 0; j < num; j++) {
      const cell = rows[j].querySelectorAll("td")[i];
      if (!cell.classList.contains("selected")) {
        win = false;
        break;
      }
    }
    if (win) {
      alert("BINGO");
      const bingoelement = document.querySelector(".bingo");
      bingoelement.removeAttribute("hidden");
      return;
    }
  }

}

function resetBingo() {
  document.querySelector(".bingo").setAttribute("hidden", "true");
  document.querySelectorAll("td").forEach(td => td.classList.remove("selected"));

  const tableContainer = document.querySelector(".table-container");
  tableContainer.innerHTML = "";
  tableContainer.appendChild(generateTable(5));
}

document.querySelector(".bingo form").addEventListener("submit", (e) => {
  e.preventDefault();
  resetBingo();
});



function authorModeToggle() {
  if (document.querySelector(".switch input").checked) {
    document.querySelectorAll("td").forEach(td => td.classList.remove("selected"));
    document.querySelector(".bingo").setAttribute("hidden", "true");
  }
}

document.querySelector(".switch input").addEventListener("change", authorModeToggle);




export function generateTable(num) {
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  for (let i = 0; i < num; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < num; j++) {
      const td = document.createElement("td");
      td.textContent = i * num + j;
      tr.appendChild(td);

      td.addEventListener("click", () => {

        if (document.querySelector(".switch input").checked) {

          const textarea = document.createElement("textarea");
          textarea.value = td.textContent;
          td.textContent = "";
          td.appendChild(textarea);
          textarea.focus();

          textarea.addEventListener("blur", () => {
            td.textContent = textarea.value;
          });
        
        return;
      }
        td.classList.toggle("selected");

        checkWin(table);
      });
    }
    tbody.appendChild(tr);
  }

  return table;
}
*/