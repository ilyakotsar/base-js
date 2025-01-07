# base-js

Basic functions for HTML.

## Connection

Paste the script into the head tag.

```html
<script
  src="https://cdn.jsdelivr.net/gh/ilyakotsar/base-js@0.1.9/base.js"
  integrity="sha384-dhRZSrjJYj4u8MJmAiF7Oq8x8sId8T+9kHLKEecCWAjYZsglFZEgMZmAOqJNIaer"
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
></script>
```

## Request functions

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
<button onclick="get('https:\/\/open.er-api.com/v6/latest/USD', 'rates.EUR|#rate|i')">
  Get USD/EUR rate
</button>
<p id="rate"></p>
```

```html
<p id="data">
  <input type="text" name="q" value="132.145.199.178" autocomplete="off">
</p>
<button onclick="post('data', 'https:\/\/api.ipapi.is', 'location.country|#country|i')">
  Get country by IP
</button>
<p id="country"></p>
```

## Client functions

```js
apply(effect, data=null);
toggle(id, iconPlace=null, icons='');
toggleFixed(id, iconPlace=null, icons='');
togglePassword(id, iconPlace=null, icons='');
select(id, btn, classes='');
copyText(id, iconPlace=null, icons='', delay=1000);
expandTextarea(textarea, heightLimit=200);
displayValue(element, id);
removeValue(id);
```

**effect** - effect as in requests, but if the data is null, the key is turned into a value\
**iconPlace** - id or *this*\
**icons** - string with two arguments in the format 'iconAId|iconBId'\
**btn** - always *this*, the buttons must have the same name and be equal to tabsId\
**classes** - classes for buttons of active tabs, separated by spaces

Examples:

```html
<button onclick="apply('sky|h1|ac')">Change color of h1 tag</button>
```

```html
<button onclick="toggle('dropdown', 'icon', 'plus|minus')">
  Dropdown <span id="icon">+</span>
</button>
<button onclick="toggleFixed('dropdown')">Fixed dropdown</button>
<div id="plus" class="hidden">+</div>
<div id="minus" class="hidden">-</div>
<div id="dropdown" class="hidden">Dropdown content</div>
```

```html
<input type="password" id="password" value="Password">
<button onclick="togglePassword('password', this, 'show|hide')">Show</button>
<div id="show" class="hidden">Show</div>
<div id="hide" class="hidden">Hide</div>
```

```html
<button name="tabs" class="sky bold" onclick="select('profile', this, 'sky bold')">
  Profile
</button>
<button name="tabs" onclick="select('settings', this, 'sky bold')">
  Settings
</button>
<div id="tabs">
  <div id="profile">Profile tab</div>
  <div id="settings" class="hidden">Settings tab</div>
</div>
```

```html
<p>
  <textarea id="text" rows="2" oninput="expandTextarea(this)">Text</textarea>
</p>
<button onclick="copyText('text', this, 'copy|copied')">Copy</button>
<button onclick="removeValue('text')">Remove</button>
<div id="copy" class="hidden">Copy</div>
<div id="copied" class="hidden">Copied</div>
```

```html
<input type="range" oninput="displayValue(this, 'range')" value="50" autocomplete="off">
<div id="range">50</div>
```

## Customization

You can change the variables as you wish.

```html
<script>
  csrfTokenName = 'csrf-token'; // Default: csrfmiddlewaretoken
  displayNoneClass = 'd-none'; // Default: hidden
</script>
```

You can write your own functions using library functions.

```js
function myFunction() {
  baseJsMakeRequest('GET', '/test').then(response => {
    apply('test|n=test|o', response);
  });
}
```
