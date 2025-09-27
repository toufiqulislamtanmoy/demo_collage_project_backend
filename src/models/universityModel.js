import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, default: 0 },
  
  admissionStart: { type: Date },
  admissionEnd: { type: Date },
  location: { type: String },
  about: { type: String },

  admissionProcess: { type: String },

  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  sports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sport" }],
  researchPapers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Research" }],
  photos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Photo" }],

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("university", universitySchema);
