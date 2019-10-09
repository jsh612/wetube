import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CommentShcema = new Schema({
  text: {
    type: String,
    required: "Text is required"
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})



const model = mongoose.model('Comment', CommentShcema);
export default model;