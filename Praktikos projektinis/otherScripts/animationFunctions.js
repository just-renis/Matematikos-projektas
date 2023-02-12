let intervalAnimations =
[
    [6, 5], // 1.0
    [9, 11], // 1.1
    [3, 6], // 1.2
    [5, 6], // 2.0
    [9, 0], // 2.1
    [3, 4], // 2.2
    [6, 8], // 3.0
    [3, 5], // 3.1
    [3, 8], // 3.2
    [20, 8], // 4.0.1
    [9, 23], // 4.0.2
    [20, 8], // 4.1
    [29, 30], // 4.2
    [7, 3], // 5.0
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
function animateInterval(index, milliseconds, endPoint, onEndRun, onEndRunPoint)
{
    if (currentGraph.inputAnswer.includes("=") && currentGraph.inputAnswer.split("=")[1][2] == "∞") circles[0].switchType("white", "5px dashed");
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
            if (parseInt(circles[index].circle.getBoundingClientRect().left - axisX.getBoundingClientRect().left, 10) < 0) enableInfPlot("plotNegInf");
            else if (parseInt(circles[index].circle.getBoundingClientRect().left - axisX.getBoundingClientRect().left, 10) > currentGraph.pixels) enableInfPlot("plotPosInf");
            clearInterval(intervalId);
            if (++currentGraph.finishedAnimations == currentGraph.finishedAnimLimit) enableButtons();
            else if (currentGraph.finishedAnimations == 2) animateInput(currentGraph.inputAnswer, document.getElementById("apibrezimoSritis"));
            if (onEndRun != -1) animateInterval(onEndRun, milliseconds / 2, onEndRunPoint, -1, 0);
            if (currentGraph.currentLevel >= 4)
            {
                circleToInfPos(intervals.length - 2, "negInf", "plotNegInf");
                circleToInfPos(intervals.length - 1, "posInf", "plotPosInf");
            }
        }
    });
}
function animateInput(text, inputField) 
{
    let i = 0;
    let intervalId = setInterval(function() 
    {
        inputField.value = text.substring(0, i++);
        if (i > text.length) 
        {
            clearInterval(intervalId);
            if (++currentGraph.finishedAnimations == currentGraph.finishedAnimLimit) enableButtons();
            else showClickedButton();
        }
    }, 250);
}
function showClickedButton()
{
    let button1 = document.getElementById("changeStartX").style;
    let button2 = document.getElementById("changeEndX").style;
    let startTime = Date.now();
    let needButton1, needButton2;
    if (currentGraph.inputAnswer.includes("=")) needButton1 = currentGraph.inputAnswer.split("=")[1][0] == "(" && currentGraph.inputAnswer.split("=")[1][2] != "∞";
    else needButton1 = currentGraph.inputAnswer[0] == "(" && currentGraph.inputAnswer[2] != "∞";
    needButton2 = currentGraph.inputAnswer.slice(-1)[0] == ")" && currentGraph.inputAnswer.split(";")[1][2] != "∞";
    if (!needButton1 && !needButton2) enableButtons();
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
    });
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