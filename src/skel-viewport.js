/* skel-viewport.js v3.0.0 | (c) n33 | skel.io | MIT licensed */

(function(_) { "use strict"; var __ = {

	/******************************/
	/* Properties                 */
	/******************************/

		/**
		 * Default config.
		 * @type {object}
		 */
		config: {

			// Width.
				width: 'device-width',

			// Height.
				height: '',

			// Scalable?
				scalable: true,

			// Breakpoints.
				breakpoints: {}

		},

	/******************************/
	/* Methods                    */
	/******************************/

		/**
		 * Initializes Viewport module.
		 * @param {object} config Config.
		 */
		init: function(config) {

			// Extend with user config.
				_.extend(__.config, config);

			// Add state handler.
				_.addStateHandler('viewport', __.stateHandler);

			// Add initial <meta> element.
				_.attach(_.newAttachment(
					'mv',
					__.newViewportMeta('initial-scale=1'),
					1,
					true
				));

			// Hack: IE viewport fix.
				if (_.vars.browser == 'ie'
				&&	_.vars.IEVersion >= 10) {

					// Add <style> element for -ms-viewport.
						_.attach(_.newAttachment(
							'mVie',
							_.newStyle('@-ms-viewport{width:device-width}'),
							1,
							true
						));

					// Force browser to accept new viewport.
						window.setTimeout(function() {

							var body = document.getElementsByTagName('body')[0],
								h = body.style.height;

							body.style.height = '10000px';

							window.setTimeout(function() {
								body.style.height = h;
							}, 250);

						}, 250);

				}

			return _;

		},

		/**
		 * Creates a new viewport <meta> element.
		 * @param {string} content Content.
		 * @return {DOMElement} Viewport <meta> element.
		 */
		newViewportMeta: function(content) {

			var e = document.createElement('meta');
				e.name = 'viewport';
				e.content = content;

			return e;

		},

		/**
		 * State handler.
		 * @return {array} Attachments.
		 */
		stateHandler: function() {

			var attachment, config,
				a;

			// Generate state config.
				config = _.generateStateConfig(
					{
						width: __.config.width,
						height: __.config.height,
						scalable: __.config.scalable
					},
					__.config.breakpoints
				);

			// Create <meta> element attachment.

				// Content.
					a = [];

					// Scalable.
						a.push('user-scalable=' + (config.scalable ? 'yes' : 'no'));

					// Width.
						if (config.width)
							a.push('width=' + config.width);

					// Height.
						if (config.height)
							a.push('height=' + config.height);

					// Set initial scale if we're using device-width.
						if (config.width == 'device-width')
							a.push('initial-scale=1');

				// Attachment.
					attachment = _.newAttachment(
						'mv-' + _.stateId,
						__.newViewportMeta(a.join(',')),
						1
					);

			return [attachment];

		}

}; _.viewport = __.init; })(skel);