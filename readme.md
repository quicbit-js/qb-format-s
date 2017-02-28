# qb-prints

A tiny implementation of printf's spacing logic for strings.  Only supports
%s, not numbers, floats, etc.

## install

    npm install qb-prints
    
## examples

    var prints = require('qb-prints')
    
    prints( 'a%sz}',    '12345678' )
    > a12345678z
    
    prints( 'a%s9z',    '12345678' )    // field-width 9
    > a 12345678z
    
    prints( 'a%s9.4z', '12345678' )     // field-width 9, truncate 4
    > a     1234z

    prints( 'a%-s9.4z', '12345678' )   // truncate 4, left-justified 
    > a1234     z

qb-prints() is more forgiving that printf with arguments.  It applies arguments to 
an expression until it has no more arguments to apply.  If there are '%s' expressions 
left over, it simply prints them.  Zero arguments will return empty string.

    prints()
    > 
    
    prints( '%s' )
    > %s
    
    prints( '%s:%s', 'a' )
    > a:%s

However, if there are more arguments than expressions, it will not know what to 
do with them and throw an error.