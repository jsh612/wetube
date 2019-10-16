const path = require("path");
const ExtractCSS = require("extract-text-webpack-plugin");

// package.json의 scripts 에서 명령어를 통해 process.env.WEBPACK_ENV; 값을
// 수동으로 설정 했다.
const MODE = process.env.WEBPACK_ENV;

//  __dirname : 바로 현재 위치를 가리키는 Node.js의 전역 변수.
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ENTRY_FILE,
  mode: MODE,
  module: {
    rules: [
      // 이곳에 로더를 등록한다.
      {
        test: /\.scss?$/, // 해당 파일이 .scss 파일인지를 확인한다
        use: ExtractCSS.extract([
          // - Loaders can be chained by passing multiple loaders,
          //   which will be applied from right to left (last to first configured).
          {
            loader: "css-loader"
          },
          {
            lader: "postcss-loader"
          },
          {
            lader: "sass-loader"
          }
        ])
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].[format]"
  }
};

module.exports = config;
