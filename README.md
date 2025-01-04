# base-js

Basic functions for HTML.

## Connection

Paste the script into the head tag.

```html
<script
  src="https://cdn.jsdelivr.net/gh/ilyakotsar/base-js@0.1.5/base.js"
  integrity="sha384-cWVwarPnxHbtA2ppfbXva8cmfnZMoTi7cqwzN8TqHNKHmGme26jltOZQeC6Z3il8"
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

**effect** - string with three arguments in the format 'responseKey|selector|operation',
nested keys are separated by dots, use name as a selector starting with *n=*,
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
  onclick="get('https:\/\/open.er-api.com/v6/latest/USD', 'rates.EUR|#rate|i')"
>
  Get USD/EUR rate
</button>
<p id="rate"></p>
```

```html
<p id="data">
  <input type="text" name="q" value="132.145.199.178" autocomplete="off">
</p>
<button
  type="button"
  onclick="post('data', 'https:\/\/api.ipapi.is', 'location.country|#country|i')"
>
  Get country by IP
</button>
<p id="country"></p>
```

## Display

```js
toggle(id, icons='');
toggleFixed(id, icons='');
select(ids, btn=null, selectedClass='');
```

**icons** - string with three arguments in the format 'iconPlaceId|iconAId|iconBId'\
**ids** - string with two arguments in the format 'tabId|tabsId'\
**btn** - always *this*, the buttons must have the same name

Examples:

```html
<button type="button" onclick="toggle('dropdown', 'icon|plus|minus')">
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
  class="selected"
  onclick="select('profile|tabs', this, 'selected')"
>
  Profile
</button>
<button
  type="button"
  name="tab-buttons"
  onclick="select('settings|tabs', this, 'selected')"
>
  Settings
</button>
<div id="tabs">
  <div id="profile">Profile tab</div>
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
