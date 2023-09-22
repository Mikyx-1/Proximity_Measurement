
const video = document.getElementById("video");
const proximityLevel = document.getElementById('proximityLevel');
const displaySize = {width: video.width, height: video.height};


// const minProportion = 0.06;
const minProportion = 0.01;
const maxProportion = 0.2;
const levels = createProximityLevels(minProportion, maxProportion);


function createProximityLevels(minProportion, maxProportion)
{
    let levels = [];
    let n = 9;
    for (let i = 0; i < n; i++)
    {
        levels.push(minProportion + i*(maxProportion - minProportion)/(n-1));
    }
    return levels;
}

function returnProximityLevel(areaProportion, levels){
    if(areaProportion<levels[0]) return levels.length+1;
    else if(areaProportion > levels[levels.length-1]) return 1;

    for (let i = 0; i < levels.length-1; i++)
    {
        if(areaProportion>=levels[i] && areaProportion<=levels[i+1]) return levels.length+1 - (i+2);
    }
}


const loadFaceAPI = async () => {
    await Promise.all([
        faceapi.loadSsdMobilenetv1Model('/models'),
        faceapi.loadFaceRecognitionModel('/models'),
        faceapi.loadFaceLandmarkModel('/models'),
    ])
    console.log('Model loaded Successfully');
}

navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
    video.srcObject = stream;
    video.play();
}).catch(error => {
    console.log("An error has occurred: ", error);
})

loadFaceAPI().then(async () => {
    video.addEventListener('play', async () => {    

        setInterval(async () => {
            let detects = await faceapi.detectSingleFace(video);
            if(detects!=undefined)
            {
                const resizedDetects = faceapi.resizeResults(detects, displaySize);

                let width = resizedDetects.box.width;
                let height = resizedDetects.box.height;
    
                let areaProportion = (width*height)/(displaySize.height*displaySize.width);
                proximityLevel.innerText = 'Proximity Level: ' + returnProximityLevel(areaProportion, levels).toString() + ' Area Proportion: ' + areaProportion.toString();

                
            }
        }, 1000);
    })
});


