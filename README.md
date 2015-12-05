ng-vibrate
==========

Simple directive that helps you vibrate and shake elements

### Bower Install

```
bower install ng-vibrate
```

### Usage

**(1)** Add ng-vibrate.min.js to your main file (index.html)

**(2)** Set ngVibrate as a dependency in your module

```javascript
angular.module('myapp', ['ngVibrate']);
```

**(3)** Add vb-vibrate directive to the wanted element, example:

```html
<div vb-vibrate="{x:10, y:10, rotation:4, opacity:0.6}"></div>
```

### Browser support

Works properly in chrome, firefox, safari, and ie 9+

### Example

You can check out this live example here: http://codepen.io/anon/pen/XXWqbz
