var webpack = require('webpack');
module.exports = {
    css: {
        //requireModuleExtension: true
    },
    configureWebpack:{
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                Popper: ["popper.js", "default"]
            })
        ]
    }
}