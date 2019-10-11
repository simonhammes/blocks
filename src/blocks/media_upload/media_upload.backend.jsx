const { InnerBlocks, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;


registerBlockType( 'dev/media-upload', {
	title: 'MediaUpload',
	icon: 'format-image',
	category: 'blocks-by-simon-hammes',
	edit: props => {
		return <div>

			<h4>MediaUpload</h4>

			{ ! props.attributes.url && (
				<MediaUploadCheck>
					<MediaUpload
						allowedTypes={ [ 'image' ] }
						onSelect={ img => props.setAttributes( { url: img.url } ) }
						render={ ( { open } ) =>
							<Button isPrimary onClick={ open }>Add an image</Button>
						}
					/>
				</MediaUploadCheck>
			) }

			{ props.attributes.url && (
				<div>
					<img style={ { maxHeight: '150px' } } src={ props.attributes.url } alt="" />
					<br /><br />
					<Button isDefault onClick={ () => props.setAttributes( { url: '' } ) }>Reset image</Button>
				</div>
			) }

		</div>;
	},
	save: () => <InnerBlocks.Content />,

} );
