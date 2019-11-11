/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2017-11-29 11:41:02
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-11-11 14:24:27
 */

const utils = require('loader-utils')

module.exports = function (source, map, meta) {
  this.cacheable()
  const option = utils.getOptions(this) || {}

  let fileNames = []


  if (Array.isArray(option.fileName)) {
    fileNames = option.fileName.map(val => val.toLowerCase())
  } else {
    fileNames[0] = option.fileName && option.fileName.toLowerCase()
  }

  const lastFileSplitIndex = this.resourcePath.lastIndexOf('\\') + 1 || this.resourcePath.lastIndexOf('\/') + 1
  const fileName = this.resourcePath.substring(lastFileSplitIndex, this.resourcePath.lastIndexOf('.')).toLowerCase()
  if (this.resourcePath && fileNames.indexOf(fileName) >= 0) {
    console.log('light-api-loader  match file', fileName)
    if (source.indexOf('exports.default') > -1) {
      const removePartStartPostion = source.indexOf('{', source.indexOf('exports.default'))
      const removePartEndPostion = source.lastIndexOf('}')
      const removePart = source.substring(removePartStartPostion + 1, removePartEndPostion)
      const newSource = source.replace(removePart, '')
      this.callback(null, newSource, map, meta)
      return
    }
  }
  this.callback(null, source, map, meta)
}
