import uglify from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'
import async from 'rollup-plugin-async'
export default {
    entry: 'app.js',
    dest: 'dist/log-plugin.min.js',
    moduleName: 'log-plugin',
    format: 'umd',
    plugins: [
        babel(),
        async(),
        uglify(),
    ],
}
