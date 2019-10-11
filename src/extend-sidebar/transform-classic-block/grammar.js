/* eslint-disable */

// Source: https://github.com/WordPress/gutenberg/issues/12235#issuecomment-442180020 by dmsnell

// TODO in createBlock include namespace

export let grammar = `

{

    const NAMESPACE = "dev";
    
    // Generate a UUIDv4 -> https://stackoverflow.com/a/2117523
    function uuid() {    
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function(c) {
            return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
        });
    }
    
    // Create a valid block
	function createBlock(name, attributes, innerBlocks = []) {
	
		return {
		    clientId: uuid(),
		    name: NAMESPACE + '/' + name,
		    isValid: true,
		    attributes: attributes,
		    innerBlocks: innerBlocks
		}
		
		if(atts.hasOwnProperty('status')) {
			atts.status = (atts.status === 'open') ? true : false;
		}
			
	}

}


Document
    = (Shortcode / $((!Shortcode .)+))*

Shortcode
    = ClosingShortcode
    / NonClosingShortcode

ClosingShortcode
    = o:ShortcodeOpening d:(Shortcode / $((!Shortcode !ShortcodeClosing .)+))* c:ShortcodeClosing & { return o[0] === c }
    { 
        return createBlock(o[0], o[1], d)            
    }
    
NonClosingShortcode
    = o:ShortcodeOpening
    { 
        return createBlock(o[0], o[1])
    }

ShortcodeOpening
    = "[" n:ShortcodeName __ a:AttributePairs? __ "]"
    { 
        return [ n, a || {} ] 
    }
  
ShortcodeClosing
    = "[/" n:ShortcodeName "]"
    { 
        return n 
    }

ShortcodeName
    = $([a-z0-9-_]+)

AttributePairs
    = a:Attribute as:(_+ ia:Attribute { return ia })*
    { 
        return [ a ].concat( as ).reduce( function( out, next ) {
            out[ next[ 0 ] ] = next[ 1 ];
            return out;
        }, {} ) 
    }

Attribute
    = n:AttributeName "=" v:AttributeValue
    { 
        return [ n, v ] 
    }

AttributeName
    = $([a-z0-9-_]+)

AttributeValue
    = '"' v:$(!'"' .)+ '"' 
    { 
        return v 
    }

__
    = _*

_
    = [ \\t\\n\\r]
  
`;
