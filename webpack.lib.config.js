/**
 * Created by sina on 2016/5/16.
 */
"use strict";
let path = require("path");
let webpack = require('webpack');
let srcDir = path.resolve(process.cwd(), 'pages');
let libDir = path.resolve(__dirname,'lib');
module.exports = ((isDev) => {
    return {
        entry: path.resolve(srcDir, 'js', 'mods', 'ui', 'card-slider', 'index.js'),
        output: {
            path: libDir,
            publicPath: isDev ? "/test/" : "./",
            chunkFilename: isDev ? "js/[name]-chunk.js" : "js/[name]-chunk.js",
            filename: "[name].js",
            library: 'CardSlider',
            libraryTarget: 'umd'
        },
        resolve: {
            root: [path.join(__dirname, 'js', 'main')],
            extensions: ['', '.js', '.tpl', '.css'],
            modulesDirectories: ['tpl', 'css', 'components', 'node_modules'],
            alias: {
                'es5-shim': path.join(__dirname, 'node_modules', 'es5-shim', 'es5-shim.min.js'),
                'es5-sham': path.join(__dirname, 'node_modules', 'es5-shim', 'es5-sham.min.js')
            }
        },
        module: {
            loaders: [{
                    test: /\.scss$/,
                    loader: 'style!css!sass',
                }, {
                    test: /\.(png|jpeg|jpg|gif)$/,
                    loader: 'url?limit=1&name=img/[name].[ext]'
                }, //图片加载对象
                {
                    test: /\.tpl$/,
                    loader: 'tmodjs'
                }, {
                    test: /\.html$/,
                    loader: 'html?minimize=false&interpolate=true'
                }
            ],
            noParse: [/zepto\.main\.js/, /es5-shim\.min\.js/, /es5-sham\.min\.js/]
        },
        plugins: (() => {
            let list = [new webpack.NoErrorsPlugin()];
            if (!isDev) {
                list.push(new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false
                    },
                    output: {
                        comments: false
                    },
                    mangle: {
                        except: ['$', 'exports', 'require']
                    }
                }));
            }
            return list;
        })()
    };
});
