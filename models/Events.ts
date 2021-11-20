import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  image: { type: String, required: true },
  isFeatured: { type: String, required: true, default: false },
});

const Event =
  mongoose.models.Event || mongoose.model('Event', eventSchema);

export default Event;
