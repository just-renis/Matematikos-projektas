let intervalAnimations =
[
    new Animation(0, 2000, 177), // 1.0
    new Animation(1, 2000, -148), // 1.0
    new Animation(0, 2000, 236), // 1.1
    new Animation(1, 2000, -289), // 1.1
    new Animation(0, 2000, 92), // 1.2
    new Animation(1, 2000, -185), // 1.2
    new Animation(0, 2000, 147), // 2.0
    new Animation(1, 2000, -181), // 2.0
    new Animation(0, 2000, 309), // 2.1
    new Animation(1, 2000, 0), // 2.1
    new Animation(0, 2000, 120), // 2.2
    new Animation(1, 2000, -164), // 2.2
    new Animation(0, 2000, 241), // 3.0
    new Animation(1, 2000, -325), // 3.0
    new Animation(0, 2000, 92), // 3.1
    new Animation(1, 2000, -147), // 3.1
    new Animation(0, 2000, 83), // 3.2
    new Animation(1, 2000, -219), // 3.2
    new Animation(0, 2000, -126), // 4.0.1
    new Animation(1, 2000, -264), // 4.0.1
    new Animation(0, 2000, 284), // 4.0.2
    new Animation(1, 2000, 112), // 4.0.2
    new Animation(0, 2000, -119), // 4.1
    new Animation(1, 2000, -267), // 4.1
    new Animation(0, 2000, -114.5), // 4.2
    new Animation(1, 2000, 120.5), // 4.2
    new Animation(0, 2000, 246), // 5.0
    new Animation(1, 2000, -105), // 5.0
    new Animation(0, 2000, -128), // 5.1
    new Animation(1, 2000, -175), // 5.1
    new Animation(0, 2000, 87), // 5.2
    new Animation(1, 2000, -115), // 5.2
    new Animation(0, 2000, 210), // 6.0
    new Animation(1, 2000, -210), // 6.0
    new Animation(0, 2000, 229), // 6.1
    new Animation(1, 2000, -230), // 6.1
    new Animation(0, 2000, 379), // 6.2
    new Animation(1, 2000, -41), // 6.2
    new Animation(0, 2000, -145), // 7.0
    new Animation(1, 2000, -45), // 7.0
    new Animation(0, 2000, -130.5), // 7.1
    new Animation(1, 2000, 137.5), // 7.1
    new Animation(0, 2000, 253), // 7.2
    new Animation(1, 2000, -254), // 7.2
    new Animation(0, 2000, 71), // 8.0
    new Animation(1, 2000, -105), // 8.0
    new Animation(0, 2000, 199), // 8.1
    new Animation(1, 2000, -168), // 8.1
    new Animation(0, 2000, 116), // 8.2
    new Animation(1, 2000, 114), // 8.2
    new Animation(0, 2000, 185), // 9.0.1
    new Animation(1, 2000, -250), // 9.0.1
    new Animation(0, 2000, 151), // 9.0.2
    new Animation(1, 2000, -199), // 9.0.2
    new Animation(0, 2000, 142), // 9.1
    new Animation(1, 2000, -201), // 9.1
    new Animation(0, 2000, 149), // 9.2
    new Animation(1, 2000, -185) // 9.2
];
function animateInterval(index, milliseconds, endPoint, onEndRun, onEndRunPoint)
{
    if (currentGraph.inputAnswer.includes("=") && currentGraph.inputAnswer.split("=")[1][2] == "∞") intervals[0].switchType("white", "5px dashed");
    else if (currentGraph.inputAnswer[2] == "∞") intervals[0].switchType("white", "5px dashed");
    if (currentGraph.inputAnswer.split(";")[1][0] == "∞") intervals[1].switchType("white", "5px dashed");
    let startTime = Date.now();
    let intervalId = setInterval(function() 
    {
        const elapsedTime =  Date.now() - startTime;
        const progress = elapsedTime / milliseconds;
        updateIntervalPos(index, progress * endPoint);
        if (elapsedTime >= milliseconds) 
        {
            if (parseInt(intervals[index].circle.getBoundingClientRect().left - axisX.getBoundingClientRect().left, 10) < 0) enableInfPlot("plotNegInf");
            else if (parseInt(intervals[index].circle.getBoundingClientRect().left - axisX.getBoundingClientRect().left, 10) > currentGraph.pixels) enableInfPlot("plotPosInf");
            clearInterval(intervalId);
            if (++currentGraph.finishedAnimations == currentGraph.finishedAnimLimit) document.getElementById("nextLevelButton").style.visibility = "visible";
            else if (currentGraph.finishedAnimations == 2) animateInput(currentGraph.inputAnswer, document.getElementById("apibrezimoSritis"));
            if (onEndRun != -1) animateInterval(onEndRun, milliseconds, onEndRunPoint, -1);
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
            if (++currentGraph.finishedAnimations == currentGraph.finishedAnimLimit) document.getElementById("nextLevelButton").style.visibility = "visible";
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
    needButton2 = currentGraph.inputAnswer.slice(-1)[0] == ")" && currentGraph.inputAnswer.split(";")[1][0] != "∞";
    if (!needButton1 && !needButton2) document.getElementById("nextLevelButton").style.visibility = "visible";
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
            if (++currentGraph.finishedAnimations == currentGraph.finishedAnimLimit) document.getElementById("nextLevelButton").style.visibility = "visible";
        }
    });
}
function enableBlink(button, elapsedTime)
{
    if (parseInt(elapsedTime / 500) % 2 == 0) button.backgroundColor = "lightgreen";
    else if (parseInt(elapsedTime / 500) % 2 == 1) button.backgroundColor = "yellow";
}