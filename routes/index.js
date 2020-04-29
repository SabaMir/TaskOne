const bodyParser = require('body-parser');
const cors = require('cors');
const adminController = require('./Controllers/adminController')
const customersController = require('./Controllers/customersController')
const mobileInventoryController = require('./Controllers/mobileInventoryController')
const soldMobileController= require('./Controllers/soldMobileController')
const verifytoken=require('../utils/verifytoken')
const adminBLL=require('../routes/BLL/adminBLL')
const commonBLL=require('../routes/BLL/commonBLL')



module.exports = function (app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

    app.get('./', (req, res) => {
        res.send("Working!!!");
    })

    //Admin endpoints
    app.post('/signUpAdmin',commonBLL.validateFields, adminController.create);
    app.post('/LoginAdmin',adminBLL.validateLoginFields, adminController.logIn);

    app.get("/api/validate-token", verifytoken, adminController.validateToken);
    //Customers endpoints
    //create customer
    app.post('/createCustomer',verifytoken, customersController.create);
   // get customers
    app.get('/getCustomers',verifytoken, customersController.getAll);
    //delete customer
    app.delete('/deleteCustomer/:id',verifytoken, customersController.delete);
    //get a customer
    app.get('/getCustomer/:id',verifytoken, customersController.getOne);
    //update a customers
    app.put('/updateCustomer/:id',verifytoken, customersController.update);
//Mobile inventory endpoints
//create mobile inventory
    app.post('/createInventory',mobileInventoryController.create);
    // get mobiles
     app.get('/getInventory',mobileInventoryController.getAll);
     //delete Mobile
     app.delete('/deleteMobile/:id', mobileInventoryController.delete);
     //get a Mobile
     app.get('/getCustomer/:id',mobileInventoryController.getOne);
     //update Inventory
     app.put('/updateCustomer/:id', mobileInventoryController.update);

     //Sold Mobile endpoints
//create sold items
app.post('/createSoldItems',soldMobileController.create);
// get mobiles
 app.get('/getSoldItems',soldMobileController.getAll);
 //delete Mobile
 app.delete('/deleteSoldItem/:id', soldMobileController.delete);
 //get a Mobile
 app.get('/getSoldItem/:id',soldMobileController.getOne);
 //update Inventory
 app.put('/updateSoldItem/:id',soldMobileController.update);


}
