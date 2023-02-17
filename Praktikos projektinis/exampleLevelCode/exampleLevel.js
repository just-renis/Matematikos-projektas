let intervals = [];
window.onload = function()
{
    let levelName = window.sessionStorage.getItem("lygis");
    let graphNumber = window.sessionStorage.getItem("graphNumber");
    let graphAnimation = intervalAnimations[0];
    if (levelName != "empty")
    {
        for (let i = 0; i < graphs.length; i++) 
        {
            if (graphs[i].graphName == levelName)
            {
                currentGraph = graphs[i];
                document.getElementById("title").innerText = "Apibrėžimo sritis - " + levelName;
                document.getElementById("levelTag").innerText = "Apibrėžimo sritis - " + levelName;
                graphAnimation = intervalAnimations[i];
                Graph.graphNumber = graphNumber;
                break;
            }
        }
    }
    else currentGraph = graphs[0];
    generateIntervals();
    filledArea = document.getElementById("filledArea").getContext("2d");
    filledArea.fillStyle = "rgba(180, 180, 180, 0.4)";
    initializeNewGraph();
    setColor();
    initAnimations(graphAnimation);
}
async function initAnimations(graphAnimation)
{
    for (let i = 0; i < circles.length; i++) await animateInterval(i, graphAnimation[i]);
    animateInput(currentGraph.inputAnswer, document.getElementById("apibrezimoSritis"));
}
function generateIntervals()
{
    let intervalContainer = document.getElementById("intervalContainer");
    let needInfinities = currentGraph.currentLevel >= 4;
    let intervalAmount = needInfinities ? currentGraph.intervalSize / currentGraph.intervalStep + 2 : currentGraph.intervalSize / currentGraph.intervalStep;
    let labelValue = 0;
    for (let i = 0; i <= intervalAmount; i++) 
    {
        if (needInfinities)
        {
            if (i == 0) labelValue = "-∞";
            else if (i == intervalAmount) labelValue = "+∞";
            else labelValue = currentGraph.start + (i - 1) * currentGraph.intervalStep;
        }
        else labelValue = currentGraph.start + i * currentGraph.intervalStep;
        let interval = new Interval(labelValue);
        intervalContainer.appendChild(interval.element);
        intervals[i] = interval;
        intervals[i].position = (intervals[i].element.getBoundingClientRect().left + parseFloat(currentGraph.axisConfig[2]) * i - (document.getElementById("container").getBoundingClientRect().left) - 4.8 + parseFloat(currentGraph.axisConfig[1]) + parseFloat(currentGraph.axisConfig[2]));
    }
}
function changeSelectedCircleType()
{
    for (let i = 0; i < circles.length; i++)
    {
        if (circles[i].circle.style.borderColor == "rgb(0, 216, 230)")
        {
            if (circles[i].circle.style.backgroundColor == "white") circles[i].switchType("black", "5px solid");
            else circles[i].switchType("white", "5px dashed");
            return;
        }
    }
}
function changeCircleType(index)
{
    if (circles[index].circle.style.backgroundColor == "white") circles[index].switchType("black", "5px solid");
    else circles[index].switchType("white", "5px dashed");
}
function drawFilledArea(x, y, width, height)
{
    let canvas = document.getElementById("filledArea");
    filledArea.clearRect(0, 0, canvas.width, canvas.height);
    filledArea.beginPath();
    filledArea.rect(x - document.getElementById("overlay").getBoundingClientRect().left, y, width, height);
    filledArea.fill();
}
function updateLabelPos(draggableCircle)
{
    draggableCircle.intervalLabel.style.top = `${draggableCircle.circle.offsetTop - 50}px`;
    draggableCircle.intervalLabel.style.left = `${draggableCircle.circle.offsetLeft + draggableCircle.circle.offsetWidth / 2 - draggableCircle.intervalLabel.offsetWidth / 2}px`;
    draggableCircle.circleLabel.style.top = `${draggableCircle.circle.offsetTop - 27}px`;
    draggableCircle.circleLabel.style.left = `${draggableCircle.circle.offsetLeft + draggableCircle.circle.offsetWidth / 2 - draggableCircle.circleLabel.offsetWidth / 2}px`;
}
function initializeNewGraph()
{
    generateAxis("axisX", "startCircleX", "endCircleX", "startLineX", "endLineX", "lineX", true);
    circles = 
    [
        new Circle(axisX.querySelector('#startCircleX'), overlay.querySelector('#startLineX'), "right", overlay.querySelector("#intervalLabel1"), currentGraph.start, overlay.querySelector("#circleLabel1"), intervals[0].position), 
        new Circle(axisX.querySelector('#endCircleX'), overlay.querySelector('#endLineX'), "left", overlay.querySelector("#intervalLabel2"), currentGraph.end, overlay.querySelector("#circleLabel2"), intervals[intervals.length - 1].position)
    ];
    currentGraph.setGraph();
    for (const circle of circles) updateLabelPos(circle);
    drawFilledArea(circles[0].getBounds().left + 13, 15, circles[1].getBounds().left - circles[0].getBounds().left, 480);
    if (currentGraph.graphName.split(".")[1][0] == "0") document.getElementById("explanation").innerText = explanations[currentGraph.currentLevel - 1];
}
function clearTheLevel()
{
    let deleteIds = ["axisX", "startLineX", "endLineX", "plotNegInf", "plotPosInf"];
    for (const deleteId of deleteIds) document.getElementById(deleteId).remove();
}
function nextLevel()
{
    switch (currentGraph.graphName)
    {
        case "Lygis 1.2":
        case "Lygis 2.2":
        case "Lygis 3.2":
        case "Lygis 4.2":
        case "Lygis 5.2":
        case "Lygis 6.2":
        case "Lygis 7.2":
        case "Lygis 8.2":
        case "Lygis 9.2":
            window.location.href = "../startPageCode/startPage.html";
            break;
        default:
            window.sessionStorage.setItem("lygis", graphs[++Graph.graphNumber].graphName);
            window.sessionStorage.setItem("graphNumber", Graph.graphNumber);
            if (graphs[Graph.graphNumber].graphName.split(".")[1][0] != "0") window.location.href = "../levelCode/level.html";
            else window.location.href = "../exampleLevelCode/exampleLevel.html";
    }
}
function goBack()
{
    window.location.href = "../startPageCode/startPage.html";
}
function repeatExample()
{
    window.location.href = "../exampleLevelCode/exampleLevel.html";
}