# base-js

Basic functions for HTML.

## Connection

```html
<script src="https://cdn.jsdelivr.net/gh/ilyakotsar/base-js@0.1.2/base.js"></script>
```

Minified:

```html
<script src="https://cdn.jsdelivr.net/gh/ilyakotsar/base-js@0.1.2/base.min.js"></script>
```

## Requests

All requests are made via the Fetch API and should receive a response in JSON format.

```js
get(url, effect);
post(element, url, effect);
```

**effect** - string with three arguments in the format 'response_key|selector|operation',
nested keys are separated by dots, multiple effects are separated by semicolons,
use name as a selector after *n=*\
**element** - always equals *this*

Operations:

**i** - innerHTML\
**o** - outerHTML\
**v** - value\
**c** - className\
**ac** - classList.add()\
**rc** - classList.remove()\
**tc** - classList.toggle()

Examples:

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
toggle(selector, element=undefined, iconA='', iconB='');
select(tabId, tabClass, btnElement=undefined, btnSelectedClass='');
```

Examples:

```html
<button
  type="button"
  onclick="toggle('#menu', this, '#menu-icon', '#close-icon')"
>
  menu-icon
</button>
<div id="menu" class="hidden"></div>
<div id="menu-icon" class="hidden">menu-icon</div>
<div id="close-icon" class="hidden">close-icon</div>
```

```html
<button
  type="button"
  name="tab-btns"
  class="underline"
  onclick="select('tab-1', 'tabs', this, 'underline')"
>
  Tab 1
</button>
<button
  type="button"
  name="tab-btns"
  onclick="select('tab-2', 'tabs', this, 'underline')"
>
  Tab 2
</button>
<div id="tab-1" class="tabs">Tab 1</div>
<div id="tab-2" class="tabs hidden">Tab 2</div>
```

## Customization

You can change the variables as you wish.

```js
csrfTokenName = 'mycsrftoken'; // Default: csrfmiddlewaretoken
displayNoneClass = 'd-none'; // Default: hidden
```
