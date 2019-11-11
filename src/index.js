/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2017-11-29 11:41:02
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-11-11 15:40:27
 */

const utils = require('loader-utils')

module.exports = function (source, map, meta) {
  this.cacheable()
  const option = utils.getOptions(this) || {}

  let fileNames = []



  const action = (reg) => {
    const removePartStartPostion = source.indexOf('{', source.indexOf(reg))
    const removePartEndPostion = source.lastIndexOf('}')
    const removePart = source.substring(removePartStartPostion + 1, removePartEndPostion)
    const newSource = source.replace(removePart, '')
    console.log(newSource)
    this.callback(null, newSource, map, meta)
    return
  }

  if (Array.isArray(option.fileName)) {
    fileNames = option.fileName.map(val => val.toLowerCase())
  } else {
    fileNames[0] = option.fileName && option.fileName.toLowerCase()
  }

  const lastFileSplitIndex = this.resourcePath.lastIndexOf('\\') + 1 || this.resourcePath.lastIndexOf('\/') + 1
  const fileName = this.resourcePath.substring(lastFileSplitIndex, this.resourcePath.lastIndexOf('.')).toLowerCase()
  if (this.resourcePath && fileNames.indexOf(fileName) >= 0) {
    console.log('light-api-loader  match file', fileName)

    const matchKeys = source.match(/.*export.*default/)
    
    if (matchKeys && matchKeys.length && source.indexOf(matchKeys[0]) > -1) {
      action(matchKeys[0])
    } else {
        this.callback(null, source, map, meta)
        return
    }
  } else {
    this.callback(null, source, map, meta)
    return
  }
}