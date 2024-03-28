const jwt = require('jsonwebtoken')


const verifyTheUser = async (req, res, next) => {
    try {
        let jwt_token;
        const authHeader = req.headers['authorization']
        if (authHeader !== undefined) {
            jwt_token = authHeader.split(" ")[1] //  authHeader as 'Bearer JWT_TOKEN'
        }
        if (jwt_token === undefined) {
            res.status(401).send({ data: 'Not Authenticated to access data.' })
        }
        else {
            jwt.verify(jwt_token, 'Secret Token', async (error, payload) => {
                if (error) {
                    res.status(401).send({ data: 'Token is Not Valid Please Login Again..!.' })
                }
                else {
                    const { username } = payload
                    req['username'] = username  // Adding the username in 'req' for future usage (if any)

                    next()
                }
            })
        }
    }
    catch (e) {
        console.log(e)
        res.status(400).send({ data: 'Something went wrong... Please try again.' })
    }
}

module.exports = verifyTheUser