const videoContainer = document.querySelector("#jsVideoPlayer");
//#jsVideoPlayer 내부의 video 선택
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.querySelector("#jsPlayButton");
const volumeBtn = document.querySelector("#jsVolumeBtn");

function handlePlayClick() {
  if (videoPlayer.paused) {
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    videoPlayer.play();
  } else {
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    videoPlayer.pause();
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function init() {
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
}

if (videoContainer) {
  // home 페이지의 경우 videoDetail 내의 클래스와 같은 클래스가 없으므로,
  // 해당 사항을 체크하여 이벤트를 부여한다.
  init();
}
