let intervalAnimations =
[
    [6, 16], // 1.0
    [9, 11], // 1.1
    [3, 6], // 1.2
    [5, 6], // 2.0
    [9, 0], // 2.1
    [3, 4], // 2.2
    [6, 8], // 3.0
    [3, 5], // 3.1
    [3, 8], // 3.2
    [0, 12], // 4.0.1
    [9, 23], // 4.0.2
    [20, 8], // 4.1
    [29, 30], // 4.2
    [8, 16], // 5.0
    [23, 6], // 5.1
    [3, 4], // 5.2
    [6, 6], // 6.0
    [5, 5], // 6.1
    [9, 1], // 6.2
    [15, 1], // 7.0
    [19, 20], // 7.1
    [7, 7], // 7.2
    [2, 3], // 8.0
    [6, 5], // 8.1
    [4, 24], // 8.2
    [6, 8], // 9.0.1
    [3, 4], // 9.0.2
    [5, 7], // 9.1
    [4, 5] // 9.2
];
function animateInterval(index, endPoint) 
{
    return new Promise(resolve => { moveToPosition(circles[index], intervals[endPoint], resolve); });
}
 /*   if (currentGraph.inputAnswer.includes("=") && currentGraph.inputAnswer.split("=")[1][2] == "∞") circles[0].switchType("white", "5px dashed");
    else if (currentGraph.inputAnswer[2] == "∞") circles[0].switchType("white", "5px dashed");
    if (currentGraph.inputAnswer.split(";")[1][2] == "∞") circles[1].switchType("white", "5px dashed");
    let startTime = Date.now();
    let intervalId = setInterval(function() 
    {
        const elapsedTime =  Date.now() - startTime;
        const progress = elapsedTime / milliseconds;
        if (index == 0)
        {
            updateIntervalPos(index, progress * intervals[endPoint].position);
            intervals[endPoint].open = false;
        }
        else
        {
            if (endPoint == intervals.length - 1 && currentGraph.currentLevel >= 4) updateIntervalPos(index, progress * (intervals[endPoint].position - intervals[endPoint - 2].position + 24.8));
            else updateIntervalPos(index, progress * -intervals[endPoint].position);
            intervals[endPoint].open = false;
        }
        if (elapsedTime >= milliseconds)
        {
            clearInterval(intervalId);
            if (++currentGraph.finishedAnimations == currentGraph.finishedAnimLimit) enableButtons();
            else if (currentGraph.finishedAnimations == 2) animateInput(currentGraph.inputAnswer, document.getElementById("apibrezimoSritis"));
            if (onEndRun != -1) animateInterval(onEndRun, milliseconds / 2, onEndRunPoint, -1, 0);
        }
    });*/
async function moveToPosition(circleElement, target, resolve) 
{
    let startPosition = circleElement.circle.offsetLeft;
    let targetPosition = target.position;
    let distance = targetPosition - startPosition;
    let startTime = Date.now();
    function step()
    {
        let progress = (Date.now() - startTime) / 1500;
        if (progress >= 1)
        {
            changePosition(circleElement, targetPosition, target.labelValue);
            currentGraph.finishedAnimations++;
            showClickedButton(circles[0], "left").then(() => { resolve(); });
            return;
        }
        changePosition(circleElement, startPosition + distance * progress, Interval.findNearestIntervalLabel(circleElement.circle.style.left));
        requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}
function changePosition(circleElement, newPosition, labelValue)
{
    circleElement.circle.style.left = newPosition + "px";
    circleElement.line.style.left = newPosition + "px";
    circleElement.intervalLabel.innerText = labelValue;
    updateLabelPos(circleElement);
    drawFilledArea(circles[0].getBounds().left + 13, 15, circles[1].getBounds().left - circles[0].getBounds().left, 480);
}
function animateInput(text, inputField)
{
    let functionNameNeeded = currentGraph.currentLevel == 5 ? 1 : 0;
    if (currentGraph.currentLevel == 5) document.getElementById("functionNameInput").value = text[0];
    let i = functionNameNeeded;
    let intervalId = setInterval(function() 
    {
        inputField.value = text.substring(functionNameNeeded, i++);
        if (i > text.length) 
        {
            clearInterval(intervalId);
            enableButtons();
        }
    }, 250);
}
function showClickedButton(circleElement, whichSide)
{
    return new Promise(resolve => 
    {
        let button = document.getElementById("changeCircleButton").style;
        let bracket;
        let startTime = Date.now();
        if (circleElement.circle.style.backgroundColor == "black") bracket = whichSide == "left" ? "[" : "]";
        else bracket = whichSide == "left" ? "(" : ")";
        let bracketAnswers = "";
        for (let i = 0; i < currentGraph.inputAnswer.length; i++)
        {
            switch (currentGraph.inputAnswer[i])
            {
                case "(": bracketAnswers += "("; break;
                case ")": bracketAnswers += ")"; break;
                case "[": bracketAnswers += "["; break;
                case "]": bracketAnswers += "]"; break;
            }
        }
        if (bracket != bracketAnswers[circleElement.index])
        {
            let intervalId = setInterval(function()
            {
                const elapsedTime = Date.now() - startTime;
                enableBlink(button, elapsedTime);
                if (elapsedTime >= 2000)
                {
                    changeCircleType(circleElement.index);
                    clearInterval(intervalId);
                    resolve();
                }
            });
        }
        else resolve();
    });
   /* if (currentGraph.inputAnswer.includes("=")) needButton1 = currentGraph.inputAnswer.split("=")[1][0] == "(" && currentGraph.inputAnswer.split("=")[1][2] != "∞";
    else needButton1 = currentGraph.inputAnswer[0] == "(" && currentGraph.inputAnswer[2] != "∞";
    needButton2 = currentGraph.inputAnswer.slice(-1)[0] == ")" && currentGraph.inputAnswer.split(";")[1][2] != "∞";
    if (!needButton1 && !needButton2) 
    {
        enableButtons();
        return;
    }
    let intervalId = setInterval(function()
    {
        const elapsedTime =  Date.now() - startTime;
        if (needButton1) enableBlink(button1, elapsedTime);
        if (needButton2) enableBlink(button2, elapsedTime);
        if (elapsedTime >= 2000)
        {
            if (needButton1) changeCircleType(0);
            if (needButton2) changeCircleType(1);
            clearInterval(intervalId);
            if (++currentGraph.finishedAnimations == currentGraph.finishedAnimLimit) enableButtons();
        }
    });*/
}
function enableBlink(button, elapsedTime)
{
    if (parseInt(elapsedTime / 500) % 2 == 0) button.backgroundColor = "lightgreen";
    else if (parseInt(elapsedTime / 500) % 2 == 1) button.backgroundColor = "yellow";
}
function enableButtons()
{
    document.getElementById("nextLevelButton").style.visibility = "visible";
    document.getElementById("repeatExample").style.visibility = "visible";
}