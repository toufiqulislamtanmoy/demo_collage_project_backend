import mongoose from "mongoose";

const researchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  abstract: { type: String },
  authors: [{ type: String }],
  publicationDate: { type: Date },
  journal: { type: String },
  totalDownloads: { type: Number },
  totalPages: { type: Number },
  category: { type: String, required: true },
  link: { type: String },
  keywords: [{ type: String }],
  university: { type: mongoose.Schema.Types.ObjectId, ref: "university" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Research", researchSchema);
