import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MemeSchema = new Schema({
    name: { type: String, required: true },
    caption: { type: String, required: true },
    url: { type: String, required: true },
    id: { type: String, required: true },
});

export default mongoose.model("Meme", MemeSchema);