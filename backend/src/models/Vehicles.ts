import mongoose,  {Schema, Document, Types} from "mongoose"

export interface VehicleType extends Document { 
    client: Types.ObjectId,
    typeOfVehicle: string,
    patent: string,
    description: string
}

const VehicleSchema: Schema = new Schema ({ 
    client: { 
        type: Types.ObjectId,
        ref: "ClientModel",
        required: true,
    },
    typeOfVehicle: { 
        type: String,
        required: true
    },
    patent: { 
        type: String,
        required: true
    },
    description: { 
        type: String,
        required: true
    },
    user: { 
        type: Types.ObjectId,
        ref: "UserModel",
        required: true,
    },

})

const VehicleModel = mongoose.model<VehicleType>("VehicleModel", VehicleSchema)

export default VehicleModel