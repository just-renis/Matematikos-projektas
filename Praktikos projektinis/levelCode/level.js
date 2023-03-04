
let isExample = window.sessionStorage.getItem("isExample");
window.onload = function()
{
    let levelName = window.sessionStorage.getItem("lygis");
    let graphAnimation = intervalAnimations[0];
    if (levelName !== null)
    {
        for (let i = 0; i < graphs.length; i++)
        {
            if (graphs[i].graphName == levelName)
            {
                currentGraph = graphs[i];
                document.getElementById("title").innerText = "Apibrėžimo sritis - " + currentGraph.graphName;
                document.getElementById("levelTag").innerText = "Apibrėžimo sritis - " + currentGraph.graphName;
                graphAnimation = intervalAnimations[i];
                Graph.graphNumber = window.sessionStorage.getItem("graphNumber");
                break;
            }
        }
    }
    else currentGraph = graph[0];
    generateIntervals();
    if (isExample === "false")
    {
        intervals[0].open = false;
        intervals[intervals.length - 1].open = false;
    }
    initializeNewGraph();
    setColor();
    if (isExample === "true") initAnimations(graphAnimation);
    for (let i = 0; i < currentGraph.currentLevel; i++) 
    {
        if (i % 2 == 0) document.getElementById("rulesLeftSide").innerHTML += rules[i] + '<br>';
        else document.getElementById("rulesRightSide").innerHTML += rules[i] + '<br>';
    }
    if (isExample === "false")
    {
        document.getElementById("apibrezimoSritis").addEventListener('click', function() { document.getElementById("apibrezimoSritis").style.borderColor = "black"; });
        document.getElementById("changeCircleButton").addEventListener('click', function() { document.getElementById("changeCircleButton").style.borderColor = "rgb(0, 200, 100)"; });
        document.getElementById("functionNameInput").addEventListener('click', function() { document.getElementById("functionNameInput").style.borderColor = "black"; });
    }
}
async function initAnimations(graphAnimation)
{
    for (let i = 0; i < circles.length; i++) await animateInterval(i, graphAnimation[i]);
    animateInput(currentGraph.inputAnswer, document.getElementById("apibrezimoSritis"));
}
let intervals = [];
function generateIntervals()
{
    let intervalContainer = document.getElementById("intervalContainer");
    let needInfinities = currentGraph.currentLevel >= 4;
    let intervalAmount = needInfinities ? currentGraph.intervalSize / currentGraph.intervalStep + 2 : currentGraph.intervalSize / currentGraph.intervalStep;
    let labelValue = 0;
    let interval = null;
    currentGraph.graphConfig[2] = correctScale() + "px";
    for (let i = 0; i <= intervalAmount; i++) 
    {
        if (needInfinities)
        {
            if (i == 0) labelValue = "-∞";
            else if (i == intervalAmount) labelValue = "+∞";
            else labelValue = currentGraph.start + (i - 1) * currentGraph.intervalStep;
        }
        else labelValue = currentGraph.start + i * currentGraph.intervalStep;
        if (typeof labelValue === "string") interval = new Interval(labelValue);
        else interval = new Interval((labelValue / currentGraph.trueNumber).toLocaleString("de-DE"));
        intervalContainer.appendChild(interval.element);
        intervals[i] = interval;
        intervals[i].position = (intervals[i].element.getBoundingClientRect().left + (parseFloat(currentGraph.graphConfig[2])) * i 
        - (document.getElementById("container").getBoundingClientRect().left) - 4.8 + parseFloat(currentGraph.graphConfig[1]) + parseFloat(currentGraph.graphConfig[2]));
    }
}
function correctScale()
{
    let distance = parseFloat(currentGraph.graphConfig[2].slice(0, currentGraph.graphConfig[2].length - 2));
    if (window.devicePixelRatio <= 1) return distance;
    else if (window.devicePixelRatio <= 1.25) return distance + 1.15;
    else if (window.devicePixelRatio <= 1.5) return distance + 0.65;
    else if (window.devicePixelRatio <= 1.75) return distance + 0.3;
    else if (window.devicePixelRatio <= 2) return distance;
    else if (window.devicePixelRatio <= 2.25) return distance + 0.6;
    else if (window.devicePixelRatio <= 2.5) return distance + 0.4;
    else if (window.devicePixelRatio <= 2.75) return distance + 0.2; // unknown.
    else if (window.devicePixelRatio <= 3) return distance;
    else if (window.devicePixelRatio <= 3.25) return distance + 0.4; // unknown.
    else if (window.devicePixelRatio <= 3.5) return distance + 0.3;
    else if (window.devicePixelRatio <= 3.75) return distance + 0.15;
    else return distance;
}
function circleDragSetupX(draggableCircle)
{
    draggableCircle.circle.addEventListener("click", function() { selectionOnCircle(draggableCircle.circle); });
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
                draggableCircle.line.style.left = whichInterval[0] + 'px';
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
function selectionOnCircle(circle)
{
    for (let i = 0; i < circles.length; i++) circles[i].circle.style.borderColor = "black";
    circle.style.borderColor = "rgb(0, 216, 230)";
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
                if (intervals[i].labelValue.includes('∞')) draggableCircle.switchType("white", "5px dashed");
                return [intervals[i].position, intervals[i].labelValue];
            }
        }
    }
    return "NONE";
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
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(180, 180, 180, 0.4)";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.rect(x - document.getElementById("overlay").getBoundingClientRect().left, y, width, height);
    ctx.fill();
}
function drawAdditionalLines(x, needDashed)
{
    let canvas = document.getElementById('additionalLines');
    let ctx = canvas.getContext('2d');
    ctx.strokeStyle = "rgba(180, 180, 180, 0.7)";
    ctx.lineWidth = 5;
    if (needDashed) ctx.setLineDash([10, 10]);
    else ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(x, 15);
    ctx.lineTo(x, 496);
    ctx.stroke();
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
    generateAxis("lineX", isExample, 2);
    circles =
    [
        new Circle(overlay.querySelector('#circle0'), overlay.querySelector('#line0'), "X", overlay.querySelector("#intervalLabel0"), currentGraph.start, overlay.querySelector("#circleLabel0"), intervals[0].position),
        new Circle(overlay.querySelector('#circle1'), overlay.querySelector('#line1'), "X", overlay.querySelector("#intervalLabel1"), currentGraph.end, overlay.querySelector("#circleLabel1"), intervals[intervals.length - 1].position)
    ];
    circles[0].intervalSpot = 0;
    circles[1].intervalSpot = intervals.length - 1;
    currentGraph.setGraph();
    for (const circle of circles) updateLabelPos(circle);
    if (isExample === "false")
    {
        circleDragSetupX(circles[0]);
        circleDragSetupX(circles[1]);
    }
    drawFilledArea(circles[0].getBounds().left + 13, 16, circles[1].getBounds().left - circles[0].getBounds().left, 480);
    let values = currentGraph.graphConfig[4].split(" ");
    for (let i = 0; i < values.length; i++) drawAdditionalLines(parseInt(values[i].slice(0, -1)), values[i][values[i].length - 1] == "t");
    document.getElementById("explanation").innerText = explanations[currentGraph.currentLevel - 1];
}
function clearTheLevel()
{
    let deleteIds = ["startLineX", "endLineX"];
    for (const deleteId of deleteIds) document.getElementById(deleteId).remove();
}
function checkIfCorrect()
{
    let answers = currentGraph.intervalAnswers;
    let correct = 0;
    let brackets = [];
    for (let i = 0; i < circles.length; i++)
    {
        for (let j = 0; j < answers.length; j++)
        {
            if (circles[i].intervalLabel.innerText == answers[j].toLocaleString("de-DE"))
            {
                if (i % 2 == 0) brackets[i] = circles[j].getBackgroundColor() == "white" ? "(" : "[";
                else brackets[i] = circles[j].getBackgroundColor() == "white" ? ")" : "]";
                correct++;
                break;
            }
        }
    }
    if (answers.length != correct) levelFailed(0);
    else
    {
        let input = document.getElementById("apibrezimoSritis").value;
        if (currentGraph.currentLevel > 1)
        {
            if (currentGraph.currentLevel > 5 && input.includes("="))
            {
                if (brackets[0] == currentGraph.brackets[0] && brackets[1] == currentGraph.brackets.slice(-1)[0])
                {
                    if (currentGraph.inputAnswer == input) levelCompleted();
                    else levelFailed(1);
                }
                else levelFailed(2);
            }
            else if (currentGraph.currentLevel == 5 && brackets[0] == currentGraph.brackets[0] && brackets[1] == currentGraph.brackets.slice(-1)[0])
            {
                if (document.getElementById("functionNameInput").value == currentGraph.inputAnswer[0])
                {
                    if (currentGraph.inputAnswer.slice(1) == input) levelCompleted();
                    else levelFailed(1);
                }
                else levelFailed(3);
            }
            else if (brackets[0] == currentGraph.brackets[0] && brackets[1] == currentGraph.brackets.slice(-1)[0]) 
            {
                if (currentGraph.inputAnswer == input) levelCompleted();
                else levelFailed(1);
            }
            else levelFailed(2);
        }
        else if (currentGraph.inputAnswer == input) levelCompleted();
        else levelFailed(1);
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
            window.sessionStorage.setItem("isExample", false);
            window.sessionStorage.setItem("lygis", graphs[++Graph.graphNumber].graphName);
            window.sessionStorage.setItem("graphNumber", Graph.graphNumber);
            window.location.href = "../levelCode/level.html";
    }
}
function showAnswer()
{
    window.sessionStorage.setItem("isExample", true);
    window.sessionStorage.setItem("lygis", currentGraph.graphName);
    window.location = "../levelCode/level.html";
}
function levelCompleted()
{
    document.getElementById("ats").innerText = "Teisingai!";
    document.getElementById("answerButton").style.visibility = "hidden";
    document.getElementById("nextLevelButton").style.visibility = "visible";
}
function levelFailed(wrong)
{
    switch(wrong)
    {
        case 0:
            for (let i = 0; i < circles.length; i++) circles[i].circle.style.borderColor = "red";
            document.getElementById("ats").innerText = "Neteisinguose vietose skrituliukai.";
            break;
        case 1:
            document.getElementById("apibrezimoSritis").style.borderColor = "red";
            document.getElementById("ats").innerText = "Neteisingai užrašyta apibrėžimo sritis";
            break;
        case 2:
            document.getElementById("changeCircleButton").style.borderColor = "red";
            document.getElementById("ats").innerText = "Netinkamai yra nustatyti skrituliukų tipai grafike.";
            break;
        case 3:
            document.getElementById("functionNameInput").style.borderColor = "red";
            document.getElementById("ats").innerText = "Neteisingas funkcijos vardas.";
            break;
        default:
            document.getElementById("ats").innerText = "Neteisingai.";
    }
    document.getElementById("showAnswerButton").style.visibility = "visible";
}
function writeInfSymbol(isPositive)
{
    document.getElementById("apibrezimoSritis").value += isPositive ? "+∞" : "-∞";
}
function repeatExample()
{
    window.sessionStorage.setItem("isExample", true);
    window.location.href = "../levelCode/level.html";
}
function goBack()
{
    window.location.href = "../startPageCode/startPage.html";
}