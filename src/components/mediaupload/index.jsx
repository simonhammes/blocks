const { InnerBlocks } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { Button, ServerSideRender } = wp.components;
const { MediaUpload, MediaUploadCheck } = wp.editor;
// Gutenberg 6.3: const ServerSideRender = wp.serverSideRender;

registerBlockType('dev/mediaupload', {

    title: 'MediaUpload',
    icon: 'admin-media',
    category: 'common',

    edit: props => {

        const MEDIA_UPLOAD = <div>
            { ! props.attributes.imgUrl && (
                <MediaUploadCheck>
                    <MediaUpload
                        allowedTypes={ ['image'] }
                        onSelect={ img => props.setAttributes( { imgUrl: img.url } ) }
                        render={ ( { open } ) =>
                            <Button isPrimary onClick={ open }>Add an image</Button>
                        }
                    />
                </MediaUploadCheck>
            ) }

            { props.attributes.imgUrl && (
                <div>
                    <img style={ { maxHeight: '300px' } }  src={ props.attributes.imgUrl }/>
                    <br/><br/>
                    <Button isDefault onClick={ () => props.setAttributes( { imgUrl: '' } ) }>Reset image</Button>
                </div>
            ) }
        </div>



        let OPTIONS = [ MEDIA_UPLOAD ];
        let PREVIEW = <ServerSideRender block="dev/mediaupload" attributes={ props.attributes }/>;

        return props.isSelected ? OPTIONS : PREVIEW;

    },

    save: () => <InnerBlocks.Content/>

});