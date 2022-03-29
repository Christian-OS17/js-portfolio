const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  // Entry nos permite decir el punto de entrada de nuestra aplicación
    entry: "./src/index.js",
  // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
    output: {
        // path es donde estará la carpeta donde se guardará los archivos
        // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
        path: path.resolve(__dirname, "dist"),
        // filename le pone el nombre al archivo final
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    resolve: {
    // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
    extensions: [".js"],
    // para poder indentificar direcciones
    alias: {
        '@utils': path.resolve(__dirname, 'src/utils/'),
        '@templates': path.resolve(__dirname, 'src/templates/'),
        '@styles': path.resolve(__dirname, 'src/styles/'),
        '@images': path.resolve(__dirname, 'src/assets/images/'),
        }
    },
    module: { // reglas con las cuales trabaja webpack
        rules: [
        {
            test: /\.m?js$/,  //lee los archivos con extencion .js
            exclude: /node_modules/,  // ignora los modulos de la carpeta
            use: {
            loader: 'babel-loader'   //lee los archivos babel
            }
        },
        {
            test: /\.css|.styl$/i,
            use: [MiniCssExtractPlugin.loader,
            'css-loader',
            'stylus-loader'
            ],
        },
        {
            test: /\.png/,   // lee los archivos .png
            type: 'asset/resource'
        },
        {
            test: /\.(woff|woff2)$/,  // regla para leer archivos woff y woff2
            use: {
                loader: 'url-loader',  //nombre del loader
                options: {
                    limit: 10000,
                    mimetype: "application/font-woff",
                    name: "[name].[contenthash].[ext]",
                    outputPath: "./assets/fonts/",
                    publicPath: "../assets/fonts/",
                    esModule: false,
                },
            }
        }
        ]
    },
    plugins: [  // seleccion de plugins necesarios 
        new htmlWebpackPlugin({
        inject: true,
        template: './public/index.html',
        filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
        patterns: [
            {
            from: path.resolve(__dirname, "src", "assets/images"),
            to: "assets/images"
            }
        ]
        }),
        new Dotenv(),
        new CleanWebpackPlugin(),
    ],
    optimization: {   //optimizar para verciones
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    }
}