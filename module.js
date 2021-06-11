function getInputTextOrPassword(input) {
    let {idCheck, labelHtml, tipHtml} = getLabelAndTip(input);
    if (idCheck) return idCheck;

    let pattern = input.pattern;
    if (!pattern) pattern = '';
    else pattern = 'pattern="' + input.pattern + '"';

    let {type, id, placeholder, max, min} = input;
    if (!placeholder) placeholder = '';
    else placeholder = 'placeholder="' + placeholder + '"';
    let inputHtml = `<input class="input-element" type="${type}" id="${id}" name="${id}" ${placeholder} ${pattern}>`;

    if (max || min) {
        inputHtml = getDateInput(input);
    }

    let alignSelf = "flex-start";
    if (labelHtml && !tipHtml)
        alignSelf = 'flex-start';
    if (!labelHtml && tipHtml)
        alignSelf = 'flex-end';

    let additionalAttrs = `style="align-self: ${alignSelf}"`;

    return getFormElement(labelHtml, tipHtml, inputHtml, additionalAttrs);
}

function getDateInput(input) {
    let {id, max, min} = input;
    let temp = max ? `max="${max}"` : '';
    if (min) temp += `min="${min}"`;
    return `<input class="input-element" type="date" name="${id}" id="${id}" ${temp}>`;
}

function getInputsGroup(input) {
    let {groupElements} = input;
    let groupContainer = `<div class="group-wrapper">`;
    groupElements.forEach(item => groupContainer += switchItemType(item));
    groupContainer += '</div>';
    return groupContainer;
}

function getLabelAndTip(input) {
    let idCheck = checkId(input);
    let labelHtml = getLabelHtml(input);
    let tipHtml = getTipHtml(input);

    return {
        idCheck: idCheck,
        labelHtml: labelHtml,
        tipHtml: tipHtml
    }
}

function getTextArea(input) {
    let {idCheck, labelHtml, tipHtml} = getLabelAndTip(input);
    if (idCheck) return idCheck;

    let {id, placeholder} = input;
    if (!placeholder) placeholder = '';
    let textAreaHtml =
        `<textarea id="${id}" name="${id}" placeholder="${placeholder}" class="input-element" style="height: 84px; resize: none"></textarea>`;

    return getFormElement(labelHtml, tipHtml, textAreaHtml)
}

function getSelect(input) {
    let {idCheck, labelHtml, tipHtml} = getLabelAndTip(input);
    if (idCheck) return idCheck;

    let {options, id} = input;
    if (!options || options.length === 0) return getError("Нет значений values для select");

    let selectHtml = `<select class="input-element" name="${id}" id="${id}">`;
    options.forEach((item, i) => selectHtml += `<option value="${i}">${item}</option>`);
    selectHtml += '</select>';

    return getFormElement(labelHtml, tipHtml, selectHtml);
}

function getRadioOrCheckbox(input) {
    let {idCheck, labelHtml, tipHtml} = getLabelAndTip(input);
    if (idCheck) return idCheck;

    let {values, id} = input;
    if (!values || values.length === 0) return getError("Нет значений values для checkbox или radio");
    let radioHtml = '';

    let className = input.type === "radio" ? "radiobutton" : "checkbox";

    values.forEach((item, i) => radioHtml +=
        `<label class="radio-checkbox ${className} wave-animation-enabled" for="${id}-${i}" role="button">
            <input class="radio-checkbox-input" type="${input.type}" name="${id}" id="${id}-${i}" value="${id}-${i}">
            <div class="radio-checkbox-text">${item}</div>
         </label>`);

    return getRadioFormElement(labelHtml,radioHtml, tipHtml);
}

function getRadioFormElement(labelHtml, radioButtonHtml, tipHtml) {
    return `<div class="form-element">
                ${labelHtml}
                <div class="radio-checkbox-wrapper">
                    ${radioButtonHtml}
                </div>
                ${tipHtml}
            </div>`;
}

// getFormElement - функция, возвращающая HTML шаблон.
// Работает для всех строковых input, select, textarea.
// Для radio и checkbox другая функция
function getFormElement(labelHtml, tipHtml, elemHtml, additionalAttrs) {
    if (!additionalAttrs) additionalAttrs = '';
    return `<div class="form-element">
                ${labelHtml}
                <div class="input-wrapper" ${additionalAttrs}>
                    ${elemHtml}
                    <div class="input-border"></div>
                </div>
                ${tipHtml}
            </div>`;
}

function checkId(elem) {
    let {id} = elem;
    if (!id) return getError("Не задан id. Проверьте JSON");
}

function getLabelHtml(elem) {
    let {id, label} = elem;
    return label ? `<div class="label-wrapper">
                        <label for="${id}">${label}</label>
                    </div>` : '';
}

function getTipHtml(elem) {
    let {tip} = elem;
    if (!tip) tip = "";
    return `<div class="input-tip" data-default="${tip}">${tip}</div>`;
}

function getRadioCss() {
    return `<style>
                .radiobutton input:checked + .radio-checkbox-text:before,
                .radiobutton input:not(:checked) + .radio-checkbox-text:before {
                    left: 0;
                    top: -1px;
                    width: 18px;
                    height: 18px;
                    border: 2px solid var(--radio-unchecked);
                    border-radius: 50%;
                }
                
                .radiobutton input:checked + .radio-checkbox-text:after,
                .radiobutton input:not(:checked) + .radio-checkbox-text:after {
                    content: '';
                    position: absolute;
                    top: 3px;
                    left: 4px;
                    width: 14px;
                    height: 14px;
                    background: var(--input-border-focused);
                    border-radius: 50%;
                    transition: all .5s ease;
                }

                .radiobutton input:not(:checked) + .radio-checkbox-text:before {
                    border-color: var(--radio-unchecked);
                }
            
                .radiobutton input:checked + .radio-checkbox-text:before {
                    border-color: var(--input-border-focused);
                }
                
                .radiobutton input:not(:checked) + .radio-checkbox-text:after {
                    opacity: 0;
                    transform: scale(0);
                }
                .radiobutton input:checked + .radio-checkbox-text:after {
                    opacity: 1;
                    transform: scale(1);
                }
            </style>`;
}

function getCheckboxCss() {
    return `<style>
                .checkbox input + .radio-checkbox-text:before {
                    left: 0;
                    top: -1px;
                    width: 22px;
                    height: 22px;
                }

                .checkbox input:not(:checked) + .radio-checkbox-text:before {
                    filter: var(--checkbox-unchecked-filter);
                    background: url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="check_box_off_24"><path d="M16.872 2c1.783 0 2.43.186 3.082.534.651.349 1.163.86 1.512 1.512S22 5.345 22 7.128v9.744c0 1.783-.186 2.43-.534 3.082a3.635 3.635 0 01-1.512 1.512c-.652.348-1.299.534-3.082.534H7.128c-1.783 0-2.43-.186-3.082-.534s-1.163-.86-1.512-1.512C2.186 19.302 2 18.655 2 16.872V7.128c0-1.783.186-2.43.534-3.082a3.635 3.635 0 011.512-1.512C4.698 2.186 5.345 2 7.128 2zm.564 2H6.564c-.892 0-1.215.093-1.54.267-.327.174-.583.43-.757.756-.174.326-.267.65-.267 1.54v10.873c0 .892.093 1.215.267 1.54.174.327.43.583.756.757.326.174.65.267 1.54.267h10.873c.892 0 1.215-.093 1.54-.267.327-.174.583-.43.757-.756.174-.326.267-.65.267-1.54V6.563c0-.892-.093-1.215-.267-1.54a1.817 1.817 0 00-.756-.757c-.326-.174-.65-.267-1.54-.267z" fill="currentColor"></path></svg>');
                }
                
                .checkbox input:checked + .radio-checkbox-text:before {
                    /* Небольшой костыль */
                    filter: var(--checkbox-checked-filter);
                    background: url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="check_box_on_24"><path clip-rule="evenodd" d="M2.436 4.184C2 5.04 2 6.16 2 8.4v7.2c0 2.24 0 3.36.436 4.216a4 4 0 001.748 1.748C5.04 22 6.16 22 8.4 22h7.2c2.24 0 3.36 0 4.216-.436a4 4 0 001.748-1.748C22 18.96 22 17.84 22 15.6V8.4c0-2.24 0-3.36-.436-4.216a4 4 0 00-1.748-1.748C18.96 2 17.84 2 15.6 2H8.4c-2.24 0-3.36 0-4.216.436a4 4 0 00-1.748 1.748zm15.771 5.023a1 1 0 00-1.414-1.414L10 14.586l-2.793-2.793a1 1 0 00-1.414 1.414l3.5 3.5a1 1 0 001.414 0z" fill="currentColor" fill-rule="evenodd"></path></svg>');
                }
            </style>`;
}

function getSubmitButton(text) {
    text = text ? text : "Отправить";
    return `
    <div class="form-element">
        <button class="submit-button">${text}</button>
    </div>`;
}

function getRadioCheckboxCss() {
    return `
            <style>
                .radio-checkbox {
                    color: var(--form-text);
                    font-size: 16px;
                    line-height: 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    margin-left: -16px;
                    margin-right: -16px;
                    padding: 0 16px;
                    position: relative;
                    overflow: hidden;
                }
                
                .radio-checkbox.--active_background {
                    background-color: var(--wave)
                    !important;
                    transition: background-color .5s;
                }
                
                .radio-checkbox:hover {
                    background: var(--radio-checkbox-hover);
                }
                
                .radio-checkbox:hover, .radio-checkbox label:hover {
                    cursor: pointer;
                }
                
                .radio-checkbox input {
                    position: absolute;
                    visibility: hidden;
                }
                
                .radio-checkbox input:checked + .radio-checkbox-text,
                .radio-checkbox input:not(:checked) + .radio-checkbox-text
                {
                    position: relative;
                    padding-left: 33px;
                    margin: 12px 0;
                    z-index: 2;
                }
                
                .radio-checkbox input:checked + .radio-checkbox-text:before,
                .radio-checkbox input:not(:checked) + .radio-checkbox-text:before {
                    content: '';
                    position: absolute;
                }
            </style>`;
}

function getGroupCss() {
    return `
        <style>
            .group-wrapper {
                display: flex;
                flex-wrap: wrap;
            }
            .group-wrapper .form-element {
                width: 40%;
            }
            
            .group-wrapper .form-element:nth-child(2n + 1) {
                padding: 12px 0 12px 16px;
            }
            
            .group-wrapper .form-element:nth-child(2n) {
                margin-left: 24px;
                padding-left: 0;
                padding-right: 16px;
            }
        </style>`;
}

function getInputsCss() {
    return `
        <style>            
            .label-wrapper {
                padding-bottom: 8px;
            }
            
            .input-wrapper {
                border-radius: 8px;
                position: relative;
                display: flex;
                align-items: center;
            }
            
            .input-wrapper.valid {
                --input-border: #4bb34b;
            }
            .input-wrapper.valid + .input-tip{
                --input-tip: #4bb34b;
            }
            
            .input-wrapper.invalid {
                --input-border: #e64646;
            }
            
            .input-wrapper.invalid + .input-tip {
                --input-tip: #e64646;
            }
            
            .input-wrapper > * {
                border-radius: inherit;
            }
            
            .input-wrapper .input-element {
                width: 100%;
                background-color: var(--input-bg);
                border: 0;
                outline: none;
                line-height: 19px;
                padding: 11px 11px 12px 11px;
                color: var(--form-text);
                font-size: 16px;
                z-index: 2;
                margin: 1px -1px -1px 1px;
                font-family: inherit;
            }
            
            .input-wrapper .input-border {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                content: '';
                background: var(--input-border-bg);
                border: 1px solid var(--input-border);
                z-index: 1;
            }
            
            .input-wrapper:focus-within .input-border {
                border-color: var(--input-border-focused);
            }
            
            .input-tip {
                padding-top: 8px;
                font-size: 13px;
                color: var(--input-tip);
            }
        </style>`;
}

function getMainCss(additionalStyles) {
    // language=HTML
    return `
    <div class="module-styles">
    <style>
        ${getFontFamilies()}
        
        :root {
            --form-wrapper: rgb(129, 140, 153);
            --form-wrapper-border: rgba(0, 0, 0, 0.12);
            --form-wrapper-bg: #fff;
            --form-text: black;
            --separator: rgb(215, 216, 217);
            --wave: #E2E2E2;
            --input-border-focused: #3f8ae0;
            --input-border-bg: #F2F3F5;
            --input-border: rgba(0, 0, 0, 0.12);
            --input-bg: rgba(0, 0, 0, 0);
            --input-tip: rgb(129, 140, 153);
            --radio-checkbox-hover: #F5F5F5;
            --radio-unchecked: #b8c1cc;
            --checkbox-unchecked-filter: invert(89%) sepia(14%) saturate(191%) hue-rotate(173deg) brightness(85%) contrast(90%);
            --checkbox-checked-filter: invert(49%) sepia(63%) saturate(582%) hue-rotate(173deg) brightness(90%) contrast(94%);
            --submit-button-bg: rgb(73, 134, 204);
            --submit-button-text: #fff;
            --submit-button-bg-hover: #4681C4;
            --submit-button-text-hover: #f5f5f5;
        }
        
        .form-wrapper.theme_night {
            --form-wrapper: rgb(118, 120, 122);
            --form-wrapper-border: rgba(255, 255, 255, 0.12);
            --form-wrapper-bg: rgb(25, 25, 26);
            --form-text: rgb(225, 227, 230);
            --separator: #363738;
            --wave: #333334;
            --input-border-focused: #71aaeb;
            --input-border-bg: rgb(35, 35, 36);
            --input-border: #4F4F4F;
            --input-bg: rgb(35, 35, 36);
            --radio-checkbox-hover: #222223;
            --radio-unchecked: #5D5F61;
            /*  Два параметра снизу, это цвета переменных       
                --input-border-focused и --radio-unchecked  
                в виде значения свойства filter */
            --checkbox-unchecked-filter: invert(38%) sepia(6%) saturate(208%) hue-rotate(169deg) brightness(91%) contrast(86%);
            --checkbox-checked-filter: invert(66%) sepia(19%) saturate(1151%) hue-rotate(176deg) brightness(95%) contrast(93%);
            --submit-button-bg: #E1E3E6;
            --submit-button-text: #19191A;
            --submit-button-bg-hover: #E2E4E7;
            --submit-button-text-hover: #222223;
        }
        
        .form-wrapper {
            background-color: var(--form-wrapper-bg);
            width: 304px;
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
            font-size: 14px;
            margin: auto;
            color: var(--form-wrapper);
            border: 1px solid var(--form-wrapper-border);
        }
        
        .form-caption {
            color: var(--form-text);
            font-size: 23px;
            font-weight: 700;
            padding:16px;
        }
        
        .separator {
            background: var(--separator);
            height: 1px;
            margin: 0 16px;
        }
        
        section {
            padding: 16px 0;
        }
        
        .form-element {
            padding: 12px 16px 12px 16px;
        }
    
        .form-element:first-child {
            padding-top: 0;
        }
        
        .form-element-wave {
            z-index: 1;
            background-color: var(--wave);
            border-radius: 50%;
            animation: wave 0.4s ease-out;
            transform: scale(0);
            position: absolute;
        }
        @keyframes wave {
            to {
            transform: scale(2);
            opacity: 0;
            }
        }
        
        .form-element .submit-button {
            width: 100%;
            padding: 11px 0;
            background-color: var(--submit-button-bg);
            border: none;
            border-radius: 10px;
            color: var(--submit-button-text);
            font-size: 17px;
            cursor: pointer;
            font-weight: 600;
            outline: none;
        }

        .form-element .submit-button:hover {
            background-color: var(--submit-button-bg-hover);
            color: var(--submit-button-text-hover);
        }
        
        .--opacity07 {
            opacity: 0.7;
        }
        
    </style>
    ${additionalStyles}
    </div>`;
}

function getFontFamilies() {
    return "@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');";
}

function switchItemType(item) {
    let temp;

    switch (item.type) {
        case "text":
        case "password":
        case "date":
        case "tel":
        case "email":
            temp = getInputTextOrPassword(item);
            break;
        case "group":
            temp = getInputsGroup(item);
            break;
        case "header":
            if (!item.value) {
                temp = getError("Не задано значение для элемента header");
                break;
            }
            temp = getFormHeader(item.value);
            break;
        case "select":
            temp = getSelect(item);
            break;
        case "textarea":
            temp = getTextArea(item);
            break;
        case "checkbox":
        case "radio":
            temp = getRadioOrCheckbox(item);
            break;
        default:
            if (item.type) temp = getError("Не существует типа " + item.type);
            else temp = getError("Не указан тип");
    }

    return temp;
}

function getAddCss(inputs) {
    let types = [];

    for (let item of inputs) {
        if (!types.includes(item.type)) {
            types.push(item.type);
        }
        if (item.type === "group")
            for (let groupItem of item.groupElements)
                if (!types.includes(groupItem.type)) {
                    types.push(groupItem.type);
                }
    }

    let unique = types.filter
    (type => (type === "group" || type === "radio" || type==="checkbox"));
    let additionalCss = getInputsCss();
    let hasRadioOrCheckbox;
    unique.forEach(item => {
        if (item === "group") additionalCss += getGroupCss();
        if (item === "radio") additionalCss += getRadioCss();
        if (item === "checkbox") additionalCss += getCheckboxCss();
        if (item === "radio" || item === "checkbox") hasRadioOrCheckbox = 1;
    });

    if (hasRadioOrCheckbox) additionalCss += getRadioCheckboxCss();
    return additionalCss;
}

function iterateElements(inputs) {
    if (!(typeof inputs === "object") || (inputs.length === 0))
        return getError("Массив elements пуст или содержит некорректные данные");
    let stack = "";
    inputs.forEach((item) => {
        stack += switchItemType(item);
    });
    return stack;
}

function getError(text) {
    return `<div style="color: red"> * Ошибка. ${text} *</div>`;
}

function clearValidMessage(inputWrapperElement) {
    let tipElement = inputWrapperElement.nextElementSibling;
    tipElement.textContent = tipElement.dataset.default;
    inputWrapperElement.classList.remove("invalid");
    inputWrapperElement.classList.remove("valid");
}

function showValidMessage(inputWrapperElement) {
    inputWrapperElement.classList.add("valid");
    inputWrapperElement.classList.remove("invalid");
    inputWrapperElement.nextElementSibling.textContent = "Корректно!";
}

function showInvalidMessage(inputWrapperElement) {
    inputWrapperElement.classList.add("invalid");
    inputWrapperElement.classList.remove("valid");
    inputWrapperElement.nextElementSibling.textContent = "Проверьте правильность ввода";
}

function getFormHeader(text) {
    return `<div class="form-caption">${text}</div>`;
}

function getOuterContainer(out){
    if (!out.caption) out.caption = getError("Отсутствует заголовок формы");
    if (!out.elementsStack)
        out.elementsStack = getError("Массив elements отстутсвует");

    let submit = out.submit;
    submit.href = submit.href ? `action="${submit.href}"` : '';
    submit.method = submit.method ? `method="${submit.method}"` : '';

    return `
    <div class="form-wrapper theme_${out.theme}">
        <div>
            ${getFormHeader(out.caption)}
            
            <div class="separator"></div>
            
            <section>
                <form novalidate ${submit.href} ${submit.method}>
                    ${out.elementsStack}
                    ${getSubmitButton(submit.text)}
                </form>
            </section>
        </div>
    </div>
    ${out.css}`;
}

export function initHandlers() {
    let waveElements = document.querySelectorAll(".wave-animation-enabled");

    waveElements.forEach(item => {
        item.addEventListener
        ("mousedown", e => {
            let t = e.target;

            let addDiv = document.createElement('div'),
                mValue = Math.max(t.offsetWidth, t.offsetHeight) * 0.5,
                rect = t.getBoundingClientRect(),
                sDiv = addDiv.style,
                px = 'px';

            sDiv.width = sDiv.height = mValue + px;
            sDiv.left = e.clientX - rect.left - (mValue / 2) + px;
            sDiv.top = e.clientY - rect.top - (mValue / 2) + px;

            addDiv.classList.add('form-element-wave');
            item.appendChild(addDiv);
            item.classList.add('--active_background');

            addDiv.addEventListener('animationend', () => {
                addDiv.remove();
            });

        });
        item.addEventListener("mouseup", () => {
           item.classList.remove('--active_background')
        });
    });

    let submitBtn = document.querySelector(".form-wrapper .submit-button");
    submitBtn.addEventListener("mousedown", () => {
        submitBtn.classList.add("--opacity07");
    });
    submitBtn.addEventListener("mouseup", () => {
        submitBtn.classList.remove("--opacity07");
    });

    let allInputs = document.querySelectorAll(".input-element");
    let patternInputs = [];
    allInputs.forEach(item => {
        if (item.hasAttribute("pattern")) patternInputs.push(item);
    });
    let emails = document.querySelectorAll('.input-element[type="email"]')
    emails.forEach(item => {
       patternInputs.push(item);
    });

    patternInputs.forEach(validateInput => {
        validateInput.addEventListener("input", () => {
            let parent = validateInput.parentElement;
            if (validateInput.validity.valid) {
                if (validateInput.value === "") clearValidMessage(parent);
                else showValidMessage(parent);
            }
            else {
                showInvalidMessage(parent);
            }
        });
    });
}

export function getFormFromJSON(json) {
    let form;
    try {
        form = JSON.parse(json);
    } catch (error) {
        return getError("Некорректный JSON");
    }
    let parsedForm = {
        caption: form.caption,
        elementsStack: iterateElements(form.elements),
        css: getMainCss(getAddCss(form.elements)),
        submit: form.submit
    }

    parsedForm.theme = form.theme ? form.theme : "day";

    return getOuterContainer(parsedForm);
}