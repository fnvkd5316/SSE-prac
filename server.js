const express = require('express')
const cors = require("cors");
const app = express()

const port = 8000;

let clients = [];
let facts = [];
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

  const userEmail = `test_${i}@email.com`;
  i = i + 1;

  console.log("연결된 유저:", userEmail);
  // 클라이언트에게 자기 유저이메일 보내기
  const data = `data: 연결된 email ${userEmail}\n\n`;
  res.write(data);

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

  console.log(userEmail + '에게: ' + message);

  clients.forEach(client => {
    if (client.userEmail === userEmail) {
      client.res.write(`data: ${message}\n\n`);
    }
  });

  return res.json(message);
});

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