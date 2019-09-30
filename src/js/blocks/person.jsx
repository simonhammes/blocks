const { InnerBlocks } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { TextControl } = wp.components;
const ServerSideRender = wp.serverSideRender;

registerBlockType( 'dev/person', {

    title: 'Person',
    icon: 'admin-users',
    category: 'blocks-by-simon-hammes',
    example: {
        attributes: {
            id: 5982,
            name: 'Max Mustermann'
        }
    },
    transforms: {
        from: [
            {
                type: 'shortcode',
                tag: 'person',
                attributes: {
                    id: {
                        type: 'number',
                        shortcode: attributes => parseInt(attributes.named.id)
                    },
                    name: {
                        type: 'string',
                        shortcode: attributes => attributes.named.name
                    }
                }
            },
        ]
    },
    edit: props => {

        let OPTIONS = <div>
            <h4>Person block</h4>
            <TextControl
                label="ID"
                value={ props.attributes.id }
                onChange={ id => props.setAttributes( { id: id } ) }
            />
            <TextControl
                label="Name"
                value={ props.attributes.name }
                onChange={ name => props.setAttributes( { name: name } ) }
            />
        </div>;

        return OPTIONS;

    },
    save: () => <InnerBlocks.Content/>

});