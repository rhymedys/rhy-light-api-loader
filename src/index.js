/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2017-11-29 11:41:02
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-12-23 20:18:47
 */

const utils = require('loader-utils')
module.exports = function (source, map, meta) {
  this.cacheable()
  let option = utils.getOptions(this) || {}
  let fileName = option.fileName && option.fileName.toLowerCase() || 'devapi'
  if (this.resourcePath && this.resourcePath.substring(this.resourcePath.lastIndexOf('\\') + 1, this.resourcePath.lastIndexOf('.')).toLowerCase() === fileName) {
    if (source.indexOf('exports.default') > -1) {
      let removePartStartPostion = source.indexOf('{', source.indexOf('exports.default'))
      let removePartEndPostion = source.lastIndexOf('}')
      let removePart = source.substring(removePartStartPostion + 1, removePartEndPostion)
      let newSource = source.replace(removePart, '')
      this.callback(null, newSource, map, meta)
      return
    }
  }
  this.callback(null, source, map, meta)
  return 
}