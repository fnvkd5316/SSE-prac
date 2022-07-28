const eventSource = new EventSource('http://localhost:8000');

function updateMessage (message) {
  const list = document.getElementById('messages');
  const item = document.createElement('p');
  item.textContent = message;
  list.appendChild(item);
}

// // 서버로부터 데이터가 오면
// eventSource.addEventListener('message', function(e) {
//   console.log(e.data);
// });

// // connection되면
// eventSource.addEventListener('open', function(e) {
//   // Connection was opened.
// });
 
// // error 나면
// eventSource.addEventListener('error', function(e) {
//   if (e.readyState == EventSource.CLOSED) {
//     // Connection was closed.
//   }
// });

eventSource.onmessage = function (event) {
  console.log("데이터 들어옴");

  console.log(`타입은 ${event.type}이다`);

  updateMessage(event.data);
}

eventSource.onerror = function () {
  console.log("클라이언트 클로즈");
  updateMessage('Server closed connection');
  eventSource.close();
}
