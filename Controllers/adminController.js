// register admin api
const { Op } = require('sequelize')
const Login = require('../Models/adminModel.js')
const Employee = require('../Models/employeeModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.register = async(req,res) =>{
    const {f_username, f_Pwd} = req.body
    const admin = await Login.findOne({where:{f_username: f_username}})
    if(admin){
        res.status(400).json({message: 'Admin already exists'})
    }else{
        const password = await bcrypt.hash(f_Pwd, 10)
       const newAdmin = await Login.create({f_username, f_Pwd: password})
        res.status(200).json({message: 'Admin created successfully',newAdmin})
    }

}

// login admin api
exports.login = async (req, res) => {
  console.log("Inside Admin Login");

  const { f_username, f_Pwd } = req.body;
  console.log(f_username, f_Pwd);

  try {
    // Check if username and password are provided
    if (!f_username || !f_Pwd) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    // Find the admin by username
    const admin = await Login.findOne({ where: { f_username } });

    // If admin is not found, return early
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    // Check password match
    const matchPassword = await bcrypt.compare(f_Pwd, admin.f_Pwd);
    if (!matchPassword) {
      return res.status(401).json({ message: "Wrong Password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: admin.sno }, process.env.JWT_ADMIN_SECRET_KEY);

    // Send the token and admin details in response
    return res.status(200).json({ token, admin });

  } catch (error) {
    console.error("Error in login process:", error);
    return res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};



// add employee api
exports.addEmployee = async(req,res) =>{
    const { f_Name, f_Email, f_Mobile, f_Designation,f_gender,f_Course} = req.body
    const f_Image = req.file.filename
    const employee = await Employee.findOne({where:{f_Email: f_Email}})
    if(employee){
        res.status(400).json({message: 'Employee already exists'})
    }else{
        const newEmployee = await Employee.create({f_Image:f_Image, f_Name, f_Email, f_Mobile, f_Designation,f_gender,f_Course})
        res.status(200).json({message: 'Employee created successfully',newEmployee})
    }
}

// update employee api
exports.updateEmployee = async (req, res) => {
    try {
      const { eid } = req.params; 
      const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course, f_status } = req.body;
      const f_Image = req.file ? req.file.filename : null; // If there's a new file uploaded
  
      // Find the employee by ID
      const employee = await Employee.findOne({ where: { f_Id: eid } });
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      // Update employee details
      employee.f_Name = f_Name || employee.f_Name;
      employee.f_Email = f_Email || employee.f_Email;
      employee.f_Mobile = f_Mobile || employee.f_Mobile;
      employee.f_Designation = f_Designation || employee.f_Designation;
      employee.f_gender = f_gender || employee.f_gender;
      employee.f_Course = f_Course || employee.f_Course;
      employee.f_status = f_status || employee.f_status;
  
      // Update the image if a new one is uploaded
      if (f_Image) {
        employee.f_Image = f_Image;
      }
  
      // Save the updated employee to the database
      await employee.save();
  
      return res.status(200).json({ message: 'Employee updated successfully', employee });
    } catch (error) {
      // Catch and return any error that occurs
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

//   delete employee api
exports.deleteEmployee = async (req, res) => {
    try {
      const { eid } = req.params; // Assuming the employee ID is passed as a route parameter
  
      // Find the employee by ID
      const employee = await Employee.findOne({ where: { f_Id: eid } });
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      // Delete the employee from the database
      await employee.destroy();
  
      return res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      // Catch and return any error that occurs
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  };


//   get allemployees api
exports.getAllEmployees = async (req, res) => {
    try {
      const employees = await Employee.findAll();
      
      return res.status(200).json({ message: 'Employees fetched successfully', employees });
    } catch (error) {
      // Catch and return any error that occurs
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
}  

// get employee by id api
exports.getEmployeeById = async (req, res) => {
    try {
      const { eid } = req.params; 
        const employee = await Employee.findOne({ where: { f_Id: eid } });
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }else{
        return res.status(200).json({ message: 'Employee fetched successfully', employee });
      }
      }
    catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
  

// update employee status api
exports.updateEmployeeStatus = async (req, res) => {
    try {
      const { eid } = req.params; 
      const { f_status } = req.body;
      const employee = await Employee.findOne({ where: { f_Id: eid } });
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      employee.f_status = f_status;
      await employee.save();
      return res.status(200).json({ message: 'Employee status updated successfully', employee });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
  