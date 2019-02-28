'use strict';
/* global hexo */
const cheerio = require('cheerio');
const Promise = require('bluebird');

const CookieConsent = () => {
    const route = hexo.route;
    const routeList = route.list();
    const routes = routeList.filter(hpath => hpath.endsWith('.html'));

    const htmls = {};
    return Promise.all(routes.map(hpath => {
        return new Promise((resolve, reject) => {
            const contents = route.get(hpath);
            let htmlTxt = '';
            contents.on('data', (chunk) => (htmlTxt += chunk));
            contents.on('end', () => {
                const $ = cheerio.load(htmlTxt, {decodeEntities: false});
                const options = JSON.stringify(hexo.config.cookieconsent.options);

                let injection = '<script ' +
                    'src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.js"></script>' +
                    `<script>window.addEventListener("load", function(){window.cookieconsent.initialise(${options})});</script>`;

                $('body').after(injection);

                let styles = '<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.css" />';
                $('head').append(styles);

                htmls[hpath] = {hpath, $};
                resolve();
            });
        });
    }))
        .then(() => {
            const htmlPaths = Object.keys(htmls);
            for (const hpath of htmlPaths) {
                const html = htmls[hpath];
                route.set(hpath, html.$.html());
            }
        });
};


if (!hexo.config.cookieconsent || !hexo.config.cookieconsent.enable) {
    return;
}

hexo.config.cookieconsent = Object.assign({
    options: {
        "palette": {
            "popup": {
                "background": "#000"
            },
            "button": {
                "background": "#f1d600"
            }
        }
    }
}, hexo.config.cookieconsent);

hexo.extend.filter.register('after_generate', CookieConsent);
