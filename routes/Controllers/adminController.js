const db = require("../../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const config = require("../../config/config.json");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const adminController = {
    create: async (req, res) => {
        const response = {};
        try {
        //signing up for shops
        
        let {adminName, email, password, shopName, address, phone} = req.body;
        //console.log(req.body);
        db.admins.count({ where: { email: req.body.email } })
        .then(count => {
        if (count !== 0) {
        response.statusCode = 409;
        response.body = JSON.stringify({
        message: 'Email already Exsist',
        });
        res.status(response.statusCode).send(response.body);
        }
        else {
        db.shops.create({
        shopName,
        address,
        phone,
        }).then(shopData => {
           // console.log(shopData);
        let encryptedPassword = bcrypt.hashSync(password, 10);
        db.admins.create({
        adminName,
        email,
        password: encryptedPassword,
        shopId: shopData.id
        }).then(data => {
        // signin admin and generate a jwt
        const token = jwt.sign({
        id: data.id,
        email: data.email,
        shopId: data.shopId
        }, config.jwt.passPhrase, { expiresIn: '1y' });
        let finalResponse = {
        admins: {
        adminName: data.adminName,
        email: data.email
        },
        shops: {
        shopName: data.shopName,
        address: data.address,
        phone: data.phone,
        },
        token
        };
        console.log(finalResponse);
       // const templog = await db.logs.create({ shopId: req.decoded.shopId, adminId: req.decoded.adminId, adminName: req.decoded.adminName, customerId: req.decoded.customerId, activity: "created a admin" });
               // var string = templog.adminName + " " + templog.activity
        response.statusCode = 200;
        response.body = JSON.stringify({
        message: 'New Admin Created',
        data: finalResponse,
        token: token
        });
        res.status(response.statusCode).send(response.body);
        })
        .catch(err => {
            console.log(err)
        response.statusCode = 500;
        response.body = JSON.stringify({ err });
        res.status(response.statusCode).send(response.body);
        });
        })
        .catch(err => {
            console.log(err);
        response.statusCode = 500;
        response.body = JSON.stringify({ err });
        res.status(response.statusCode).send(response.body);
        });
        }
        });
        } catch (err) {
        console.log("err", err);
        response.statusCode = 500;
        response.body = await JSON.stringify(err);
        await res.status(response.statusCode).end(response.body);
        }
        },
    logIn: async (req, res) => {
        const response = {};
        try {
            let { email, password } = req.body;
            db.admins.findOne({
                where: { email }
            }).then((admins) => {

                if (!admins) {
                    response.statusCode = 404;
                    response.body = JSON.stringify({
                        message: "Incorrect email or doesn't exist",
                        success: false
                    });
                    res.status(response.statusCode).send(response.body);
                }
                else {
                    bcrypt.compare(password, admins.password)
                        .then(valid => {
                            if (!valid) {
                               
                                response.statusCode = 404;
                                response.body = JSON.stringify({
                                    message: 'Incorrect password',
                                    success: false
                                });
                                res.status(response.statusCode).send(response.body);
                            }
                            else {
                                // signin user and generate a jwt
                                const token = jwt.sign({
                                    id: admins.id,
                                    email: admins.email,
                                    adminName: admins.adminName,
                                }, config.jwt.passPhrase, { expiresIn: '1y' });

                                // return json web token
                               // const templog = await db.logs.create({ shopId: req.decoded.shopId, adminId: req.decoded.adminId, adminName: req.decoded.adminName, customerId: req.decoded.customerId, activity: "admin Logged In" });
               // var string = templog.adminName + " " + templog.activity
                                response.statusCode = 200;
                                response.body = JSON.stringify({
                                    message: 'User Logged IN',
                                    success: true,
                                    token: token
                                });
                                res.status(response.statusCode).send(response.body);
                            }
                        })
                }
            })
                .catch(err => {
                    console.log("error", err);
                    response.statusCode = 500;
                    response.body = JSON.stringify({ err });
                    res.status(response.statusCode).send(response.body);
                });
        } catch (err) {
            console.log("error", err);
            response.statusCode = 500;
            response.body = JSON.stringify({ err });
            res.status(response.statusCode).send(response.body);
        }
    },
    validateToken: async (req, res) => {
        let response = {};
        response.statusCode = 200;
        response.body = JSON.stringify({
            success: true,
        });
        res.status(response.statusCode).send(response.body);
    }

};
module.exports = adminController;