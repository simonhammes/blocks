const { InnerBlocks } = wp.blockEditor;
const { createBlock, registerBlockType } = wp.blocks;
const { TextControl } = wp.components;
const { insertBlock } = wp.data.dispatch( 'core/block-editor' );
const { createNotice } = wp.data.dispatch( 'core/notices' );

const ALLOWED_INNER_BLOCKS = [ 'dev/person', 'core/paragraph' ];

const SHORTCODES = [ 'person' ];
const isShortcode = element => {
	const firstWord = element.replace( / .*/, '' );
	return SHORTCODES.includes( firstWord );
};
const DEBUG_MODE = true;
const debug = thing => DEBUG_MODE ? console.log( thing ) : null;


registerBlockType( 'dev/box', {
	title: 'Box',
	icon: 'hammer',
	category: 'blocks-by-simon-hammes',
	transforms: {
		from: [
			{
				type: 'shortcode',
				tag: 'box',
				attributes: {
					color: {
						type: 'string',
						shortcode: ( attributes, content ) => transformShortcode( attributes, content ),
					},
				},
			},
		],
	},
	edit: props => {

		return <div>
			<h4>Box</h4>
			<TextControl
				label="Color"
				value={ props.attributes.color }
				onChange={ color => props.setAttributes( { color } ) }
			/>
			<InnerBlocks allowedBlocks={ ALLOWED_INNER_BLOCKS } />
		</div>;

	},
	save: () => <InnerBlocks.Content />,
} );

const transformShortcode = ( attributes, content ) => {

	const elements = content.shortcode.content.split( /\[|\]/ );
	const blocks = [];

	// Manipulate elements
	for ( let i = 0; i < elements.length; i++ ) {

		let element = elements[ i ].replace( '<br \/>', '' );

		if ( element.trim() === '' ) {
			continue;
		}

		if ( isShortcode( element ) ) {

			element = '[' + element + ']';

			debug( 'shortcode: ' + element );

			// Convert the shortcode into a block, the p tags are necessary
			block = wp.blocks.rawHandler( { HTML: '<p>' + element + '</p>' } )[ 0 ];
			blocks.push( block );

		} else {

			debug( 'not a shortcode: ' + element );
			// Convert HTML into block(s) and add each block to the end of the blocks array
			wp.blocks.rawHandler( { HTML: element } ).map( block => blocks.push( block ) );

		}

	}

	// TODO: only the first shortcode is converted -> bug?
	// TODO: this seems to be the fix ...
	//console.log(wp.blocks.rawHandler( { HTML: '<p>[person id="5"]</p><p>[person id="8"]</p>' } ));

	let block = createBlock( 'dev/box', { color: attributes.named.color }, blocks );
	insertBlock( block, 0 );

	createNotice( 'success', 'The box block was successfully inserted!' );
	createNotice( 'info', 'Please remove the additional empty box block at the bottom of the page!', { isDismissible: false } );

};

const transformShortcodeAlternative1 = ( attributes, content ) => {

	const namespace = 'wp-gb-nesting';

	const elements = content.shortcode.content.split( /\[|\]/ );
	const blocks = [];

	// Manipulate elements
	for ( let i = 0; i < elements.length; i++ ) {

		const element = elements[ i ].replace( '<br \/>', '' );

		if ( element.trim() === '' ) {
			continue;
		}

		if ( isShortcode( element ) ) {

			debug( 'shortcode: ' + getShortcodeTag( element ) );

			// Example: wp-gb-nesting/person
			const blockName = namespace + '/' + getShortcodeTag( element );
			const blockArguments = parseArguments( '[' + element + ']' );

			block = wp.blocks.createBlock( blockName, blockArguments );
			blocks.push( block );

		} else {

			debug( 'not a shortcode: ' + element );

			block = wp.blocks.createBlock( 'core/paragraph', { content: '<h4>Text block</h4>' + element } );
			blocks.push( block );

		}

	}

	let block = wp.blocks.createBlock( 'dev/box', { color: attributes.named.color }, blocks );
	wp.data.dispatch( 'core/block-editor' ).insertBlock( block, 0 );

};

const getShortcodeTag = element => element.replace( / .*/, '' );
const parseArguments = shortcode => {

	const blockArguments = {};

	// Source: shortcodes.php -> get_shortcode_regex()
	const pattern = /\[(\[?)(person)(?![\w-])([^\]\/]*(?:\/(?!\])[^\]\/]*)*?)(?:(\/)\]|\](?:([^\[]*(?:\[(?!\/\2\])[^\[]*)*)\[\/\2\])?)(\]?)/g;
	// TODO make 'person' dynamic

	const result = [ ...shortcode.matchAll( pattern ) ][ 0 ][ 3 ];

	// Source: shortcodes.php -> get_shortcode_atts_regex() with slight modifications (JS RegEx != PHP RegEx)
	const patternAtts = /([\w-]+)\s*=\s*"([^"]*)"(?:\s|$)|([\w-]+)\s*=\s*'([^']*)'(?:\s|$)|([\w-]+)\s*=\s*([^\s'"]+)(?:\s|$)|"([^"]*)"(?:\s|$)|'([^']*)'(?:\s|$)|(\S+)(?:\s|$)/g;

	const results = [ ...result.matchAll( patternAtts ) ];

	results.map( item => blockArguments[ item[ 1 ] ] = item[ 2 ] );

	return blockArguments;

	/* WORKING SOLUTION:

	let shortcode_args = shortcode.split(' ').slice(1);
	let block_arguments = {};

	for (let i = 0; i < shortcode_args.length; i++) {
		let pair = shortcode_args[i].split('=');
		block_arguments[pair[0]] = pair[1].replace(/"/g, '');
	}

	debug(block_arguments);
	return block_arguments;

	*/

};
