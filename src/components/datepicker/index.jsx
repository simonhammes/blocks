const { InnerBlocks, RichText } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { DatePicker, ServerSideRender, TextControl } = wp.components;
const { withState } = wp.compose;
// Gutenberg 6.3: const ServerSideRender = wp.serverSideRender;

registerBlockType('dev/datepicker', {

    title: 'Datepicker',
    icon: 'calendar',
    category: 'common',

    edit: withState( { isDatePickerVisible: false } )( props => {

        const DATE_PICKER = <div>
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

        let OPTIONS = [ DATE_PICKER ];
        let PREVIEW = <ServerSideRender block="dev/datepicker" attributes={ props.attributes }/>;

        return props.isSelected ? OPTIONS : PREVIEW;

    } ),

    save: () => <InnerBlocks.Content/>

});