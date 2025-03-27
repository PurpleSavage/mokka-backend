import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema(
    {
        url: { type: String, required: true },
        prompt: { type: String, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    }
)
export const ImageModel = mongoose.model('Image', imageSchema);