let csrfTokenName = 'csrfmiddlewaretoken';
let displayNoneClass = 'hidden';

async function request(method, url, data={}) {
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

function applyQuery(query, response) {
    let queryArray = query.split(';');
    for (let i = 0; i < queryArray.length; i++) {
        let params = queryArray[i].trim().split('|');
        let key = params[0];
        let value = response[key];
        let selector = params[1];
        let operation = params[2];
        let elements = [];
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

function get(url, query) {
    request('GET', url).then(response => {
        applyQuery(query, response);
    });
}

function post(element, url, query) {
    let children;
    switch (typeof element) {
        case 'string':
            children = document.querySelector(element).children;
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
    request('POST', url, data).then(response => {
        applyQuery(query, response);
    });
}

function toggle(target, element=undefined, iconA='', iconB='') {
    let targetElement = document.querySelector(target);
    let icon = '';
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