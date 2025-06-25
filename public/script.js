const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;




let myVideoStream;
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream =>{
   myVideoStream = stream;
   addVideoStream(myVideo,stream);
}).catch(err => {
    console.error('Failed to access media devices:ALLOW ACCESS USING SITE SETTING', err);
});

const addVideoStream = (video,stream)=>{
    video.srcObject = stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play();
    })
    videoGrid.append(video);
}

socket.emit('join-room',ROOM_ID);

socket.on('user-connected',()=>{
    connecToNewUser();    
})
const connecToNewUser = () => {
    console.log('new user');
}

