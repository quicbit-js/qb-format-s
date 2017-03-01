var test = require('test-kit').tape()
var format = require('.')

test('format-s', function(t) {
    t.tableAssert([
        [ 'args',                           'exp'               ],
        [ [],                               ''                  ],  // no args returns empty string
        [ ['%+6s%-8s'],                     '%+6s%-8s'          ],  // fewer arguments returns expression untouched
        [ ['%+6s%-8s', '123'],              '   123%-8s'        ],  // fewer arguments returns expression untouched
        [ ['%6s%8s', '123', '456'],         '   123     456'    ],
        [ ['%+6s%8s', '123', '456'],        '   123     456'    ],
        [ ['%-6s%8s', '123', '456'],        '123        456'    ],
        [ ['%-6s%-8s', '123', '456'],       '123   456     '    ],
        [ ['%+6s%-8s', '123', '456'],       '   123456     '    ],
        [ ['%s', '12345678'],               '12345678'          ],
        [ ['%s%s', '123', '456'],           '123456'            ],
        [ ['a%sb', '12345678'],             'a12345678b'        ],
        [ ['a%4sb', '12345678'],            'a12345678b'        ],
        [ ['a%4.9sb', '12345678'],          'a12345678b'        ],
        [ ['a%4.2sb', '12345678'],          'a  12b'            ],
        [ ['a%9sb', '12345678'],            'a 12345678b'       ],
        [ ['a%9.3sb', '12345678'],          'a      123b'       ],

    ], function(args) { return format.apply(null, args) } )
})

test('errors', function(t) {
    t.tableAssert(
        [
            [ 'args',                       'exp' ],
            [ ['',        'a'],             /too many arguments/ ],
            [ ['hello',   'a'],             /too many arguments/ ],
            [ ['%s', 'a', 'b'],             /too many arguments/ ],
        ],
        function(args) { return format.apply(null, args) },
        { assert: 'throws' }
    )
})

test('format-logger', function(t) {
    // test out the suggested logger function by returning the output instead of logging it via console.log
    var logger = function() {
        return format.apply( null, Array.prototype.slice.call(arguments).map(function(v) { return v + '' } ) )
    }
    t.tableAssert(
        [
            [ 'args',                           'exp'               ],
            [ [''],                             ''                  ],
            [ ['hello'],                        'hello'             ],
            [ ['%-6s%8s', '123', '456'],        '123        456'    ],
            [ ['%-6s%8s', null, '456'],         'null       456'    ],
            [ ['%-6s%8s', undefined],          'undefined%8s'       ],
        ],
        function(args) { return logger.apply(null, args) }
    )
})
