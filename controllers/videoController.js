import {videos} from '../db'
export const videoHome =  (req, res) => {
  res.render('home', {pageTitle: "Home", videos});
}

//- 위의 코드 설명
//  pageTitle 변수가 home 템플릿으로 전달된다.
export const searchVideos = (req, res) => {
  const {query: {term:searchingBy}} = req 
  res.render("search", { pageTitle: "Search", searchingBy, videos});
}

export const upload = (req, res) => res.render('upload', {pageTitle: "Upload"});

export const videoDetail = (req, res) => res.render('videoDetail', {pageTitle: "video detail"});

export const editVideo = (req, res) => res.render('editVideo', {pageTitle: "edit video"});

export const deleteVideo = (req, res) => res.render('deleteVideo', {pageTitle: "eelete video"});

