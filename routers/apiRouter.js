import express from "express";
import routes from "../routes";
import {
  postRegisterView,
  postAddComment,
  postDelComment
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);

apiRouter.get(routes.delComment, postDelComment);
apiRouter.post(routes.delComment, postDelComment);

export default apiRouter;
