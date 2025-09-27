import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  image: { type: String, required: true },
  caption: { type: String },
  type: {
    type: String,
    enum: ["gallery", "event", "campus"],
    default: "gallery",
  },
  university: { type: mongoose.Schema.Types.ObjectId, ref: "university" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Photo", photoSchema);
