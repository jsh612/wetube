const path = require("path");
const ExtractCSS = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

// package.json의 scripts 에서 명령어를 통해 process.env.WEBPACK_ENV; 값을
// 수동으로 설정 했다.
const MODE = process.env.WEBPACK_ENV;

//  __dirname : 바로 현재 위치를 가리키는 Node.js의 전역 변수.
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static"); // 이름이 static인 디렉토리를 생성하여 그곳에 output 저장

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      // 이곳에 로더를 등록한다.
      {
        test: /\.js?$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.scss?$/, // 해당 파일이 .scss 파일인지를 확인한다
        use: ExtractCSS.extract([
          // - 아래의 로더들을 이용하여 css를 축출하여 특정 장소로 내보낸다.
          // - Loaders can be chained by passing multiple loaders,
          //   which will be applied from right to left (last to first configured).
          //   (즉, 적용순서가 반대로 적용)
          {
            loader: "css-loader" // 3.웹펙이 css를 이해
          },
          {
            loader: "postcss-loader", // 2. css를 받아서, 우리가 주는 plugin을 통해 plugin 적용후 css 반환
            options: {
              plugins() {
                return [autoprefixer({ browsers: "cover 99.5%" })];
              }
            }
          },
          {
            loader: "sass-loader" // 1.scss->css
          }
        ])
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  plugins: [new ExtractCSS("styles.css")] // new ExtractCSS("저장할 파일이름")
};

module.exports = config;
