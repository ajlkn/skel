# Skel

Skel is a lightweight framework for building responsive sites and web apps.

- Minified production versions: [`dist/`](dist/)
- Documentation: [Skel](docs/skel.md), [Layout](docs/skel-layout.md), [Viewport](docs/skel-viewport.md), and [Skel.scss](docs/skel.scss.md)
- Unminified sources: [`src/`](src/)
- Baseline, a simple boilerplate built on Skel + Skel.scss: [github.com/n33/baseline](http://github.com/n33/baseline)

_(Looking for the previous version of Skel? Go here: [github.com/n33/skel.old](http://github.com/n33/skel.old))_


## Modules

Previous versions of Skel were basically monolithic (ie. `skel.min.js` contained **all** of Skel's functionality, even if you didn't need all of it). As of version 3, Skel uses a modular approach to give you more flexibility in how you use it. Here's how it (currently) breaks down:

- **Skel** (`skel.min.js`)

	_(Main framework)_ Provides JS access to CSS breakpoints, events, and other tools.

- **Layout** (`skel-layout.min.js`)

	_(Module)_ Adds CSS and page layout tools, including a CSS grid system, browser resets and more.

- **Viewport** (`skel-viewport.min.js`)

	_(Module)_ Adds simplified viewport management (including support for multiple viewport `<meta>` tags).

- **Skel.scss** (`_skel.scss`)

	_(Sass framework)_ A Sass-based implementation of Skel. Merges certain aspects of Skel and its Layout module (while adding some handy new mixins). Designed to work independently **or** in conjunction with Skel for added effect.


## Credits

- DOMReady (http://github.com/ded/domready | (c) Dustin Diaz | MIT license)
- matchMedia (http://github.com/paulirish/matchMedia.js | (c) Scott Jehl, Paul Irish, Nicholas Zakas, David Knight | Dual MIT/BSD license)
- UMD Wrapper (http://github.com/umdjs/umd/blob/master/returnExports.js | @umdjs + @nason)
- CSS Resets (http://meyerweb.com/eric/tools/css/reset | Eric Meyer | Public domain)
- Normalize (http://necolas.github.io/normalize.css | Nicolas Gallagher, Jonathan Neal | MIT License)
- Various Sass functions by Hugo Giraudel (http://hugogiraudel.com | @hugogiraudel)


## License

Skel, Layout, Viewport, and Skel.scss are released under the MIT license.

Copyright (c) n33

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
