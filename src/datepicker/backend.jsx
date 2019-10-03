const { InnerBlocks, RichText } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { DatePicker, TextControl } = wp.components;
const { withState } = wp.compose;

registerBlockType('dev/datepicker', {
    title: 'Datepicker',
    icon: 'calendar',
    category: 'blocks-by-simon-hammes',
    edit: withState( { is_visible: false } )( props => {

        let date = props.attributes.date;

        let formatted_date = new Date(date ? date : new Date() ).toLocaleDateString('de-DE', {
            day: 'numeric', month: 'long', year: 'numeric'
        });

        return <div>
            <h4>DatePicker</h4>
            <RichText
                value={ date }
                className="hidden"
            />
            <TextControl
                label="Datum"
                help="Mondays are disabled"
                value={ formatted_date }
                class="datepicker_formatted_date"
                readOnly
                onClick={ () => props.setState( { is_visible: ! props.is_visible } ) }
            />
            { props.is_visible && (
                <DatePicker
                    currentDate={ date }
                    onChange={ date => props.setAttributes( { date: date } ) }
                    // Example: Disable mondays
                    isInvalidDate={ date => date.getDay() === 1}
                />
            ) }
        </div>;

    } ),
    save: () => <InnerBlocks.Content/>

});
