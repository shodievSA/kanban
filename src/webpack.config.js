const path = require('path');

module.exports = {
  entry: './script.js', 
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Handle CSS files
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Path to your HTML template
    }),
  ],
  resolve: {
    extensions: ['.js', '.mjs'],
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
  },
};
