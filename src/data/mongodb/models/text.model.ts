import mongoose, { Schema } from "mongoose";



const textSchema = new Schema(
    {
        content: { 
            type: String, 
            required: true 
        }, 
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        model:{
            type:String, 
            enum: ["GPT", "CLAUDE","GEMINI"], 
            required: [true, "model is required"]
        }
    }
)
export const UserModel = mongoose.model("User", textSchema);