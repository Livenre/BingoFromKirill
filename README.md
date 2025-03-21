Створення BINGO

# Серія вимог 2 (24 лютого 2025 року)

1. [x] Якщо я вставляю в зону бінго текст більший довжиною за 50 символів, то цю <textarea> треба підсвітити червоною як помилкову шляхом додавання до `<textarea>` класу `error`
    * Коли ми виходимо з редагування то клас `error` набуває вся комірка
2. [ ] Реалізувати **автоматичне** масштабування тексту так, щоб він не змінював розмір клітинки бінго
    * Врахувати що зміна розміру тексту може відбуватися не тільки за події редагування, але й ще при зміні розміру вікна браузера
3. [x] Коли я знаходжуся в режимі автора, я маю додаткову кнопку "Поділитися" яка дозволяє скопіювати посилання на сторінку в буфер обміну
4. [x] Якщо відкрити сторінку за посиланням де завгодно (на іншому комп'ютері, в анонімній вкладці, у тому самому браузері) - відкривається бінго, яке було поширене на попередньому кроці
5. [x] Різні посилання зберігають різний стан бінго (дивись вимогу 10 у 1 серії)
    * Тобто я можу мати дві відкриті вкладки з заповненням двох різних бінго одночасно і оновлення обох працюватиме коректно
6. [x] Змінити зберігання стану поточного бінго що редагується з localStorage (вимога 10 у 1 серії) на хеш URL (не зберігати нічого в localStorage)
    * URL має оновлюватися коли ми виходимо з редагування клітинки **якщо** в нас немає помилок (вимога 8 у 1 серії, вимога 1 у цій серії)
7. [x] Реалізувати логіку: якщо вмістом клітинки є текст "*" - то вона завжди обрана (її не можна вимкнути)
8. [x] Реалізувати "фавіконку": коли бінго в процесі - жовтий квадрат, коли бінго завершено - зелений квадрат, коли бінго має помилки - червоний квадрат

Матеріали до серії вимог:
  * [offsetWidth](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth) та аналогічно `offsetHeight`
      * додаткове питання: чим відрізняється `offsetWidth` від `clientWidth` від `scrollWidth`?
  * [resize](https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event)
  * [Location.hash](https://developer.mozilla.org/en-US/docs/Web/API/Location/hash)
  * [Favicon](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel#icon)

Створення BINGO

# Серія вимог 1 (17 лютого 2025 року)

1. [x] Якщо перемикач "режим автора" не активовано, то клік по комірці приводить до її вибору (клас `selected`)
2. [x] Виділення будь-яких 5 елементів по горизонталі, вертикалі **або диагоналі** повинно приводити до відображення повідомлення "BINGO!" внизу і кнопки "почати знову" (зверніть увагу, кнопка і сама панель вже є в HTML)
3. [x] Натискання кнопки "почати знову" має приховувати панель з відображенням "BINGO!" і очищати таблицю
4. [x] Активація перемикача "режим автора" має прибирати виділення елементів та виграша
5. [x] В режимі автора клік по комірці не має призводити до її виділення
6. [x] В режимі автора клік по комірці має приводити до її перетворення в `<textarea>` з текстом, що на даний момент присутній в комірці
7. [x] Клік поза `<textarea>` яку ми редагуємо, має перетворити її назад в текст, що на даний момент присутній в `<textarea>`
8. [x] Якщо на сторінці в режимі автора знаходяться дві комірки з однаковим текстом, то вони мають бути підсвічені червоним (клас `error` в CSS)
9. [x] При спробі оновлення сторінки, якщо ми знаходимося в режимі автора і редагуємо комірку ми маємо вивести попередження про незбережені дані
10. [x] При оновленні сторінки всі внесені вами зміни мають бути збережені (шляхом збереження їх в localStorage)

Матеріали до серії вимог:
  * [createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
  * [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
  * [submit](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit)
  * [beforeunload](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event)
  * [confirm](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)
  * [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
  * [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
  * [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
