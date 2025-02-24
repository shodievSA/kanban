# Kanban Board Project

## Overview

This project is a simple Kanban board implemented using JavaScript, HTML, and CSS. It allows users to create containers (lists), add cards to those containers, and drag and drop the containers to reorder them. The state of the board is saved in local storage, so it persists across browser sessions.

## Features

-   Create and delete containers
-   Add, edit, and delete cards within containers
-   Drag and drop containers to reorder them
-   Data persistence using local storage

## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (version 12 or higher)
-   [npm](https://www.npmjs.com/) (Node Package Manager, usually installed with Node.js)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/shodievSA/kanban.git
    cd kanban
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

    This command installs all the necessary packages specified in the `package.json` file, including:

    -   `@shopify/draggable`: For implementing drag and drop functionality.
    -   `dompurify`: For sanitizing HTML to prevent XSS attacks.
    -   `webpack` and related plugins: For bundling JavaScript and CSS files.
    -   `babel-loader` and `@babel/preset-env`: For transpiling modern JavaScript to ensure compatibility.
    -   `mini-css-extract-plugin`: For extracting CSS into separate files.
    -   `html-webpack-plugin`: For generating HTML files.

### Configuration

This project does not require extensive configuration. However, you might want to adjust the following:

-   **`webpack.config.js`**:  This file configures how Webpack bundles the JavaScript and CSS.  You can modify the entry point, output path, and other settings as needed.

    ```javascript
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
            ], // Handle CSS files
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './index.html', // Path to your HTML template
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
          }),
      ],
      resolve: {
        extensions: ['.js', '.mjs'],
        modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
      },
    };
    ```

-   **`index.html`**:  This is the main HTML file.  You can modify the structure and content of the page here.

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Kanban Board</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="stylesheet" href="./dist/main.css">
    </head>
    <body>

        <div id="page-container">

            <div id="main">

            </div>

            <button class="add-container">New Container</button>

        </div>

        <script src="./dist/bundle.js"></script>
    </body>
    </html>
    ```

### Environment Variables

This project does not require any environment variables.

## Running the Project

1.  **Build the project:**

    ```bash
    npm run build
    ```

    This command uses Webpack to bundle the JavaScript and CSS files and outputs them to the `dist` directory.  It uses the configuration specified in `webpack.config.js`.

2.  **Open `index.html` in your browser:**

    Simply navigate to the project directory in your file explorer and double-click the `index.html` file located inside the root project directory.  Alternatively, you can serve the `dist` directory using a local web server (e.g., using `npx serve dist`).

    ```bash
    npx serve dist
    ```

    Then, open your browser and navigate to the address provided by `serve` (usually `http://localhost:5000`).

## Project Structure

The project structure is as follows:

```
kanban/
├── index.html          # Main HTML file
├── script.js           # Main JavaScript file
├── styles.css          # CSS file for styling
├── webpack.config.js   # Webpack configuration file
├── package.json        # Project dependencies and scripts
├── node_modules/       # Installed npm packages
└── dist/               # Output directory for bundled files
    ├── bundle.js       # Bundled JavaScript file
    └── main.css        # Bundled CSS file
```

## Key Components

-   **`script.js`**: This file contains the main application logic, including:
    -   Creating and manipulating DOM elements for containers and cards.
    -   Handling drag and drop functionality using `@shopify/draggable`.
    -   Managing local storage for data persistence.
    -   Implementing event listeners for user interactions.

-   **`styles.css`**: This file contains the CSS styles for the Kanban board.

-   **`webpack.config.js`**: This file configures Webpack, a module bundler, to process and bundle the JavaScript and CSS files.

## Libraries Used

-   **@shopify/draggable**:  Used for implementing the drag-and-drop functionality of the Kanban board.  Specifically, the `Sortable` class is used to make the containers draggable and sortable. The `Plugins.SortAnimation` plugin is used for smooth animation during sorting.
-   **DOMPurify**: Used to sanitize HTML content before rendering it in the browser, preventing potential cross-site scripting (XSS) attacks.

## Local Storage

The project uses local storage to persist the state of the Kanban board.  The `updateLocalStorage()` function serializes the HTML content of the `#main` element and stores it in local storage under the key `"containers"`.  When the page loads, the code retrieves this data from local storage, sanitizes it using DOMPurify, and renders it in the `#main` element.

## Contributing

Contributions are welcome! Feel free to submit pull requests to improve the project.

## License

This project is open source and available under the [MIT License](LICENSE).
