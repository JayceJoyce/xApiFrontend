import { webpack } from 'webpack';
 
module.exports = {
  // Punto de entrada de tu aplicación
 /*  entry: './src/index.js',
  // Directorio de salida para el código empaquetado
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }, */
  // Cargador de transformación para archivos JS/JSX
  module: {  
    noParse: /\/node_modules\/process\//,
    rules: []  
  },
  // Resolución de extensiones para importaciones (evita escribir .js o .jsx en todas partes)
  resolve: {
    fallback: {
        process: require.resolve('process/browser'),  // Use the process polyfill
        buffer: require.resolve('buffer/'),
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
    })
]
};