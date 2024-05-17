import mongoose,  {Schema, Document} from "mongoose"

export interface UserType extends Document { 
    email: string,
    password: string,
    name: string,
    confirmed: true
}



const UserSchema: Schema = new Schema ({ 
    email: { 
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: { 
        type: String,
        required: true
    },
    name: { 
        type: String,
        required: true
    },
    confirmed: { 
        type: Boolean,
        default: false
    }
})

const UserModel = mongoose.model<UserType>("UserModel", UserSchema)

export default UserModel