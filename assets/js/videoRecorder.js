const recorderContainer = document.querySelector("#jsRecordContainer");
const recordBtn = document.querySelector("#jsRecordBtn");
const videoPreview = document.querySelector("#jsVideonPreview");

const handleVideoData = event => {
  // startRecording에서 녹화되어 넘오언 video data를 다룬다.
  console.log("handleVideoData 이벤트::::::", event);
};

const startRecording = stream => {
  // getVideo 로 가져온 비디오를 진짜로 record 하는 함수

  const videoRecorder = new MediaRecorder(stream);

  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);

  console.log("videoRecorder 상태확인:::", videoRecorder);
};

const getVideo = async () => {
  // 유저 카메라 접근을 통한 비디오 화면을 html로 가져 오는 함수 (녹화는 X)
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 }
    });

    // src = 파일 경로 or 파일명
    // stream은 객체 이므로
    // videoPreview.src = stream   <- 이렇게 작성할수 없다.
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = "Stop recording";

    startRecording(stream);
  } catch (error) {
    // 유저 디바이스의 사용 권한을 얻지 못한 경우.
    recordBtn.innerHTML = "❌ Cant Record";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

function init() {
  recordBtn.addEventListener("click", getVideo);
}

if (recorderContainer) {
  init();
}
