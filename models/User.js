import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment" //Comment 모델에서 참조
    }
  ],
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video" //Video 모델에서 참조
    }
  ]
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;
