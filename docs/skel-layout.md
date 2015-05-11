# Skel: Layout

Layout is a Skel module that adds an assortment of handy CSS and page layout tools, including:

- A powerful, fully responsive CSS grid system.
- Built-in browser resets (using either [Normalize.css](http://necolas.github.io/normalize.css) or [Eric Meyer's resets](http://meyerweb.com/eric/tools/css/reset)).
- Handy utility classes (like `container`).


## Usage

First, load both `skel.min.js` and `skel-layout.min.js`:

```html
<script src="skel.min.js"></script>
<script src="skel-layout.min.js"></script>
```

Then use `skel.layout()` to turn on the features you want to use. For example, these options:

```js
skel.layout({
	reset: "normalize",
	grid: true,
	containers: true
});
```

Enable the following features:

- Resets (using **Normalize.css**)
- Grid system (with the default `40px` column gutters)
- Containers (at the default `960px`)

You can also override your default `grid` and `containers` options at a breakpoint level, which allows you to, for example, set `containers` to one value at your `medium` breakpoint, and another at your `small` breakpoint. To do this, first define your breakpoints with `skel.breakpoints()`:

```js
skel.breakpoints({
	xlarge: "(max-width: 1680px)",
	large:  "(max-width: 1280px)",
	medium: "(max-width: 980px)",
	small:  "(max-width: 736px)",
	xsmall: "(max-width: 480px)"
});
```

Then use `skel.layout()` to turn on your features, only this time with the `breakpoints` option to set overrides at certain breakpoints:

```js
skel.layout({
	reset: "normalize",
	containers: true,
	grid: true,
	breakpoints: {
		medium: {
			containers: "90%"
		},
		small: {
			containers: "95%",
			grid: { gutters: 20 }
		},
		xsmall: {
			grid: { gutters: 10 }
		}
	}
});
```

This, like before, results in the following by default:

- Resets (using **Normalize.css**)
- Grid system (with the default `40px` column gutters)
- Containers (at the default `960px`)

But since there are now breakpoint-level overrides set for `grid` and `containers`, when `medium` is active you get:

- Grid system (with the default `40px` column gutters)
- Containers (at `90%`)

... when `small` is active you get:

- Grid system (with `20px` column gutters)
- Containers (at `95%`)

... and, finally, when `xsmall` is active you get:

- Grid system (with `10px` column gutters)
- Containers (at `95%`)

Note that overrides can "stack" if more than one breakpoint is active. For example, in this case `small` will always be active when `xsmall` is active, so the latter will end up inheriting the former's overrides (`containers`) as its defaults.


## Resets

All browsers apply a default stylesheet to pages to ensure common elements (like `<h1>` and `<p>`) have at least some basic styling going in. Since these defaults can vary from browser to browser (resulting in unpredictable effects on your own styling), resetting them to a predictable state is generally a good idea. Layout can do this for you by setting its `reset` option to one of the following values:

- `"normalize"`

	Reset browser styles with [Normalize.css](http://necolas.github.io/normalize.css), which will iron out browser inconsistencies while leaving some basic styling intact.

- `"full"`

	Completely nuke **all** browser styles with [Eric Meyer's CSS resets](http://meyerweb.com/eric/tools/css/reset). Useful if you're planning to style everything from scratch yourself and don't want any defaults getting in the way.

For example, the following resets your browser styles with Normalize.css:

```js
skel.layout({
	reset: "normalize"
});
```


## Containers

Normally, content will fill the width of the browser window and only wrap to a new line once it hits a side:

```
+-----------------------------------------------------+
| Lorem ipsum dolor sit amet, consectetur adipiscing  |
| elit. Aenean pharetra vel odio venenatis dignissim. |
| Integer nibh enim, tincidunt fringilla lacinia eu,  |
| feugiat tempor mi. Proin hendrerit, nisl a pretium, |
| nisi erat varius risus, sit feugiat.                |
+-----------------------------------------------------+
```

Which is fine on smaller screens, but on larger ones it makes lines of text so long the readability of the page suffers. **Containers** address this by "wrapping" content in elements of a defined (and usually fixed) width, resulting in a much more readable page:

```
+-----------------------------------------------------+
|             Lorem ipsum dolor sit amet,             |
|             consectetur adipiscing elit.            |
|             Aenean pharetra vel odio                |
|             venenatis dignissim. Integer            |
|             nibh enim, tincidunt fringilla          |
|             lacinia eu, feugiat tempor mi           |
|             Proin hendrerit, nisl pretium,          |
|             nisi varius risus feugiat.              |
+-----------------------------------------------------+
```

Layout will automatically generate a `container` class when its `containers` option* is set to true (which uses the default size of `960px`), or a valid CSS measurement value (eg. `960`, `"960px"`, `"60em"`, `"75%"`, `"30vw"`). For example, the following sets up the `container` class at `1140px`:

```js
skel.layout({
	containers: 1140
});
```

Which can then be used like this:

```html
<div class="container">
	<h2>A Container</h2>
	<p>This is a container. It's typically used to give content
	fixed boundaries so it doesn't look all weird and unreadable
	on larger screens.</p>
</div>
```

_*_ = Can be overridden at a breakpoint level.


### Modifiers

Individual containers can also be given a **modifier** class to make minor on-the-fly size adjustments. For example, assuming your container size is `960px`:

```html
<div class="container">
	This is 960px.
</div>
<div class="container 75%">
	... this is 720px (75% of 960px).
</div>
<div class="container 125%">
	... and this is 1200px (125% of 960px).
</div>
```

The following modifiers are supported:

- `25%`

    Narrows this container to 25% normal container width.

- `50%`

    Narrows this container to 50% normal container width.

- `75%`

    Narrows this container to 75% normal container width.

- `125%`

    Widens this container to 125% normal container width.


### Locking

Locking forces all containers to a specific size **regardless** of any modifiers they're using. To turn this on, simply append a `!` to your `containers` value; for example, this locks all containers to `95%`:

```js
skel.layout({
	containers: "95%!"
});
```

While seemingly useless on the surface, this feature really comes in handy when working with breakpoints. For example, given the following:

```js
skel.breakpoints({
	xlarge: "(max-width: 1680px)",
	large:  "(max-width: 1280px)",
	medium: "(max-width: 980px)",
	small:  "(max-width: 736px)",
	xsmall: "(max-width: 480px)"
});
```

And this Layout configuration:

```js
skel.layout({
	containers: 960,
	breakpoints: {
		medium: {
			containers: "90%"
		},
		small: {
			containers: "95%",
		}
	}
});
```

Any container using a "narrowing" modifier (like `25%` or `50%`) will end up looking incredibly cramped when `small` is active. However, thanks to locking this isn't a problem; simply force all of your containers to `95%` when that's the case:

```js
skel.layout({
	containers: 960,
	breakpoints: {
		medium: {
			containers: "90%"
		},
		small: {
			containers: "95%!",
		}
	}
});
```


## Conditionals

If you've defined breakpoints with `skel.breakpoints()`, Layout can automatically generate **conditional classes** that hide/show elements based on whether a particular breakpoint is active or inactive. To enable this feature, set the `conditionals` option to `true`:

```js
skel.layout({
	conditionals: true
});
```

Conditional classes take the following forms:

- `only-breakpointName`

    Only show this element when `breakpointName` is active.

- `not-breakpointName`

    Only show this element when `breakpointName` is not active.

For example, given these breakpoints:

```js
skel.breakpoints({
	large:  "(max-width: 1280px)",
	medium: "(max-width: 980px)",
	small:  "(max-width: 736px)",
});
```

Layout will generate the following classes:

- `only-large`

    Visible only when large is active.

- `not-large`

    Hidden when large is active.

- `only-medium`

    Visible only when medium is active.

- `not-medium`

    Hidden when medium is active.

- `only-small`

    Visible only when small is active.

- `not-small`

    Hidden when small is active.

Which you can then use to do stuff like:

```html
<p class="only-large">You can only see this on large screens.</p>
<p class="only-medium">You can only see this on medium screens.</p>
<p class="only-small">You can only see this on small screens.</p>
<p class="not-large">You can see this on anything but a large screen.</p>
<p class="not-medium">You can see this on anything but a medium screen.</p>
<p class="not-small">You can see this on anything but a small screen.</p>
```


## Grid

Layout's grid system provides a simple, structured way to quickly build out complex yet fully responsive page layouts. To enable this feature, set the `grid` option* to `true`:

```js
skel.layout({
	grid: true
});
```

_*_ = Can be overridden at a breakpoint level.


### Usage

Grids are made up of two components:

- Cells

	- Where content lives.
	- Assigned a **unit width** (by way of a class) to indicate how much space it takes up when placed in a row (see below).
	- Can be anywhere from 1 unit wide (`1u`) to 12 units wide (`12u`).
	- Here's what 6 unit-wide (`6u`) cell looks like:

	```html
	<div class="6u">
		<h2>Hi!</h2>
		<p>I'm a 6 unit-wide cell.</p>
	</div>
	```

- Rows

	- Where cells live.
	- Can hold any number of cells in any order.
	- Contained cells automatically wrap to new lines every 12 units or immediately following a cell that includes a **terminator** (`$`) with its unit width (eg. `6u$`).
	- Contained cells are spaced out with **column gutters**.
	- Adjacent rows and lines within rows can be (optionally) spaced out with **row gutters**.
	- Fluid, so they'll expand or contract to fill whatever space is available (proportionally resizing all contained cells in the process).
	- Here's what a row with three cells (a `2u`, a `4u`, and a `6u`) looks like:

	```html
	<div class="row">
		<div class="2u">Two</div>
		<div class="4u">Four</div>
		<div class="6u">Six</div>
	</div>
	```

You only need a single row to create a grid, but you can combine them to create more complex layouts. For example:

```html
<div class="row">
	<div class="12u">Twelve</div>
</div>
<div class="row">
	<div class="8u">Eight</div>
	<div class="4u">Four</div>
</div>
<div class="row">
	<div class="4u">Four</div>
	<div class="4u">Four</div>
	<div class="4u">Four</div>
</div>
```

You can also create the same layout as above using just a single row and terminators (placed every 12 units):

```html
<div class="row">
	<div class="12u$">Twelve</div>
	<div class="8u">Eight</div>
	<div class="4u$">Four</div>
	<div class="4u">Four</div>
	<div class="4u">Four</div>
	<div class="4u$">Four</div>
</div>
```

You can even nest rows _inside_ cells:

```html
<div class="row">
	<div class="12u">Twelve</div>
</div>
<div class="row">
	<div class="8u">
		<div class="row">
			<div class="12u">Twelve</div>
		</div>
		<div class="row">
			<div class="8u">Eight</div>
			<div class="4u">Four</div>
		</div>
		<div class="row">
			<div class="4u">Four</div>
			<div class="4u">Four</div>
			<div class="4u">Four</div>
		</div>
	</div>
	<div class="4u">Four</div>
</div>
<div class="row">
	<div class="4u">Four</div>
	<div class="4u">Four</div>
	<div class="4u">Four</div>
</div>
```

Which works just as well when using terminators:

```html
<div class="row">
	<div class="12u$">Twelve</div>
	<div class="8u">
		<div class="row">
			<div class="12u$">Twelve</div>
			<div class="8u">Eight</div>
			<div class="4u$">Four</div>
			<div class="4u">Four</div>
			<div class="4u">Four</div>
			<div class="4u$">Four</div>
		</div>
	</div>
	<div class="4u$">Four</div>
	<div class="4u">Four</div>
	<div class="4u">Four</div>
	<div class="4u$">Four</div>
</div>
```

### Gutters

Gutters are the gaps placed between cells and (optionally) rows. **Column gutters** (which space out cells) are set to `40px` by default, but can be changed by passing a CSS measurement value to the `grid` sub-option `gutters`. For example, this sets column gutters to `1.5em`:

```js
skel.layout({
	grid: {
		gutters: "1.5em"
	}
});
```

Optional **row gutters** can also be used to space out adajcent rows (as well as lines of cells within rows). To use these, simply pass a two-value array to `gutters` to set values for both your column and row gutters (in that order). For example, this sets column gutters to `1.5em` and row gutters to `2em`:

```js
skel.layout({
	grid: {
		gutters: ["1.5em", "2em"]
	}
});
```


### Row Modifiers

Individual rows can also be given one of the following **modifier** classes to make minor on-the-fly adjustments to their gutter sizes:

- `0%`

	Removes gutters from this row's cells.

- `25%`

	Decreases gutters for this row's cells to 25% normal size.

- `50%`

	Decreases gutters for this row's cells to 50% normal size.

- `150%`

	Increases gutters for this row's cells to 150% normal size.

- `200%`

	Increases gutters for this row's cells to 200% normal size.

- `uniform`

	Applies row gutters to this row's cells that are **equal** to its column gutters.


### Offsetting

Cells can be offset (or "nudged") by a number of units using an **offset class**. Offset classes take the form of `-Nu` (where `N` is the number of units to offset). For example:

```html
<div class="row">
	<div class"8u">
		Eight (not offset)
	</div>
</div>
<div class="row">
	<div class="8u -4u">
		Eight (offset by four)
	</div>
</div>
```

You can also offset multiple cells within a row:

```html
<div class="row">
	<div class="5u">
		Five
	</div>
	<div class="5u -2u">
		Five
	</div>
</div>
<div class="row">
	<div class="6u -3u">
		Six
	</div>
</div>
<div class="row">
	<div class="3u">
		Three
	</div>
	<div class="3u -6u">
		Three
	</div>
</div>
```

Note: Offsets take up row space just like any other cell. They can also be used responsively (for example, `4u -4u 5u(medium) -1u(medium)`).


### Responsiveness

Occasionally, you may run into a situation where a grid layout doesn't really play well across all screen sizes. For example, this grid works fine on a larger screens:

```
+-----------------------+------------+------------+
|        Content        |  Sidebar1  |  Sidebar2  |
+-----------------------+------------+------------+
```

But not so well on smaller ones:

```
+------------------+--------+--------+
|      Content     |  Sbr1  |  Sbr2  |
+------------------+--------+--------+

+--------+----+----+
|Content |Sb1 |Sb2 |
+--------+----+----+
```

In which case, it'd be great if you could dynamically rearrange it into something a bit more optimal:

```
+-------------------------------------+
|               Content               |
+------------------+------------------+
|     Sidebar1     |     Sidebar2     |
+------------------+------------------+

+------------------+
|     Content      |
+------------------+
|     Sidebar1     |
+------------------+
|     Sidebar2     |
+------------------+
```

The grid system's responsive capabilities enable you to do just that.


#### How it works

First, define your breakpoints with `skel.breakpoints()` (**before** you call `skel.layout()`):

```js
skel.breakpoints({
	medium: "(min-width: 769px) and (max-width: 1024px)",
	small:  "(max-width: 768px)",
	xsmall: "(max-width: 480px)"
});
```

Now, simply give your cells one or more alternate unit widths in the format of `Nu(breakpointName)` (or `Nu$(breakpointName)` when using a terminator) where `N` is the width and `breakpointName` is the breakpoint where it kicks in. For example:

```html
<div class="3u 6u(small) 12u(xsmall)">
	Sidebar1
</div>
```

This cell will now automatically switch between three different widths (`3u`, `6u`, or `12u`) depending on which breakpoints are active, specifically:

- `3u` when neither `small` nor `xsmall` are active.
- `6u` when `small` is active.
- `12u` when `xsmall` is active.

Note: Precedence is determined by the order in which you defined your breakpoints (lower in the list = higher in precedence). In this case, if `medium`, `small`, and `xsmall` are active at the same time, `xsmall` takes precedence along with its alternate width (`12u`) because it's defined after both `medium` and `small`.


#### Examples

With alternate unit widths assigned to multiple cells, a grid can very easily rearrange itself into a number of different layouts. For example, here's the responsive version of that grid from earlier:

```html
<div class="row">
	<div class="6u 12u$(small)">
		Content
	</div>
	<div class="3u 6u(small) 12u$(xsmall)">
		Sidebar1
	</div>
	<div class="3u$ 6u$(small) 12u$(xsmall)">
		Sidebar2
	</div>
</div>
```

Of course, this feature really shines when it's used with more complex layouts, for instance:

```html
<div class="row">
	<div class="6u 12u$(medium)">
		<h3>Welcome!</h3>
		<p>Nunc lacinia ante nunc ac lobortis. Interdum adipiscing gravida odio porttitor sem non mi integer non faucibus ornare mi ut ante amet placerat aliquet.</p>
	</div>
	<div class="3u 6u(medium) 12u$(xsmall)">
		<h3>Info 1</h3>
		<p>Nunc lacinia ante nunc ac lobortis. Interdum adipiscing aliquet. Volutpat eu sed ante.</p>
	</div>
	<div class="3u 6u$(medium) 12u$(xsmall)">
		<h3>Info 2</h3>
		<p>Nunc lacinia ante nunc ac lobortis. Interdum adipiscing aliquet. Volutpat eu sed ante.</p>
	</div>
</div>
<div class="row">
	<div class="3u 6u(medium) 12u$(xsmall)">
		<h3>Feature 1</h3>
		<p>Nunc lacinia ante nunc ac lobortis. Interdum adipiscing aliquet
		viverra nibh in adipiscing blandit tempus accumsan.</p>
	</div>
	<div class="3u 6u$(medium) 12u$(xsmall)">
		<h3>Feature 2</h3>
		<p>Nunc lacinia ante nunc ac lobortis. Interdum adipiscing aliquet
		viverra nibh in adipiscing blandit tempus accumsan.</p>
	</div>
	<div class="3u 6u(medium) 12u$(xsmall)">
		<h3>Feature 3</h3>
		<p>Nunc lacinia ante nunc ac lobortis. Interdum adipiscing aliquet
		viverra nibh in adipiscing blandit tempus accumsan.</p>
	</div>
	<div class="3u$ 6u$(medium) 12u$(xsmall)">
		<h3>Feature 4</h3>
		<p>Nunc lacinia ante nunc ac lobortis. Interdum adipiscing aliquet
		viverra nibh in adipiscing blandit tempus accumsan.</p>
	</div>
</div>
<div class="row uniform 50%">
	<div class="2u 3u(medium) 4u(small) 6u(xxsmall)"><span class="thumbnail">1</span></div>
	<div class="2u 3u(medium) 4u(small) 6u(xxsmall)"><span class="thumbnail">2</span></div>
	<div class="2u 3u(medium) 4u(small) 6u(xxsmall)"><span class="thumbnail">3</span></div>
	<div class="2u 3u(medium) 4u(small) 6u(xxsmall)"><span class="thumbnail">4</span></div>
	<div class="2u 3u(medium) 4u(small) 6u(xxsmall)"><span class="thumbnail">5</span></div>
	<div class="2u 3u(medium) 4u(small) 6u(xxsmall)"><span class="thumbnail">6</span></div>
</div>
```


#### Prioritizing a Cell

You may run into a situation where, at a certain breakpoint, an important cell (say, your main content) gets pushed below a less important one (like, say, a sidebar). For example:

```html
<div class="row">
	<div class="4u 12u$(small)">
		Sidebar
	</div>
	<div class="8u$ 12u$(small)">
		Main Content
	</div>
</div>
```

... which is probably not what you want. To prevent this, give your important cell the `important(breakpointName)` class to temporarily move it to the front of its row whenever `breakpointName` is active. In this case, applying it to the main content cell with `small` pushes it back above the sidebar as desired:

```html
<div class="row">
	<div class="4u 12u$(small)">
		Sidebar
	</div>
	<div class="8u$ 12u$(small) important(small)">
		Main Content
	</div>
</div>
```

Note: The `important(breakpointName)` class can only be used once per row.


## Credits

- CSS Resets (http://meyerweb.com/eric/tools/css/reset | Eric Meyer | Public domain)
- Normalize (http://necolas.github.io/normalize.css | Nicolas Gallagher, Jonathan Neal | MIT License)


## License

Layout is released under the MIT license.

Copyright (c) n33

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.