import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    candidateName: { type: String, required: true },
    subject: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date, required: true },
    image: { type: String, required: true }, // URL from image upload
    address: { type: String, required: true },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },
    submitted_by: { type: String, required: true },
    status: { type: String, default: "pending" }, // pending, approved, rejected
  },
  { timestamps: true }
);

const Admission = mongoose.model("Admission", admissionSchema);
export default Admission;
