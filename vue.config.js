module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "identitas-daip",
        appId: "com.educarpersonas"
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/styles/variables.scss";
        `
      }
    }
  }
};
