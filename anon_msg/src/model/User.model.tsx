import mongoose, { Document,  Schema } from 'mongoose';


// createing the custom inteface just we havein c++ 
export interface  Message extends  Document{

    content : string;
    createdAt : Date;
    
}

// making the interface for the user 

export interface User extends Document {

    username : string;
    password : string;
    email : string;
    messages : Message[];  // we are using the message interface here  
    verifyCode : string;
    verifyCodeExpire : Date;
    isAcceptingMessages : boolean;
    message : Message[]; 
    isVerified : boolean;


}
// --------------------------------------


// schema making here upper we are creating the schema only 

const MessageSchema: Schema<Message> = new Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now , required: true },

});

const UserSchema: Schema<User> = new Schema({
    username: { type: String, required: [true , "Username is required"], unique: true, trim: true , },
    password: { type: String, required: [true, "Password is required"] },
    email: { type: String, required: [true, "Email is required"], unique: true , match: /.+\@.+\..+/ },
    verifyCode: { type: String ,required : [true, 
        "Verification code is required"
    ] },
    verifyCodeExpire: { type: Date , required: [true, "Verification code expiration date is required"] },
    isAcceptingMessages: { type: Boolean, default: true },
    
    isVerified : { type: Boolean, default: false },
    messages:  [MessageSchema],


});

// here why we are not create a model for message , look at the user schema we are embedding the message schema inside the user schema . it mean we want to  store the messages inside the user document only .

export const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', UserSchema);


export default UserModel ;





