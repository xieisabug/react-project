module.exports = {
    entry: {
        'chapter_one' : './build/chapter_one/chapter_one.js',
        'chapter_two' : './build/chapter_two/chapter_two.js',
        'chapter_three': './build/chapter_three/chapter_three.js',
        'chapter_four': './build/chapter_four/chapter_four.js',
        'chapter_five': './build/chapter_five/chapter_five.js',
        'chapter_six': './build/chapter_six/chapter_six.js',
        'chapter_seven': './build/chapter_seven/chapter_seven.js'
    },
    output: {
        path: './release/dist',
        filename: '[name].build.js'
    },
    resolve: {
        extensions: ['', '.Webpack.js', '.web.js', '.ts', '.js', '.tsx']
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'jsx-loader?harmony'},
            {test: /\.sass$/,loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'}
        ]
    },
    externals: {
        'react' : 'React',
        'redux' : 'Redux',
        'react-router' : 'ReactRouter',
        'react-redux' : 'ReactRedux',
        'redux-thunk' : 'ReduxThunk',
        'redux-logger' : 'reduxLogger'
    }
};