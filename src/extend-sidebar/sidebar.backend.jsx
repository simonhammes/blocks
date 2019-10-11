/* WordPress dependencies */
/* webpackExclude: /\./node_modules\// */
const { PanelRow, Button } = wp.components;
const { PluginDocumentSettingPanel } = wp.editPost;
const { registerPlugin } = wp.plugins;

/* Internal dependencies */
import { transformClassicBlock } from './transform-classic-block';


const ExtendSidebar = () => {
	return <PluginDocumentSettingPanel title="JGU">
		<PanelRow>
			<Button isPrimary onClick={ transformClassicBlock }>In Blöcke umwandeln</Button>
		</PanelRow>
	</PluginDocumentSettingPanel>;
};

registerPlugin( 'extend-sidebar', { render: ExtendSidebar, icon: 'admin-tools' } );
