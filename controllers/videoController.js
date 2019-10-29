import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  //  try/catch문으로 에러잡기
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    //에러가 발생한경우 videos는 빈 배열로 실행 시킨다.(즉, 비디오가 없는 상태로 render)
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

//- 위의 코드 설명
//  pageTitle 변수가 home 템플릿으로 전달된다.
export const search = async (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  let videos = [];
  try {
    // $regex : 정규쵸현식으로 적용
    //         따라서 아래의 find는 해당 searchingBy 단어가 포함된 title의 비디오를 찾게된다.
    // $option : 정규표현식의 옵션을 설정 (ex/대소문자구분 없음 = "i")
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" }
    }).sort({ _id: -1 });
  } catch (error) {
    console.log("search Error", error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;
  const newVideo = await Video.create({
    //Model.creat()
    fileUrl: path,
    title,
    description,
    creator: req.user.id
  });
  req.user.videos.unshift(newVideo.id);
  req.user.save();
  console.log("새로운비디오::::", newVideo);
  console.log("user::::", req.user);
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  console.log("req.params:::", req.params);
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate({
        path: "comments",
        model: "Comment",
        populate: {
          path: "creator",
          model: "User"
        }
      });
    // console.log("video:::", video.comments);
    res.render("videoDetail", {
      pageTitle: video.title,
      video,
      user: req.user
    });
  } catch (error) {
    console.log(error);
    //해당 id를 갖는 비디오가 없는 경우 home로 이동시킨다.
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    // if (String(video.creator) !== req.user.id) {
    if (!video.creator.equals(req.user.id)) {
      // video.creator = populate 하지 않앗으므로, 작성자의 object id 임.
      // console.log("video.creator:::", typeof video.creator); // type = object
      // console.log("req.user.id:::", typeof req.user.id); // type = String
      // 둘의 타입이 달라서 바로 !== 비교 불가
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    console.log("getEditVideo 에러", error);
    res.redirect(routes.home);
  }
};
export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    await Video.findByIdAndUpdate(id, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    console.log("postEditVideo 에러", error);
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (!video.creator.equals(req.user.id)) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
      req.user.videos.pull(id);
      req.user.save();
      console.log("============", req.user.videos);
    }
  } catch (error) {
    console.log("deleteError", error);
  }
  res.redirect(routes.home);
};

// Resiter Video Views

export const postRegisterView = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Add Commenet

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id
    });
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.redirect(routes.videoDetail(id));
    res.end();
  }
};

export const postDelComment = async (req, res) => {
  const {
    params: { id, id2 }
  } = req;
  try {
    const video = await Video.findById(id);
    await Comment.findOneAndRemove({ _id: id2 });
    await video.comments.pull(id2);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.redirect(routes.videoDetail(id));
    res.end();
  }
};
