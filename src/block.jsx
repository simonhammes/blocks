const { registerBlockType } = wp.blocks;
const { ServerSideRender } = wp.components;
const { InnerBlocks } = wp.editor;

registerBlockType( 'wp-gb-plugin-template/person', {

    title: 'person',
    icon: 'admin-users',
    category: 'common',
    transforms: {
        from: [
            {
                type: 'shortcode',
                tag: 'person',
                attributes: {
                    id: {
                        type: 'string',
                        shortcode: attributes => attributes.named.id
                    },
                    flag: {
                        type: 'string',
                        shortcode: attributes => attributes.numeric[0]
                    }
                }
            },
        ]
    },

    edit: props => {

        let OPTIONS = <p>here: edit the block</p>;
        let PREVIEW = <ServerSideRender block="wp-gb-plugin-template/person" attributes={ props.attributes }/>;

        return ( props.isSelected ) ? OPTIONS : PREVIEW;

    },

    save: () => <InnerBlocks.Content/>

});