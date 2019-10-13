## Development

#### Webpack
`npm run watch`

#### ESLint
`npm run eslint`

## Snippets

#### Blocks
``` jsx
wp.data.select('core/block-editor').getBlocks();
```

#### Notices
``` jsx
wp.data.dispatch('core/notices').createNotice('info', 'Info notice');
wp.data.dispatch('core/notices').createNotice('error', 'Error notice');
wp.data.dispatch('core/notices').createNotice('warning', 'Warning notice');
wp.data.dispatch('core/notices').createNotice('success', 'Success notice');
```
