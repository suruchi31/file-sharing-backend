const router = require('express').Router();
const multer=require("multer");
const path=require("path");
const File=require('../models/file');
const {v4:uuid4}=require("uuid");

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'upload/') ,
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
              cb(null, uniqueName)
    } ,
});

let upload=multer({
    storage,
    limits: {fileSize: 1000000 * 100 },    //100mb
}).single('myfile');


router.post('/', (req,res) => {
    //store files using upload folder
    upload(req,res,async (err) => {
            
          if(err) { 
                return res.status(500).send({error:err.message});
            }
            //storing data into database of files --need model
            console.log(req.file);
            const file=new File({
            filename :req.file.filename,
            uuid: uuid4(),
            path:req.file.path,
            size:req.file.size
        });

        const response=await file.save();
        res.json({file: `${process.env.APP_BASE_URL}/files/${response.uuid}`});
        });


});
 
  module.exports = router;