const mongoose= require("mongoose");

const ConnectDB=async()=>{
    const url=process.env.URL;
    try {
        await mongoose.connect(url,{
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log(`server connected to database`);
        
    } catch (error) {
        console.log(`cannot connect ${error}`);
    }
}

module.exports=ConnectDB;