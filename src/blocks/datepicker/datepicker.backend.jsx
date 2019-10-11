const { InnerBlocks, RichText } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { DatePicker, TextControl } = wp.components;
const { withState } = wp.compose;


registerBlockType( 'dev/datepicker', {

	title: 'Datepicker',
	icon: 'calendar',
	category: 'blocks-by-simon-hammes',

	edit: withState( { is_visible: false } )( props => {

		const date = props.attributes.date !== '' ? props.attributes.date : new Date();
		const dateFormattingOptions = {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		};
		const formattedDate = new Date( date ).toLocaleDateString( 'de-DE', dateFormattingOptions );


		return <div>
			<h4>DatePicker</h4>
			<RichText
				value={ date }
				className="hidden"
			/>
			<TextControl
				label="Datum"
				help="Mondays are disabled"
				value={ formattedDate }
				class="datepicker_formattedDate"
				readOnly
				onClick={ () => props.setState( { is_visible: ! props.is_visible } ) }
			/>
			{ props.is_visible && (
				<DatePicker
					currentDate={ date }
					onChange={ newDate => props.setAttributes( { date: newDate } ) }
					// Example: Disable mondays
					isInvalidDate={ newDate => newDate.getDay() === 1 }
				/>
			) }
		</div>;

	} ),

	save: () => <InnerBlocks.Content />,

} );
