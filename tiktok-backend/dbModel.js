import mongoose from 'mongoose';

const tiktokSchema = mongoose.Schema({
  url: String,
  channel: String,
  description: String,
  song: String,
  likes: {type: Number},
  messages: {type: Number},
  shares: {type: Number},
});

export default mongoose.model('tiktokVideos', tiktokSchema);