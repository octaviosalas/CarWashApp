import mongoose,  {Schema, Document, Types} from "mongoose"


const jobStatus = { 
    PENDING: "pending",
    COMPLETED: "completed",
} as const 


export type JobStatus = typeof jobStatus [keyof typeof jobStatus] 


export interface JobsType extends Document { 
    date: Date,
    hour: string,
    client: Types.ObjectId,
    user: Types.ObjectId,
    vehicle: Types.ObjectId, 
    status: JobStatus,
    whatsappNotice: boolean,
    typeOfJob: string,
    amount: number,
    paid: boolean
}


const JobsSchema: Schema = new Schema ({ 
    date: { 
        type: Date,
        required: true
    },
    hour: { 
        type: String,
        required: true
    },
    client: { 
        type: Types.ObjectId,
        ref: "ClientModel",
        required: true,
    },
    user: { 
        type: Types.ObjectId,
        ref: "UserModel",
        required: true,
    },
    vehicle: { 
        type: Types.ObjectId,
        ref: "VehicleModel",
        required: true,
    },
    status: { 
        type: String,
        default: jobStatus.PENDING
    },
    typeOfJob: { 
        type: String,
        required: true
    },
    amount: { 
        type: Number,
        required: true
    },
    paid: { 
        type: Boolean,
        default: false
    },
    notified: { 
        type: Boolean,
        default: false
    }
})

const JobsModel = mongoose.model<JobsType>("JobsModel", JobsSchema)

export default JobsModel


