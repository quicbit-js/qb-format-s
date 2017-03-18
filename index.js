function err (msg) { throw Error(msg) }
module.exports = function () {
  var re = /%([+-])?(\d+)?(?:\.(\d+))?s/g     // captures: left-justify, field-width, precision   (type 's' assumed)
  var a = arguments

  if (!a.length) { return '' } else if (a.length === 1) { return a[0] }

  var ret = '', off = 0, expr = a[0], m = null
  for (var i = 1; i < a.length; i++) {
    m = re.exec(expr) || err('too many arguments')  // should have at least one %.. expression per arg

    ret += expr.substring(off, m.index)
    var s = a[i]
    s = m[3] == null ? s : s.substring(0, m[3])     // precision    (max size)
    if (s.length < m[2]) {                           // field-width  (min size)
      if (m[1] === '-') {
        while (s.length < m[2]) { s = s + ' ' }
      } else {
        while (s.length < m[2]) { s = ' ' + s }
      }
    }
    ret += s
    off = re.lastIndex
  }
  return (off < expr.length) ? ret + expr.substring(off) : ret
}
