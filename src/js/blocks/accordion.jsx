import '../../css/accordion.editor.scss'

const { InnerBlocks, RichText } = wp.blockEditor;
const { createBlock, registerBlockType } = wp.blocks;
const { IconButton, ToggleControl } = wp.components;
const { insertBlock } = wp.data.dispatch('core/block-editor');

registerBlockType( 'dev/accordion', {

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
    edit: props => {

        return <div>
            <InnerBlocks
                template={[['dev/accordion-item']]}
                allowedBlocks={['dev/accordion-item']}
            />
            <IconButton
                isLarge
                className="block-editor-button-block-appender components-coblocks-add-accordion-item__button"
                label="Add Accordion Item"
                icon="insert"
                onClick={() => {
                    const block = createBlock('dev/accordion-item');
                    insertBlock(block, undefined, props.clientId);
                }}
            />
        </div>;

    },
    save: () => <InnerBlocks.Content/>

});

registerBlockType( 'dev/accordion-item', {

    title: 'Accordion Item',
    icon: 'excerpt-view',
    category: 'blocks-by-simon-hammes',
    parent: ['dev/accordion'],
    supports: {
        inserter: false
    },
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

        const TITLE = <RichText
            tagName="p"
            placeholder="Add a title ..."
            value={ props.attributes.title }
            onChange={ title => props.setAttributes( { title: title } ) }
            keepPlaceholderOnFocus
            style={ { margin: '0px 0px 20px 0px' } }
        />;
        const TOGGLE = <ToggleControl
            label="Standardmäßig öffnen"
            checked={ props.attributes.initially_open }
            onChange={ () => props.setAttributes( { initially_open: ! props.attributes.initially_open } ) }
            style={ { padding: '20px 0px' } }
        />;
        const CONTENT = <InnerBlocks allowedBlocks={ ['core/paragraph', 'core/heading', 'core/list', 'core/image'] }/>;

        return <div style={ { padding: '20px 20px 20px 20px', border: '3px solid #0073A8', borderRadius: '5px', fontFamily: 'Roboto' } }>
            { TITLE }
            <div style={ { padding: '10px 0px' } }>
                { TOGGLE }
            </div>
            <div style={ { border: '3px solid #ABA7B2', borderRadius: '5px', padding: '0px 20px' } }>
                { CONTENT }
            </div>
        </div>;

    },
    save: () => <InnerBlocks.Content/>

});