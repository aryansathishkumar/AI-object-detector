img = "";
function preload()
{
    img = loadImage("dog_cat.jpg");
}
status = "";
percent = 0;
objects = [];
video_declare = "";
function setup()
{
    canvas = createCanvas(450, 450);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    object_detector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("detect").innerHTML = "detecting objects";
}
function modelloaded()
{
    console.log("cocossd is loaded", ml5.version);
    status = true;
    object_detector.detect(video,gotresult);
}
function gotresult(error,results)
{
    if(error)
    {
        console.error(error);
        window.alert("There is an error click on 'ok' button to wait for the web page working");
        object_detector.detect(video, gotresult);
    }
    else
    {
        console.log(results);
        document.getElementById("detect").innerHTML = "Object Detected"
        objects = results;
        object_detector.detect(video, gotresult);
    }
}
function draw()
{
    image(video, 0, 0, 450, 450);
    if(status != "")
    {
    for(i=0; i<objects.length; i++)
    {
        percent= Math.floor(objects[i].confidence*100);
        object_name= objects[i].label;
        strokeWeight(1);
        fill("red");
        textSize(20);
        strokeWeight(4);
        text(object_name+" "+percent+"%",objects[i].x+15,objects[i].y+15);
        noFill();
        stroke("green");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
    }
}