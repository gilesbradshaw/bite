// Karma configuration

module.exports = function(config) {
    config.set({
        // ... normal karma configuration

        files: [
            // all files ending in "_test"
            'client/*_test.js',
            'client/**/*_test.js'
            // each file acts as entry point for the webpack configuration
        ],

        preprocessors: {
            // add webpack as preprocessor
            'client/*_test.js': ['webpack','sourcemap'],
            'client/**/*_test.js': ['webpack', 'sourcemap'],

        },

        webpack: {
            // karma watches the test entry points
            // (you don't need to specify the entry option)
            // webpack watches dependencies

            // webpack configuration
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    { test: /\.jsx?$/, exclude: /node_modules/, loader: 'jsx-loader' },
                    { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },

                ]
            },
            resolve: {
                extensions: ["", ".js", ".jsx"]
            },
        
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            noInfo: true
        },

        plugins: [
            require("karma-webpack"),
            require("karma-sourcemap-loader"),
            require("karma-jasmine"),
            require("karma-phantomjs-launcher")
        ],
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        reporters: ['dots'],

    });
};