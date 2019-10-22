import mongoose from "mongoose";

const { Schema } = mongoose;

const VidoeSchema = new Schema({
  fileUrl: {
    type: String,
    required: "File URL is required" //해당 내용 없을 시 이와 같은 오류 메세지 출력
  },
  title: {
    type: String,
    required: "Title is required"
  },
  description: String, //다른 옵션이 없을 경우 이렇게 한 줄로 적을 수 있다.
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment" //Comment 모델에서 참조
    }
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const model = mongoose.model("Video", VidoeSchema);
export default model;
