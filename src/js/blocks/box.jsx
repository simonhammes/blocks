const { InnerBlocks } = wp.blockEditor;
const { createBlock, registerBlockType } = wp.blocks;
const { TextControl } = wp.components;
const { insertBlock } = wp.data.dispatch('core/block-editor');
const { createNotice } = wp.data.dispatch('core/notices');
const ServerSideRender = wp.serverSideRender;

const ALLOWED_INNER_BLOCKS = ['wp-gb-nesting/column' ,'wp-gb-nesting/person', 'core/paragraph']; // TODO
const SHORTCODES = ['person'];
const is_shortcode = element => {
    let first_word = element.replace(/ .*/,'');
    return SHORTCODES.includes(first_word);
};
const DEBUG_MODE = true;
const debug = thing => DEBUG_MODE ? console.log(thing) : null;


registerBlockType('dev/box', {
    title: 'Box',
    icon: 'hammer',
    category: 'blocks-by-simon-hammes',
    transforms: {
        from: [
            {
                type: 'shortcode',
                tag: 'box',
                attributes: {
                    color: {
                        type: 'string',
                        shortcode: (attributes, content) => transform_shortcode(attributes, content)
                    }
                }
            },
        ]
    },
    edit: props => {

        return <div>
            <h4>Box</h4>
            <TextControl
                label="Color"
                value={props.attributes.color}
                onChange={color => props.setAttributes({color: color})}
            />
            <InnerBlocks allowedBlocks={ ALLOWED_INNER_BLOCKS}/>
        </div>;

    },
    save: () => <InnerBlocks.Content/>
});

const transform_shortcode = (attributes, content) => {

    let elements = content.shortcode.content.split(/\[|\]/);
    let blocks = [];

    // Manipulate elements
    for (let i = 0; i < elements.length; i++) {

        let element = elements[i].replace('<br \/>', '');

        if (element.trim() === '') {
            continue;
        }

        if (is_shortcode(element)) {

            element = '[' + element + ']';

            debug('shortcode: ' + element);

            // Convert the shortcode into a block, the p tags are necessary
            block = wp.blocks.rawHandler( { HTML: '<p>' + element + '</p>' } )[0];
            blocks.push(block);

        } else {

            debug('not a shortcode: ' + element);
            // Convert HTML into block(s) and add each block to the end of the blocks array
            wp.blocks.rawHandler( { HTML: element } ).map(block => blocks.push(block));

        }

    }

    // TODO: only the first shortcode is converted -> bug?
    // TODO: this seems to be the fix ...
    //console.log(wp.blocks.rawHandler( { HTML: '<p>[person id="5"]</p><p>[person id="8"]</p>' } ));

    let block = createBlock('dev/box', { color: attributes.named.color }, blocks);
    insertBlock(block, 0);

    createNotice('success', 'The box block was successfully inserted!');
    createNotice('info', 'Please remove the additional empty box block at the bottom of the page!', { isDismissible: false } );

};

const transform_shortcode_alternative_1 = (attributes, content) => {

    const namespace = 'wp-gb-nesting';

    let elements = content.shortcode.content.split(/\[|\]/);
    let blocks = [];

    // Manipulate elements
    for (let i = 0; i < elements.length; i++) {

        let element = elements[i].replace('<br \/>', '');

        if (element.trim() === '') {
            continue;
        }

        if (is_shortcode(element)) {

            debug('shortcode: ' + get_shortcode_tag(element));

            // Example: wp-gb-nesting/person
            let block_name = namespace + '/' + get_shortcode_tag(element);
            let block_arguments = parse_arguments('[' + element + ']');

            block = wp.blocks.createBlock(block_name, block_arguments);
            blocks.push(block);

        } else {

            debug('not a shortcode: ' + element);

            block = wp.blocks.createBlock('core/paragraph', { content: '<h4>Text block</h4>' + element } );
            blocks.push(block);

        }

    }

    let block = wp.blocks.createBlock('dev/box', { color: attributes.named.color }, blocks);
    wp.data.dispatch('core/block-editor').insertBlock(block, 0);

};

const get_shortcode_tag = element => element.replace(/ .*/, '');
const parse_arguments = shortcode => {

    let block_arguments = {};

    // Source: shortcodes.php -> get_shortcode_regex()
    let pattern = /\[(\[?)(person)(?![\w-])([^\]\/]*(?:\/(?!\])[^\]\/]*)*?)(?:(\/)\]|\](?:([^\[]*(?:\[(?!\/\2\])[^\[]*)*)\[\/\2\])?)(\]?)/g;
    // TODO make 'person' dynamic

    let result = [...shortcode.matchAll(pattern)][0][3];

    // Source: shortcodes.php -> get_shortcode_atts_regex() with slight modifications (JS RegEx != PHP RegEx)
    let pattern_atts = /([\w-]+)\s*=\s*"([^"]*)"(?:\s|$)|([\w-]+)\s*=\s*'([^']*)'(?:\s|$)|([\w-]+)\s*=\s*([^\s'"]+)(?:\s|$)|"([^"]*)"(?:\s|$)|'([^']*)'(?:\s|$)|(\S+)(?:\s|$)/g;

    let results = [...result.matchAll(pattern_atts)];

    results.map(item => block_arguments[item[1]] = item[2]);

    return block_arguments;

    /* WORKING SOLUTION:

    let shortcode_args = shortcode.split(' ').slice(1);
    let block_arguments = {};

    for (let i = 0; i < shortcode_args.length; i++) {
        let pair = shortcode_args[i].split('=');
        block_arguments[pair[0]] = pair[1].replace(/"/g, '');
    }

    debug(block_arguments);
    return block_arguments;

    */

};
