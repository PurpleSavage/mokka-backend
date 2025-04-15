import mongoose, { Schema } from "mongoose";

const audioSchema = new Schema(
    {
        url: { type: String, required: true },
        content: { type: String, required: true }, 
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    }
)
export const AudioModel = mongoose.model('Image', audioSchema);