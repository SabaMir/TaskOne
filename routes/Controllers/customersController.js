const db = require("../../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const config = require("../../config/config.json");


const customersController = {

    create: async (req, res) => {
        try {

            const response = {};
            let {
                fullName,
                address,
                addedByadminId,
                phoneNo
            } = req.body;
            let { id: adminId, shopId } = req.decoded;
            db.customers.create({
                fullName: fullName,
                address: address,
                addedByadminId: adminId,
                phoneNo: phoneNo,

            }).then(async value => {
                const templog = await db.logs.create({ adminId: req.decoded.adminId, adminName: req.decoded.adminName, activity: "created a customer" });
                var string = templog.adminName + " " + templog.activity
                response.statusCode = 200;
                response.body = JSON.stringify({
                    message: "customer has been created",
                    data: value,
                    string: string
                })
                console.log(value);
                res.status(response.statusCode).send(response.body)

            }).catch(err => {
                response.statusCode = 400;
                response.body = JSON.stringify({
                    error: err
                })
                console.log(err);
                res.status(response.statusCode).send(response.body)
            })
        } catch (error) {
            response.statusCode = 500;
            response.body = JSON.stringify({
                error: err
            })
        }
    },
    getAll: async (req, res) => {
        let response = {};
        try {

            let { page, limit } = req.query;
            page = page ? parseInt(page) : 1;         //pagination
            limit = limit ? parseInt(limit) : 10;
            db.customers.findAndCountAll({

                attributes: ['fullName', 'address', 'phoneNo', 'addedByadminId'],
                where:{
                    addedByadminId:req.decoded.id
                },
                order: [['id', 'ASC']], // sorting fields by ascending and descending order
                offset: (page - 1) * limit, //declaring offset
                limit: limit
            }).then(async result => {
                const templog = await db.logs.create({ adminId: req.decoded.adminId, adminName: req.decoded.adminName, activity: "fetched  customers" });
                var string = templog.adminName + " " + templog.activity
                response.statusCode = 200;
                response.body = JSON.stringify({
                    success: true,
                    users: await result.rows,
                    totalUsers: await result.count,
                    totalPages: await (parseInt((result.count / limit)) + 1),    //no of total pages
                    currentPage: await page
                });
                res.status(response.statusCode).send(response.body);
            })
        }
        catch (error) {
            response.statusCode = 500;
            response.body = JSON.stringify({
                error: error
            })
        }
    },
    getOne: async (req, res) => {
        try {
            let response = {};
            let { id } = req.params
            db.customers.findOne({
                attributes: [
                    "fullName",
                    "address",
                    "phoneNo",
                    "addedByadminId"
                ],
                where: {
                    id: id,
                    addedByadminId:adminId
                }
            }).then(async value => {
                const templog = await db.logs.create({ shopId: req.decoded.shopId, adminId: req.decoded.adminId, adminName: req.decoded.adminName, customerId: req.decoded.customerId, activity: "fetched a customer" });
                var string = templog.adminName + " " + templog.activity
                response.statusCode = 200;
                response.body = JSON.stringify({
                    message: "required result",
                    data: value
                })
                console.log(value);
                res.status(response.statusCode).send(response.body)

            }).catch(err => {
                response.statusCode = 400;
                response.body = JSON.stringify({
                    error: err
                })
                console.log(err);
                res.status(response.statusCode).send(response.body)
            })
        }
        catch (error) {
            response.statusCode = 500;
            response.body = JSON.stringify({
                error: err
            })
        }
    },
    delete: async (req, res) => {
        try {
            let response = {};
            let { id } = req.params
            db.customers.destroy({

                where: {
                    id: id,
                    addedByadminId:adminId
                }
            }).then(async value => {
                const templog = await db.logs.create({ shopId: req.decoded.shopId, adminId: req.decoded.adminId, adminName: req.decoded.adminName, customerId: req.decoded.customerId, activity: "deleted a customer" });
                var string = templog.adminName + " " + templog.activity
                response.statusCode = 200;
                response.body = JSON.stringify({
                    message: "Deleted",
                    data: value
                })
                console.log(value);
                res.status(response.statusCode).send(response.body)

            }).catch(err => {
                response.statusCode = 400;
                response.body = JSON.stringify({
                    error: err
                })
                console.log(err);
                res.status(response.statusCode).send(response.body)
            })
        }
        catch (error) {
            response.statusCode = 500;
            response.body = JSON.stringify({
                error: err
            })
        }

    },
    update: async (req, res) => {
        const response = {};
        let { id } = req.params
        try {
            const data = {};
            data["fullName"] = req.body.fullName,
                data["address"] = req.body.address,
                data["phoneNo"] = req.body.phoneNo
            data["addedByadminId"] = req.body.addedByadminId
            db.customers.update(data, {
                where: { id: id,
                addedByadminId:adminId }
            }).then(async value => {
                const templog = await db.logs.create({ shopId: req.decoded.shopId, adminId: req.decoded.adminId, adminName: req.decoded.adminName, customerId: req.decoded.customerId, activity: "updated a customer" });
                var string = templog.adminName + " " + templog.activity
                response.statusCode = 200;
                response.body = JSON.stringify({
                    message: "customers updated",
                    data: value
                })
                console.log(value);
                res.status(response.statusCode).send(response.body)

            }).catch(err => {
                response.statusCode = 400;
                response.body = JSON.stringify({
                    error: err
                })
                console.log(err);
                res.status(response.statusCode).send(response.body)
            })
        } catch (error) {
            response.statusCode = 500;
            response.body = JSON.stringify({
                error: err
            })
        }
    }

};
module.exports = customersController;
