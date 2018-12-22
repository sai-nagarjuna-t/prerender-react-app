const prerenderSPAPlugin = require('prerender-spa-plugin');
const path = require('path');

module.exports = function override(config, env) {

    const spaRender = new prerenderSPAPlugin({
        staticDir: path.join(__dirname, 'build'),
        routes: ['/'],
        minify: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            decodeEntities: true,
            keepClosingSlash: true,
            sortAttributes: true
        },
        renderer: new prerenderSPAPlugin.PuppeteerRenderer({
            //the following property will added to your window object only during prerendering
            injectProperty: '__PRERENDER_INJECTED',
            inject: {
                prerender: true
            }
        })
    });
    config.plugins.push(spaRender);

    return config;
}