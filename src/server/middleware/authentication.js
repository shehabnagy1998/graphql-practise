const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const header = req.get('Authorization')
    if (!header) { req.isAuth = false; return next() }
    const header_token = header.split(' ')[1];
    if (!header_token || header_token === '') { req.isAuth = false; return next() }
    let dToken;
    try {
        dToken = jwt.verify(header_token, 'mysuperstring')
    } catch (error) {
        req.isAuth = false;
        return next()
    }
    req.isAuth = true;
    req.userId = dToken.userId;
    return next()
}