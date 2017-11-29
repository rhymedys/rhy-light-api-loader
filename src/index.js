/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2017-11-29 11:41:02 
 * @Last Modified by:   Rhymedys 
 * @Last Modified time: 2017-11-29 11:41:02 
 */

module.exports = function (source, map, meta) {
  this.cacheable()
  if (map && map.sources[0].indexOf('devApi') > -1) {
    if (source.indexOf('exports.default') > -1) {
      let removePartStartPostion = source.indexOf('{', source.indexOf('exports.default'))
      let removePartEndPostion = source.lastIndexOf('}')
      let removePart = source.substring(removePartStartPostion + 1, removePartEndPostion)
      let newSource = source.replace(removePart, '')
      return newSource
    }
  }
  return source
}
