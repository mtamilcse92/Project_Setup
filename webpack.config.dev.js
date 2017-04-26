import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import fs from 'fs';


let envDir = path.join(__dirname, 'config', 'env');
let envPath = envDir + (fs.existsSync(envDir + '.local.js') ? '.local.js' : '.dev.js');

export default {
  resolve: {
    root: path.join(__dirname, 'src'),
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {
      env: envPath
    }
  },
  debug: true,
  devtool: 'eval-source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  noInfo: true, // set to false to see a list of every file being bundled.
  entry: [
    // must be first entry to properly set public path
    './src/webpack-public-path',  
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, 'src/index.js') // Defining path seems necessary for this to work consistently on Windows machines.
  ],
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: path.resolve(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
      __DEV__: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
        template: 'src/index.ejs',
        minify: {
          removeComments: true,
          collapseWhitespace: true
        },
        inject: true
        })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [path.join(__dirname, 'config'), path.join(__dirname, 'src')], 
        exclude: /node_modules/, 
        loader: 'babel',
        query: {
        presets: ['react', 'es2015'],
        plugins: [['react-transform', {
          transforms: [{
            transform: 'react-transform-hmr',
            imports: ['react'],
            locals: ['module']
          }]
        }]]
      }
      },
      {test   : /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,loader : 'file-loader'},
      {test: /(app\/assets)\/.*\.svg$/,loaders: ['react-svgdom', 'svgo?useConfig=svgoConfig']},
      {test: /\.(jpe?g|png|gif)$/i, loader: 'file?name=[name].[ext]'},
      {test: /\.ico$/, loader: 'file?name=[name].[ext]'},
      {test: /(\.css)$/, loader: 'style-loader!css-loader!postcss-loader'},
      {test: /\.json$/, loader: "json"}
    ]
  },
  postcss: () => {
    return [
      require('postcss-import')({
        addDependencyTo: webpack,
        path: ['node_modules', 'src']
      }),
      require('postcss-cssnext')()
    ];
  },
  svgoConfig: {
    plugins: [
      { removeTitle: true },
      { removeDesc: true },
      { collapseGroups: true },
      { cleanupIDs: true },
      { removeComments: true },
      { removeMetadata: true },
      { removeDoctype: true },
      { removeEditorsNSData: true },
      { cleanupAttrs: true },
      { removeUselessStrokeAndFill: true }
    ]
  }
};
