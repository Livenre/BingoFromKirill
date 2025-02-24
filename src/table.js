const state = {
  texts: ["тест", "foo"],
  selected: [2, 3, 5, 7],
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

export function render(table) {
  //console.log(structuredClone(state));
  const tableElement = table ?? document.querySelector("table");
  const cells = [...tableElement.querySelectorAll("td")];
  state.texts.forEach((text, index) => {
    cells[index].textContent = text ?? index;
  });

  cells.forEach((cell, idx) => {
    if (state.selected.includes(idx)) {
      cell.classList.add("selected");
    } else {
      cell.classList.remove("selected");
    }

    if (state.isAuthorMode && state.currentlyEditing === idx) {
      alert("Тут має бути textarea");
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
}

function handleCellClick(idx) {
  if (state.isAuthorMode) {
    state.currentlyEditing = idx;
  } else {
    if (!state.selected.includes(idx)) {
      state.selected.push(idx);
    } else {
      state.selected = state.selected.filter((item) => item !== idx)
    }
  }

  render();
}

export function generateTable(num){
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);
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

  
  render(table);
  return table;
}

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