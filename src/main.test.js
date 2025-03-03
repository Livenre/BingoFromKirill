import { test, expect, beforeEach, afterEach} from "vitest";

test("Чи є текст Творець Bingo", () => {
expect(document.body).toHaveTextContent("Творець BINGO")
});

test("Вибрати перші 5 комірок, та перевірити чи з'явилася кнопка Почати знову!", () => {


    expect(document.body).toHaveTextContent("Почати знову!")
});