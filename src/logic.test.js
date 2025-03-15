import { test, expect, beforeEach, afterEach } from "vitest";

import {state, hasError, winConditionMet, handleCellClick, saveStateToHash, loadStateFromHash} from "./logic";


test("Не підсвічує як помилки пусті клітинки", () => {
  state.isAuthorMode = true;

  state.texts[0] = undefined;
  state.texts[1] = undefined;

  expect(hasError(0)).toBe(false);
});

test("выигрыш по горизонтали", () => {
  state.selected = [0, 1, 2, 3, 4];
  expect(winConditionMet()).toBe(true);
});

test("выигрыш по вертикали", () => {
  state.selected = [0, 5, 10, 15, 20];
  expect(winConditionMet()).toBe(true);
});

test("выигрыш по диагонали", () => {
  state.selected = [0, 6, 12, 18, 24];
  expect(winConditionMet()).toBe(true);
});

test("отсутствие выигрыша", () => {
  state.selected = [0, 1, 5, 6, 7];
  expect(winConditionMet()).toBe(false);
});

test("выбор ячейки", () => {
  handleCellClick(0);
  expect(state.selected).toContain(0);
});
test('снятие выбора ячейки', () => {
  state.selected = [0];
  handleCellClick(0);
  expect(state.selected).not.toContain(0);
});

test('авторский режим, редактирование ячейки', () => {
  state.isAuthorMode = true;
  handleCellClick(0);
  expect(state.currentlyEditing).toBe(0);
});

test("сохранение состояния в хэш", () => {
  state.selected = [0, 1, 2];
  saveStateToHash();
  expect(window.location.hash).not.toBe("");
});

test("загрузка состояния из хэша", () => {
  state.selected = [0, 1, 2];
  const encodedState = btoa(
    unescape(encodeURIComponent(JSON.stringify(state))),
  );
  window.location.hash = `#${encodedState}`;

  loadStateFromHash();
  expect(state.selected).toEqual([0, 1, 2]);
});

test('нет ошибки при нормальном тексте', () => {
  state.texts[0] = "Normal text";
  expect(hasError(0)).toBe(false);
});

test('ошибка при дублировании текста', () => {
  state.isAuthorMode = true;
  state.texts = ["Duplicate", "Duplicate"];
  expect(hasError(0)).toBe(true);
  expect(hasError(1)).toBe(true);
});

test('ошибка при длинном тексте', () => {
  state.isAuthorMode = true;
  state.texts[0] = "O".repeat(51); 
  expect(hasError(0)).toBe(true);
});