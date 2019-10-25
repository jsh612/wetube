const recorderContainer = document.querySelector("#jsRecordContainer");
const recordBtn = document.querySelector("#jsRecordBtn");
const videoPreview = document.querySelector("#jsVideonPreview");

let videoRecorder;

const handleVideoData = event => {
  // startRecording에서 녹화되어 넘오언 video data를 다룬다.
  console.log("handleVideoData 이벤트::::::", event); // BlobEvent 객체 출력
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile); // videoFile(Blob객체)로부터 url을 만든다
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click(); //클릭한것으로 조작한다.
  link.remove();
};

const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start recording";
};

const startRecording = stream => {
  // getVideo 로 가져온 비디오를 진짜로 record 하는 함수

  videoRecorder = new MediaRecorder(stream);

  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  recordBtn.addEventListener("click", stopRecording);

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
