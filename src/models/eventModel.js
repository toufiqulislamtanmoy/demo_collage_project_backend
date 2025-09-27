import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date },
  description: { type: String, required: false },
  university: { type: mongoose.Schema.Types.ObjectId, ref: "university" }
});

export default mongoose.model("Event", eventSchema);
