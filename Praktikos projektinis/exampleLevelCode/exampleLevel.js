window.onload = function()
{
    let levelName = window.sessionStorage.getItem("lygis");
    let graphNumber = window.sessionStorage.getItem("graphNumber");
    let graphAnimation = [intervalAnimations[0], intervalAnimations[1]];
    if (levelName != "empty")
    {
        for (let i = 0; i < graphs.length; i++) 
        {
            if (graphs[i].graphName == levelName)
            {
                currentGraph = graphs[i];
                document.getElementById("title").innerText = "Apibrėžimo sritis - " + levelName;
                document.getElementById("levelTag").innerText = "Apibrėžimo sritis - " + levelName;
                graphAnimation[0] = intervalAnimations[i * 2];
                graphAnimation[1] = intervalAnimations[i * 2 + 1];
                Graph.graphNumber = graphNumber;
                break;
            }
        }
    }
    else currentGraph = graphs[0];
    filledArea = document.getElementById("filledArea").getContext("2d");
    filledArea.fillStyle = "rgba(180, 180, 180, 0.4)";
    initializeNewGraph();
    setColor();
    let isInfinity1, isInfinity2;
    if (currentGraph.inputAnswer.includes("=") && currentGraph.inputAnswer.split("=")[1][2] == "∞") isInfinity1 = false;
    else isInfinity1 = currentGraph.inputAnswer[2] != "∞";
    isInfinity2 = currentGraph.inputAnswer.split(";")[1][0] != "∞";
    if (isInfinity1 && !isInfinity2) animateInterval(graphAnimation[0].index, graphAnimation[0].seconds, graphAnimation[0].end, 1, graphAnimation[1].end);
    else if (!isInfinity1 && isInfinity2) animateInterval(graphAnimation[1].index, graphAnimation[1].seconds, graphAnimation[1].end, 0, graphAnimation[0].end);
    else 
    {
        animateInterval(graphAnimation[0].index, graphAnimation[0].seconds, graphAnimation[0].end, -1, 0);
        animateInterval(graphAnimation[1].index, graphAnimation[1].seconds, graphAnimation[1].end, -1, 0);
    }
}
function changeCircleType(index)
{
    if (intervals[index].circle.style.backgroundColor == "white") intervals[index].switchType("black", "5px solid");
    else intervals[index].switchType("white", "5px dashed");
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
    draggableCircle.label.style.top = `${draggableCircle.circle.offsetTop - 50}px`;
    draggableCircle.label.style.left = `${draggableCircle.circle.offsetLeft + draggableCircle.circle.offsetWidth / 2 - draggableCircle.label.offsetWidth / 2}px`;
}
function initializeNewGraph()
{
    generateAxis("axisX", "startCircleX", "endCircleX", "startLineX", "endLineX", "lineX", "X", currentGraph.pixels + "px", true);
    intervals = 
    [
        new Circle(axisX.querySelector('#startCircleX'), overlay.querySelector('#startLineX'), "right", overlay.querySelector("#startCircleLabel"), currentGraph.start), 
        new Circle(axisX.querySelector('#endCircleX'), overlay.querySelector('#endLineX'), "left", overlay.querySelector("#endCircleLabel"), currentGraph.end)
    ];
    currentGraph.setGraph();
    for (const interval of intervals) updateLabelPos(interval);
    drawFilledArea(intervals[0].getBounds().left + 13, 15, intervals[1].getBounds().left - intervals[0].getBounds().left, 480);
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
function updateIntervalPos(index, posX)
{
    intervals[index].circle.style.transform = `translateX(${posX}px)`;
    intervals[index].line.style.transform = `translateX(${posX}px)`;
    intervals[index].label.style.transform = `translateX(${posX}px)`;
    let interval = currentGraph.findNearestIntervalExample(parseFloat(intervals[index].circle.getBoundingClientRect().left - axisX.getBoundingClientRect().left, 10));
    intervals[index].circle.style.left = interval[1];
    intervals[index].label.innerText = interval[0] == "-∞" || interval[0] == "∞" ? interval[0] : interval[0] / currentGraph.trueNumber;
    updateLabelPos(intervals[index]);
    drawFilledArea(intervals[0].getBounds().left + 13, 15, intervals[1].getBounds().left - intervals[0].getBounds().left, 480);
}
function enableInfPlot(plotId)
{
    document.getElementById(plotId).style.display = "block";
}
function goBack()
{
    window.location.href = "../startPageCode/startPage.html";
}