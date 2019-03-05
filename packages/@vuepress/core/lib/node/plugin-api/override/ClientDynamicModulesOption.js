'use strict'

/**
 * Module dependencies.
 */

const AsyncOption = require('../abstract/AsyncOption')
const { stringify } = require('@vuepress/shared-utils')

/**
 * clientDynamicModules option.
 */

module.exports = class ClientDynamicModulesOption extends AsyncOption {
  async apply (ctx) {
    await super.asyncApply()

    for (const item of this.appliedItems) {
      const {
        name: pluginName,
        value: { name, content, dirname = 'dynamic', data }
      } = item
      let output = content ? content + '\n' : ''
      output += data !== undefined ? 'export default ' + stringify(data) : ''
      await ctx.writeTemp(
        `${dirname}/${name}`,
        `\
/**
 * Generated by "${pluginName}"
 */
${output}\n`)
    }
  }
}
