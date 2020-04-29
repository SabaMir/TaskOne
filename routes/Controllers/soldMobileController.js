const db = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const config = require('../../config/config.json');


const soldMobileController = {
    create: async (req, res) => {
        const response = {}
        try {
           
            let {
                shopId,
                customerId,
                amount,
                status,
                billNo,
                details

            } = req.body;
            console.log(req.body)
            db.soldMobiles.create({
                shopId: shopId,
                customerId: customerId,
                amount: amount,
                status: status,
                billNo: billNo,
                details: details
            }).then(async value => {
                //Notifications
                const templog = await db.logs.create({ shopId: req.decoded.shopId, adminId: req.decoded.adminId, adminName: req.decoded.adminName, customerId: req.decoded.customerId, activity: "created a sold item" });
                var string = templog.adminName + " " + templog.activity
                response.statusCode = 200;
                response.body = JSON.stringify({
                    message: "mobile sold list has been created",
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
                error: error
            })
        }
    },
    getAll: async (req, res) => {
        try {
            let response={}
            let { page, limit } = req.query;
        page = page ? parseInt(page) : 1;         //pagination
        limit = limit ? parseInt(limit) : 10;
        db.soldMobiles.findAndCountAll({
            attributes: [ 'amount', 'customerId', 'details','shopId','BillNo','status'],
           
            order: [['id', 'ASC']], // sorting fields by ascending and descending order
            offset: (page - 1) * limit, //declaring offset
            limit: limit
        }).then(async result => {
            //Notifications
            const templog = await db.logs.create({ shopId: req.decoded.shopId, adminId: req.decoded.adminId, adminName: req.decoded.adminName, customerId: req.decoded.customerId, activity: "fetched sold items" });
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
            db.soldmobiles.findOne({
                attributes: [
                    "shopId",
                    "customerId",
                    "amount",
                    "status",
                    "billNo",
                    "details"
                ],
                where: {
                    id: id
                }
            }).then(async value => {
                //Notifications
                const templog = await db.logs.create({ shopId: req.decoded.shopId, adminId: req.decoded.adminId, adminName: req.decoded.adminName, customerId: req.decoded.customerId, activity: "fetched a sold item" });
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
                error: error
            })
        }
    },
    delete: async (req, res) => {
        try {
            let response = {};
            let { id } = req.params
            db.soldMobiles.destroy({

                where: {
                    id: id
                }
            }).then(async value => {
                //Notifications
                const templog = await db.logs.create({ shopId: req.decoded.shopId, adminId: req.decoded.adminId, adminName: req.decoded.adminName, customerId: req.decoded.customerId, activity: "deleted a sold item" });
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
                error: error
            })
        }
    
},
    update: async (req, res) => {

        let { id } = req.params
        try {
            let response = {};
            const data = {};
            data["shopId"] = req.body.shopId,
                data["customerId"] = req.body.customerId,
                data["amount"] = req.body.amount,
                data["status"] = req.body.status,
                data["details"] = req.body.details
                data["billNo"] = req.body.billNo
            db.soldMobiles.update(data, {
                where: { id: id }
            }).then(async value => {
                //Notifications
                const templog = await db.logs.create({ shopId: req.decoded.shopId, adminId: req.decoded.adminId, adminName: req.decoded.adminName, customerId: req.decoded.customerId, activity: "updated a sold Inventory" });
                var string = templog.adminName + " " + templog.activity
                response.statusCode = 200;
                response.body = JSON.stringify({
                    message: "inventory updated",
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
                error: error
            })
        }
    }
};
module.exports = soldMobileController;