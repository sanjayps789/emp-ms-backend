const express = require('express');
const adminController = require('../Controllers/adminController.js');
const adminAuth = require('../Middlewares/adminAuth.js');
const multer = require('../Middlewares/multer.js');
const router = express.Router();

router.post('/register', adminController.register);

router.post('/login', adminController.login);

router.post('/add-employee', adminAuth,multer.single('f_Image'),adminController.addEmployee);

router.patch('/edit-employee/:eid', adminAuth,multer.single('f_Image'), adminController.updateEmployee);

router.patch('/update-employee-status/:eid', adminAuth, adminController.updateEmployeeStatus);

router.delete('/delete-employee/:eid', adminAuth, adminController.deleteEmployee);

router.get('/get-employee-byId/:eid', adminAuth, adminController.getEmployeeById);
router.get('/get-all-employees', adminAuth, adminController.getAllEmployees);

module.exports = router