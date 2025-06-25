const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server)
const {v4:uuidv4} = require('uuid');
app.use(express.static('public'));


app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.redirect(`/${uuidv4()}`);
   
})

app.get('/:room',(req,res)=>{
    res.render('room',{roomId: req.params.room})
})
// here except(socket.id) used instead of broadcast as it was returning undefined
io.on('connection', socket => {
  socket.on('join-room', (roomId) => {
   
    if (!roomId) {
      console.error('No roomId provided');
      return;
    }

    socket.join(roomId);
    socket.to(roomId).except(socket.id).emit('user-connected');
  });
});

server.listen(3030);