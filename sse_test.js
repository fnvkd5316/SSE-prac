
const createSSE = (userEmail) => {
  const SSE = new EventSource(`https://kimguen.com/chats/sse/${userEmail}`);
  return SSE;
}

function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

const SSE_arr = [];
let Client_Num = 90;


for ( let i = 0; i < Client_Num; i++) {
  SSE_arr.push(createSSE(`test_${i}@email.com`));
}