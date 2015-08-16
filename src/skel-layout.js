/* skel-layout.js v3.0.0 | (c) n33 | skel.io | MIT licensed */

(function(_) { "use strict"; var __ = {

	/******************************/
	/* Properties                 */
	/******************************/

		/**
		 * Default config.
		 * @type {object}
		 */
		config: {

			// Breakpoints.
				breakpoints: {},

			// Box model (false = don't apply a box model).
				boxModel: false,

			// Conditionals.
				conditionals: false,

			// Width of container elements (N, 'Npx', 'Nem', etc).
				containers: false,

			// Grid.
				grid: false,

			// Stylesheet.
				href: false,

			// Reset mode (false = don't reset, 'normalize' = normalize.css, 'full' = Eric Meyer's resets).
				reset: false

		},

		/**
		 * CSS code (normalize, reset).
		 * @type {object}
		 */
		css: {

			// Box model.
				bm: '*,*:before,*:after{-moz-box-sizing:&-box;-webkit-box-sizing:&-box;box-sizing:&-box}',

			// Normalize.
			// normalize.css v3.0.2 | MIT License | git.io/normalize
				n: 'html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:700}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button{overflow:visible}button,select{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{border:0;padding:0}textarea{overflow:auto}optgroup{font-weight:700}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}',

			// Reset.
			// http://meyerweb.com/eric/tools/css/reset/ v2.0 | 20110126 | License: none (public domain)
				r: 'html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:\'\';content:none}table{border-collapse:collapse;border-spacing:0}body{-webkit-text-size-adjust:none}',

			// Grid cells.
				gc: function(x) {
					return	'.\\31 2u'+x+',.\\31 2u\\24'+x+'{width:100%;clear:none;margin-left:0}' +
							'.\\31 1u'+x+',.\\31 1u\\24'+x+'{width:91.6666666667%;clear:none;margin-left:0}' +
							'.\\31 0u'+x+',.\\31 0u\\24'+x+'{width:83.3333333333%;clear:none;margin-left:0}' +
							'.\\39 u'+x+',.\\39 u\\24'+x+'{width:75%;clear:none;margin-left:0}' +
							'.\\38 u'+x+',.\\38 u\\24'+x+'{width:66.6666666667%;clear:none;margin-left:0}' +
							'.\\37 u'+x+',.\\37 u\\24'+x+'{width:58.3333333333%;clear:none;margin-left:0}' +
							'.\\36 u'+x+',.\\36 u\\24'+x+'{width:50%;clear:none;margin-left:0}' +
							'.\\35 u'+x+',.\\35 u\\24'+x+'{width:41.6666666667%;clear:none;margin-left:0}' +
							'.\\34 u'+x+',.\\34 u\\24'+x+'{width:33.3333333333%;clear:none;margin-left:0}' +
							'.\\33 u'+x+',.\\33 u\\24'+x+'{width:25%;clear:none;margin-left:0}' +
							'.\\32 u'+x+',.\\32 u\\24'+x+'{width:16.6666666667%;clear:none;margin-left:0}' +
							'.\\31 u'+x+',.\\31 u\\24'+x+'{width:8.3333333333%;clear:none;margin-left:0}' +
							'.\\31 2u\\24'+x+'+*,' +
							'.\\31 1u\\24'+x+'+*,' +
							'.\\31 0u\\24'+x+'+*,' +
							'.\\39 u\\24'+x+'+*,' +
							'.\\38 u\\24'+x+'+*,' +
							'.\\37 u\\24'+x+'+*,' +
							'.\\36 u\\24'+x+'+*,' +
							'.\\35 u\\24'+x+'+*,' +
							'.\\34 u\\24'+x+'+*,' +
							'.\\33 u\\24'+x+'+*,' +
							'.\\32 u\\24'+x+'+*,' +
							'.\\31 u\\24'+x+'+*{' +
								'clear:left;' +
							'}' +
							'.\\-11u'+x+'{margin-left:91.6666666667%}' +
							'.\\-10u'+x+'{margin-left:83.3333333333%}' +
							'.\\-9u'+x+'{margin-left:75%}' +
							'.\\-8u'+x+'{margin-left:66.6666666667%}' +
							'.\\-7u'+x+'{margin-left:58.3333333333%}' +
							'.\\-6u'+x+'{margin-left:50%}' +
							'.\\-5u'+x+'{margin-left:41.6666666667%}' +
							'.\\-4u'+x+'{margin-left:33.3333333333%}' +
							'.\\-3u'+x+'{margin-left:25%}' +
							'.\\-2u'+x+'{margin-left:16.6666666667%}' +
							'.\\-1u'+x+'{margin-left:8.3333333333%}'

				}

		},

		/**
		 * Grid responsive level map.
		 * @type object
		 */
		gridLevelMap: { k: {}, v: {} },

		/**
		 * Maximum grid responsive level.
		 * @type integer
		 */
		gridLevelMax: 1,

		/**
		 * State config cache.
		 * @type object
		 */
		stateConfigs: {},

	/******************************/
	/* Methods                    */
	/******************************/

		/**
		 * Applies grid transforms.
		 */
		applyGridTransforms: function() {

			var config = __.stateConfigs[_.stateId];

			// Shifts cells marked as "important" to the front of their respective rows.
				var key = '_skel_important', cells = [],
					i, a;

				// Get "important" cells.

					// Via responsive level.
						for (i=1; i <= __.gridLevelMax; i++) {

							a = document.querySelectorAll('.important\\28 ' + __.gridLevelMap.k[i] + '\\29');

							_.iterate(a, function(k) {
								cells.push(a[k]);
							});

						}

				// Step through cells.
					_.iterate(cells, function(i) {

						// Just in case.
							if (i === 'length')
								return;

						var cell = cells[i], parent = cell.parentNode,
							placeholder, mode = false, k, l;

						// No parent? Bail.
							if (!parent)
								return;

						// Not moved? Move it.
							if (!Object.prototype.hasOwnProperty.call(cell, key) || cell[key] === false) {

								// Determine mode.

									// Responsive level?
										if (cell.className.match(/important\((.+)\)/) && (l = parseInt(__.gridLevelMap.v[RegExp.$1])) <= config.grid.level)
											mode = 'l';

								// No valid mode? Bail.
									if (!mode)
										return;

								// Get placeholder node (which will serve as our point of reference for when this cell needs to move back).
									k = 'previousSibling';

									placeholder = cell[k];

									while ( placeholder && placeholder.nodeName == '#text' )
										placeholder = placeholder[k];

									// Couldn't find anything? Means this cell's already at the front, so bail.
										if (!placeholder)
											return;

								// Move cell to front.
									console.log('[skel-layout] important: moving to front of row (' + i + ')');

									parent.insertBefore(
										cell,
										parent.firstChild
									);

								// Mark cell as moved.
									cell[key] = {
										placeholder: placeholder,
										mode: mode,
										level: l
									};

							}

						// Moved already?
							else {

								placeholder = cell[key].placeholder;
								mode = cell[key].mode;

								// Cell doesn't need to move? Bail.
									if (mode == 'l' && cell[key].level <= config.grid.level)
										return;

								// Move cell back to its original location (using our placeholder).
									console.log('[skel-layout] important: moving back (' + i + ')');

									parent.insertBefore(
										cell,
										placeholder.nextSibling
									);

								// Unmark cell as moved.
									cell[key] = false;

							}

					});

		},

		/**
		 * Initializes layout module.
		 * @param {object} config Config.
		 */
		init: function(config) {

			// Extend with user config.
				_.extend(__.config, config);

			// Add state handler.
				_.addStateHandler('layout', __.stateHandler);

			// Reorder (and, if necessary, fill out) breakpoints.
				var c = {};

				_.iterate(_.obj.breakpoints, function(id) {

					c[id] = {};

					if (id in __.config.breakpoints)
						_.extend(c[id], __.config.breakpoints[id]);

				});

				__.config.breakpoints = c;

			// Containers.
				if (__.config.containers) {

					// Apply defaults if value is just 'true'.
						if (__.config.containers === true)
							__.config.containers = 960;

				}

			// Grid.
				if (__.config.grid) {

					// Apply defaults if value is just 'true'.
						if (__.config.grid === true)
							__.config.grid = {

								// Responsive level.
									level: 1,

								// Size of column gutters (N, 'Npx', 'Nem', etc).
								// Use [column, row] to set both column and row gutters.
									gutters: 40

							};

					// Assign responsive levels.
						_.iterate(__.config.breakpoints, function(id) {

							var c = __.config.breakpoints[id];

							__.gridLevelMax++;

							if (!('grid' in c))
								c.grid = {};

							// Set responsive level.
								c.grid.level = __.gridLevelMax;

							// Update map (breakpoint ID => responsive level)
								__.gridLevelMap.k[__.gridLevelMax] = id;
								__.gridLevelMap.v[id] = __.gridLevelMax;

						});

					// Set up change event.
						_.on('change', function() {
							__.applyGridTransforms();
						});

				}

			// STYLE: Base CSS.
				var s = '';

				// Reset.
					switch (__.config.reset) {

						case 'full':
							s += __.css.r;
							break;

						case 'normalize':
							s += __.css.n;
							break;

					}

				// Box model.
					if (__.config.boxModel)
						s += __.css.bm.split('&').join(__.config.boxModel);

				// Grid.
					if (__.config.grid)
						s +=	'.row{border-bottom:solid 1px transparent;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}' +
								'.row>*{float:left;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}' +
								'.row:after,.row:before{content:"";display:block;clear:both;height:0}' +
								'.row.uniform>*>:first-child{margin-top:0}' +
								'.row.uniform>*>:last-child{margin-bottom:0}' +
								__.css.gc('');

				// Create and attach a <style> element if we actually have stuff to put in it.
					if (s != '')
						_.attach(_.newAttachment(
							'sB',
							_.newStyle(s),
							2,
							true
						));

			// STYLESHEET: Base.
				if (__.config.href)
					_.attach(_.newAttachment(
						'ss',
						__.newStyleSheet(__.config.href),
						3,
						true
					));

			return _;

		},

		/**
		 * Creates a new stylesheet <link> element.
		 * @param {string} href Href.
		 * @return {DOMElement} Viewport <meta> element.
		 */
		newStyleSheet: function(href) {

			var e = document.createElement('link');
				e.rel = 'stylesheet';
				e.type = 'text/css';
				e.href = href;

			return e;

		},

		/**
		 * Parses a CSS measurement string (eg. 960, '960px', '313.37em') and splits it into its numeric and unit parts.
		 * @param {string} x CSS measurement.
		 * @return {Array} Results, where element 0 = (float) numeric part, and 1 = (string) unit part.
		 */
		parseMeasurement: function(x) {

			var a, tmp;

			// Not a string? Just assume it's in px.
				if (typeof x !== 'string')
					a = [x,'px'];

			// Fluid shortcut?
				else if (x == 'fluid')
					a = [100,'%'];

			// Okay, hard way it is ...
				else {

					var tmp;

					tmp = x.match(/([0-9\.]+)([^\s]*)/);

					// Missing units? Assume it's in px.
						if (tmp.length < 3 || !tmp[2])
							a = [parseFloat(x),'px'];

					// Otherwise, we have a winrar.
						else
							a = [parseFloat(tmp[1]),tmp[2]];

				}

			return a;

		},

		/**
		 * State handler.
		 * @return {array} Attachments.
		 */
		stateHandler: function() {

			var config,
				attachments = [],
				a, i, x, id, s, s1, s2, C, Cu, R, Ru;

			// Generate state config.
				config = _.generateStateConfig(
					{
						containers: __.config.containers,
						grid: __.config.grid
					},
					__.config.breakpoints
				);

				// Expand gutters if it's not already an array.
					if (__.config.grid
					&&	'gutters' in config.grid
					&&	!_.isArray(config.grid.gutters))
						config.grid.gutters = [config.grid.gutters, 0];

			// STYLE: Containers.
				if (__.config.containers) {

					var CLocked = false;

					// Split "containers" into width and units.
						a = __.parseMeasurement(config.containers);
						C = a[0];
						Cu = a[1];

					// Set id.
						id = 'sC-' + C + Cu;

					// Locked?
						if (Cu.substr(-1) == '!') {

							CLocked = true;
							Cu = Cu.substr(0, Cu.length - 1);

						}

					if (!(x = _.attachment(id))) {

						x = _.newAttachment(
							id,
							_.newStyle(
								'.container{margin-left:auto;margin-right:auto;width:' + (C*1)+Cu +
								(
									CLocked
									?
										'!important;' +
										'max-width:none!important;' +
										'min-width:0!important' +
										'}'
									:
										'}' +
										'.container.\\31 25\\25{width:100%;max-width:' + (C*1.25)+Cu + ';min-width:' + C+Cu + '}' +
										'.container.\\37 5\\25{width:' + (C*0.75)+Cu + '}' +
										'.container.\\35 0\\25{width:' + (C*0.5)+Cu + '}' +
										'.container.\\32 5\\25{width:' + (C*0.25)+Cu + '}'
								)
							),
							2
						);

					}

					attachments.push(x);

				}

			// STYLE: Grid.
				if (__.config.grid) {

					// Gutters.
						id = 'sG-' + config.grid.gutters[0] + '-' + config.grid.gutters[1];

						if (!(x = _.attachment(id))) {

							// Column gutters.

								// Split into size and units.
									a = __.parseMeasurement(config.grid.gutters[0]);
									C = a[0];
									Cu = a[1];

							// Row gutters.

								// Split into size and units.
									a = __.parseMeasurement(config.grid.gutters[1]);
									R = a[0];
									Ru = a[1];

							// Build attachment.
								x = _.newAttachment(
									id,
									_.newStyle(

										// Normal.
											'.row>*{padding:' + (R*1)+Ru + ' 0 0 ' + (C*1)+Cu + '}' +
											'.row{margin:' + (R*-1)+Ru + ' 0 -1px ' + (C*-1)+Cu + '}' +
											'.row.uniform>*{padding:' + (C*1)+Cu + ' 0 0 ' + (C*1)+Cu + '}' +
											'.row.uniform{margin:' + (C*-1)+Cu + ' 0 -1px ' + (C*-1)+Cu + '}' +

										// 200%
											'.row.\\32 00\\25>*{padding:' + (R*2)+Ru + ' 0 0 ' + (C*2)+Cu + '}' +
											'.row.\\32 00\\25{margin:' + (R*-2)+Ru + ' 0 -1px ' + (C*-2)+Cu + '}' +
											'.row.uniform.\\32 00\\25>*{padding:' + (C*2)+Cu + ' 0 0 ' + (C*2)+Cu + '}' +
											'.row.uniform.\\32 00\\25{margin:' + (C*-2)+Cu + ' 0 -1px ' + (C*-2)+Cu + '}' +

										// 150%
											'.row.\\31 50\\25>*{padding:' + (R*1.5)+Ru + ' 0 0 ' + (C*1.5)+Cu + '}' +
											'.row.\\31 50\\25{margin:' + (R*-1.5)+Ru + ' 0 -1px ' + (C*-1.5)+Cu + '}' +
											'.row.uniform.\\31 50\\25>*{padding:' + (C*1.5)+Cu + ' 0 0 ' + (C*1.5)+Cu + '}' +
											'.row.uniform.\\31 50\\25{margin:' + (C*-1.5)+Cu + ' 0 -1px ' + (C*-1.5)+Cu + '}' +

										// 50%
											'.row.\\35 0\\25>*{padding:' + (R*0.5)+Ru + ' 0 0 ' + (C*0.5)+Cu + '}' +
											'.row.\\35 0\\25{margin:' + (R*-0.5)+Ru + ' 0 -1px ' + (C*-0.5)+Cu + '}' +
											'.row.uniform.\\35 0\\25>*{padding:' + (C*0.5)+Cu + ' 0 0 ' + (C*0.5)+Cu + '}' +
											'.row.uniform.\\35 0\\25{margin:' + (C*-0.5)+Cu + ' 0 -1px ' + (C*-0.5)+Cu + '}' +

										// 25%
											'.row.\\32 5\\25>*{padding:' + (R*0.25)+Ru + ' 0 0 ' + (C*0.25)+Cu + '}' +
											'.row.\\32 5\\25{margin:' + (R*-0.25)+Ru + ' 0 -1px ' + (C*-0.25)+Cu + '}' +
											'.row.uniform.\\32 5\\25>*{padding:' + (C*0.25)+Cu + ' 0 0 ' + (C*0.25)+Cu + '}' +
											'.row.uniform.\\32 5\\25{margin:' + (C*-0.25)+Cu + ' 0 -1px ' + (C*-0.25)+Cu + '}' +

										// 0%
											'.row.\\30 \\25>*{padding:0}' +
											'.row.\\30 \\25{margin:0 0 -1px 0}'

									),
									3
								);

						}

						attachments.push(x);

					// Responsive.
						if (config.grid.level > 1) {

							id = 'sgR-' + config.grid.level;

							if (!(x = _.attachment(id))) {

								// Generate CSS.
									s1 = '';

									for (i=2; i <= config.grid.level; i++)
										s1 += __.css.gc('\\28 ' + __.gridLevelMap.k[i] + '\\29');

								// Build attachment.
									x = _.newAttachment(
										id,
										_.newStyle(s1),
										4
									);

							}

							attachments.push(x);

						}

				}

			// STYLE: Conditionals.
				if (__.config.conditionals) {

					id = 'sCd-' + _.stateId;

					if (!(x = _.attachment(id))) {

						s1 = [];
						s2 = [];

						_.iterate(_.obj.breakpoints, function(k) {

							if (_.indexOf(_.breakpointIds, k) !== -1)
								s1.push('.not-' + k);
							else
								s2.push('.only-' + k);

						});

						s = (s1.length > 0 ? s1.join(',') + '{display:none!important}' : '') + (s2.length > 0 ? s2.join(',') + '{display:none!important}' : '');

						x = _.newAttachment(
							id,
							_.newStyle(s.replace(/\.([0-9])/, '.\\3$1 ')),
							5
						);

					}

					attachments.push(x);

				}

			// STYLESHEETS: Per-breakpoint stylesheets.
				i = 6;
				a = _.breakpointIds;

				_.iterate(a, function(k) {

					if (a[k] in __.config.breakpoints
					&&	__.config.breakpoints[a[k]].href) {

						id = 'ss-' + a[k] + '-' + _.stateId;

						if (!(x = _.attachment(id)))
							x = _.newAttachment(
								id,
								__.newStyleSheet(__.config.breakpoints[a[k]].href),
								i++
							);

						attachments.push(x);

					}

				});

			// Cache state config.
				__.stateConfigs[_.stateId] = config;

			return attachments;

		}

}; _.layout = __.init; })(skel);
