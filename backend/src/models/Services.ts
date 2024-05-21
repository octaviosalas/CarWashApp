import mongoose,  {Schema, Document, Types} from "mongoose"

export interface ServicesType extends Document { 
    service: string,
    user: Types.ObjectId 
    price: number,
}


const ServicesSchema: Schema = new Schema ({ 
   service: { 
    type: String,
    required: true,
   },
   user: { 
      type: Types.ObjectId,
      ref: "UserModel"
   },
   price: { 
    type: Number,
    required: true,
   }

})

const ServicesModel = mongoose.model<ServicesType>("ServicesModel", ServicesSchema)

export default ServicesModel