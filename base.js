let csrfTokenName = 'csrfmiddlewaretoken';
let displayNoneClass = 'hidden';

async function makeRequestFetchAPI(method, url, data={}) {
    let options = {
        method: method,
        credentials: 'same-origin',
        referrerPolicy: 'no-referrer',
    };
    if (method === 'POST') {
        options.body = JSON.stringify(data);
        options.headers = {
            'Content-Type': 'application/json',
        }
        let csrfToken = document.querySelector(`[name=${csrfTokenName}]`);
        if (csrfToken !== null) {
            options.headers['X-CSRFToken'] = csrfToken.value;
        }
    }
    let response = await fetch(url, options);
    return response.json();
}

function applyEffectAfterRequest(effect, response) {
    let effectArray = effect.split(';');
    for (let i = 0; i < effectArray.length; i++) {
        let parameters = effectArray[i].trim().split('|');
        let key = parameters[0].split('.');
        let value = response;
        for (let i = 0; i < key.length; i++) {
            value = value[key[i]];
        }
        let selector = parameters[1];
        let operation = parameters[2];
        let elements;
        if (selector.includes('n=')) {
            let name = selector.split('n=')[1];
            elements = document.querySelectorAll(`[name="${name}"]`);
        } else {
            elements = document.querySelectorAll(selector);
        }
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            switch (operation) {
                case 'i':
                    element.innerHTML = value;
                    break;
                case 'o':
                    element.outerHTML = value;
                    break;
                case 'v':
                    element.value = value;
                    break;
                case 'c':
                    element.className = value;
                    break;
                case 'ac':
                    element.classList.add(value);
                    break;
                case 'rc':
                    element.classList.remove(value);
                    break;
                case 'tc':
                    element.classList.toggle(value);
                    break;
            }
        }
    }
}

function get(url, effect) {
    makeRequestFetchAPI('GET', url).then(response => {
        applyEffectAfterRequest(effect, response);
    });
}

function post(element, url, effect) {
    let children = element.children;
    let data = {};
    for (let i = 0; i < children.length; i++) {
        let name = children[i].name;
        let value = children[i].value;
        if (name !== undefined && value !== undefined) {
            data[name] = value;
        }
    }
    makeRequestFetchAPI('POST', url, data).then(response => {
        applyEffectAfterRequest(effect, response);
    });
}

function toggle(selector, element=undefined, iconA='', iconB='') {
    let targetElement = document.querySelector(selector);
    let icon;
    if (targetElement.classList.contains(displayNoneClass)) {
        targetElement.classList.remove(displayNoneClass);
        icon = iconB;
    } else {
        targetElement.classList.add(displayNoneClass);
        icon = iconA;
    }
    if (element !== undefined) {
        let iconElement;
        switch (typeof element) {
            case 'string':
                iconElement = document.querySelector(element);
                break;
            case 'object':
                iconElement = element;
                break;
        }
        iconElement.innerHTML = document.querySelector(icon).innerHTML;
    }
}

function select(tabId, tabClass, btnElement=undefined, btnSelectedClass='') {
    let tabs = document.querySelectorAll(`.${tabClass}`);
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.add(displayNoneClass);
    }
    document.getElementById(tabId).classList.remove(displayNoneClass);
    let btnName = btnElement.name;
    let buttons = document.querySelectorAll(`[name="${btnName}"]`);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove(btnSelectedClass);
    }
    btnElement.classList.add(btnSelectedClass);
}