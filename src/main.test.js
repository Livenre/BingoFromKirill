import { describe, test, expect, beforeEach, vi } from 'vitest';
import { getByRole, getByText } from "@testing-library/dom";
import { state, winConditionMet, handleCellClick, saveStateToHash, loadStateFromHash, hasError } from './logic';
import './main';


test('Перевірка на текст "Творець BINGO"', ()=> {
    expect(document.body).toHaveTextContent("Творець BINGO")
})

test('Перевірка кнопки коли зібрав бінго', ()=>{
  document.querySelectorAll("td")[0].click();
  document.querySelectorAll("td")[1].click();
  document.querySelectorAll("td")[2].click();
  document.querySelectorAll("td")[3].click();
  document.querySelectorAll("td")[4].click();
    expect(document.querySelectorAll('.selected').length).toBe(5)
})

test('Перевірка на кнопку "Почати знову!"', ()=>{
  document.querySelectorAll("td")[0].click();
  document.querySelectorAll("td")[1].click();
  document.querySelectorAll("td")[2].click();
  document.querySelectorAll("td")[3].click();
   document.querySelectorAll("td")[4].click();
    
  expect.toHaveTextContent("Почати знову!");
  
  })
  
test('Выпал бинго нажаль кнопка "начать заново"', ()=>{
  document.querySelectorAll("td")[0].click();
  document.querySelectorAll("td")[1].click();
  document.querySelectorAll("td")[2].click();
  document.querySelectorAll("td")[3].click();
  document.querySelectorAll("td")[4].click();
    
  getByText(document.body, "Почати знову!").click();
  expect(document.querySelectorAll('.selected').length).toBe(0)
  })
  
test('Проверка кнопки "Режим автора"', ()=>{

  document.querySelector(".author-switcher input[type='checkbox']").click();
  expect.toHaveTextContent("Поділитися");
})




test('переключать режим автора и редактировать текст', () => {
    state.isAuthorMode = true;
    const cell = table.querySelector('td');
    cell.click();

    const textarea = table.querySelector('textarea');
    expect(textarea).not.toBeNull();
    textarea.value = 'Test text';
    textarea.dispatchEvent(new Event('blur'));

    expect(state.texts[0]).toBe('Test text');
  });

  test('должен сохранять и загружать состояние игры из URL-хэша', () => {
    
    const cell = table.querySelector('td');
    cell.click();
    
    saveStateToHash();
    const hash = window.location.hash;

    loadStateFromHash();
    expect(state.selected.length).toBeGreaterThan(0);
  });
