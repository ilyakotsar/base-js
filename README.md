# base-js

Basic functions for HTML.

## Connection

Paste the script into the head tag.

```html
<script
  src="https://cdn.jsdelivr.net/gh/ilyakotsar/base-js@0.1.3/base.js"
  integrity="sha384-/jU0MI/vr6pLdSC7rf/bK+lS6R6mq+BwJCGC7m9j9nTXbO5PMmlogSec5qLJ170t"
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
>
</script>
```

Minified (2.1 KB instead of 4.75 KB):

```html
<script
  src="https://cdn.jsdelivr.net/gh/ilyakotsar/base-js@0.1.3/base.min.js"
  integrity="sha384-Tj6IEqfAPfpZA4a/7+w7nDcZ2R9J9udDdysE24nJNoL9euzlZoUUPD584Jy54VAq"
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
>
</script>
```

## Requests

All requests are made via the Fetch API and should receive a response in JSON format.

```js
get(url, effect='');
post(element, url, effect='');
```

**effect** - string with three arguments in the format 'response_key|selector|operation',
nested keys are separated by dots, a key turns into a value if wrapped with *=*,
use name as a selector starting with *n=*,
multiple effects are separated by semicolons\
**element** - block with inputs, accepts id or *this*

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
<p id="form">
  <input type="text" name="q" value="132.145.199.178" autocomplete="off">
</p>
<button
  type="button"
  onclick="post('form', 'https:\/\/api.ipapi.is', 'location.country|#country|i; =hidden=|#country-display|rc')"
>
  Get country by IP
</button>
<p id="country-display" class="hidden">
  Country: <span id="country"></span>
</p>
```

## Display

```js
toggle(id, iconPlace=null, iconA='', iconB='');
select(id, tabsId, btn=null, selectedClass='');
```

Examples:

```html
<button type="button" onclick="toggle('dropdown', 'icon', 'plus', 'minus')">
  Dropdown <span id="icon">+</span>
</button>
<div id="plus" class="hidden">+</div>
<div id="minus" class="hidden">-</div>
<div id="dropdown" class="hidden">
  Dropdown content
</div>
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
