const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY;

function getTokenPayload(token) {
    return jwt.verify(token, SECRET_KEY);
}

function getUserId(req) {
    if (req) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new Error("No Authorization header added");
        }

        if (authHeader) {
            const token = req.headers.authorization.split("Bearer ")[1];

            if (!token) {
                throw new Error("Invalid Token sent");
            }
            const { userId } = getTokenPayload(token);
            return userId;
        }
    }
}

module.exports = {
    getUserId
}