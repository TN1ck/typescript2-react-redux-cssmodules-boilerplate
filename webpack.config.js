const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const SplitByPathPlugin = require('webpack-split-by-path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';


//
// POSTCSS
//

const postcssBasePlugins = [
    require('postcss-modules-local-by-default'),
    require('postcss-import')({
        addDependencyTo: webpack
    }),
    require('postcss-cssnext'),
    require('postcss-nested')
];
const postcssDevPlugins = [];
const postcssProdPlugins = [
    require('cssnano')({
        safe: true,
        sourcemap: true,
        autoprefixer: false
    })
];

const postcssPlugins = postcssBasePlugins
  .concat(process.env.NODE_ENV === 'production' ? postcssProdPlugins : [])
  .concat(process.env.NODE_ENV === 'development' ? postcssDevPlugins : []);

//
// LOADERS
//

const loaders = {};

loaders.js = {
    test: /\.(jsx?)$/,
    use: [{
        loader: 'babel-loader',
        options: {
            retainLines: true
        }
    }],
    exclude: /node_modules/
};

loaders.tsx = {
    test: /\.(tsx?)$/,
     use: [{
        loader: 'awesome-typescript-loader',
        options: {
            useBabel: true,
            useCache: true
        }
    }],
    exclude: /node_modules/
};

loaders.html = {
    test: /\.html$/,
    use: ['raw-loader'],
    exclude: /node_modules/
};

loaders.css = {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            {
                loader: 'typings-for-css-modules-loader',
                options: {
                    modules: true,
                    namedExport: true,
                    camelCase: true
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: postcssPlugins,
                    importLoaders: 1
                }
            }
        ]
    }),
    exclude: /(node_modules|\.global\.css)/
};

loaders.globalcss = {
    test: /\.global.css$/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            {
                loader: 'css-loader',
                options: {
                    localIdentName: '[name]'
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: postcssPlugins,
                    importLoaders: 1
                }
            }
        ]
    }),
    exclude: /node_modules/
};

exports.ttfeot = {
    test: /\.(ttf|eot)$/i,
    use: [{
        loader: 'file-loader',
        options: {
            hash: 'sha512',
            digest: 'hex',
            name: 'fonts/[name].[ext]?[hash]'
        }
    }]
};

exports.woff = {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 10000,
            minetype: 'application/font-woff',
            name: 'fonts/[name].[ext]?[hash]'
        }
    }]
};

exports.image = {
    test: /\.(jpe?g|png|gif)$/i,
    use: [{
        loader: 'file-loader',
        options: {
            hash: 'sha512',
            digest: 'hex',
            name: 'images/[name]-[hash].[ext]'
        }
    }]
};

//
// PLUGINS
//

const sourceMap = process.env.TEST || process.env.NODE_ENV !== 'production'
  ? [new webpack.SourceMapDevToolPlugin({ filename: null, test: /\.tsx?$/ })]
  : [];

const basePlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            __DEV__: process.env.NODE_ENV !== 'production',
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            BACKEND_URL: JSON.stringify(process.env.BACKEND_URL)
        }
    }),
    new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
        { from: 'src/assets', to: 'assets' }
    ]),
    new ExtractTextPlugin({
        filename: 'style.css',
        allChunks: true
    })
].concat(sourceMap);

const devPlugins = [
    new StyleLintPlugin({
        configFile: './.stylelintrc',
        files: ['src/styles/*.css'],
        failOnError: false
    }),
    new webpack.HotModuleReplacementPlugin()
];

const prodPlugins = [
    // new ExtractTextPlugin('style.css', { allChunks: true })
];

const plugins = basePlugins
  .concat(process.env.NODE_ENV === 'production' ? prodPlugins : [])
  .concat(process.env.NODE_ENV !== 'production' ? devPlugins : []);

//
// ENTRY
//

const applicationEntries = IS_PRODUCTION ? ['./src/index'] : [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './src/index'
];

module.exports = {
    entry: applicationEntries,

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash].js',
        publicPath: '/',
        sourceMapFilename: '[name].[hash].js.map',
        chunkFilename: '[id].chunk.js'
    },

    devtool: IS_PRODUCTION ?
      'source-map' :
      'inline-source-map',

    resolve: {
        modules: [
            path.resolve('./'),
            'node_modules'
        ],
        extensions: [
            '.webpack.js',
            '.web.js',
            '.tsx',
            '.ts',
            '.js',
            '.json'
        ]
    },

    plugins: plugins,

    devServer: {
        historyApiFallback: { index: '/' }
    },

    module: {
        rules: [
            loaders.tsx,
            // loaders.html,
            // loaders.image,
            loaders.globalcss,
            loaders.css,
            // loaders.ttfeot,
            // loaders.woff
        ]
    },

    externals: {
        'react/lib/ReactContext': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/addons': true
    }
};
