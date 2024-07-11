import mongoose,  {Schema, Document, Types} from "mongoose"

export interface TypeExpensesType extends Document { 
    name: string, 
    user: Types.ObjectId
}

const TypeOfExpensesSchema: Schema = new Schema ({ 
    name: { 
        type: String,
        required: true
    },
    user: { 
        type: Types.ObjectId,
        required: true
    }
})

const ExpensesTypeModel = mongoose.model<TypeExpensesType>("ExpensesTypeModel", TypeOfExpensesSchema)

export default ExpensesTypeModel