# qb-format-s

A tiny implementation of printf's spacing logic for strings (~500 added bytes to minified codebase).  Only supports
%s, not numbers, floats, etc.

## install

    npm install qb-format-s
    
## examples

qb-format-s has very similar behavior to the standard printf library function for string formatting *.

    var format = require('qb-format-s')

    format( 'a%sz}',    '12345678' )    // returns 'a12345678z'
    format( 'a%s9z',    '12345678' )    // returns 'a 12345678z'  (field-width 9)
    format( 'a%s9.4z',  '12345678' )    // returns 'a     1234z'  (field-width 9, truncate 4)
    format( 'a%-s9.4z', '12345678' )    // returns 'a1234     z'  (truncate 4, left-justified) 
    
To log formatted output, you might try wrapping qb-format-s in a small function:
        
    function logf() {
        console.log( 
            format.apply( 
                null, 
                Array.prototype.slice.call(arguments).map(function(v) { return v + '' } ) 
            ) 
        )
    }
    
    logf( 'a%-s9.4z', '12345678' )
    > a1234     z


## mismatched input

\* qb-format-s is more forgiving than printf in that it applies arguments to 
the expression until it has no more arguments to apply.  Leftover '%s' expressions 
are returned without change.  Passing no arguments to qb-format-s will return empty string.

    format()
    > 
    
    format( '%s' )
    > %s
    
    format( '%s:%s', 'a' )
    > a:%s

However, if there are more arguments than expressions, qb-format-s will throw an error.



