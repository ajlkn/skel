/* skel.js v3.0.0 | (c) n33 | skel.io | MIT licensed */

var skel = (function() { "use strict"; var _ = {

	/******************************/
	/* Properties                 */
	/******************************/

		/**
		 * IDs of breakpoints that are currently active.
		 * @type {array}
		 */
		breakpointIds: null,

		/**
		 * Events.
		 * @type {object}
		 */
		events: {},

		/**
		 * Are we initialized?
		 * @type {bool}
		 */
		isInit: false,

		/**
		 * Objects.
		 * @type {object}
		 */
		obj: {

			// Attachments.
				attachments: {},

		 	// Breakpoints.
				breakpoints: {},

			// Head.
				head: null,

			// States.
				states: {}

		},

		/**
		 * State ID delimiter (don't change this).
		 * @type {string}
		 */
		sd: '/',

		/**
		 * Current state.
		 * @type {object}
		 */
		state: null,

		/**
		 * State handlers.
		 * @type {object}
		 */
		stateHandlers: {},

		/**
		 * Current state ID.
		 * @type {string}
		 */
		stateId: '',

		/**
		 * Internal vars.
		 * @type {object}
		 */
		vars: {},

	/******************************/
	/* Methods: Utility           */
	/******************************/

		/**
		 * Does stuff when the DOM is ready.
		 * @param {function} f Function.
		 */
		DOMReady: null,

		/**
		 * Wrapper/polyfill for (Array.prototype|String).indexOf.
		 * @param {Array|string} search Object or string to search.
		 * @param {integer} from Starting index.
		 * @return {integer} Matching index (or -1 if there's no match).
		 */
		indexOf: null,

		/**
		 * Wrapper/polyfill for Array.isArray.
		 * @param {array} x Variable to check.
		 * @return {bool} If true, x is an array. If false, x is not an array.
		 */
		isArray: null,

		/**
		 * Safe replacement for "for..in". Avoids stuff that doesn't belong to the array itself (eg. properties added to Array.prototype).
		 * @param {Array} a Array to iterate.
		 * @param {function} f(index) Function to call on each element.
		 */
		iterate: null,

		/**
		 * Determines if a media query matches the current browser state.
		 * @param {string} query Media query.
		 * @return {bool} True if it matches, false if not.
		 */
		matchesMedia: null,

		/**
		 * Extends x by y.
		 * @param {object} x Target object.
		 * @param {object} y Source object.
		 */
		extend: function(x, y) {

			_.iterate(y, function(k) {

				if (_.isArray(y[k])) {

					if (!_.isArray(x[k]))
						x[k] = [];

					_.extend(x[k], y[k]);

				}
				else if (typeof y[k] == 'object') {

					if (typeof x[k] != 'object')
						x[k] = {};

					_.extend(x[k], y[k]);

				}
				else
					x[k] = y[k];

			});

		},

		/**
		 * Creates a new style element.
		 * @param {string} content Content.
		 * @return {DOMHTMLElement} Style element.
		 */
		newStyle: function(content) {

			var e = document.createElement('style');
				e.type = 'text/css';
				e.innerHTML = content;

			return e;

		},

	/******************************/
	/* Methods: API               */
	/******************************/

		/**
		 * Temporary element for canUse()
		 * @type {DOMElement}
		 */
		_canUse: null,

		/**
		 * Determines if the browser supports a given property.
		 * @param {string} p Property.
		 * @return {bool} True if property is supported, false if not.
		 */
		canUse: function(p) {

			// Create temporary element if it doesn't already exist.
				if (!_._canUse)
					_._canUse = document.createElement('div');

			// Check for property.
				var e = _._canUse.style,
					up = p.charAt(0).toUpperCase() + p.slice(1);

				return	(
							p in e
						||	('Moz' + up) in e
						||	('Webkit' + up) in e
						||	('O' + up) in e
						||	('ms' + up) in e
				);

		},

	/******************************/
	/* Methods: Events            */
	/******************************/

		/**
		 * Registers one or more events.
		 * @param {string} names Space-delimited list of event names.
		 * @param {function} f Function.
		 */
		on: function(names, f) {

			var a = names.split(/[\s]+/);

			_.iterate(a, function(i) {

				var name = a[i];

				// Manually trigger event if applicable.
					if (_.isInit) {

						// Init.
							if (name == 'init') {

								// Trigger event.
									(f)();

								// This only gets called once, so there's no need to actually
								// register it.
									return;

							}

						// Change.
							else if (name == 'change') {

								// Trigger event.
									(f)();

							}

						// Activate / Not.
							else {

								var x = name.charAt(0);

								if (x == '+' || x == '!') {

									var y = name.substring(1);

									if (y in _.obj.breakpoints) {

										// Activate.
											if (x == '+' && _.obj.breakpoints[y].active) {

												// Trigger event.
													(f)();

											}

										// Not.
											else if (x == '!' && !_.obj.breakpoints[y].active) {

												// Trigger event.
													(f)();

												// This only gets called once, so there's no need to actually
												// register it.
													return;

											}

									}

								}

							}

					}

				// No previous events of this type registered? Set up its array.
					if (!_.events[name])
						_.events[name] = [];

				// Register event.
					_.events[name].push(f);

			});

			return _;

		},

		/**
		 * Triggers an event.
		 * @param {string} name Name.
		 */
		trigger: function(name) {

			// No events registered? Bail.
				if (!_.events[name] || _.events[name].length == 0)
					return;

			// Step through and call events.
				_.iterate(_.events[name], function(k) {
					(_.events[name][k])();
				});

			return _;

		},

	/******************************/
	/* Methods: Breakpoints       */
	/******************************/

		/**
		 * Gets a breakpoint.
		 * @param {string} id Breakpoint ID.
		 * @return {Breakpoint} Breakpoint.
		 */
		breakpoint: function(id) {
			return _.obj.breakpoints[id];
		},

		/**
		 * Sets breakpoints.
		 * @param {object} breakpoints Breakpoints.
		 */
		breakpoints: function(breakpoints) {

			// Breakpoint class.
				function Breakpoint(id, media) {

					this.name = this.id = id;
					this.media = media;
					this.active = false;
					this.wasActive = false;

				};

					Breakpoint.prototype.matches = function() {
						return (_.matchesMedia(this.media));
					};

					Breakpoint.prototype.sync = function() {

						this.wasActive = this.active;
						this.active = this.matches();

					};

			// Create breakpoints.
				_.iterate(breakpoints, function(id) {
					_.obj.breakpoints[id] = new Breakpoint(id, breakpoints[id]);
				});

			// Initial poll.
				window.setTimeout(function() {
					_.poll();
				}, 0);

			return _;

		},

	/******************************/
	/* Methods: States            */
	/******************************/

		/**
		 * Adds a state handler.
		 * @param {string} id ID.
		 * @param {function} f Handler function.
		 */
		addStateHandler: function(id, f) {

			// Add handler.
				_.stateHandlers[id] = f;

			// Call it.
				//_.callStateHandler(id);

		},

		/**
		 * Calls a state handler.
		 * @param {string} id ID.
		 */
		callStateHandler: function(id) {

			// Call handler.
				var attachments = (_.stateHandlers[id])();

			// Add attachments to state (if any).
				_.iterate(attachments, function(i) {
					_.state.attachments.push(attachments[i]);
				});

		},

		/**
		 * Switches to a different state.
		 * @param {string} newStateId New state ID.
		 */
		changeState: function(newStateId) {

			// Sync all breakpoints.
				_.iterate(_.obj.breakpoints, function(id) {
					_.obj.breakpoints[id].sync();
				});

			// Set last state var.
				_.vars.lastStateId = _.stateId;

			// Change state ID.
				_.stateId = newStateId;
				_.breakpointIds = (_.stateId === _.sd ? [] : _.stateId.substring(1).split(_.sd));

				console.log('[skel] changing states (id: "' + _.stateId + '")');

			// Get state.
				if (!_.obj.states[_.stateId]) {

					console.log('[skel] - not found. building ...');

					// Build state.
						_.obj.states[_.stateId] = {
							attachments: []
						};

						_.state = _.obj.states[_.stateId];

					// Call all state handlers.
						_.iterate(_.stateHandlers, _.callStateHandler);

				}
				else {

					console.log('[skel] - found');

					// Get state.
						_.state = _.obj.states[_.stateId];

				}

			// Detach all attachments *EXCEPT* state's.
				_.detachAll(_.state.attachments);

			// Attach state's attachments.
				_.attachAll(_.state.attachments);

			// Expose state and stateId as vars.
				_.vars.stateId = _.stateId;
				_.vars.state = _.state;

			// Trigger change event.
				_.trigger('change');

			// Trigger activate/deactivate events.
				_.iterate(_.obj.breakpoints, function(id) {

					// Breakpoint is now active ...
						if (_.obj.breakpoints[id].active) {

							// ... and it wasn't active before? Trigger activate event.
								if (!_.obj.breakpoints[id].wasActive)
									_.trigger('+' + id);

						}

					// Breakpoint is not active ...
						else {

							// ... but it was active before? Trigger deactivate event.
								if (_.obj.breakpoints[id].wasActive)
									_.trigger('-' + id);

						}

				});

		},

		/**
		 * Generates a state-specific config.
		 * @param {object} baseConfig Base config.
		 * @param {object} breakpointConfigs Breakpoint-specific configs.
		 * @return {object} State-specific config.
		 */
		generateStateConfig: function(baseConfig, breakpointConfigs) {

			var x = {};

			// Extend with base config.
				_.extend(x, baseConfig);

			// Extend with configs for each active breakpoint.
				_.iterate(_.breakpointIds, function(k) {
					_.extend(x, breakpointConfigs[_.breakpointIds[k]]);
				});

			return x;

		},

		/**
		 * Gets the current state ID.
		 * @return {string} State ID.
		 */
		getStateId: function() {

			var stateId = '';

			_.iterate(_.obj.breakpoints, function(id) {

				var b = _.obj.breakpoints[id];

				// Active? Append breakpoint ID to state ID.
					if (b.matches())
						stateId += _.sd + b.id;

			});

			return stateId;

		},

		/**
		 * Polls for state changes.
		 */
		poll: function() {

			var newStateId = '';

			// Determine new state.
				newStateId = _.getStateId();

				if (newStateId === '')
					newStateId = _.sd;

			// State changed?
				if (newStateId !== _.stateId)
					_.changeState(newStateId);

		},

	/******************************/
	/* Methods: Attachments       */
	/******************************/

		/**
		 * Attach point for attach()
		 * @type {DOMElement}
		 */
		_attach: null,

		/**
		 * Attaches a single attachment.
		 * @param {object} attachment Attachment.
		 * @return bool True on success, false on failure.
		 */
		attach: function(attachment) {

			var	h = _.obj.head,
				e = attachment.element;

			// Already attached? Bail.
				if (e.parentNode
				&&	e.parentNode.tagName)
					return false;

			// Add to <head>

				// No attach point yet? Use <head>'s first child.
					if (!_._attach)
						_._attach = h.firstChild;

				// Insert element.
					h.insertBefore(e, _._attach.nextSibling);

				// Permanent attachment? Make its element the new attach point.
					if (attachment.permanent)
						_._attach = e;

			console.log('[skel] ' + attachment.id + ': attached (' + attachment.priority + ')');

			return true;

		},

		/**
		 * Attaches a list of attachments.
		 * @param {array} attachments Attachments.
		 */
		attachAll: function(attachments) {

			var a = [];

			// Organize attachments by priority.
				_.iterate(attachments, function(k) {

					if (!a[ attachments[k].priority ])
						a[ attachments[k].priority ] = [];

					a[ attachments[k].priority ].push(attachments[k]);

				});

			// Reverse array order.
				a.reverse();

			// Step through each priority.
				_.iterate(a, function(k) {
					_.iterate(a[k], function(x) {
						_.attach(a[k][x]);
					});
				});

		},

		/**
		 * Detaches a single attachment.
		 * @param {object} attachment Attachment.
		 * @return bool True on success, false on failure.
		 */
		detach: function(attachment) {

			var	e = attachment.element;

			// Permanent or already detached? Bail.
				if (attachment.permanent
				||	!e.parentNode
				||	(e.parentNode && !e.parentNode.tagName))
					return false;

			// Detach.
				e.parentNode.removeChild(e);

			return true;

		},

		/**
		 * Detaches all attachments.
		 * @param {object} exclude A list of attachments to exclude.
		 */
		detachAll: function(exclude) {

			var l = {};

			// Build exclusion list (for faster lookups).
				_.iterate(exclude, function(k) {
					l[exclude[k].id] = true;
				});

			_.iterate(_.obj.attachments, function(id) {

				// In our exclusion list? Bail.
					if (id in l)
						return;

				// Attempt to detach.
					_.detach(_.obj.attachments[id]);

			});

		},

		attachment: function(id) {
			return (id in _.obj.attachments ? _.obj.attachments[id] : null);
		},

		/**
		 * Creates a new attachment.
		 * @param {string} id ID.
		 * @param {DOMElement} element DOM element.
		 */
		newAttachment: function(id, element, priority, permanent) {

			return (_.obj.attachments[id] = {
				id: id,
				element: element,
				priority: priority,
				permanent: permanent
			});

		},

	/******************************/
	/* Methods: Init              */
	/******************************/

		/**
		 * Initializes skel.
		 * This has to be explicitly called by the user.
		 */
		init: function() {

			// Initialize stuff.
				_.initMethods();
				_.initVars();
				_.initEvents();

			// Tmp.
				_.obj.head = document.getElementsByTagName('head')[0];

			// Mark as initialized.
				_.isInit = true;

			// Trigger init event.
				_.trigger('init');

			console.log('[skel] initialized.');

		},

		/**
		 * Initializes browser events.
		 */
		initEvents: function() {

			// On resize.
				_.on('resize', function() { _.poll(); });

			// On orientation change.
				_.on('orientationChange', function() { _.poll(); });

			// Wrap "ready" event.
				_.DOMReady(function() {
					_.trigger('ready');
				});

			// Non-destructively register skel events to window.

				// Load.
					if (window.onload)
						_.on('load', window.onload);

					window.onload = function() { _.trigger('load'); };

				// Resize.
					if (window.onresize)
						_.on('resize', window.onresize);

					window.onresize = function() { _.trigger('resize'); };

				// Orientation change.
					if (window.onorientationchange)
						_.on('orientationChange', window.onorientationchange);

					window.onorientationchange = function() { _.trigger('orientationChange'); };

		},

		/**
		 * Initializes methods.
		 */
		initMethods: function() {

			// _.DOMReady (based on github.com/ded/domready by @ded; domready (c) Dustin Diaz 2014 - License MIT)

				// Hack: Use older version for browsers that don't support addEventListener (*cough* IE8).
					if (!document.addEventListener)
						!function(e,t){_.DOMReady = t()}("domready",function(e){function p(e){h=1;while(e=t.shift())e()}var t=[],n,r=!1,i=document,s=i.documentElement,o=s.doScroll,u="DOMContentLoaded",a="addEventListener",f="onreadystatechange",l="readyState",c=o?/^loaded|^c/:/^loaded|c/,h=c.test(i[l]);return i[a]&&i[a](u,n=function(){i.removeEventListener(u,n,r),p()},r),o&&i.attachEvent(f,n=function(){/^c/.test(i[l])&&(i.detachEvent(f,n),p())}),e=o?function(n){self!=top?h?n():t.push(n):function(){try{s.doScroll("left")}catch(t){return setTimeout(function(){e(n)},50)}n()}()}:function(e){h?e():t.push(e)}});
				// And everyone else.
					else
						!function(e,t){_.DOMReady = t()}("domready",function(){function s(t){i=1;while(t=e.shift())t()}var e=[],t,n=document,r="DOMContentLoaded",i=/^loaded|^c/.test(n.readyState);return n.addEventListener(r,t=function(){n.removeEventListener(r,t),s()}),function(t){i?t():e.push(t)}});

			// _.indexOf

				// Wrap existing method if it exists.
					if (Array.prototype.indexOf)
						_.indexOf = function(x,b) { return x.indexOf(b) };

				// Otherwise, polyfill.
					else
						_.indexOf = function(x,b){if (typeof x=='string') return x.indexOf(b);var c,a=(b)?b:0,e;if(!this){throw new TypeError()}e=this.length;if(e===0||a>=e){return -1}if(a<0){a=e-Math.abs(a)}for(c=a;c<e;c++){if(this[c]===x){return c}}return -1};

			// _.isArray

				// Wrap existing method if it exists.
					if (Array.isArray)
						_.isArray = function(x) { return Array.isArray(x) };

				// Otherwise, polyfill.
					else
						_.isArray = function(x) { return (Object.prototype.toString.call(x) === '[object Array]') };

			// _.iterate

				// Use Object.keys if it exists (= better performance).
					if (Object.keys)
						_.iterate = function(a, f) {

							if (!a)
								return [];

							var i, k = Object.keys(a);

							for (i = 0; k[i]; i++) {

								if ((f)(k[i], a[k[i]]) === false)
									break;

							}

						};

				// Otherwise, fall back on hasOwnProperty (= slower, but works on older browsers).
					else
						_.iterate = function(a, f) {

							if (!a)
								return [];

							var i;

							for (i in a)
								if (Object.prototype.hasOwnProperty.call(a, i)) {

									if ((f)(i, a[i]) === false)
										break;

								}

						};

			// _.matchesMedia

				// Default: Use matchMedia (all modern browsers)
					if (window.matchMedia)
						_.matchesMedia = function(query) {

							if (query == '')
								return true;

							return window.matchMedia(query).matches;

						};

				// Polyfill 1: Use styleMedia/media (IE9, older Webkit) (derived from github.com/paulirish/matchMedia.js)
					else if (window.styleMedia || window.media)
						_.matchesMedia = function(query) {

							if (query == '')
								return true;

							var styleMedia = (window.styleMedia || window.media);

							return styleMedia.matchMedium(query || 'all');

						};

				// Polyfill 2: Use getComputed Style (???) (derived from github.com/paulirish/matchMedia.js)
					else if (window.getComputedStyle)
						_.matchesMedia = function(query) {

							if (query == '')
								return true;

							var	style = document.createElement('style'),
								script = document.getElementsByTagName('script')[0],
								info = null;

							style.type = 'text/css';
							style.id = 'matchmediajs-test';
							script.parentNode.insertBefore(style, script);
							info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

							var text = '@media ' + query + '{ #matchmediajs-test { width: 1px; } }';

							if (style.styleSheet)
								style.styleSheet.cssText = text;
							else
								style.textContent = text;

							return info.width === '1px';

						};

				// Polyfill 3: Manually parse (IE<9)
					else
						_.matchesMedia = function(query) {

							// Empty query? Always succeed.
								if (query == '')
									return true;

							// Parse query.
								var k, s, a, b, values = { 'min-width': null, 'max-width': null },
									found = false;

								a = query.split(/\s+and\s+/);

								for (k = 0; k < a.length; k++) {

									s = a[k];

									// Operator (key: value)
										if (s.charAt(0) == '(') {

											s = s.substring(1, s.length - 1);
											b = s.split(/:\s+/);

											if (b.length == 2) {

												values[ b[0].replace(/^\s+|\s+$/g, '') ] = parseInt( b[1] );
												found = true;

											}

										}

								}

							// No matches? Query likely contained something unsupported so we automatically fail.
								if (!found)
									return false;

							// Check against viewport.
								var w = document.documentElement.clientWidth,
									h = document.documentElement.clientHeight;

								if ((values['min-width'] !== null && w < values['min-width'])
								||	(values['max-width'] !== null && w > values['max-width'])
								||	(values['min-height'] !== null && h < values['min-height'])
								||	(values['max-height'] !== null && h > values['max-height']))
									return false;

							return true;

						};

			// _.newStyle

				// IE<9 fix.
					if (navigator.userAgent.match(/MSIE ([0-9]+)/)
					&&	RegExp.$1 < 9)
						_.newStyle = function(content) {

							var e = document.createElement('span');
								e.innerHTML = '&nbsp;<style type="text/css">' + content + '</style>';

							return e;

						};

		},

		/**
		 * Initializes the vars.
		 */
		initVars: function() {

			var x, y, a, ua = navigator.userAgent;

			// browser, browserVersion.
				x = 'other';
				y = 0;
				a = [
					['firefox',		/Firefox\/([0-9\.]+)/],
					['bb',			/BlackBerry.+Version\/([0-9\.]+)/],
					['bb',			/BB[0-9]+.+Version\/([0-9\.]+)/],
					['opera',		/OPR\/([0-9\.]+)/],
					['opera',		/Opera\/([0-9\.]+)/],
					['edge',		/Edge\/([0-9\.]+)/],
					['safari',		/Version\/([0-9\.]+).+Safari/],
					['chrome',		/Chrome\/([0-9\.]+)/],
					['ie', 			/MSIE ([0-9]+)/],
					['ie',			/Trident\/.+rv:([0-9]+)/]
				];

				_.iterate(a, function(k, v) {

					if (ua.match(v[1])) {

						x = v[0];
						y = parseFloat(RegExp.$1);

						return false;

					}

				});

				_.vars.browser = x;
				_.vars.browserVersion = y;

			// os, osVersion.
				x = 'other';
				y = 0;
				a = [
					['ios',			/([0-9_]+) like Mac OS X/,			function(v) { return v.replace('_', '.').replace('_', ''); }],
					['ios',			/CPU like Mac OS X/,				function(v) { return 0 }],
					['android',		/Android ([0-9\.]+)/,				null],
					['mac',			/Macintosh.+Mac OS X ([0-9_]+)/,	function(v) { return v.replace('_', '.').replace('_', ''); }],
					['wp',			/Windows Phone ([0-9\.]+)/,			null],
					['windows',		/Windows NT ([0-9\.]+)/,			null],
					['bb',			/BlackBerry.+Version\/([0-9\.]+)/,	null],
					['bb',			/BB[0-9]+.+Version\/([0-9\.]+)/,	null]
				];

				_.iterate(a, function(k, v) {

					if (ua.match(v[1])) {

						x = v[0];
						y = parseFloat( v[2] ? (v[2])(RegExp.$1) : RegExp.$1 );

						return false;

					}

				});

				_.vars.os = x;
				_.vars.osVersion = y;

			// IEVersion.
				_.vars.IEVersion = (_.vars.browser == 'ie' ? _.vars.browserVersion : 99);

			// touch.
				_.vars.touch = (_.vars.os == 'wp' ? (navigator.msMaxTouchPoints > 0) : !!('ontouchstart' in window));

			// mobile.
				_.vars.mobile = (_.vars.os == 'wp' || _.vars.os == 'android' || _.vars.os == 'ios' || _.vars.os == 'bb');

		},

}; _.init(); return _; })();

// UMD Wrapper (github.com/umdjs/umd/blob/master/returnExports.js | @umdjs + @nason)
(function(root, factory) {

	// AMD.
		if (typeof define === 'function' && define.amd)
			define([], factory);

	// Node.
		else if (typeof exports === 'object')
			module.exports = factory();

	// Browser global.
		else
			root.skel = factory();

}(this, function() { return skel; }));
