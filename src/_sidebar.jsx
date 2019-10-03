const { registerPlugin } = wp.plugins;
const { PluginDocumentSettingPanel } = wp.editPost;
const { PanelRow, SelectControl, Button } = wp.components;

const PluginDocumentSettingPanelDemo = () => (
    <PluginDocumentSettingPanel name="custom-panel" title="JGU">
        <PanelRow>
            <label htmlFor="sidebar-theme-selector">Theme</label>
            <SelectControl
                id="sidebar-theme-selector"
                options={ [
                    { value: "1-column", label: "1-column theme" },
                    { value: "2-column", label: "2-column theme" }
                ] }
                onChange={ option => console.log(option) }
            />
        </PanelRow>
        <PanelRow>
            <Button isPrimary onClick={ () => console.log('button clicked') }>Select theme</Button>
        </PanelRow>
    </PluginDocumentSettingPanel>
);
registerPlugin( 'plugin-document-setting-panel-demo', { render: PluginDocumentSettingPanelDemo, icon: 'admin-tools' } );