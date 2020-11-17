import { HTTPErrors } from './errors.js';
import Crawler from './crawler.js';

let prod = process.env.PROD === 'true';

const GetArticle = request => {
    return new Promise(async (resolve, reject) => {
        if (!Object.prototype.hasOwnProperty.call(request, 'url'))
            reject(HTTPErrors.BadRequest("No url provided"));

        let crawler;
        try {
            crawler = await new Crawler(prod);
        } catch(e) {
            reject(HTTPErrors.InternalServerError("Error initializing the crawler."));
        }
        
        let article = await crawler.get(request.url);
        if (!article) 
            reject(HTTPErrors.InternalServerError("Error getting the article."));

        resolve(article);
    });
}

export {
    GetArticle
};