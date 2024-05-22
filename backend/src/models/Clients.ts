import mongoose,  {Schema, Document, Types} from "mongoose"

export interface ClientType extends Document { 
    name: string,
    telephone: number,
    dni: number,
    clientOf: Types.ObjectId ,
    email: string
}

const ClientSchema: Schema = new Schema ({ 
    name: { 
        type: String,
        required: true,
    },
    telephone: { 
        type: Number,
        required: true
    },
    email: { 
        type: String,
    },
    dni: { 
        type: Number,
        required: false,
        unique: true
    },
    clientOf: { 
        type: Types.ObjectId,
        ref: "UserModel",
        required: true
    }
})

const ClientModel = mongoose.model<ClientType>("ClientModel", ClientSchema)

export default ClientModel