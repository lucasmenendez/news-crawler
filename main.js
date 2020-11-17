import Server from './src/server.js';
import { GetArticle } from './src/action.js'

const port = parseInt(process.env.PORT) || 8080;
new Server(port, {
    "/": GetArticle
}).listen();