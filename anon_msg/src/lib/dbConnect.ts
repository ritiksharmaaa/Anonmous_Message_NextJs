// here we learn how we are connecting to the database in  nextjs 
   import { log } from 'console';
import mongoose from 'mongoose';

 type ConnectionObject = {
    isConnected? : number 
 }

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> { 
    if (connection.isConnected) {
        console.log('already connected')
        return;
    }     

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI||""); //you can also pass option there whihch you have to choose it whn you want 

        connection.isConnected = db.connections[0].readyState;
        console.log('DB Connected Successfully');
        
        
        // log the db to explore we get the db.connection[0].readyState
        connection.isConnected = 1;
        console.log('connected to database')
    } catch (error) {
        console.log("erro" , error );
        process.exit(1);
        console.log('DB Connection Failed');
        
        
    }
    
    
}


export default dbConnect;