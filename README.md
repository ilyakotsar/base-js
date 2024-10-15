# base-js

Basic functions for HTML.

## Connection

```html
<script src="https://cdn.jsdelivr.net/gh/ilyakotsar/base-js@0.1.1/base.js"></script>
```

Minified:

```html
<script src="https://cdn.jsdelivr.net/gh/ilyakotsar/base-js@0.1.1/base.min.js"></script>
```

## Requests

All requests are executed via the Fetch API and should receive a response in JSON.

```js
get(url, query);
post(element, url, query);
```

**url** - URL string.\
**query** - Query string with three arguments in the format 'response_key|selector|operation'.
Nested keys are separated by dots. Multiple queries are separated by semicolons.
Use name as a selector with n=name.\
**element** - Selector string or *this*\

Operations:

**i** - innerHTML\
**o** - outerHTML\
**v** - value\
**c** - className\
**ac** - classList.add()\
**rc** - classList.remove()\
**tc** - classList.toggle()\

Example:

```html
<button
  type="button"
  id="edit"
  onclick="get('/settings/edit', 'form|#edit|o')"
>
  Edit
</button>
```

```html
<button
  type="button"
  onclick="get('https:\/\/open.er-api.com/v6/latest/USD', 'rates.EUR|#eur|i')"
>
  Get rate
</button>
<div>USD: 1</div>
<div>EUR: <span id="eur"></span></div>
```

```html
<button
  type="button"
  name="theme-btn"
  onclick="post(this, '/switch-theme', 'theme|html|c; button|n=theme-btn|o')"
>
  <input type="hidden" name="theme" value="light">
  light-icon
</button>
```

## Display

```js
toggle(target, element=undefined, iconA='', iconB='');
```

Example:

```html
<button
  type="button"
  onclick="toggle('#menu', this, '#menu-icon', '#close-icon')"
>
  Icon
</button>
<div id="menu" class="hidden"></div>
<div id="menu-icon" class="hidden">menu-icon</div>
<div id="close-icon" class="hidden">close-icon</div>
```

## Customization

You can change the variables to your own.

```js
csrfTokenName = 'mycsrftoken'; // Default: csrfmiddlewaretoken
displayNoneClass = 'd-none'; // Default: hidden
```
