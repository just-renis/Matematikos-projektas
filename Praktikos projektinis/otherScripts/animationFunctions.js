let intervalAnimations =
[
    [6, 16], // 1.0
    [9, 14], // 1.1
    [3, 15], // 1.2
    [5, 15], // 2.0
    [9, 18], // 2.1
    [3, 11], // 2.2
    [6, 8], // 3.0
    [3, 16], // 3.1
    [3, 15], // 3.2
    [0, 12], // 4.0.1
    [10, 23], // 4.0.2
    [0, 12], // 4.1
    [0, 30], // 4.2
    [8, 16], // 5.0
    [0, 17], // 5.1
    [4, 19], // 5.2
    [7, 13], // 6.0
    [6, 10], // 6.1
    [10, 15], // 6.2
    [0, 14], // 7.0
    [0, 20], // 7.1
    [8, 12], // 7.2
    [3, 16], // 8.0
    [7, 15], // 8.1
    [5, 24], // 8.2
    [7, 13], // 9.0.1
    [4, 9], // 9.0.2
    [6, 16], // 9.1
    [5, 13] // 9.2
];
function animateInterval(index, endPoint) 
{
    return new Promise(resolve => { moveToPosition(circles[index], intervals[endPoint], index, endPoint, resolve); });
}
async function moveToPosition(circleElement, target, index, endPointIndex, resolve) 
{
    let startPosition = circleElement.circle.offsetLeft;
    let targetPosition = target.position;
    let distance = targetPosition - startPosition;
    let startTime = Date.now();
    function step()
    {
        let progress = (Date.now() - startTime) / 1500;
        if (progress >= 1 || circleElement.intervalSpot == endPointIndex)
        {
            changePosition(circleElement, targetPosition, target.labelValue);
            if (currentGraph.currentLevel >= 3) showClickedButton(circleElement, index % 2 == 0 ? "left" : "right").then(() => { resolve(); });
            else resolve();
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
        if (bracket != currentGraph.brackets[circleElement.index])
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