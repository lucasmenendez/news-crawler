import puppeteer from 'puppeteer';
import extractor from 'unfluff';

import { Logger } from './errors.js';

export default class Crawler {
    constructor(prod = false) {
        return new Promise(async (resolve, reject) => {
            let config = { args: ['--disable-dev-shm-usage', '--disable-gpu'] }
            if (prod) {
                config.args.push('--no-sandbox');
                config.executablePath = '/usr/bin/chromium-browser';
            }

            try {
                this.browser = await puppeteer.launch(config); 
                this.page = await this.browser.newPage();
            } catch (e) {
                Logger(e);
                reject(e);
            }

            resolve(this);
        });
    }

    async _getContent(url) {
        await this.page.goto(url);
        let content = await this.page.content();
        
        await this.browser.close();
        return content;
    }

    _parseContent(content) {
        let article = extractor(content);

        [ 'copyright', 'softTitle', 'favicon', 'videos' ]
            .forEach(prop => {
                if (Object.prototype.hasOwnProperty.call(article, prop)) 
                    delete(article[prop]);
            });
        
        return article;
    }

    async get(url) {
        try {
            let content = await this._getContent(url);
            return this._parseContent(content);
        } catch(e) {
            Logger(e, { source_url: url });
            return null;
        }
    }
}