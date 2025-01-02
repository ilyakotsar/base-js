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

function applyEffect(effect, response) {
    let effectArray = effect.split(';');
    for (let i = 0; i < effectArray.length; i++) {
        let parameters = effectArray[i].trim().split('|');
        let key = parameters[0];
        let value;
        if (key.charAt(0) === '=' && key.charAt(key.length - 1) === '=') {
            value = key.slice(1, key.length - 1);
        } else {
            let keyArray = key.split('.');
            value = response;
            for (let i = 0; i < keyArray.length; i++) {
                value = value[keyArray[i]];
            }
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
        if (effect !== '') {
            applyEffect(effect, response);
        }
    });
}

function post(event, url, effect='') {
    event.preventDefault();
    let children = event.target.children;
    let data = {};
    for (let i = 0; i < children.length; i++) {
        let name = children[i].name;
        let value = children[i].value;
        if (name !== undefined && value !== undefined) {
            data[name] = value;
        }
    }
    makeRequest('POST', url, data).then(response => {
        if (effect !== '') {
            applyEffect(effect, response);
        }
    });
}

function applyIcon(iconPlace=null, icon='') {
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

function toggle(id, btn=null, iconPlace=null, iconA='', iconB='') {
    let element = document.getElementById(id);
    let icon;
    if (element.classList.contains(displayNoneClass)) {
        element.classList.remove(displayNoneClass);
        icon = iconB;
    } else {
        element.classList.add(displayNoneClass);
        icon = iconA;
    }
    applyIcon(iconPlace, icon);
    if (btn !== null && typeof btn === 'object') {
        window.onclick = function(event) {
            if (!btn.contains(event.target) && !element.contains(event.target)) {
                element.classList.add(displayNoneClass);
                applyIcon(iconPlace, iconA);
            }
        }
    }
}

function select(id, tabsId, btn=null, selectedClass='') {
    let tabs = document.getElementById(tabsId).children;
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.add(displayNoneClass);
    }
    document.getElementById(id).classList.remove(displayNoneClass);
    if (btn !== null && selectedClass !== '') {
        let buttons = document.querySelectorAll(`[name="${btn.name}"]`);
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove(selectedClass);
            buttons[i].disabled = false;
        }
        btn.classList.add(selectedClass);
        btn.disabled = true;
    }
}