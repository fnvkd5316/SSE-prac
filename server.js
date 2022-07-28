const express = require('express')
const app = express()

const port = 8000;

app.get('/', (req, res) => {
  console.log('Client connected');
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Access-Control-Allow-Origin', '*')

  const intervalId = setInterval(() => {
    const date = new Date();
    res.write(`data: ${date}\n\n`);
  }, 3000);

  res.on('close', () => {
    console.log('클라이언트 종료 들어옴');
    clearInterval(intervalId);
    res.end()
  })
})

app.get('/end', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const intervalId = setInterval(() => {
    const date = new Date();
    res.write(`데이터: ${date}\n`);
  }, 3000);

  res.on('close', () => {
    console.log('클라이언트 종료 들어옴');
    clearInterval(intervalId);
    res.end()
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})