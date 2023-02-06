let INTERVALS = [];
window.onload = function()
{
    let levelName = window.sessionStorage.getItem("lygis");
    if (levelName != "empty")
    {
        for (let i = 0; i < graphs.length; i++)
        {
            if (graphs[i].graphName == levelName)
            {
                currentGraph = graphs[i];
                document.getElementById("title").innerText = "Apibrėžimo sritis - " + currentGraph.graphName;
                document.getElementById("levelTag").innerText = "Apibrėžimo sritis - " + currentGraph.graphName;
                Graph.graphNumber = window.sessionStorage.getItem("graphNumber");
                break;
            }
        }
    }
    else currentGraph = graph[0];
    let intervalContainer = document.getElementById("intervalContainer");
    for (let i = 0; i <= currentGraph.intervalSize; i++) 
    {
        let interval = new Interval(i, currentGraph.pixels, currentGraph.intervalSize);
        intervalContainer.appendChild(interval.element);
        INTERVALS[i] = interval;
    }
    INTERVALS[0].open = false;
    INTERVALS[INTERVALS.length - 1].open = false;
    if (currentGraph.currentLevel >= 4)
    {
        createInfinitePosition(-25.6 + "%", -128);
        createInfinitePosition(121.6 + "%", 758);
    }
    filledArea = document.getElementById("filledArea").getContext("2d");
    filledArea.fillStyle = "rgba(180, 180, 180, 0.4)";
    initializeNewGraph();
    setColor();
}
function createInfinitePosition(margin, position)
{
    let div = document.getElementById("infinitySpots");
    let interval = new Interval(INTERVALS.length, 0, 0);
    interval.element.classList.add("infinityInterval");
    div.appendChild(interval.element);
    interval.element.style.marginLeft = margin;
    interval.position = position;
    INTERVALS.push(interval);
}
function circleDragSetupX(draggableCircle)
{
    let startEvent = 'mousedown';
    let moveEvent = 'mousemove';
    let endEvent = 'mouseup';
    if ('ontouchstart' in window) 
    {
        startEvent = 'touchstart';
        moveEvent = 'touchmove';
        endEvent = 'touchend';
    }
    draggableCircle.circle.addEventListener(startEvent, function()
    {
        document.addEventListener(moveEvent, onMouseMove);
        document.addEventListener(endEvent, onMouseUp);
        function onMouseMove(event)
        {
            let whichInterval = (startEvent == 'touchstart') ? setIntervalPosition(draggableCircle, event.touches[0].clientX) : setIntervalPosition(draggableCircle, event.clientX);
            if (whichInterval != "NONE")
            {
                draggableCircle.circle.style.left = whichInterval[0] + 'px';
                draggableCircle.line.style.left = whichInterval[0] + currentGraph.offset + 'px';
                draggableCircle.label.innerText = whichInterval[1];
                updateLabelPos(draggableCircle);
            }
            drawFilledArea(circles[0].getBounds().left + 15, 15, circles[1].getBounds().left - circles[0].getBounds().left - 5, 480);
        }
        function onMouseUp() 
        {
            document.removeEventListener(endEvent, onMouseUp);
            document.removeEventListener(moveEvent, onMouseMove);
        }
    });
    draggableCircle.circle.ondragstart = function() { return false; };
}
/*function circleDragSetupX(draggableCircle, otherCircle, isStartCircle)
{
    let startEvent = 'mousedown';
    let moveEvent = 'mousemove';
    let endEvent = 'mouseup';
    if ('ontouchstart' in window) 
    {
        startEvent = 'touchstart';
        moveEvent = 'touchmove';
        endEvent = 'touchend';
    }
    draggableCircle.circle.addEventListener(startEvent, function(event)
    {
        event.preventDefault();
        let newPos, edge, shift;
        if (startEvent == 'touchstart') shift = (window.innerWidth * (event.touches[0].clientX / window.innerWidth)) - draggableCircle.getBounds().left;
        else shift = (window.innerWidth * (event.clientX / window.innerWidth)) - draggableCircle.getBounds().left;
        document.addEventListener(moveEvent, onMouseMove);
        document.addEventListener(endEvent, onMouseUp);
        function onMouseMove(event)
        {
            if (startEvent == 'touchstart') newPos = (window.innerWidth * (event.touches[0].clientX / window.innerWidth)) - shift - axisX.getBoundingClientRect().left;
            else newPos = (window.innerWidth * (event.clientX / window.innerWidth)) - shift - axisX.getBoundingClientRect().left;
            edge = axisX.offsetWidth - draggableCircle.getOffsetWidth();
            if (isStartCircle)
            {
                let otherCircleLeft = otherCircle.getBounds().left - axisX.getBoundingClientRect().left;
                if (newPos > otherCircleLeft - draggableCircle.getOffsetWidth()) newPos = otherCircleLeft - draggableCircle.getOffsetWidth();
            }
            else
            {
                let otherCircleLeft = otherCircle.getBounds().right - axisX.getBoundingClientRect().left;
                if (newPos < otherCircleLeft) newPos = otherCircleLeft;
            }
            if (currentGraph.currentLevel > 3)
            {
                if (newPos < -115) newPos = toInfinity(draggableCircle, "plotNegInf", "negInf");
                else if (newPos > 760) newPos = toInfinity(draggableCircle, "plotPosInf", "posInf");
                else newPos = setIntervalPosition(draggableCircle, otherCircle, newPos, isStartCircle, edge);
            }
            else newPos = setIntervalPosition(draggableCircle, otherCircle, newPos, isStartCircle, edge);
            draggableCircle.circle.style.left = newPos + 'px';
            if (isStartCircle) draggableCircle.line.style.left = newPos + currentGraph.offset + 'px';
            else draggableCircle.line.style.left = newPos + currentGraph.offset + 'px';
            updateLabelPos(draggableCircle);
            drawFilledArea(intervals[0].getBounds().left + 15, 15, intervals[1].getBounds().left - intervals[0].getBounds().left - 5, 480);
        }
        function onMouseUp() 
        {
            document.removeEventListener(endEvent, onMouseUp);
            document.removeEventListener(moveEvent, onMouseMove);
        }
    });
    draggableCircle.circle.ondragstart = function() { return false; };
}*/
function circleDragSetupY(draggableCircle, otherCircle, startCircle)
{
    draggableCircle.circle.onmousedown = function(event) 
    {
        event.preventDefault();
        let newPos, edge;
        let shift = event.clientY - draggableCircle.getBounds().top;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        function onMouseMove(event) 
        {
            newPos = event.clientY - shift - axisY.getBoundingClientRect().top;
            edge = axisY.offsetHeight - draggableCircle.getOffsetHeight();
            if (startCircle)
            {
                let otherCircleTop = otherCircle.getBounds().top - axisY.getBoundingClientRect().top;
                if (newPos > otherCircleTop - draggableCircle.getOffsetHeight()) newPos = otherCircleTop - draggableCircle.getOffsetHeight();
            }
            else
            {
                let otherCircleTop = otherCircle.getBounds().top + axisY.getBoundingClientRect().top;
                if (newPos < otherCircleTop) newPos = otherCircleTop;
            }
            newPos = newPos < 0 ? 0 : newPos > edge ? edge : newPos;
            newPos = currentGraph.findNearestIntervalLevel(newPos, parseFloat(otherCircle.circle.style.top, 10), isStartCircle);
            draggableCircle.circle.style.top = draggableCircle.line.style.top = newPos + 'px';
            draggableCircle.label.style.top = `${draggableCircle.circle.offsetTop + draggableCircle.circle.offsetHeight / 2 - draggableCircle.label.offsetHeight / 2}px`;
            draggableCircle.label.style.left = `${draggableCircle.circle.offsetLeft - 20}px`;
            drawFilledArea(4, circles[0].getBounds().top, 774, circles[1].getBounds().top - circles[0].getBounds().top);
        }
        function onMouseUp()
        {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }
    };
    draggableCircle.circle.ondragstart = function() { return false; };
}
function setIntervalPosition(draggableCircle, newPos)
{
    for (let i = 0; i < INTERVALS.length; i++)
    {
        if (INTERVALS[i].open)
        {
            const targetLeft = INTERVALS[i].element.getBoundingClientRect().left;
            const targetRight = targetLeft + INTERVALS[i].element.getBoundingClientRect().width;
            if (newPos >= targetLeft && newPos <= targetRight) 
            {
                if (draggableCircle.intervalSpot != -1) INTERVALS[draggableCircle.intervalSpot].open = true;
                draggableCircle.intervalSpot = i;
                INTERVALS[i].open = false;
                let intervalNumber = (i + currentGraph.start) / currentGraph.trueNumber;
                let labelNumber = intervalNumber > currentGraph.end ? whichInfinity(draggableCircle, intervalNumber) : intervalNumber;
                if (INTERVALS[INTERVALS.length - 2].open) document.getElementById("plotNegInf").style.display = "none";
                if (INTERVALS[INTERVALS.length - 1].open) document.getElementById("plotPosInf").style.display = "none";
                return [INTERVALS[i].position, labelNumber];
            }
        }
    }
    return "NONE";
  //  let interval = currentGraph.findNearestIntervalLevel(newPos, parseFloat(otherCircle.circle.style.left, 10), isStartCircle);
 //   newPos = interval[1];
  //  draggableCircle.label.innerText = interval[0] == "-∞" || interval[0] == "∞" ? interval[0] : interval[0] / currentGraph.trueNumber;
   // if (interval[0] != "-∞") document.getElementById("plotNegInf").style.display = "none";
   // else if (interval[0] != "∞") document.getElementById("plotPosInf").style.display = "none";
}
/*function setIntervalPosition(draggableCircle, otherCircle, newPos, isStartCircle, edge)
{
    newPos = newPos < 0 ? 0 : newPos > edge ? edge : newPos;
    let interval = currentGraph.findNearestIntervalLevel(newPos, parseFloat(otherCircle.circle.style.left, 10), isStartCircle);
    newPos = interval[1];
    draggableCircle.label.innerText = interval[0] == "-∞" || interval[0] == "∞" ? interval[0] : interval[0] / currentGraph.trueNumber;
    if (isStartCircle && interval[0] != "-∞") document.getElementById("plotNegInf").style.display = "none";
    else if (interval[0] != "∞") document.getElementById("plotPosInf").style.display = "none";
    return newPos;
}*/
function whichInfinity(draggableCircle, intervalNumber)
{
    if (intervalNumber > currentGraph.end + 1)
    {
        draggableCircle.switchType("white", "5px dashed");
        document.getElementById("plotPosInf").style.display = "block";
        return "∞";
    }
    else
    {
        draggableCircle.switchType("white", "5px dashed");
        document.getElementById("plotNegInf").style.display = "block";
        return "-∞";
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
    draggableCircle.label.style.top = `${draggableCircle.circle.offsetTop - 50}px`;
    draggableCircle.label.style.left = `${draggableCircle.circle.offsetLeft + draggableCircle.circle.offsetWidth / 2 - draggableCircle.label.offsetWidth / 2}px`;
}
function initializeNewGraph()
{
    generateAxis("axisX", "startCircleX", "endCircleX", "startLineX", "endLineX", "lineX", "X", currentGraph.pixels + "px", false);
    circles = 
    [
        new Circle(axisX.querySelector('#startCircleX'), overlay.querySelector('#startLineX'), "right", overlay.querySelector("#startCircleLabel"), currentGraph.start),
        new Circle(axisX.querySelector('#endCircleX'), overlay.querySelector('#endLineX'), "left", overlay.querySelector("#endCircleLabel"), currentGraph.end)
    ];
    circles[0].intervalSpot = 0;
    circles[1].intervalSpot = INTERVALS.length - 3;
    currentGraph.setGraph();
    for (const interval of circles) updateLabelPos(interval);
    circleDragSetupX(circles[0]);
    circleDragSetupX(circles[1]);
    drawFilledArea(circles[0].getBounds().left + 15, 15, circles[1].getBounds().left - circles[0].getBounds().left - 5, 480);
}
function clearTheLevel()
{
    let deleteIds = ["axisX", "startLineX", "endLineX", "plotNegInf", "plotPosInf"];
    for (const deleteId of deleteIds) document.getElementById(deleteId).remove();
}
function checkIfCorrect()
{
    if (circles[0].label.innerText == currentGraph.intervalAnswers[0] && circles[1].label.innerText == currentGraph.intervalAnswers[1]) 
    {
        let input = document.getElementById("apibrezimoSritis").value.replace(/\s/g, "");
        if (currentGraph.currentLevel > 1)
        {
            let firstBracket = circles[0].getBackgroundColor() == "white" ? "(" : "[";
            let secondBracket = circles[1].getBackgroundColor() == "white" ? ")" : "]";
            if (currentGraph.currentLevel > 4 && input.includes("="))
            {
                if (firstBracket == input.split("=")[1][0] && secondBracket == input.slice(-1)[0] && currentGraph.inputAnswer == input) levelCompleted();
                else levelFailed();
            }
            else if (firstBracket == input[0] && secondBracket == input.slice(-1)[0] && currentGraph.inputAnswer == input) levelCompleted();
            else levelFailed();
        }
        else if (currentGraph.inputAnswer == input) levelCompleted();
        else levelFailed();
    }
    else levelFailed();
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
function showAnswer()
{
    window.sessionStorage.setItem("lygis", currentGraph.graphName);
    window.location = "../exampleLevelCode/exampleLevel.html";
}
function levelCompleted()
{
    document.getElementById("ats").innerText = "Teisingai!";
    document.getElementById("answerButton").style.backgroundColor = "rgb(0, 255, 100)";
    document.getElementById("answerButton").innerText = "Kitas lygis";
    document.getElementById("answerButton").onclick = nextLevel;
}
function levelFailed()
{
    document.getElementById("ats").innerText = "Neteisingai.";
    document.getElementById("showAnswerButton").style.visibility = "visible";
}
function writeInfSymbol(isPositive)
{
    document.getElementById("apibrezimoSritis").value += isPositive ? "∞" : "-∞";
}
function goBack()
{
    window.location.href = "../startPageCode/startPage.html";
}
function toInfinity(draggableCircle, whichInfPlotId, whichInfId)
{
    draggableCircle.switchType("white", "5px dashed");
    document.getElementById(whichInfPlotId).style.display = "block";
    draggableCircle.label.innerText = whichInfId == "negInf" ? "-∞" : "∞";
    return document.getElementById(whichInfId).offsetLeft - currentGraph.offset;
}