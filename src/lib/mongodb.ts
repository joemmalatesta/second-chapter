import mongoose from "mongoose";

export const mongoConnect = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('successfully connected to mongo')
    }
    catch (error){
        console.log('failed to connect', error)
        throw error
    }
}