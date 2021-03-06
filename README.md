# Vk-Intern-Task
#### Решение тестового задания на стажировку <br> в команду фронтенд-инфраструктуры компании "Вконтакте"
##### Демо1 - https://sanicdogg.github.io/VK-Intern-Task/Demo/index.html
##### Демо2 - https://sanicdogg.github.io/VK-Intern-Task/Demo/app.html
Создать модуль на JavaScript, генерирующий
HTML-форму из JSON-кода. <br>
Полный текст задания:<br>
https://vk.com/@vkteam-testovoe-zadanie-frontend-infrastruktura

Реализованный модуль - файл `module.js`, 
который содержит  все необходимые функции для работы

За основу дизайна формы взята библиотека [VK UI](https://vkcom.github.io/VKUI)
## Документация 
***
### Быстрый старт
1. Для того, чтобы начать использовать модуль, <br> 
   вам нужно скачать файл `module.js` и разместить его <br>
   в папку с вашим проектом.

2. Далее вам нужно импортировать из файла две
   функции: <br> `getFormFromJSON` и `initHandlers`

3. Выполнить функцию `getFormFromJSON(json)` и <br>
   поместить её результат в контейнер.<br>
   Функция возвращает HTML-разметку формы <br> 
   и CSS-оформление формы. <br>
   Параметр функции - строковая переменная `json` <br> 
   Переменная должна хранить в себе json-код формы.
   
4. Последним шагом нужно вызвать функцию <br>
   `initHandlers`. Данная функция добавит обработчики <br>
   событий на элементы формы. Параметры отсутствуют.

Пример:
```javascript
// Шаг 2:
import {getFormFromJSON, initHandlers} from "./module.js";
// Шаг 3:
document.body.innerHTML = getFormFromJSON(formJSON);
// Шаг 4:
initHandlers();
```

***

### Структура JSON-объекта

В примере выше мы использовали переменную `formJSON`<br>
как аргумент функции `getFormFromJSON`

Рассмотрим структуру такого объекта:

Свойство | Обязательное | Тип
---------|--------------|-----
`caption`  | <center> Да  | строка
`theme`    | <center> Нет | строка
`submit`   | <center> Да  | объект
`elements` | <center> Да  | массив <br> объектов

JSON объект должен включать в себя все обязательные поля. <br>
Порядок установки полей не имеет значения.
***
`caption` - заголовок формы <br>
Заголовок отображается в виде текста в шапке формы.

Пример:
```javascript
let jsonObj = {
    // ... some code
    caption: "Регистрация",
    // ... some code
}
```
***
`theme` - тема формы <br>
Установка ночной или дневной темы. <br>
Возможные значения: "day", "night". <br>
Значение по умолчанию - "day".

Пример:
```javascript
let jsonObj = {
    // ... some code
    theme: "day",
    // ... some code
}
```

***
`submit` - кнопка отправки <br>
Объект, которым можно задать текст кнопки "отправить", <br>
путь перехода после отправки формы и метод отправки 
формы.

Объект может иметь 3 свойства:

Свойство | Обязательное | Тип
---------|--------------|-----
`text`     | <center> Да  | строка
`href`     | <center> Нет | строка
`method`   | <center> Нет | строка

`text` - текст, который отобразится на кнопке "Отправить" <br>
`href` - обработчик формы, если требуется <br> (атрибут `action` тега `<form>`) <br>
`method` - метод формы. Возможные значения: "get", "post" <br>
Добавляет атрибут `method` тегу `<form>`

Пример:
```javascript
let jsonObj = {
    // ... some code
    submit: {
        text: "Войти",
        method: "post",
        href: "login.php"
    },
    // ... some code
}
```

***
#### Элементы
`elements` - массив элементов формы <br>

Каждый элемент - это объект с такими свойствами:

Свойство | Обязательное | Тип
---------|--------------|-----
`type`  | <center> Да  | строка
`id`    | <center> Да  | строка
`label` | <center> Нет | строка
`tip`   | <center> Нет | строка

Таблица сверху содержит общие свойства <br> у 
всех элементов, кроме `header` <br>

Всего разработано 11 элементов формы: <br>
`text`, `password`, `date`, `tel`, `email`, <br>
`group`, `header`, `select`, `textarea`, <br>
`checkbox`, `radio` <br>

Для того, чтобы определить элемент, нужно написать <br>
его имя из списка выше в свойство `type`. <br>

Значение свойства `id` попадет в HTML элемент формы <br> 
в виде значения атрибута `id` элемента и атрибута <br>
`name`. Будьте внимательны. <br> Убедитесь, что каждый элемент
имеет уникальный `id`
 
`label` - текст надписи над элементом. <br>
`tip` - текст подсказки под элементом.

Пример создания текстового элемента:
```javascript
let jsonObj = {
    // ... some code
    elements: [{/* .some code.*/}, {
        label: "Логин",
        type: "text",
        id: "login",
        tip: "Введите логин",
    }],
    // ... some code
}
```

Для типов `text`, `password`, `tel`, `email` <br>
можно указать свойство `pattern` с регулярным <br> 
выражением. По данному выражению будет проходить <br>
валидация введенных данных.

Пример создания элемента с валидацией:
```javascript
let jsonObj = {
    // ... some code
    elements: [{/* .some code.*/}, {
        label: "Моб. телефон",
        type: "tel",
        id: "phoneNumber",
        tip: "Формат +7xxxxxxxxxx",
        pattern: "\\+7[0-9]{3}[0-9]{3}[0-9]{4}"
    }],
    // ... some code
}
```

Для типов `text`, `password`, `tel`, `email` <br>
Для типов `textarea` можно указать свойство `placeholder` <br>
Текст этого свойства попадет в атрибут `placeholder` <br>
HTML элемента.

Пример создания элемента со свойством `placeholder`:
```javascript
let jsonObj = {
    // ... some code
    elements: [{/* .some code.*/}, {
        type: "textarea",
        id: "about",
        label: "Расскажите о себе",
        placeholder: "Пару слов..."
    }],
    // ... some code
}
```
***
#### Тип `date`
Данный тип позволяет создать HTML элмент для установки <br>
даты. Есть возможность добавить свойства `max` и `min` <br>
`max` и `min` - необязательные свойства. <br>
С их помощью можно утсановить диапазон задаваемой даты. <br>
Значения свойств указываются в формате YYY-MM-DD.

Пример создания элемента с типом `date`:
```javascript
let jsonObj = {
    // ... some code
    elements: [{/* .some code.*/}, {
        type: "date",
        label: "Дата рождения",
        max: "2006-07-01",
        min: "1901-01-01",
        id: "dateOfBirth",
    }],
    // ... some code
}
```

***
#### Тип `header`
`header` - тип, который отображает заголовок на форме. <br>
Он имеет только одно свойство - `value` <br>
Это свойство содержит текст заголовка. <br>
Свойство `id` необязательно.

Пример создания заголовка формы:
```javascript
let jsonObj = {
    // ... some code
    elements: [{/* .some code.*/}, {
        type: "header",
        value: "Контактная информация"
    }],
    // ... some code
}
```

***
#### Тип `group`
Группа элементов делит ширину каждого участника группы <br>
пополам.

`group` - тип, который создает группу элементов <br>
Он имеет только одно свойство - `groupElements` <br>
`groupElements` - это массив объектов (элементов)

Пример создания группы элементов:
```javascript
let jsonObj = {
    // ... some code
    elements: [{/* .some code.*/}, {
        type: "group",
        groupElements: [
            {
                label: "Фамилия",
                type: "text",
                id: "lastName",
            }, {
                label: "Имя",
                type: "text",
                id: "firstName",
            }
        ]
    }],
    // ... some code
}
```

***
#### Тип `select`
Классический элемент "выпадающий список". <br>
Помимо стандартных свойств `id`, `label`, `tip` <br>
имеет свойсто `options` - массив строк возможных значений <br>
элементов списка. 

В HTML разметке значения атрибута `value` тега `<option>`<br>
заполняются числами по порядку от 0 до последнего элемента массива <br>

Пример создания выпадающего списка:
```javascript
let jsonObj = {
    // ... some code
    elements: [{/* .some code.*/}, {
        label: "Семейное положение",
        id: "maritalStatus",
        type: "select",
        options: ["женат", "холост", "вдовец"]
    }],
    // ... some code
}
```

***
#### Тип `radio`
Создание радиокнопки. <br>
Помимо стандартных свойств `id`, `label`, `tip` <br>
имеет свойсто `values` - массив строк возможных значений <br>
группы радиокнопок.

В HTML разметке значения атрибута `value` тега <br> `<input type="radio">`<br>
заполняются строками `'id'-0` где `'id'` - id элемента; <br>
`0` - порядковый номер радиокнопки <br> (нумерация начинается с нуля)

Пример создания радиокнопки:
```javascript
let jsonObj = {
    // ... some code
    elements: [{/* .some code.*/}, {
        type: "radio",
        label: "Пол",
        id: "sex",
        values: ["Мужской", "Женский"],
    }],
    // ... some code
}
```

***
#### Тип `checkbox`
Создание флажков. <br>
Помимо стандартных свойств `id`, `label`, `tip` <br>
имеет свойсто `values` - массив строк возможных значений <br>
группы чекбоксов.

В HTML разметке значения атрибута `value` тега <br> `<input type="checkbox">`<br>
заполняются строками `'id'-0` где `'id'` - id элемента; <br>
`0` - порядковый номер чекбокса <br> (нумерация начинается с нуля)

Пример создания флажков:
```javascript
let jsonObj = {
    // ... some code
    elements: [{/* .some code.*/}, {
        type: "checkbox",
        id: "fruits",
        label: "Какие фрукты Вы ели сегодня?",
        values: ["Яблоки", "Бананы", "Манго", "Мандарины"],
    }],
    // ... some code
}
```

# Пример JSON объекта формы регистрации полета на Марс

```json
{
  "caption": "Заявка на экскурсионный <br> полет на Марс",
  "theme": "night",
  "submit": {
    "text": "Полететь на Марс"
  },
  "elements": [
    {
      "label": "Фамилия",
      "type": "text",
      "id": "lastName_cyrillic",
      "tip": "Фамилию вводить кириллицей",
      "placeholder": "Введите фамилию"
    },
    {
      "label": "Имя",
      "type": "text",
      "id": "firstName_cyrillic",
      "placeholder": "Введите имя"
    },
    {
      "label": "Отчество",
      "type": "text",
      "id": "patronymic_cyrillic",
      "placeholder": "Введите отчество"
    },
    {
      "type": "group",
      "groupElements": [
        {
          "label": "Фамилия латиницей",
          "type": "text",
          "id": "lastName"
        },
        {
          "label": "Имя латиницей<br><br>",
          "type": "text",
          "id": "firstName"
        }
      ]
    },
    {
      "type": "date",
      "label": "Дата рождения",
      "max": "2006-07-01",
      "min": "1901-01-01",
      "id": "dateOfBirth"
    },
    {
      "type": "radio",
      "label": "Пол",
      "id": "sex",
      "values": [
        "Мужской",
        "Женский"
      ]
    },
    {
      "label": "Семейное положение",
      "id": "maritalStatus",
      "type": "select",
      "options": [
        "женат/замужем",
        "в \"гражданском браке\"",
        "разведен",
        "холост",
        "вдовец"
      ]
    },
    {
      "label": "Образование",
      "id": "education",
      "type": "select",
      "options": [
        "высшее",
        "среднее специальное",
        "среднее",
        "студент"
      ],
      "tip": "Эта информация действительно важна"
    },
    {
      "type": "header",
      "value": "Контактная информация"
    },
    {
      "label": "Моб. телефон",
      "type": "tel",
      "id": "phoneNumber",
      "tip": "Формат +7xxxxxxxxxx",
      "pattern": "\\+7[0-9]{3}[0-9]{3}[0-9]{4}"
    },
    {
      "label": "Электронная почта",
      "type": "email",
      "id": "email"
    },
    {
      "type": "checkbox",
      "id": "soberMind",
      "values": [
        "Ставя эту галочку, подтверждаю, что поставил её в трезвом уме и твёрдой памяти"
      ],
      "tip": "Обязательное поле"
    },
    {
      "type": "textarea",
      "id": "about",
      "label": "Расскажите о себе",
      "placeholder": "Пару слов..."
    }
  ]
}
```
