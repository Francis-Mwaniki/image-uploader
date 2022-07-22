const router=require('express').Router()
const multer=require('multer');
const fs=require('fs')
const path=require('path')
const controller=require('../router/controller/controller');
const store=require('../middleware/multer.js');
const uploadModel=require('../models/schema')
const { MongoError } = require('mongodb');
router.get('/',controller.Home)
router.post('/pricing',store.array('images',12),(req,res,next)=>{
    const files=req.files;
    console.log(files);
       if(files){
        //convert img to base64
        let ImgArray=files.map((file)=>{
            let img=fs.readFileSync(file.path)
            return encode_image=img.toString('base64')
        })
        let result=ImgArray.map((scr,index)=>{
            let imgFinal={
                filename:files[index].originalname,
                contentType:files[index].mimetype,
                imageBase64:scr
            }
            let newUpload=new uploadModel(imgFinal)
            return newUpload
                   .save()
                   .then(()=>{
                    return(`${files[index].originalname} uploaded successfully `)
                   }).catch(err=>{
                    if(err.name===MongoError && err.code===11000){
                        return Promise.reject(`duplicate${files[index].originalname}.Already exists`)
                   }else{
                        return Promise.reject({err:err.message} || `${files[index].originalname}.something missing`)
                    }
                   })
        })
         Promise.all(result).then((msg)=>{
          /*   res.json({msg}) */
             res.redirect('/')
         }).catch(err=>{
            res.json({err})
         })
       }
       else{
        const error=new Error('Please a upload files')
    return next(error)
       }
   /*   const files=req.files;
 if(files){
    const error=new Error('Please a upload files')
    error.httpStatusCode=400;
    return next(error)
}
 */
})

module.exports=router;
