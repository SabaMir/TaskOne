const utils = require('../../utils/functions');
const CommonBLL = {
    validateFields: async (req, res, next) => {
        const response = {};
        try {
            let {token} = req.params;
            let {AdminName, email, password} = req.body;
            response.statusCode = 404;
            if (!adminName) {
                response.body = await JSON.stringify({
                    message: "Admin Name is required."
                });
                await res.status(response.statusCode).send(response.body);
            } else if (!email) {
                response.body = await JSON.stringify({
                    message: "Email is Required"
                });
                await res.status(response.statusCode).send(response.body);
            } else if (!utils.validateEmail(email)) {
                response.body = await JSON.stringify({
                    message: "Email is Invalid"
                });
                response.statusCode = 409;
                await res.status(response.statusCode).send(response.body);
           
            } else if (!password || (password && password.length < 8)) {
                response.body = await JSON.stringify({
                    message: password ? "Password field must be 8 characters" : "Password is required"
                });
                response.statusCode = password ? 409 : 404;
                await res.status(response.statusCode).send(response.body);
            }
            else {
                next()
            }
        } catch (err) {
            console.log("err", err);
            response.statusCode = 500;
            response.body = await JSON.stringify(err);
            await res.status(response.statusCode).end(response.body);
        }
    }
};
module.exports = CommonBLL;

