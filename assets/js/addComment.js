import axios from "axios";

const addCommetForm = document.getElementById("jsAddComment");

const sendComment = async comment => {
  console.log("commeent::::", comment);
  const videoId = window.location.href.split("/videos/")[1];
  console.log("id", videoId);
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  console.log("axios 출력값::::", response);
};

const handleSubmit = event => {
  // submit 발생하면 새로고침이 되므로 이를 방지 (기본 이벤트 막기)
  event.preventDefault();

  // addCommetForm 내에 있는 input 태그 선택
  const commentInput = addCommetForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommetForm.addEventListener("submit", handleSubmit);
}

if (addCommetForm) {
  init();
}
