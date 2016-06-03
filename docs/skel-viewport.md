# Skel: Viewport

Viewport is a Skel module that simplifies the configuration of the browser viewport. It does this by not only generating a default viewport `<meta>` tag for you (using whatever settings you give it), but also by letting you assign _different_ settings to each of your breakpoints, effectively enabling the use of multiple, breakpoint-dependent viewport tags.


## Usage

First, load `skel.min.js` and `skel-viewport.min.js`:

```html
<script src="skel.min.js"></script>
<script src="skel-viewport.min.js"></script>
```

Then use `skel.viewport()` to set your viewport defaults:

```js
skel.viewport({
	width: 1280,
	scalable: true
});
```

And that's it. The above will automatically generate the following viewport tag and stick it in your `<head>`:

```html
<meta name="viewport" content="width=1280, user-scalable=yes" />
```


### With Breakpoints

Of course, the most useful aspect of Viewport is its ability to generate and switch between _multiple_ viewport tags. To do this, first define your breakpoints with `skel.breakpoints()`:

```js
skel.breakpoints({
	xlarge: "(max-width: 1680px)",
	large:  "(max-width: 1280px)",
	medium: "(max-width: 980px)",
	small:  "(max-width: 736px)",
	xsmall: "(max-width: 480px)"
});
```

Then use `skel.viewport()` to configure the viewport, only this time with the `breakpoints` option to set overrides at certain breakpoints:

```js
skel.viewport({
	width: 1280,
	scalable: true,
	breakpoints: {
		medium: {
			width: "device-width"
		},
		small: {
			scalable: false
		}
	}
});
```

And you're done. You'll now get this viewport tag by default:

```html
<meta name="viewport" content="width=1280, user-scalable=yes" />
```

... this one when `medium` is active*:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes" />
```

... and finally, this one when `small` is active*:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
```

_*_ = Setting width to `"device-width"` automatically includes `initial-scale=1`.

Note that overrides can "stack" if more than one breakpoint is active. For example, in this case `medium` will always be active when `small` is active, so the latter will end up inheriting the former's overrides (`width`) as its defaults.


## Options

Viewport supports the following options:

- `width`

	*(integer, string)* The width of the viewport. Can be `"device-width"`, an integer value (eg. `1280`), or left blank. Default is `"device-width"`.

- `height`

	*(integer, string)* The height of the viewport. Can be `"device-height"`, an integer value (eg. `600`), or left blank. Default is blank.

- `user-scalable`

	*(bool)* If `true`, scaling (also known as "zooming") will be enabled. If `false`, scaling will be disabled. Default is `true`.

- `breakpoints`

	*(object)* Breakpoint-level overrides for each of the above. For example:

	```js
	scalable: false,
	breakpoints: {
		medium: { scalable: true },
		small: { scalable: false }
	}
	```

	This disables scaling by default, enables it when `medium` is active, and disables it again when `small` is active. Default is `{}`.


## License

Viewport is released under the MIT license.

Copyright (c) skel.io

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.