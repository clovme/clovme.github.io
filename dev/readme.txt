支持ES6语法

全局安装cnpm
    npm install -g cnpm --registry=https://registry.npm.taobao.org
全局安装
    cnpm install -g gulp-cli babel babel-cli
ES6支持(在项目根目录创建 .babelrc 文件)文件内容
    {
      "presets": [
        "es2015"
      ],
      "plugins": []
    }
安装package.json
    cnpm install
安装指定包
    cnpm install --save-dev 包[@version]
