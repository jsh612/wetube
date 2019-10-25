const recorderContainer = document.querySelector("#jsRecordContainer");
const recordBtn = document.querySelector("#jsRecordBtn");
const videoPreview = document.querySelector("#jsVideonPreview");

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 }
    });
    console.log("stream::::", stream);

    // src = 파일 경로 or 파일명
    // stream은 객체 이므로
    // videoPreview.src = stream   <- 이렇게 작성할수 없다.

    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
  } catch (error) {
    // 유저 디바이스의 사용 권한을 얻지 못한 경우.
    recordBtn.innerHTML = "❌ Cant Record";
    recordBtn.removeEventListener("click", startRecording);
  }
};

function init() {
  recordBtn.addEventListener("click", startRecording);
}

if (recorderContainer) {
  init();
}
