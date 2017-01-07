# Skel

Skel is a lightweight framework for building responsive sites and web apps. Features include:

- Access to CSS breakpoints via JS (enabling stuff like `if (skel.breakpoint("small").active) { /* do something specific for small displays */ }`).
- Events, including the commonly used (`load`, `ready`) and special ones just for breakpoints (`+breakpoint`, `-breakpoint`).
- Vars, for convenient access to information about the client's browser, operating system, and more.
- Extendable with modules (like Layout and Viewport).


## Usage

Load `skel.min.js` (either in your `<head>` tag or before `</body>` -- doesn't matter) to create the global `skel` object:

```html
<script src="skel.min.js"></script>
```

Then use `skel.breakpoints()` to define your breakpoints (each consisting of a _name_ and a _media query_):

```js
skel.breakpoints({
	xlarge: "(max-width: 1680px)",
	large:  "(max-width: 1280px)",
	medium: "(max-width: 980px)",
	small:  "(max-width: 736px)",
	xsmall: "(max-width: 480px)"
});
```

That's pretty much it. You can now do stuff like:

```js
skel
	.on("ready", function() {

		/* do DOM ready stuff */

		if (skel.breakpoint("small").active) {
			/* do something specific for small displays */
		}

		if (skel.vars.touch) {
			/* enable feature for devices with a touchscreen */
		}

		if (skel.vars.IEVersion < 9) {
			/* apply workaround for IE<9 */
		}

	})
	.on("+large", function() {
		/* do something when "large" breakpoint becomes active */
	})
	.on("-large !large", function() {
		/* do something when "large" breakpoint is (or becomes) inactive */
	});
```


## Breakpoints

Skel's primary feature is its ability to make CSS breakpoints accessible via JS. To set this up, simply call `skel.breakpoints()` with a list of media queries (presumably mirroring those found in your CSS) in the following format:

```js
skel.breakpoints({
	name: "media query",
	name: "media query",
	name: "media query",
	...
});
```

Where _name_ is a unique identifier for each breakpoint (eg. `medium`). For example, the following defines 5 breakpoints (`xlarge`, `large`, `medium`, `small`, and `xsmall`):

```js
skel.breakpoints({
	xlarge: "(max-width: 1680px)",
	large:  "(max-width: 1280px)",
	medium: "(max-width: 980px)",
	small:  "(max-width: 736px)",
	xsmall: "(max-width: 480px)"
});
```

With these in place, individual _breakpoint objects_ can be retrieved using `skel.breakpoint()`, for example:

```js
// Get the "small" breakpoint object.
var x = skel.breakpoint("small");
```

Breakpoint objects have the following properties:

- `active`

	*(bool)* Set to `true` if the breakpoint is currently active (ie. the current state of the viewport satisfies its media query), or `false` if not.

- `wasActive`

	*(bool)* Set to `true` if the breakpoint *was* active before the last state change, or `false` if not.

- `name`

	*(string)* The breakpoint's name.

- `media`

	*(string)* The breakpoint's media query.


## Events

Skel provides a small set of common and breakpoint-oriented events. Handlers can be bound to these events using `skel.on()`, like so:

```js
skel.on("event", function() {
	/* do stuff */
});
```

You can also bind a single handler to multiple events by providing them in a space-delimited list:

```js
skel.on("event1 event2 ...", function() {
	/* do stuff */
});
```

The following events are currently supported:

- `change`

	Triggered when one or more breakpoints become active or inactive.

	```js
	skel.on("change", function() {
		alert("Breakpoints changed!");
	});
	```

- `init`

	Triggered when Skel initializes.

	```js
	skel.on("init", function() {
		alert("Initialized!");
	});
	```

- `ready`

	Triggered when the DOM is ready.

	```js
	skel.on("ready", function() {
		alert("DOM is ready!");
	});
	```

- `load`

	Triggered when the page loads.

	```js
	skel.on("load", function() {
		alert("Page has finished loading!");
	});
	```

- `+breakpointName`

	Triggered when `breakpointName` becomes active. For example:

	```js
	skel.on("+small", function() {
		/* Turn on feature for small displays */
	});
	```

- `-breakpointName`

	Triggered when `breakpointName` becomes inactive. For example:

	```js
	skel.on("-small", function() {
		/* Turn off feature for small displays */
	});
	```

- `!breakpointName`

	Triggered if `breakpointName` is not active at the exact moment you call `skel.breakpoints()`. For example:

	```js
	skel.on("!small", function() {
		/* Turn on feature for non-small displays */
	});
	```


## Vars

Skel exposes basic information about the client (such as its browser and operating system) through the `skel.vars` property. For example:

```js
alert("Your browser is " + skel.vars.browser);
```

This information can, among other things, be used to apply browser (and even operating system) specific workarounds for those rare but frustratingly annoying moments where feature detection fails. The following vars are currently available:

- `browser`

	*(string)* Client's browser, which can be any of the following:

	Browser           | Value of `browser`
	------------------|-------------------
	Firefox           | `firefox`
	Chrome            | `chrome`
	Safari            | `safari`
	Opera             | `opera`
	Internet Explorer | `ie`
	Edge              | `edge`
	BlackBerry        | `bb`
	Other             | `other`

- `browserVersion`

	*(float)* Client's browser version.

- `IEVersion`

	*(float)* If the client is using _any_ version of IE, this will be set to its version number (eg. `8` for IE8, `11` for IE11). However, if they're using anything *other* than IE, this will be set to `99`, effectively reducing legacy IE checks to a single condition. For example:

    ```js
    if (skel.vars.IEVersion < 9) {
    	/* This will only execute if the client's using IE AND its version is <9 */
    }
    ```

- `os`

	*(string)* Client's operating system, which can be any of the following:

    Operating System | Value of `os`
    -----------------|--------------
    Android          | `android`
    iOS              | `ios`
    Windows Phone    | `wp`
    Mac OS X         | `mac`
    Windows          | `windows`
	BlackBerry       | `bb`
	Other            | `other`

- `osVersion`

	*(float)* Client's operating system version.

- `touch`

	*(bool)* Set to `true` if the client is using a device with a touchscreen, or `false` if not.

	Note: A value of `true` does _not_ imply the abscence of a mouse and keyboard.

- `mobile`

	*(bool)* Set to `true` if the client is using what's considered a "mobile OS" (currently iOS, Android, Windows Phone, and BlackBerry), or `false` if not. Equivalent to:

	```js
	(skel.vars.os == "wp" || skel.vars.os == "android" || skel.vars.os == "ios" || skel.vars.os == "bb")
	```

- `stateId`

	*(string)* Current state ID. A state, in Skel terms, is a specific combination of active breakpoints, and a state ID is the unique identifier used to reference that state internally. For example, given the breakpoints `medium`, `small`, and `xsmall` (defined in that exact order):

	Active Breakpoints   | Value of `stateId`
	---------------------|-------------------
	`medium`             | `/medium`
	`small`              | `/small`
	`small` and `xsmall` | `/small/xsmall`
	(none)               | `/`

	While `stateId` is primarily meant for Skel's own internal use, it can come in handy elsewhere (eg. to perform an action when a very specific combination of breakpoints is active).

- `lastStateId`

	*(string)* The value of `stateId` before the last state change, or `null` if the state hasn't changed yet.


## Credits

- DOMReady (http://github.com/ded/domready | (c) Dustin Diaz | MIT license)
- matchMedia (http://github.com/paulirish/matchMedia.js | (c) Scott Jehl, Paul Irish, Nicholas Zakas, David Knight | Dual MIT/BSD license)
- UMD Wrapper (http://github.com/umdjs/umd/blob/master/returnExports.js | @umdjs + @nason)


## License

Skel is released under the MIT license.

Copyright (c) skel.io

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.