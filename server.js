const express = require('express');
const app = express();

const port = 8000;

let clients = [];
let i = 0;

const headers = {
  'Content-Type': 'text/event-stream',
  'Connection': 'keep-alive',
  'Cache-Control': 'no-cache',
  'Access-Control-Allow-Origin': '*'
};

app.use(express.json()); // json형태의 데이터를 parsing하여 사용할 수 있게 만듦.
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.writeHead(200, headers);

  // 접속하는 순서대로 이메일 등록
  const userEmail = `test_${i}@email.com`;
  i = i + 1;

  // 데이터를 보내면, 
  res.write(`data: tt\n\n`);

  console.log("연결된 유저:", userEmail);

  const newClient = {
    userEmail: userEmail,
    res
  };

  clients.push(newClient);

  res.on('close', () => {
    console.log(`${userEmail} - 연결 종료`);
    clients = clients.filter(client => client.userEmail !== userEmail);
  });
});

app.post('/chat', (req, res) => {
  const { userEmail, message } = req.body;

  const newChat = {
    newMessage: true,
    userName: "행복이",
    chatText: message,
    createdAt: new Date(),
    me: false,    
  }

  clients.forEach(client => {
    if (client.userEmail === userEmail) {
      client.res.write(`data: ${JSON.stringify(newChat)}\n\n`);
    }
  });

  return res.json(message);
});

// 현재 연결된 유저 터미널로 보기
app.get('/test', (req, res) => {
  console.log("현재 있는 userEmail:");
  clients.forEach((el, idx) => {
    console.log(`${idx} - `+ el.userEmail);
  });
  res.send({msg:"성공"});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})