import routes from '../routes';
import Video from '../models/Video';


export const home =  async (req, res) => {
  //  try/catch문으로 에러잡기
  try {
    const videos = await Video.find({});
    res.render('home', {pageTitle: "Home", videos}); 
  } catch (error) {
    console.log(error);
    //에러가 발생한경우 videos는 빈 배열로 실행 시킨다.(즉, 비디오가 없는 상태로 render)
    res.render('home', {pageTitle: "Home", videos: []}); 
  }
}

//- 위의 코드 설명
//  pageTitle 변수가 home 템플릿으로 전달된다.
export const search = (req, res) => {
  const {query: {term:searchingBy}} = req 
  res.render("search", { pageTitle: "Search", searchingBy, videos});
}



export const getUpload = (req, res) => {
  res.render('upload', {pageTitle: "Upload"});
};
export const postUpload = async(req, res) => {
  const { 
    body: {title, description},
    file: {path}
  } = req;
  const newVideo = await Video.create({
    //Model.creat()
    fileUrl: path,
    title,
    description
  });
  console.log('새로운비디오::::', newVideo);
  res.redirect(routes.videoDetail(newVideo.id))
};



export const videoDetail = async(req, res) => {
  console.log('req.params:::',req.params)
  const {
    params: {id}
  } = req;
  try {
    const video = await Video.findById(id);
    // console.log('video:::', video)
    res.render('videoDetail', {pageTitle: "video detail", video});  
  } catch (error) {
    console.log(error);
    //해당 id를 갖는 비디오가 없는 경우 home로 이동시킨다.
    res.redirect(routes.home);
  }
  
}

export const getEditVideo = async(req, res) => {
  const {
    params: {id}
  } = req;
  try {
    const video = await Video.findById(id)
    res.render("editVideo", {pageTitle: `Edit ${video.title}`, video})
  } catch (error) {
      console.log('getEditVideo 에러', error);
      res.redirect(routes.home)
  }
}
export const postEditVideo = async(req, res) => {
  const {
    params: {id},
    body: {title, description}
  } = req;
  try {
    await Video.findByIdAndUpdate(id, {title, description});
    res.redirect(routes.videoDetail(id));
  } catch (error) {
      console.log('postEditVideo 에러', error);
      res.redirect(routes.home)
  }
}

export const deleteVideo = (req, res) => res.render('deleteVideo', {pageTitle: "eelete video"});

