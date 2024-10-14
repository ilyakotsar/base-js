# base-js

Basic functions for HTML. Simple and more flexible alternative to htmx.

## Connection

```html
<script
  src="https://cdn.jsdelivr.net/gh/ilyakotsar/base-js@0.1.0/base.js"
  integrity="sha384-tLVBab9JgUhV5THqRcVu2tnJ4TnOj1jDT6tLYil/OzubR3TbOR7GcozBOANUMUHo"
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
></script>
```

## Requests

All requests are executed via the Fetch API and should receive a response in JSON.

```js
get(url, query);
post(element, url, query);
```

url - URL string

query - query string with three arguments in the format 'response_key|selector|operation_letter',
multiple queries are separated by semicolons

element - this or a string with a selector

Use name as a selector with n=name

Operation letters:

i - innerHTML

o - outerHTML

v - value

c - className

ac - classList.add()

rc - classList.remove()

tc - classList.toggle()

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
  name="theme-btn"
  onclick="post(this, '/switch-theme', 'theme|html|c; button|n=theme-btn|o')"
>
  <input type="hidden" name="theme" value="light">
  light-icon
</button>
```

## Display toggle

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
