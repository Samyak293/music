song1="";
song2="";
song1_status="";
song2_status="";
scorerightWrist=0;
scoreleftWrist=0;
leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;
function preload(){
    song1=loadSound("Harmane.mp3");
    song2=loadSound("palika dum dum.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    fill("#6495ED");
    stroke("#00FFFF");
    if(scorerightWrist>0.2){
    circle(rightWristx,rightWristy,20);
    song2.stop();
    if(song1_status==false){
        song1.play();
        document.getElementById("song").innerHTML="Playing Harmane song";
    }
}
if(scoreleftWrist>0.2){
    circle(leftWristx,leftWristy,20);
    song1.stop();
    if(song2_status==false){
        song2.play();
        document.getElementById("song").innerHTML="Playing Dum Dee Dum song";
    }
}
}

function play(){
    song.setVolume(1);
    song.rate(1);
    song.play();
}
function modelLoaded(){
    console.log('posenet is ready');
}
function gotPoses(results){
    if(results.length>0){
     console.log(results);
     scorerightWrist=results[0].pose.keypoints[10].score;
     console.log("scorerightWrist="+scorerightWrist);
     scoreleftWrist=results[0].pose.keypoints[9].score;
     console.log("scoreleftWrist="+scoreleftWrist);
     leftWristx=results[0].pose.leftWrist.x;
     leftWristy=results[0].pose.leftWrist.y;
     console.log("left wrist x="+leftWristx+"left wrist y="+leftWristy);
     rightWristx=results[0].pose.rightWrist.x;
     rightWristy=results[0].pose.rightWrist.y;
     console.log("right wrist x="+rightWristx+"right wrist y="+rightWristy);
    }
}