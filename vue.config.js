const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  devServer :{
    //벡엔드 서버 위치 : 프론트에서 '/api로 시작하면 http://127.0.0.1:3000를 호출
    proxy : {
      '/api' : {
        target : 'http://127.0.0.1:3000',
        changeOrigin : true,
        logLevel:'debug'
      },
    }
  }
})
