# Base.js

Basic functions for HTML.

## Connection

Paste the script at the end of the body tag.

```html
<script
  src="https://cdn.jsdelivr.net/gh/ilyakotsar/base-js@0.1.3/base.js"
  integrity="sha384-HTym/HgrEdakej070DnvGHB0zrhNCWYufkslRu51vz52auGa9FtQKkT88FLZn44+"
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
>
</script>
```

Minified (2.24 KB instead of 4.97 KB):

```html
<script
  src="https://cdn.jsdelivr.net/gh/ilyakotsar/base-js@0.1.3/base.min.js"
  integrity="sha384-pAhbOmFWwBELHf6dxypCGkfYPgb1VjDjtsmGiXy51Db0KblV3eZ4QN4kyrvS/lEJ"
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
>
</script>
```

## Requests

All requests are made via the Fetch API and should receive a response in JSON format.

```js
get(url, effect='');
post(event, url, effect='');
```

**effect** - string with three arguments in the format 'response_key|selector|operation',
nested keys are separated by dots, a key turns into a value if wrapped with *=*,
use name as a selector starting with *n=*,
multiple effects are separated by semicolons\
**event** - always equals *event*

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
  onclick="get('https:\/\/open.er-api.com/v6/latest/USD', 'rates.EUR|#eur|i; =hidden=|#rate-display|rc')"
>
  Get USD/EUR rate
</button>
<p id="rate-display" class="hidden">
  1 USD = <span id="eur"></span> EUR
</p>
```

```html
<form
  onsubmit="post(event, 'https:\/\/api.ipapi.is', 'location.country|#country|i; =hidden=|#country-display|rc')"
>
  <input type="text" name="q" value="132.145.199.178" autocomplete="off">
  <button type="submit">Get country by IP</button>
</form>
<p id="country-display" class="hidden">
  Country: <span id="country"></span>
</p>
```

## Display

```js
toggle(id, btn=null, iconPlace=null, iconA='', iconB='');
select(id, tabsId, btn=null, selectedClass='');
```

Examples:

```html
<button type="button" onclick="toggle('dropdown', this, 'icon', 'plus', 'minus')">
  Dropdown <span id="icon">+</span>
</button>
<div id="dropdown" class="hidden">
  Click outside the dropdown to close
</div>
<div id="plus" class="hidden">+</div>
<div id="minus" class="hidden">-</div>
```

```html
<button
  type="button"
  name="tab-buttons"
  onclick="select('profile', 'tabs', this, 'selected')"
>
  Profile
</button>
<button
  type="button"
  name="tab-buttons"
  onclick="select('settings', 'tabs', this, 'selected')"
>
  Settings
</button>
<div id="tabs">
  <div id="profile" class="hidden">Profile tab</div>
  <div id="settings" class="hidden">Settings tab</div>
</div>
```

## Customization

You can change the variables as you wish.

```html
<script>
  csrfTokenName = 'csrf-token'; // Default: csrfmiddlewaretoken
  displayNoneClass = 'd-none'; // Default: hidden  
</script>
```
