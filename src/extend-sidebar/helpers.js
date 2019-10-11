/* eslint-disable */

export let removeEmptyBlocks = blocks => {

    //console.log('heygd3');

    // Remove empty top-level elements
    let listOfBlocks = blocks.filter( block => ! (typeof block === 'string' && block.trim() === '') );

    let blocksToReturn = [];

    for (let block of listOfBlocks) {
        if (typeof block == 'object' && block.hasOwnProperty('innerBlocks') && block.innerBlocks.length > 0) {

            let newBlock = {
                clientId: block.clientId,
                name: block.name,
                isValid: true,
                attributes: block.attributes,
                innerBlocks: removeEmptyInnerBlocks(block.innerBlocks)
            };

            //blocksToReturn.push(removeEmptyInnerBlocks(block.innerBlocks));
            blocksToReturn.push(newBlock)
            //throw new Error();
        }

        /*console.log(blocksToReturn);
        throw new Error()*/

    }
    console.log(blocksToReturn);
    throw new Error()
    return blocksToReturn;
};

const removeEmptyInnerBlocks = obj => {

    Object.keys(obj).forEach(key => {


        // TODO: Maybe remove the last conditional?
        // Element is a block and has at least one inner block
        if (obj[key] && typeof obj[key] === 'object' && obj[key].hasOwnProperty('innerBlocks') && obj[key].innerBlocks.length > 0) {
            removeEmptyInnerBlocks(obj[key])
        }

        else if (typeof obj[key] === 'string' && obj[key].trim() === '') {
            delete obj[key];
        }

        /*if (obj[key])
        if (obj[key] && typeof obj[key] === 'string' && obj[key].trim() === '') delete obj[key];
*/
    });

    return obj;

};

const removeEmpty = obj => {
    Object.keys(obj).forEach(key => {
        if (obj[key] && typeof obj[key] === "object") removeEmpty(obj[key]); // recurse
        else if (obj[key] == null) delete obj[key]; // delete
    });
};