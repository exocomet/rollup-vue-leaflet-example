import copy from 'rollup-plugin-copy';

export default [{
    input: "./src/main.js",
    output: {
        file: "./build/bundle.js",
        format: 'iife',
        name: 'app',
        globals: {
            'vue': 'Vue',
            // 'vue2-leaflet': 'Vue2Leaflet',
        }
    },
    plugins: [
        copy({
            targets: [{
                    src: ['./index.html', './src/style.css'],
                    dest: './dist'
                }, {
                    src: './build/*',
                    dest: './dist'
                }],
            overwrite: true,
            hook: 'writeBundle'
        })
    ],
},];