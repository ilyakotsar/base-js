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

function applyEffect(response, effect) {
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

function applyIcon(iconPlace, icon) {
    if (iconPlace !== null && icon !== '') {
        let iconElement;
        switch (typeof iconPlace) {
            case 'string':
                iconElement = document.getElementById(iconPlace);
                break;
            case 'object':
                iconElement = iconPlace;
                break;
        }
        iconElement.innerHTML = document.getElementById(icon).innerHTML;
    }
}

function toggleBase(id, iconPlace=null, icons='', fixed=false) {
    let element = document.getElementById(id);
    let iconsArray = icons.split('|');
    let icon;
    if (element.classList.contains(displayNoneClass)) {
        element.classList.remove(displayNoneClass);
        icon = iconsArray[1];
        if (fixed) {
            document.body.style.setProperty('overflow', 'hidden');
        }
    } else {
        element.classList.add(displayNoneClass);
        icon = iconsArray[0];
        if (fixed) {
            document.body.style.removeProperty('overflow');
            if (document.body.style.cssText === '') {
                document.body.removeAttribute('style');
            }
        }
    }
    applyIcon(iconPlace, icon);
}

function toggle(id, iconPlace=null, icons='') {
    toggleBase(id, iconPlace, icons);
}

function toggleFixed(id, iconPlace=null, icons='') {
    toggleBase(id, iconPlace, icons, true);
}

function togglePassword(id, iconPlace=null, icons='') {
    let password = document.getElementById(id);
    let iconsArray = icons.split('|');
    let icon;
    if (password.type === 'password') {
        password.type = 'text';
        icon = iconsArray[1];
    } else {
        password.type = 'password';
        icon = iconsArray[0];
    }
    applyIcon(iconPlace, icon);
}

function select(id, btn, classes='') {
    let tabs = document.getElementById(btn.name).children;
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.add(displayNoneClass);
    }
    document.getElementById(id).classList.remove(displayNoneClass);
    if (classes !== '') {
        let classesArray = classes.split(' ');
        let buttons = document.querySelectorAll(`[name="${btn.name}"]`);
        for (let i = 0; i < buttons.length; i++) {
            for (let x = 0; x < classesArray.length; x++) {
                buttons[i].classList.remove(classesArray[x]);
            }
        }
        for (let x = 0; x < classesArray.length; x++) {
            btn.classList.add(classesArray[x]);
        }
    }
}

function copy(id, iconPlace=null, icons='', delay=1500) {
    let text = document.getElementById(id);
    let value = text.value;
    if (value === undefined) {
        value = text.innerHTML;
    }
    navigator.clipboard.writeText(value).then(() => {
        if (iconPlace !== null && icons !== '') {
            let iconsArray = icons.split('|');
            applyIcon(iconPlace, iconsArray[1]);
            setTimeout(() => {
                applyIcon(iconPlace, iconsArray[0]);
            }, delay);
        }
    });
}