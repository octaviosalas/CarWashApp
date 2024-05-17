import mongoose,  {Schema, Document, Types} from "mongoose"

export interface CollectionType extends Document { 
    paymentMethod: string,
    date: Date, 
    amount: number,
    user: Types.ObjectId,
    client: Types.ObjectId,
    jobReference: Types.ObjectId
}


const CollectionSchema: Schema = new Schema ({ 
    paymentMethod: { 
        type: String,
        required: true,
     },
    date: { 
        type: Date,
        required: true
    },
    amount: { 
        type: Number,
        required: true
    },
    user: { 
        type: Types.ObjectId,
        required: true,
    },
    client: { 
        type: Types.ObjectId,
        required: true,
    },
    jobReference: { 
        type: Types.ObjectId,
        required: true,
    },
})

const CollectionModel = mongoose.model<CollectionType>("CollectionModel", CollectionSchema)

export default CollectionModel