require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./DB/db.js')
const router = require('./Routes/router.js');
const empServer = express();

empServer.use(cors());
empServer.use(express.json());

empServer.use('/api/admin',router)

// available uploads folder from server to other app
empServer.use('/uploads',express.static('./uploads'))


const PORT = 8000;

empServer.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})

empServer.get('/',(req,res)=>{
    res.send(`<h1 class="color:red">Server is running... and waiting for client requests</h1>`)
})