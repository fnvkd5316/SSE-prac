import io from "socket.io-client";

const socket =  io.connect("https://kimguen.com", {transports: ['websocket'], upgrade: false})

const createSOCKET = () => {
  const socket =  io.connect("https://kimguen.com", {transports: ['websocket'], upgrade: false})
  return socket;
}

function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

const SOCKET_arr = [];
let Client_Num = 10;


for ( let i = 0; i < Client_Num; i++) {
  console.log(`진행${i}`);
  SOCKET_arr.push(createSOCKET());
}


