const { InnerBlocks, RichText } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { ToggleControl } = wp.components;

registerBlockType('dev/accordion', {

    title: 'Accordion',
    icon: 'list-view',
    category: 'blocks-by-simon-hammes',
    /*
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
    }  */
    edit: () => <InnerBlocks template={ [ ['dev/accordion-item'] ] } allowedBlocks={ ['dev/accordion-item'] }/>,
    save: () => <InnerBlocks.Content/>

});

registerBlockType( 'dev/accordion-item', {

    title: 'Accordion Item',
    icon: 'excerpt-view',
    category: 'blocks-by-simon-hammes',
    parent: ['dev/accordion'],
    /*
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
    }  */
    edit: props => {

        const ALLOWED_BLOCKS = ['core/paragraph', 'core/heading', 'core/list', 'core/image', 'core/spacer'];

        const TITLE = <RichText
            tagName="p"
            value={ props.attributes.title }
            onChange={ title => props.setAttributes( { title: title } ) }
            className="accordion-item-title"
        />;

        const TOGGLE = <ToggleControl
            label="Standardmäßig öffnen"
            checked={ props.attributes.initially_open }
            onChange={ () => props.setAttributes( { initially_open: ! props.attributes.initially_open } ) }
        />;

        const CONTENT = <InnerBlocks allowedBlocks={ ALLOWED_BLOCKS }/>;

        return <div className="accordion-item">
            { TITLE }
            <div className="accordion-item-toggle">{ TOGGLE }</div>
            <div className="accordion-item-content">{ CONTENT }</div>
        </div>;

    },
    save: () => <InnerBlocks.Content/>

});