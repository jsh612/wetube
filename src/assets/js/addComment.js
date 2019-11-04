import axios from "axios";

const commentList = document.getElementById("jsCommentList");
const addCommetForm = document.getElementById("jsAddComment");
const commentNumber = document.getElementById("jsCommentNumber");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
  console.log("확인", commentNumber);
  console.log("타입확인", typeof commentNumber);
};

const addComment = comment => {
  // 새로고침하지 않고 작성 즉시 댓글을 화면에 보여주기 위해 html 화면 수정
  // (댓글작성 페이지를 위해 꼭 필요하지는 않지만, 새로고침 하기 귀찮아서)
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = comment;
  li.appendChild(span);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  if (response.status === 200) {
    addComment(comment);
  }
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
