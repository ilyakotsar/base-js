let csrfTokenName = 'csrfmiddlewaretoken';
let displayNoneClass = 'hidden';

async function makeRequest(method, url, data={}) {
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

function applyEffect(response, effect='') {
    if (effect === '') {
        return;
    }
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
        if (selector.slice(0, 2) === 'n=') {
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

function get(url, effect='') {
    makeRequest('GET', url).then(response => {
        applyEffect(response, effect);
    });
}

function post(element, url, effect='') {
    let children;
    switch (typeof element) {
        case 'string':
            children = document.getElementById(element).children;
            break;
        case 'object':
            children = element.children;
            break;
    }
    let data = {};
    for (let i = 0; i < children.length; i++) {
        let name = children[i].name;
        let value = children[i].value;
        if (name !== undefined && value !== undefined) {
            data[name] = value;
        }
    }
    makeRequest('POST', url, data).then(response => {
        applyEffect(response, effect);
    });
}

function toggleBase(id, icons='', fixed=false) {
    let element = document.getElementById(id);
    let iconsArray = icons.split('|');
    let iconPlace = iconsArray[0];
    let iconA = iconsArray[1];
    let iconB = iconsArray[2];
    let icon;
    if (element.classList.contains(displayNoneClass)) {
        element.classList.remove(displayNoneClass);
        icon = iconB;
        if (fixed) {
            document.body.style.overflow = 'hidden';
        }
    } else {
        element.classList.add(displayNoneClass);
        icon = iconA;
        if (fixed) {
            document.body.style.overflow = 'auto';
        }
    }
    if (icons !== '') {
        let iconElement = document.getElementById(iconPlace);
        iconElement.innerHTML = document.getElementById(icon).innerHTML;
    }
}

function toggle(id, icons='') {
    toggleBase(id, icons);
}

function toggleFixed(id, icons='') {
    toggleBase(id, icons, true);
}

function select(ids, btn=null, selectedClass='') {
    let idsArray = ids.split('|');
    let tabId = idsArray[0];
    let tabsId = idsArray[1];
    let tabs = document.getElementById(tabsId).children;
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.add(displayNoneClass);
    }
    document.getElementById(tabId).classList.remove(displayNoneClass);
    if (btn !== null && selectedClass !== '') {
        let buttons = document.querySelectorAll(`[name="${btn.name}"]`);
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove(selectedClass);
        }
        btn.classList.add(selectedClass);
    }
}