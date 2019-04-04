module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "identitas",
        appId: "com.educarpersonas"
      }
    }
  }
};
