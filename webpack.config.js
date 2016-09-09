/**
 * Created by sina on 2016/5/16.
 */
"use strict";
let path = require("path");
let glob = require('glob');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let SpritesmithPlugin = require('webpack-spritesmith');
let srcDir = path.resolve(process.cwd(), 'pages');
let assets = path.resolve(process.cwd(), 'assets');
let testDir = path.resolve(__dirname, "test");

let spritePlugin = new SpritesmithPlugin({
    src: {
        cwd: path.resolve(__dirname, 'pages/sprite'),
        glob: '*.*'
    },
    target: {
        image: path.resolve(__dirname, 'pages/img/sprite.png'),
        css: path.resolve(__dirname, 'pages/scss/sprite.scss')
    },
    apiOptions: {
        cssImageRef: "../img/sprite.png"
    },
    spritesmithOptions: {
        padding: 20,
        algorithm: "alt-diagonal"
    }
});

//文件js扫描入口
let entries = (() => {
    let jsDir = path.resolve(srcDir, 'js', 'page');
    let entryFiles = glob.sync(jsDir + '/*.js');
    let map = {};
    entryFiles.forEach((filePath) => {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        map[filename] = filePath
    });
    return map
})();
let htmlPlugins = (() => {
    let htmlDir = path.resolve(srcDir, 'html');
    let entryHtml = glob.sync(htmlDir + '/*.html');
    let r = []

    entryHtml.forEach((filePath) => {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        let conf = {
            template: filePath,
            filename: filename + '.html'
        };

        if (filename in entries) {
            conf.inject = 'body';
            conf.chunks = ['vender', filename]
        }
        //TODO 读取配置文件添加 不同的entries
        r.push(new HtmlWebpackPlugin(conf))
    });

    return r;
})();
module.exports = ((isDev) => {
    let cssName = isDev ? 'css/[name].css' : 'css/[name]-[contenthash].css';
    let cssExtractTextPlugin = new ExtractTextPlugin(cssName, {
        disable: false,
        allChunks: false //不将所有的文件都打包到一起
    });

    return {
        //watch: isDev,
        devtool: isDev ? '#source-map' : null,
        entry: Object.assign(entries, {
            'vender': ['es5-shim', 'es5-sham', , 'zepto']
        }),
        output: {
            path: isDev ? testDir : assets,
            publicPath: isDev ? "/test/" : "https://snews.sinaimg.cn/projects/mq/",
            chunkFilename: isDev ? "js/[name]-chunk.js" : "js/[name]-chunk.js",
            filename: isDev ? "js/[name].js" : "js/[name].js"
        },
        resolve: {
            root: [path.join(__dirname, 'js', 'main')],
            extensions: ['', '.js', '.tpl', '.css'],
            modulesDirectories: ['tpl', 'css', 'components', 'node_modules'],
            alias: {
                'zepto': path.join(__dirname, 'pages', 'js', 'lib', 'core', 'zepto.min.js'),
                'es5-shim': path.join(__dirname, 'node_modules', 'es5-shim', 'es5-shim.min.js'),
                'es5-sham': path.join(__dirname, 'node_modules', 'es5-shim', 'es5-sham.min.js')
            }
        },
        module: {
            loaders: [
                {
                    test: /\.scss$/,
                    loader: isDev ? 'style!css?sourceMap!sass?sourceMap' : cssExtractTextPlugin.extract('style', ['css!sass'])
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
            let list = [new webpack.NoErrorsPlugin(),spritePlugin];
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
                }), cssExtractTextPlugin);
            }
            return list.concat(htmlPlugins);
        })()
    };
});
