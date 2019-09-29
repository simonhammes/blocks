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

        let formatted_date = new Date(props.attributes.datepicker).toLocaleDateString('de-DE', {
            day: 'numeric', month: 'long', year: 'numeric'
        } );
        const DATE_PICKER = <div>
            <h4>DatePicker</h4>
            <RichText
                value={ props.attributes.datepicker }
                style={ { display: 'none'} }
            />
            <TextControl
                label="Datum"
                value={ formatted_date }
                class="datepicker_formatted_date"
                readOnly
                onClick={ () => props.setState( { is_datepicker_visible: ! props.is_datepicker_visible } ) }
            />
            { props.is_datepicker_visible && (
                <DatePicker
                    currentDate={ props.attributes.datepicker }
                    onChange={ date => props.setAttributes( { datepicker: date } ) }
                    // Example: Disable mondays
                    // isInvalidDate={ date => date.getDay() === 1}
                />
            ) }
        </div>;

        const RANGE_CONTROL = <div>
            <h4>RangeControl</h4>
            <RangeControl
                label="Columns"
                value={ props.attributes.range_control }
                min={ 2 }
                max={ 8 }
                onChange={ value => props.setAttributes( { range_control: value } ) }
            />
        </div>;
        const TOGGLE_CONTROL = <div>
            <h4>ToggleControl</h4>
            <ToggleControl
                label="Display authors"
                checked={ props.attributes.toggle_control }
                help={ props.attributes.toggle_control ? 'Authors will be displayed' : 'Authors will not be displayed' }
                onChange={ () => props.setAttributes( { toggle_control: ! props.attributes.toggle_control } ) }
            />
        </div>;
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

        const ListOfBlocks = () => {
            const blocks = wp.data.select('core/block-editor').getBlocks();
            return <ul class="list_of_blocks">{ blocks.map( block => <li>{ block.name }</li> ) }</ul>;
        };
        const ListOfNotices = () => {
            const triggerNotice = type => {
                return wp.data.dispatch('core/notices').createNotice(type, 'Triggered notice with type ' + type);
            };
            return <ul class="trigger_notice">
                <li><a onClick={ () => triggerNotice('info') }>Trigger an info notice</a></li>
                <li><a onClick={ () => triggerNotice('error') }>Trigger an error notice</a></li>
                <li><a onClick={ () => triggerNotice('warning') }>Trigger a warning notice</a></li>
                <li><a onClick={ () => triggerNotice('success') }>Trigger a success notice</a></li>
            </ul>;
        };
        const WP_DATA_EXAMPLES = <div>
            <h4>List of blocks on this page</h4>
            <ListOfBlocks/>
            <h4>List of notices</h4>
            <ListOfNotices/>
        </div>;

        let BLOCKS = [ DATE_PICKER, RANGE_CONTROL, TOGGLE_CONTROL, MEDIA_UPLOAD, WP_DATA_EXAMPLES ];
        let PREVIEW = <ServerSideRender block="dev/core" attributes={ props.attributes }/>;

        return props.isSelected ? BLOCKS : PREVIEW;

    } ),

    save: () => <InnerBlocks.Content/>

});