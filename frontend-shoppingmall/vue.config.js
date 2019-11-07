//const path = require("path");

module.exports = {
    devServer: {
        proxy: {
            '/api': {
              target: 'http://localhost:8080/api',
              ws: true,
              changeOrigin: true,
              pathRewrite: {
                '^/api': ''
              }
            },
        }
    },
    // outputDir: path.resolve(__dirname, "../src/main/resources/static"),
    // assetsDir: "./assets"
}
