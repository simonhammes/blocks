/* WordPress dependencies */
import { removep } from '@wordpress/autop';
import { getFreeformContentHandlerName } from '@wordpress/blocks';
import { dispatch, select } from '@wordpress/data';

/* Internal dependencies */
import { grammar } from './grammar';
import peg from './peg';


const createNotice = ( type, text ) => dispatch( 'core/notices' ).createNotice( type, text );

export const transformClassicBlock = () => {

	const firstBlockOnPage = select( 'core/block-editor' ).getBlocks()[ 0 ];
	const freeformBlockName = getFreeformContentHandlerName();

	if ( typeof firstBlockOnPage === 'undefined' || firstBlockOnPage.name !== freeformBlockName ) {
		return createNotice( 'error', 'Error: The classic block has to be positioned at index 0!' );
	}

	const content = removep( firstBlockOnPage.originalContent );

	let blocks = peg.generate( grammar ).parse( content );

	//console.log('parsedBlocks', '\n\n', blocks);

	/* TODO: This seems to work reasonably well (so far, at least) */
	//blocks = removeEmptyBlocks(blocks);

	blocks = traverse( blocks );

	console.log( blocks );

	wp.data.dispatch( 'core/block-editor' ).insertBlocks( blocks[ 0 ] );
	//console.log(blocks);

	/*

	if (!(block.hasOwnProperty('innerBlocks')) || block.innerBlocks.length === 0) {
		continue;
	}

	for (let innerBlock of block.innerBlocks) {
		if (typeof innerBlock === 'string') {
			console.log(innerBlock);
		}
	}

}*/

	// Remove empty inner blocks TODO: loop/recursive
	//let sanitizedInnerBlocks = parsedBlocks[0].innerBlocks.filter(block => !(typeof block === 'string' && block.trim() === ''));
	//parsedBlocks[0].innerBlocks = sanitizedInnerBlocks;

	//console.log(parsedBlocks);

	throw new Error();


	/*

	let block = {
		clientId: uuid(),
		name: 'core/group',
		isValid: true,
		attributes: {
			//content: 'created without wp.blocks'
		},
		innerBlocks: [
			wp.blocks.createBlock('core/paragraph', { content: 'created with wp.blocks' } )
		]
	}
	log(block);

	block = {
		clientId: uuid(),
		name: 'core/group',
		isValid: true,
		attributes: {
			//content: 'created without wp.blocks'
		},
		innerBlocks: [
			{
				clientId: uuid(),
				name: 'core/paragraph',
				isValid: true,
				attributes: {
					content: 'created without wp.blocks'
				},
				innerBlocks: []
			}
		]
	}

	log(block);

	wp.data.dispatch('core/block-editor').insertBlock(block, 0, undefined, false);*/
};
/*
const removeEmptyInnerBlocks = async block => {

	const result = await

}*/


const traverse = e => {
	const isArray = Array.isArray( e );
	const isObject = typeof e === 'object';

	// TODO: Element is an array (of objects) -> e.g. level 1
	if ( isArray ) {
		Object.keys( e ).forEach( key => {
			const isBlock = e[ key ] && typeof e[ key ] === 'object' && e[ key ].hasOwnProperty( 'innerBlocks' ) && e[ key ].innerBlocks.length > 0;
			const isString = typeof e[ key ] === 'string';
			const isEmptyString = isString && e[ key ].trim() === '';

			if ( isBlock ) {
				traverse( e[ key ] );
			} else if ( isEmptyString ) {
				delete e[ key ];
			} else if ( isString ) {
				const newBlocks = wp.blocks.rawHandler( {
					HTML: e[ key ],
				} );
				console.log( newBlocks );
				e[ key ] = newBlocks;
				console.log( 'created block using wp.blocks.rawHandler' );
			}
		} );
	} else if ( isObject ) {
		const hasInnerBlocks = e && e.hasOwnProperty( 'innerBlocks' ) && e.innerBlocks.length > 0;
		if ( hasInnerBlocks ) {
			traverse( e.innerBlocks );
		}
	}

	return e;
};

