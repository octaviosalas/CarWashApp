import mongoose,  {Schema, Document, Types} from "mongoose"

export interface ExpenseType extends Document { 
    date: Date, 
    amount: number,
    user: Types.ObjectId,
    reason: string,
    observation: string,
    expenseType: string
}


const ExpenseSchema: Schema = new Schema ({ 
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
    reason: { 
        type: String,
        required: true,
    },
    expenseType: { 
        type: String,
        required: true,
    },
    observation: { 
        type: String || null,
        default: null,
    },
})

const ExpensesModel = mongoose.model<ExpenseType>("ExpensesModel", ExpenseSchema)

export default ExpensesModel