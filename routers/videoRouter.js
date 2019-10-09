import express from 'express';
import routes from '../routes';
import { 
  videoDetail,
  editVideo,
  deleteVideo,
  getUpload,
  postUpload
} from '../controllers/videoController';
import { uploadVideo } from '../middlewares';

const videoRouter = express.Router()

videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);
//우리가 file을 업로드하면 uploadVidoe 함수를 통해 server에 있는 폴더(여기서는 video/)에 업로드되고,
//postUpload라는 함수는 해당 file에 접근할 것이다.

videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);



export default videoRouter;