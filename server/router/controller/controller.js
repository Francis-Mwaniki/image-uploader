const uploadModel=require('../../models/schema')
exports.Home=async(req,res)=>{
    const all_images= await uploadModel.find();
    res.send("recieved")
  /*   res.render(',{images:all_images}); */
}
/* exports.uploads=(req,res,next)=>{
    multer({
        store: store}).array('userFile');
    upload(req, res, function(err) {
        console.log("File uploaded");
        res.end('File is uploaded')
    })
 const files=req.files; 

if(files){
    const error=new Error('Please a upload files')
    error.httpStatusCode=400;
    return next(error)

}  res.json({files}) 
} */