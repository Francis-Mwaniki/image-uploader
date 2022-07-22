const mongoose=require('mongoose');
const config=require('../../config')

    const Connect= async()=>{
        try{
           const con= await mongoose.connect(config.MONGO_URL,{
            useNewUrlParser:true
           })
           console.log(`Mongo connected ${con.connection.host}`);
        } catch (error) {
            console.log(error);
            process.exit(1)
        }
}


module.exports=Connect;