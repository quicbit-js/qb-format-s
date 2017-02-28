# qb-prints-tiny

A tiny implementation of printf's spacing logic for strings.  Only supports
%s, not numbers, floats, etc.

    prints( 'a%sz}',    '12345678' )
    > a12345678z
    
    prints( 'a%s9z',    '12345678' )
    > a 12345678z
    
    prints( 'a%-s9z',   '12345678' )    // left-justified
    > a12345678 z

    prints( 'a%s9.4z', '12345678' )     // truncate 4
    > a     1234z

    prints( 'a%+s9.4z', '12345678' )   // same (default is right-justified)
    > a     1234z

    prints( 'a%-s9.4z', '12345678' )   // left-justified 
    > a1234     z
