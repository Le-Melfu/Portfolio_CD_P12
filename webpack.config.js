const { override } = require('customize-cra')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = override(
    // Ajoutez vos personnalisations ici, par exemple :
    (config) => {
        // Ajoutez CompressionPlugin
        config.plugins.push(
            new CompressionPlugin({
                filename: '[path][base].gz',
                algorithm: 'gzip',
                test: /\.(js|css|html|svg)$/,
                threshold: 10240,
                minRatio: 0.8,
            })
        )

        return config
    }
)
