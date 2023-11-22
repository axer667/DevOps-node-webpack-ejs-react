const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    devServer: {
        static: {
            directory: path.join(__dirname, 'serve'),
        },
        compress: true,
        port: 8080,
    },

    devtool: 'source-map',

    entry: {
        main: [path.resolve(__dirname, './src/ts/app.tsx')]
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].bundle.js',
        chunkFilename: '[id].bundle.js',
    },

    module: {
        rules: [
            // Typescript
            {
                test: /\.tsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'ts-loader'
                }
            },
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            // изображения
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            // шрифты и SVG
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            {
                test: /\.(s*)css$/,
                use: [
                    {
                        loader: MiniCSSPlugin.loader,
                        options: {

                            publicPath: (resourcePath, context) => {
                                return path.relative(path.dirname(resourcePath), context) + '/';
                            }

                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            },
        ]
    },

    plugins:[
        new HtmlWebpackPlugin({
            title: 'webpack Title',
            template: "src/html/index.html", // шаблон
            filename: 'index.html', // название выходного файла
            chunkFilename: '[name].html',
            chunks: 'all',
        }),
        new MiniCSSPlugin({
            filename: `css/[name].css`,
            chunkFilename: 'css/[id].css',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        extensions: ['.Webpack.js', '.web.js', '.ts', '.js', '.jsx', '.tsx']
    },


}