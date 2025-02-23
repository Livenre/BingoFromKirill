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

/*
export function buttonRestart (id){
  
  const bingoelement = document.querySelector(".bingo");
  bingoelement.setAttribute("hidden", true);

}

return table;*/

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
