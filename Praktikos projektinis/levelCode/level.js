let intervals = [];
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
    for (let i = 0; i <= currentGraph.intervalSize / currentGraph.intervalStep; i++) 
    {
        let interval = new Interval(i, currentGraph.start + i * currentGraph.intervalStep, currentGraph.pixels, currentGraph.intervalSize / currentGraph.intervalStep, "NONE");
        intervalContainer.appendChild(interval.element);
        intervals[i] = interval;
    }
    intervals[0].open = false;
    intervals[intervals.length - 1].open = false;
    if (currentGraph.currentLevel >= 4)
    {
        createInfinitePosition(-25.6 + "%", "negative");
        createInfinitePosition(121.6 + "%", "positive");
    }
    filledArea = document.getElementById("filledArea").getContext("2d");
    filledArea.fillStyle = "rgba(180, 180, 180, 0.4)";
    initializeNewGraph();
    setColor();
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
                draggableCircle.intervalLabel.innerText = whichInterval[1];
                updateLabelPos(draggableCircle);
            }
            drawFilledArea(circles[0].getBounds().left + 13, 16, circles[1].getBounds().left - circles[0].getBounds().left, 480);
        }
        function onMouseUp() 
        {
            document.removeEventListener(endEvent, onMouseUp);
            document.removeEventListener(moveEvent, onMouseMove);
        }
    });
    draggableCircle.circle.ondragstart = function() { return false; };
}
/*function circleDragSetupY(draggableCircle, otherCircle, startCircle)
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
            draggableCircle.intervalLabel.style.top = `${draggableCircle.circle.offsetTop + draggableCircle.circle.offsetHeight / 2 - draggableCircle.label.offsetHeight / 2}px`;
            draggableCircle.intervalLabel.style.left = `${draggableCircle.circle.offsetLeft - 20}px`;
            drawFilledArea(4, circles[0].getBounds().top, 774, circles[1].getBounds().top - circles[0].getBounds().top);
        }
        function onMouseUp()
        {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }
    };
    draggableCircle.circle.ondragstart = function() { return false; };
}*/
function setIntervalPosition(draggableCircle, newPos)
{
    for (let i = 0; i < intervals.length; i++)
    {
        if (intervals[i].open)
        {
            const targetLeft = intervals[i].element.getBoundingClientRect().left;
            const targetRight = targetLeft + intervals[i].element.getBoundingClientRect().width;
            if (newPos >= targetLeft && newPos <= targetRight) 
            {
                if (draggableCircle.intervalSpot != -1) intervals[draggableCircle.intervalSpot].open = true;
                draggableCircle.intervalSpot = i;
                intervals[i].open = false;
                let intervalNumber = intervals[i].labelValue / currentGraph.trueNumber;
                let labelNumber = intervals[i].whichInf != "NONE" ? whichInfinity(draggableCircle, intervals[i].whichInf) : intervalNumber.toLocaleString('de-DE');
                circleToInfPos(intervals.length - 2, "negInf", "plotNegInf");
                circleToInfPos(intervals.length - 1, "posInf", "plotPosInf");
                return [intervals[i].position, labelNumber];
            }
        }
    }
    return "NONE";
}
function whichInfinity(draggableCircle, whichInf)
{
    if (whichInf == "positive")
    {
        draggableCircle.switchType("white", "5px dashed");
        document.getElementById("plotPosInf").style.display = "block";
        return "+∞";
    }
    else
    {
        draggableCircle.switchType("white", "5px dashed");
        document.getElementById("plotNegInf").style.display = "block";
        return "-∞";
    }
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
    generateAxis("axisX", "startCircleX", "endCircleX", "startLineX", "endLineX", "lineX", "X", currentGraph.pixels + "px", false);
    circles = 
    [
        new Circle(axisX.querySelector('#startCircleX'), overlay.querySelector('#startLineX'), "right", overlay.querySelector("#intervalLabel1"), currentGraph.start, overlay.querySelector("#circleLabel1")),
        new Circle(axisX.querySelector('#endCircleX'), overlay.querySelector('#endLineX'), "left", overlay.querySelector("#intervalLabel2"), currentGraph.end, overlay.querySelector("#circleLabel2"))
    ];
    circles[0].intervalSpot = 0;
    if (currentGraph.currentLevel >= 4) circles[1].intervalSpot = intervals.length - 3;
    else circles[1].intervalSpot = intervals.length - 1;
    currentGraph.setGraph();
    for (const interval of circles) updateLabelPos(interval);
    circleDragSetupX(circles[0]);
    circleDragSetupX(circles[1]);
    drawFilledArea(circles[0].getBounds().left + 13, 16, circles[1].getBounds().left - circles[0].getBounds().left, 480);
}
function clearTheLevel()
{
    let deleteIds = ["axisX", "startLineX", "endLineX", "plotNegInf", "plotPosInf"];
    for (const deleteId of deleteIds) document.getElementById(deleteId).remove();
}
function checkIfCorrect()
{
    let answers = currentGraph.intervalAnswers.slice();
    let brackets = [];
    for (let i = 0; i < circles.length; i++)
    {
        for (let j = 0; j < answers.length; j++)
        {
            if (circles[i].intervalLabel.innerText == answers[j].toLocaleString("de-DE"))
            {
                answers.splice(j, 1);
                if (i % 2 == 0) brackets[i] = circles[j].getBackgroundColor() == "white" ? "(" : "[";
                else brackets[i] = circles[j].getBackgroundColor() == "white" ? ")" : "]";
                break;
            }
        }
    }
    if (answers.length > 0) levelFailed();
    else
    {
        let input = document.getElementById("apibrezimoSritis").value;
        if (currentGraph.currentLevel > 1)
        {
            if (currentGraph.currentLevel > 4 && input.includes("="))
            {
                if (brackets[0] == input.split("=")[1][0] && brackets[1] == input.slice(-1)[0] && currentGraph.inputAnswer == input) levelCompleted();
                else levelFailed();
            }
            else if (brackets[0] == input[0] && brackets[1] == input.slice(-1)[0] && currentGraph.inputAnswer == input) levelCompleted();
            else levelFailed();
        }
        else if (currentGraph.inputAnswer == input) levelCompleted();
        else levelFailed();
    }
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
    document.getElementById("apibrezimoSritis").value += isPositive ? "+∞" : "-∞";
}
function goBack()
{
    window.location.href = "../startPageCode/startPage.html";
}