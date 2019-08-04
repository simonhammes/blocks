const { registerBlockType } = wp.blocks;
const { ServerSideRender } = wp.components;
const { InnerBlocks } = wp.editor;

registerBlockType( 'namespace/person', {

    title: 'person',
    icon: 'edit',
    category: 'common',
    keywords: ['person'],
    transforms: {
        from: [
            {
                type: 'shortcode',
                tag: 'person',
                attributes: {
                    id: {
                        type: 'string',
                        shortcode: ( attributes ) => attributes.named.id
                    },
                    flag: {
                        type: 'string',
                        shortcode: ( attributes ) => attributes.numeric[0]
                    }
                }
            },
        ]
    },

    edit: properties => {

        let OPTIONS = <p>here: edit the block</p>;
        let PREVIEW = <ServerSideRender block="namespace/person" attributes={ properties.attributes }/>;

        return ( properties.isSelected ) ? OPTIONS : PREVIEW;

    },

    save: () => <InnerBlocks.Content/>

});