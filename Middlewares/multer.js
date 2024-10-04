const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
        const filename = `image-${Date.now()}-${file.originalname}`
        cb(null,filename)
    }

})

const multerConfig = multer({
    storage
})

module.exports = multerConfig