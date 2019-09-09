const { InnerBlocks, RichText } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { DatePicker, RangeControl, TextControl, ToggleControl } = wp.components;
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
                value={ props.attributes.displayDate }
                autocomplete="off"
                readOnly
                style={ { backgroundColor: '#FFFFFF', cursor: 'pointer' } }
                onClick={ () => props.setState( { isDatePickerVisible: ! props.isDatePickerVisible } ) }
            />
            { props.isDatePickerVisible && (
                <DatePicker
                    currentDate={ props.attributes.date }
                    onChange={ date => {
                        let displayDate = new Date(date).toLocaleDateString('de-DE', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        } );
                        return props.setAttributes( {
                            date: date,
                            displayDate: displayDate
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
                checked={ props.attributes.isToggled }
                help={ props.attributes.isToggled ? 'Authors will be displayed' : 'Authors will not be displayed' }
                onChange={ () => props.setAttributes( { isToggled: ! props.attributes.isToggled } ) }
            />
        </div>;

        let OPTIONS = [ DATE_PICKER, RANGE_CONTROL, TOGGLE_CONTROL ];
        let PREVIEW = <ServerSideRender block="dev/core" attributes={ props.attributes }/>;

        return props.isSelected ? OPTIONS : PREVIEW;

    } ),

    save: () => <InnerBlocks.Content/>

});