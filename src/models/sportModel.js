import mongoose from "mongoose";

const sportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  university: { type: mongoose.Schema.Types.ObjectId, ref: "university" }
});

export default mongoose.model("Sport", sportSchema);
