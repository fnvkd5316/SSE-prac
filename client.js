const eventSource = new EventSource('http://localhost:8000/');

// 서버로부터 데이터가 오면
eventSource.addEventListener('message', function(e) {
  console.log("메시지 부분!");
  console.log(JSON.parse(e.data));
});

// const newChat = {
//   newMessage: true,
//   userName: "행복이",
//   chatText: message,
//   createdAt: new Date(),
//   me: false,    
// }

// connection되면
eventSource.addEventListener('open', function(e) {
  console.log("접속이 되었습니다!!!!!");
});

// error 나면
eventSource.addEventListener('error', function(e) {
  console.log("접속에 실패했습니다.11");
  if (e.readyState == EventSource.CLOSED) {
    console.log("접속에 실패했습니다.");
  }
});


// function updateMessage (message) {
//   const list = document.getElementById('messages');
//   const item = document.createElement('p');
//   item.textContent = message;
//   list.appendChild(item);
// }

// eventSource.onmessage = function (event) {
//   console.log("데이터 들어옴");

//   console.log(`타입은 ${event.type}이다`);

//   updateMessage(event.data);
// }

// eventSource.onerror = function () {
//   console.log("클라이언트 클로즈");
//   updateMessage('Server closed connection');
//   eventSource.close();
// }


