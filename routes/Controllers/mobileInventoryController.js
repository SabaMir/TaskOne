const db = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const config = require('../../config/config.json');


const mobileInventoryController = {
    create: async (req, res) => {
        const response = {}
        try {
            let {
                mobileName,
                customerId,
                mobileModel,
                weight,
                billNo

            } = req.body;
            db.mobiles.create({
                mobileName: mobileName,
                customerId: customerId,
                mobileModel: mobileModel,
                weight: weight,
                billNo: billNo
            }).then(async value => {
                //Notifications
                const templog = await db.logs.create({ shopId: req.decoded.shopId, adminId: req.decoded.adminId, adminName: req.decoded.adminName, customerId: req.decoded.customerId, activity: "created a Mobile Inventory" });
                var string = templog.adminName + " " + templog.activity

                response.statusCode = 200;
                response.body = JSON.stringify({
                    message: "mobile Inventory has been created",
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
    },
    getAll: async (req, res) => {
        try {
            let response={}
            let { page, limit } = req.query;
        page = page ? parseInt(page) : 1;         //pagination
        limit = limit ? parseInt(limit) : 10;
        db.mobiles.findAndCountAll({
            attributes: [ 'mobileName', 'customerId', 'mobileModel','weight','BillNo'],
           
            order: [['id', 'ASC']], // sorting fields by ascending and descending order
            offset: (page - 1) * limit, //declaring offset
            limit: limit
        }).then(async result => {
             //Notifications
             const templog = await db.logs.create({ shopId: req.decoded.shopId, adminId: req.decoded.adminId, adminName: req.decoded.adminName, customerId: req.decoded.customerId, activity: "fetched Mobile Inventory" });
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
            db.mobiles.findOne({
                attributes: [
                    "mobileName",
                    "customerId",
                    "mobileModel",
                    "weight",
                    "billNo"
                ],
                where: {
                    id: id
                }
            }).then(async value => {
                 //Notifications
                const templog = await db.logs.create({ shopId: req.decoded.shopId, adminId: req.decoded.adminId, adminName: req.decoded.adminName, customerId: req.decoded.customerId, activity: "fetched a Mobile Inventory" });
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
                    error: error
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
            db.mobiles.destroy({

                where: {
                    id: id
                }
            }).then(async value => {
                 //Notifications
                const templog = await db.logs.create({ shopId: req.decoded.shopId, adminId: req.decoded.adminId, adminName: req.decoded.adminName, customerId: req.decoded.customerId, activity: "deleted a Mobile Inventory" });
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
        const response = {};
        let { id } = req.params
        try {
            const data = {};
            data["mobileName"] = req.body.mobileName,
                data["customerId"] = req.body.customerId,
                data["mobileModel"] = req.body.mobileModel,
            data["weight"] = req.body.weight,
            data["billNo"]=req.body.billNo
            db.mobiles.update(data, {
                where: { id: id }
            }).then(async value => {
                //Notifications
                const templog = await db.logs.create({ shopId: req.decoded.shopId, adminId: req.decoded.adminId, adminName: req.decoded.adminName, customerId: req.decoded.customerId, activity: "updated a Mobile Inventory" });
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
module.exports=mobileInventoryController;