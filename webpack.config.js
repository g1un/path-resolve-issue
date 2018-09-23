const path = require('path');
const autoprefixer = require('autoprefixer');
const plugins = require('./webpack/plugins');
const includesLoader = require('./webpack/includesLoader');

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');

const svgObject = require('./webpack/svgObject')(SRC_DIR + '/svg');

let config = (env, argv) => {
    let isProd = argv.mode === 'production';

    return {
        entry: {
            app: SRC_DIR + `/js/dev.app.js`,
        },
        output: {
            path: DIST_DIR,
            filename: 'js/main.js'
        },

        resolveLoader: {
            modules: ['node_modules', './webpack/']
        },

        resolve: {
            modules: [
                path.resolve(__dirname, ''),
                "node_modules",
                "src/spritesmith-generated",
                "src/img",
                "src/fonts"
            ]
        },

        module: {
            rules: [
                {
                    test: require.resolve('jquery'),
                    use: [
                        {
                            loader: 'expose-loader',
                            options: 'jQuery'
                        }
                    ]
                },

                {
                    test: /\.js$/,
                    include: SRC_DIR,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: 'css/main.css'
                            }
                        },
                        {
                            loader: 'extract-loader',
                            options: {
                                publicPath: '../'
                            }
                        },
                        {
                            loader: "css-loader",
                            options: {
                                minimize: isProd
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [autoprefixer('last 2 versions', 'ie 11')]
                                }
                            }
                        },
                        "sass-loader"
                    ]
                },
                {
                    test: /\.pug$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].html'
                            }
                        },
                        {
                            loader: 'pug-html-loader',
                            options: {
                                pretty: true,
                                data: {
                                    svg: svgObject
                                }
                            }
                        },
                        {
                            loader: 'includesLoader',
                            options: {
                                pathToIncludes: SRC_DIR + '/includes'
                            }
                        }
                    ]
                },
                {
                    test: /\.png$/,
                    include: [ SRC_DIR + '/spritesmith-generated' ],
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'img/sprite/[name].png'
                            }
                        }
                    ]

                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    include: [SRC_DIR + '/img'],
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'img/[name].[ext]'
                            }
                        }
                    ]

                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2)$/i,
                    include: [ SRC_DIR + '/fonts' ],
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'fonts/[name].[ext]'
                            }
                        }
                    ]

                }
            ]
        },

        plugins: plugins(isProd, SRC_DIR, DIST_DIR),

        devServer: {
            disableHostCheck: true,
            host: '0.0.0.0'
        },
        watchOptions: {
            poll: 1000,
            aggregateTimeout: 1000
        }
    }
};

module.exports = config;