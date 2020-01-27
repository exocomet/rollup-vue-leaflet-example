# rollup-vue-leaflet-example
Basic demo of a rollup setup bundling a minimal vue and leaflet application.

## Installation

After cloning the source files in the project folder run these commands:

```bash
    npm install
    npx rollup --config
```

### Running a web server

To prevent certain browsers from running into CORS issues we serve the
`index.html` through a very simple web server. Since the backend should
be treated independently, we can just try something non-node. Like Python.

    C:\Python37-32\python.exe -m http.server 8000 --directory .\dist\

Now open the URL http://127.0.0.1:8000/index.html in your browser.

---

## Notes on the development process

### Goal of this project
Get a grip with rollup.js and stuff. The result should be served through a
Python web server.

## Installation

### Project structure

- create a `./src/` folder
- within `./src/` create the file `main.js` and `style.css`
- our build script will automatically create the file `./build/bundle.js` and
copy all the sources to `./dist/`.

### Use npm to install Vue.js and rollup


First create the project and its `package.json` file.

```bash
    npm init
```

Then install dependencies as needed.

```bash
    npm install --save vue
    npm install --save leaflet vue2-leaflet

    npm install --save-dev rollup
    npm install @rollup/plugin-node-resolve --save-dev
    npm install @rollup/plugin-replace --save-dev

    ## DEPRECATED
    # npm install --save-dev rollup-plugin-node-resolve
    # npm install --save-dev rollup-plugin-replace

    npm install --save-dev rollup-plugin-vue
    npm install vue-template-compiler
```

The option `--save-dev` is used to save the package for development
purpose. For example: unit tests, minification.., whereas `--save` is used to
save the package required for the application to run


### Rollup as build tool

Manually create `rollup.config.js`. The config file is used to simplify the
build call. Here are the contents of `rollup.config.js`:

```javascript
// rollup.config.js
export default {
    // input could be an object like the output obj below
    input: './src/main.js',
    output: {
        file: './build/bundle.js',
        format: 'iife',
        globals: {vue: 'Vue'}
    },
    external: ['vue'],
}
```

### Specify external dependencies in rollup

There are 2 options of including external dependencies like Vue:
 - Specifiy all the dependencies in the `external` property and
    add the `<script>` tags in `index.html` accordingly.


    ```
    <script src="https://unpkg.com/vue@2.6.11/dist/vue.min.js"></script>
    ```


 - use the plugin `@rollup/plugin-node-resolve`


### Execute the build process

Run rollup within the root directory of the project to create a bundle:

```bash
    npx rollup --config
    #rollup.cmd -c ## when globally installed, or what?
```


### Git

According to our project structure the `.gitignore` file could look like this:

    dist/
    build/
    node_modules/
    package-lock.json

Then run `git init` and prepare to push to your remote repo. For example you could
create a bare remote repo on github.com, and set it as remote origin for your local
clone.

    git remote add origin https://github.com/username/reponame.git

Finally pull the origin master to your local clone

    git pull --allow-unrelated-histories origin master

### Build

The manual build command could look like this:

    rollup.cmd .\src\main.js --file .\build\bundle.js --format iife

The keyword `iife` tells rollup to build for web. See
[this](https://rollupjs.org/guide/en/#outputformat) for more information.

There shouldn't be any errors or warnings:

    .\src\main.js → .\build\bundle.js...
    created .\build\bundle.js in 29ms

Done.



## Resources

- https://docs.npmjs.com/cli/install
- https://docs.npmjs.com/creating-a-package-json-file
- https://rollupjs.org/
- https://rollupjs.org/guide/en/#creating-your-first-bundle
- https://github.com/rollup/plugins/tree/master/packages/node-resolve/#readme
