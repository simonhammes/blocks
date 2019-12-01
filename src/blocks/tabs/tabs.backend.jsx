const { InnerBlocks } = wp.blockEditor;
const { registerBlockType } = wp.blocks;


import { InspectorControls } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { dispatch, select } from '@wordpress/data';
import { Component } from '@wordpress/element';

const { insertBlock, updateBlockAttributes } = dispatch( 'core/block-editor' );
const { getBlockAttributes, getBlockOrder } = select( 'core/block-editor' );


registerBlockType( 'dev/tabs', {

	title: 'Tabs',
	icon: 'excerpt-view',
	category: 'blocks-by-simon-hammes',

	edit: class extends Component {

		constructor() {
			super( ...arguments );
			this.state = {
				innerBlocks: this.getInnerBlocks(),
			};
		}

		addTab() {
			// Insert a new inner block
			const blockToInsert = createBlock( 'dev/tab' );
			insertBlock( blockToInsert, undefined, this.props.clientId );
		}

		getInnerBlocks() {
			let innerBlocks = [];
			const ids = getBlockOrder( this.props.clientId );
			for ( let id of ids ) {
				let attributes = getBlockAttributes( id );
				innerBlocks.push( {
					clientId: id,
					title: attributes.title,
				} );
			}
			return innerBlocks;
		}

		showTab( nextIndex ) {

			this.props.setAttributes( { visibleTabIndex: nextIndex } );

			const innerBlocksCount = this.state.innerBlocks.length;

			// Show the tab whose index is stored in the visibleTabIndex attribute
			for ( let i = 0; i < innerBlocksCount; i++ ) {

				// TODO Idea: Show the new tab first before hiding all other tabs to prevent flickering

				let clientId = this.state.innerBlocks[ i ].clientId;

				updateBlockAttributes( clientId, {
					isVisible: i === nextIndex,
				} );

			}

		}

		componentDidMount() {
			this.showTab( this.props.attributes.visibleTabIndex );
		}

		componentDidUpdate() {
			this.setState( {
				innerBlocks: this.getInnerBlocks(),
			} );
		}

		shouldComponentUpdate( nextProps, nextState, nextContext ) {

			const prevInnerBlocks = JSON.stringify( this.state.innerBlocks );
			const nextInnerBlocks = JSON.stringify( this.getInnerBlocks() );

			// Update component if the inner blocks or their properties have changed
			return prevInnerBlocks !== nextInnerBlocks;

		}

		render() {

			return <div>
				<ul className="nav nav-tabs" style={ { listStyleType: 'none' } }>

					{ this.state.innerBlocks.map( ( block, index ) => {


						console.log( this.props.attributes.visibleTabIndex )

						let active = index === this.props.attributes.visibleTabIndex ? 'active' : '';


						return <li className="nav-item" key={ block.clientId }>
							<a href="#"
							   className={ "nav-link " + active }
							   data-key={ block.clientId }
							   onClick={ () => this.showTab( index ) }
							>
								{ block.title }
							</a>
						</li>;

					} ) }

					<li className="nav-item">
						<a href="#" className="nav-link" onClick={ () => this.addTab() }>+</a>
					</li>

				</ul>
				<InnerBlocks template={ [ [ 'dev/tab' ] ] } allowedBlocks={ [ 'dev/tab' ] } />
			</div>;

		}

	},

	save: () => <InnerBlocks.Content />,

} );

registerBlockType( 'dev/tab', {

	title: 'Tab',
	icon: 'excerpt-view',
	category: 'blocks-by-simon-hammes',
	parent: [ 'dev/tabs' ],
	supports: {
		inserter: false,
	},

	edit: class extends Component {

		constructor() {
			super( ...arguments );
			this.state = {
				allowedBlocks: [ 'core/paragraph', 'core/heading', 'core/list', 'core/image' ],
				parentClientId: select( 'core/block-editor' ).getBlockHierarchyRootClientId( this.props.clientId ),
			};
		}

		componentDidMount() {

		}

		shouldBlockBeVisible() {

			const selectedTabIndex = select( 'core/block-editor' )
				.getBlockAttributes( this.state.parentClientId )
				.selectedTabIndex;

			const indexInsideParent = select( 'core/block-editor' )
				.getBlockIndex( this.props.clientId, this.state.parentClientId );

			console.log( 'index' + indexInsideParent);

			return selectedTabIndex === indexInsideParent;

		}

		render() {

			if ( ! this.props.attributes.isVisible ) {
				return false;
			}

			const title = <TextControl
				label="Title"
				value={ this.props.attributes.title }
				onChange={ title => this.props.setAttributes( { title: title } ) }
			/>;

			return <div>
				<InnerBlocks allowedBlocks={ this.state.allowedBlocks } />
				<InspectorControls>
					<PanelBody title="Settings">
						<PanelRow>
							{ title }
						</PanelRow>
					</PanelBody>
				</InspectorControls>
			</div>;

		}

	},

	save: () => <InnerBlocks.Content />,

} );
