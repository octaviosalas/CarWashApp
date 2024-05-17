import mongoose,  {Schema, Document, Types} from "mongoose"

export interface EmailType extends Document { //Document extiende propiedades de mongoose para poder acceder a types
    title: string,
    message: string, 
    addressee: number,
    date: Date,
    sender: Types.ObjectId,
    jobReference: Types.ObjectId
}

export interface NewEmailType {
    title: string;
    message: string;
    addressee: string;
    date: Date;
    sender: Types.ObjectId;
    jobReference: Types.ObjectId;
}


const emailSchema: Schema = new Schema ({ 

    sender: {
        type: Types.ObjectId,
        required: true,
    },
    title: { 
        type: String,
        required: true,
    },
    message:{ 
        type: String,
        required: true,
    },
    addressee: { 
        type: String,
        required: true,
    },
    date: { 
        type: String,
        required: true,
    },
     jobReference: { 
        type: Types.ObjectId,
        required: true,
    },
    });

const EmailModel = mongoose.model<EmailType>('EmailModel', emailSchema);

export default EmailModel;

