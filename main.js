song1="";
song2="";

leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftWrist = 0;
scorerightWrist = 0;

function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");

    }

    function setup(){
        canvas=createCanvas(540,450);
        canvas.center();
    
        video=createCapture(VIDEO);
        video.hide();

        poseNet=ml5.poseNet(video, modelLoaded);
        poseNet.on('pose' , gotPoses);
    }

    function modelLoaded(){
        console.log("Pose net is initialized");
    }
    
    function gotPoses(results){
        if(results.length> 0){
            console.log(results);
            scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("scorerightWrist= " + scorerightWrist);
            scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist= " + scoreleftWrist);
            leftWristX=results[0].pose.leftWrist.x;
            leftWristY=results[0].pose.leftWrist.y;
            console.log("leftWristX= " + leftWristX);
            console.log("leftWristY= " + leftWristY);
    
            rightWristX=results[0].pose.rightWrist.x;
            rightWristY=results[0].pose.rightWrist.y;
            console.log("rightWristX= " + rightWristX);
            console.log("rightWristY= " + rightWristY);  
        }
    }
    
    function draw(){
        image(video, 0,0,545,455 );

    song1= song1.isPlaying();

        fill("red");
        stroke("red");

        if (scoreleftWrist > 0.2) {
          circle(leftWristX, leftWristY, 20);
          song2.stop();
           if (song1 = false ){
               song1.play();
               document.getElementById("song_name").innerHTML = "Peter Pan Song";
           }
        }

        song2= song2.isPlaying();

        if (scorerightWrist > 0.2) {
            circle(rightWristX, rightWristY, 20);
            song1.stop();
             if (song2 = false ){
                 song2.play();
                 document.getElementById("song_name").innerHTML = "Harry Potter Theme Song";
             }
          }
    
    }

    