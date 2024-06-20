import mongoose,  {Schema, Document, Types} from "mongoose"

export interface TokenType extends Document { 
    token: string,
    user: Types.ObjectId 
    createdAt: string,
}


const TokenSchema: Schema = new Schema ({ 
   token: { 
    type: Number,
    required: true,
   },
   user: { 
      type: Types.ObjectId,
      ref: "UserModel"
   },
   createdAt: { 
    type: Date,
    default: Date.now(),
    expires: "15m" 
   }

})

const TokenModel = mongoose.model<TokenType>("TokenModel", TokenSchema)

export default TokenModel