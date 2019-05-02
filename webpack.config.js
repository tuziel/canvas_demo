const fs = require('fs');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT = __dirname;

const config = {
  mode: 'production',
  entry: {},
  output: {
    filename: 'js/[chunkhash].js',
    path: path.resolve(ROOT, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: `${ROOT}/src/index.html`,
      chunks: [],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        useShortDoctype: true,
      },
    }),
  ],
};

function getEntryfrom(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  files.forEach((file) => {
    // 遍历文件目录
    if (file.isDirectory()) {
      const dirName = file.name;
      const content = fs.readdirSync(path.resolve(dir, dirName));
      // 如果存在index.ts则作为页面入口
      if (content.indexOf('index.ts') >= 0) {
        config.entry[dirName] = path.resolve(ROOT, 'src', dirName, 'index.ts');
        config.plugins.push(new HtmlWebpackPlugin({
          template: path.resolve(ROOT, 'src', dirName, 'index.html'),
          chunks: [dirName],
          minify: {
            collapseWhitespace: true,
            removeComments: true,
            useShortDoctype: true,
          },
          filename: `${dirName}.html`,
        }));
      }
    }
  })
}

getEntryfrom(path.resolve(ROOT, 'src'));

module.exports = config;
