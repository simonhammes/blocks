const { InnerBlocks } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { Button, RangeControl, ServerSideRender } = wp.components;
const { MediaUpload, MediaUploadCheck } = wp.editor;
// Gutenberg 6.3: const ServerSideRender = wp.serverSideRender;

registerBlockType('dev/rangecontrol', {

    title: 'RangeControl',
    icon: 'edit',
    category: 'common',

    edit: props => {

        const RANGE_CONTROL = <RangeControl
            label="Columns"
            value={ props.attributes.columns }
            min={ 2 }
            max={ 8 }
            onChange={ columns => props.setAttributes( { columns: columns } ) }
        />

        let OPTIONS = [ RANGE_CONTROL ];
        let PREVIEW = <ServerSideRender block="dev/rangecontrol" attributes={ props.attributes }/>;

        return props.isSelected ? OPTIONS : PREVIEW;

    },

    save: () => <InnerBlocks.Content/>

});