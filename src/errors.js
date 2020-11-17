const HTTPErrors = {
    BadRequest: txt => ({ code: 400, msg: `Bad request. ${txt || ""}`}),
    InternalServerError: txt => ({ code: 500, msg: `Internal Server Error. ${txt || ""}`})
}

const Logger = (exception, meta = {}) => {
    let e = {exception};
    console.error(Object.assign(e, meta));
}

export {
    HTTPErrors,
    Logger
};