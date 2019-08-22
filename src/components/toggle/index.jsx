const { InnerBlocks, InspectorControls, RichText } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { SelectControl, ServerSideRender, TextControl, ToggleControl, PanelBody } = wp.components;
// Gutenberg 6.3: const ServerSideRender = wp.serverSideRender;

registerBlockType('dev/toggle', {

    title: 'Toggle',
    icon: 'edit',
    category: 'common',

    edit: props => {

        const TOGGLE_CONTROL = <div>
            <ToggleControl
                label="Display authors"
                checked={ props.attributes.isToggled }
                help={ props.attributes.isToggled ? 'Authors will be displayed' : 'Authors will not be displayed' }
                onChange={ () => props.setAttributes( { isToggled: ! props.attributes.isToggled } ) }
            />
            <InspectorControls>
                <PanelBody title="Settings">
                    <ToggleControl
                        label="Display authors"
                        checked={ props.attributes.isToggled }
                        help={ props.attributes.isToggled ? 'Authors will be displayed' : 'Authors will not be displayed' }
                        onChange={ () => props.setAttributes( { isToggled: ! props.attributes.isToggled } ) }
                    />
                </PanelBody>
            </InspectorControls>
        </div>

        let OPTIONS = [ TOGGLE_CONTROL ];
        let PREVIEW = <ServerSideRender block="dev/toggle" attributes={ props.attributes }/>;

        return props.isSelected ? OPTIONS : PREVIEW;

    },

    save: () => <InnerBlocks.Content/>

});