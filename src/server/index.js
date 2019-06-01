const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 3001;

io.on('connection', socket => {
  console.log('A user has connected');
  socket.on('chat message', msg => {
    console.log('Message: ', msg);
    io.emit('chat message', msg);
  });
});

http.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
