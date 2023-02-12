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
function initAnimations(graphAnimation)
{
    let isInfinity1, isInfinity2;
    if (currentGraph.inputAnswer.includes("=") && currentGraph.inputAnswer.split("=")[1][2] == "∞") isInfinity1 = false;
    else isInfinity1 = currentGraph.inputAnswer[2] != "∞";
    isInfinity2 = currentGraph.inputAnswer.split(";")[1][2] != "∞";
    if (isInfinity1 && !isInfinity2) animateInterval(0, 2000, graphAnimation[0], 1, graphAnimation[1]);
    else if (!isInfinity1 && isInfinity2) animateInterval(1, 2000, graphAnimation[1], 0, graphAnimation[0]);
    else
    {
        let milliseconds = 2000;
        if (!isInfinity1 && !isInfinity2) milliseconds = 1000;
        for (let i = 0; i < circles.length; i++) animateInterval(i, milliseconds, graphAnimation[i], -1, i);
    }
}
function generateIntervals()
{
    let intervalContainer = document.getElementById("intervalContainer");
    for (let i = 0; i <= currentGraph.intervalSize / currentGraph.intervalStep; i++) 
    {
        let interval = new Interval(i, currentGraph.start + i * currentGraph.intervalStep, currentGraph.pixels, currentGraph.intervalSize / currentGraph.intervalStep, "NONE");
        intervalContainer.appendChild(interval.element);
        intervals[i] = interval;
    }
    if (currentGraph.currentLevel >= 4)
    {
        createInfinitePosition(-25.6 + "%", "negative");
        createInfinitePosition(121.6 + "%", "positive");
    }
}
function createInfinitePosition(margin, whichInf)
{
    let div = document.getElementById("infinitySpots");
    let interval = new Interval(intervals.length, intervals.length, 0, 0, whichInf);
    interval.element.classList.add("infinityInterval");
    div.appendChild(interval.element);
    interval.element.style.marginLeft = margin;
    interval.position = interval.element.offsetLeft + 24.8;
    intervals.push(interval);
}
function circleToInfPos(which, infId, plotInfId)
{
    if (intervals[which].open)
    {
        document.getElementById(infId).style.visibility = "visible";
        document.getElementById(plotInfId).style.display = "none";
    }
    else document.getElementById(infId).style.visibility = "hidden";
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
    generateAxis("axisX", "startCircleX", "endCircleX", "startLineX", "endLineX", "lineX", "X", currentGraph.pixels + "px", true);
    circles = 
    [
        new Circle(axisX.querySelector('#startCircleX'), overlay.querySelector('#startLineX'), "right", overlay.querySelector("#intervalLabel1"), currentGraph.start, overlay.querySelector("#circleLabel1")), 
        new Circle(axisX.querySelector('#endCircleX'), overlay.querySelector('#endLineX'), "left", overlay.querySelector("#intervalLabel2"), currentGraph.end, overlay.querySelector("#circleLabel2"))
    ];
    currentGraph.setGraph();
    for (const interval of circles) updateLabelPos(interval);
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
function updateIntervalPos(index, posX)
{
    circles[index].circle.style.transform = `translateX(${posX}px)`;
    circles[index].line.style.transform = `translateX(${posX}px)`;
    circles[index].intervalLabel.style.transform = `translateX(${posX}px)`;
    circles[index].circleLabel.style.transform = `translateX(${posX}px)`;
    let labelValue = currentGraph.findNearestIntervalExample(parseFloat(circles[index].circle.getBoundingClientRect().left - axisX.getBoundingClientRect().left, 10));
    circles[index].intervalLabel.innerText = labelValue == "-∞" || labelValue == "+∞" ? labelValue : (labelValue / currentGraph.trueNumber).toLocaleString('de-DE');
    updateLabelPos(circles[index]);
    drawFilledArea(circles[0].getBounds().left + 13, 15, circles[1].getBounds().left - circles[0].getBounds().left, 480);
}
function enableInfPlot(plotId)
{
    document.getElementById(plotId).style.display = "block";
}
function goBack()
{
    window.location.href = "../startPageCode/startPage.html";
}
function repeatExample()
{
    window.location.href = "../exampleLevelCode/exampleLevel.html";
}