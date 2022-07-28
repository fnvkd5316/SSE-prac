const eventSource = new EventSource('http://localhost:8000');

function updateMessage (message) {
  const list = document.getElementById('messages');
  const item = document.createElement('p');
  item.textContent = message;
  list.appendChild(item);
}

eventSource.onmessage = function (event) {
  console.log("데이터 들어옴");
  updateMessage(event.data);
}

eventSource.onerror = function () {
  console.log("클라이언트 클로즈");
  updateMessage('Server closed connection');
  eventSource.close();
}