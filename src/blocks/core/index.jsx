const { InnerBlocks, MediaUpload, MediaUploadCheck, RichText } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { Button, DatePicker, RangeControl, TextControl, ToggleControl } = wp.components;
const { withState } = wp.compose;
const ServerSideRender = wp.serverSideRender;

registerBlockType('dev/core', {

    title: 'Core',
    icon: 'admin-users',
    category: 'blocks-by-simon-hammes',

    edit: withState( { isDatePickerVisible: false } )( props => {

        const DATE_PICKER = <div>
            <h4>DatePicker</h4>
            <RichText
                value={ props.attributes.date }
                style={ { display: 'none'} }
            />
            <TextControl
                label="Datum"
                value={ props.attributes.display_date }
                autocomplete="off"
                readOnly
                style={ { backgroundColor: '#FFFFFF', cursor: 'pointer' } }
                onClick={ () => props.setState( { isDatePickerVisible: ! props.isDatePickerVisible } ) }
            />
            { props.isDatePickerVisible && (
                <DatePicker
                    currentDate={ props.attributes.date }
                    onChange={ date => {
                        let display_date = new Date(date).toLocaleDateString('de-DE', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        } );
                        return props.setAttributes( {
                            date: date,
                            display_date: display_date
                        } );
                    } }

                    // Example: Disable mondays
                    // isInvalidDate={ date => date.getDay() === 1}
                />
            ) }
        </div>;
        const RANGE_CONTROL = <div>
            <h4>RangeControl</h4>
            <RangeControl
                label="Columns"
                value={ props.attributes.number_of_columns }
                min={ 2 }
                max={ 8 }
                onChange={ columns => props.setAttributes( { number_of_columns: columns } ) }
            />
        </div>;
        const TOGGLE_CONTROL = <div>
            <h4>ToggleControl</h4>
            <ToggleControl
                label="Display authors"
                checked={ props.attributes.is_toggled }
                help={ props.attributes.is_toggled ? 'Authors will be displayed' : 'Authors will not be displayed' }
                onChange={ () => props.setAttributes( { is_toggled: ! props.attributes.is_toggled } ) }
            />
        </div>;
        const MEDIA_UPLOAD = <div>
            <h4>MediaUpload</h4>
            { ! props.attributes.image_url && (
                <MediaUploadCheck>
                    <MediaUpload
                        allowedTypes={ ['image'] }
                        onSelect={ img => props.setAttributes( { image_url: img.url } ) }
                        render={ ( { open } ) =>
                            <Button isPrimary onClick={ open }>Add an image</Button>
                        }
                    />
                </MediaUploadCheck>
            ) }

            { props.attributes.image_url && (
                <div>
                    <img style={ { maxHeight: '150px' } }  src={ props.attributes.image_url }/>
                    <br/><br/>
                    <Button isDefault onClick={ () => props.setAttributes( { image_url: '' } ) }>Reset image</Button>
                </div>
            ) }
        </div>

        let OPTIONS = [ DATE_PICKER, RANGE_CONTROL, TOGGLE_CONTROL, MEDIA_UPLOAD ];
        let PREVIEW = <ServerSideRender block="dev/core" attributes={ props.attributes }/>;

        return props.isSelected ? OPTIONS : PREVIEW;

    } ),

    save: () => <InnerBlocks.Content/>

});