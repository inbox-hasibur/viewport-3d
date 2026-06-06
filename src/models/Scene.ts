import mongoose from 'mongoose';

const SceneObjectSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  position: { type: [Number], required: true },
});

const SceneSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true, unique: true },
    objects: { type: [SceneObjectSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Scene || mongoose.model('Scene', SceneSchema);
