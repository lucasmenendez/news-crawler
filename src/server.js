import express from 'express';

export default class Server {
    constructor(port, actions = {}) {
        this.app = express();
        this.port = port;
        this.actions = actions;

        this.app.use(express.json());
        this._prepare();
    }

    _prepare() {
        if (Object.keys(this.actions).length === 0) 
            throw "No action provided.";

        Object.keys(this.actions).forEach(uri => {
            if (typeof this.actions[uri] !== 'function')
                throw `Action provided for ${uri} is not a function.`;
            
            this.app.post(uri, (req, res) => {
                this.actions[uri](req.body)
                    .then(result => res.send(result))
                    .catch(err => res.status(err.code).send(err.msg));
            });
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}!`)
        });
    }
}