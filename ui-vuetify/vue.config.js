const path=require('path');

module.exports = {
outputDir:path.resolve(__dirname,'../SPA-VUETIFY/dist'),
assetsDir:'./static',


  transpileDependencies: [
    'vuetify'
  ]
}
