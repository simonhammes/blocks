const { InnerBlocks, MediaUpload, MediaUploadCheck, RichText } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { Button, DatePicker, RangeControl, TextControl, ToggleControl } = wp.components;
const { withState } = wp.compose;
const ServerSideRender = wp.serverSideRender;

registerBlockType('dev/core', {

    title: 'Core',
    icon: 'admin-users',
    category: 'blocks-by-simon-hammes',

    edit: withState( { is_datepicker_visible: false } )( props => {



        const MEDIA_UPLOAD = <div>
            <h4>MediaUpload</h4>
            { ! props.attributes.media_upload && (
                <MediaUploadCheck>
                    <MediaUpload
                        allowedTypes={ ['image'] }
                        onSelect={ img => props.setAttributes( { media_upload: img.url } ) }
                        render={ ( { open } ) =>
                            <Button isPrimary onClick={ open }>Add an image</Button>
                        }
                    />
                </MediaUploadCheck>
            ) }

            { props.attributes.media_upload && (
                <div>
                    <img style={ { maxHeight: '150px' } }  src={ props.attributes.media_upload } alt="Another image"/>
                    <br/><br/>
                    <Button isDefault onClick={ () => props.setAttributes( { media_upload: '' } ) }>Reset image</Button>
                </div>
            ) }
        </div>;



        let BLOCKS = [ MEDIA_UPLOAD ];
        let PREVIEW = <ServerSideRender block="dev/core" attributes={ props.attributes }/>;

        return props.isSelected ? BLOCKS : PREVIEW;

    } ),

    save: () => <InnerBlocks.Content/>

});