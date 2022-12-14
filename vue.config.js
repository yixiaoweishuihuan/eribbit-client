const path = require('path')
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/styles/variables.less'),
        path.resolve(__dirname, './src/assets/styles/mixins.less')
      ]
    }
  }
}
