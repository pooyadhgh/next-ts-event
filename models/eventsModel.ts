import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: String,
  description: String,
  location: String,
  date: String,
  image: String,
  isFeatured: Boolean,
});

export default mongoose.model('Event', eventSchema);
