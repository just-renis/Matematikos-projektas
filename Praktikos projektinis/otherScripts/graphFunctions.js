function disableNotNeededElements(isExample)
{
    if (currentGraph.currentLevel > 1)
    {
        document.getElementById("apSritisBracket1").style.display = "none";
        document.getElementById("apSritisBracket2").style.display = "none";
    }
    if (currentGraph.currentLevel > 2) document.getElementById("changeCircleButton").style.visibility = "visible";
    if (currentGraph.currentLevel > 3)
    {
        let button = document.getElementById("negInfButton");
        if (button)
        {
            document.getElementById("negInfButton").style.visibility = "visible";
            document.getElementById("posInfButton").style.visibility = "visible";
        }
    }
    else if (currentGraph.currentLevel < 4)
    {
        if (!isExample)
        {
            document.getElementById("answerButton").innerText = "Patvirtinti atsakymą";
            document.getElementById("answerButton").onclick = checkIfCorrect;
            document.getElementById("ats").innerText = "";
        }
        document.getElementById("functionNameInput").style.display = "none";
    }
    if (currentGraph.currentLevel == 5) document.getElementById("apSritisLabel").innerText = "D(";
    else
    {
        if (currentGraph.currentLevel > 4) document.getElementById("apSritisLabel").style.display = "none";
        document.getElementById("apSritisSecondLabel").style.display = "none";
        document.getElementById("functionNameInput").style.display = "none";
    }
}
function generateAxis(lineClassName, isExample, circlesAmount)
{
    let localCircles = [];
    let lines = [];
    let intervalLabels = [];
    let circleLabels = [];
    for (let i = 0; i < circlesAmount; i++) 
    {
        lines[i] = setElement("div", "line" + i, lineClassName);
        localCircles[i] = setElement("div", "circle" + i, "circle");
        intervalLabels[i] = setElement("p", "intervalLabel" + i);
        circleLabels[i] = setElement("p", "circleLabel" + i, "circleLabel");
    }
    let overlay = document.getElementById("overlay");
    let apSritisLabel = setElement("label", "apSritisLabel");
    let apSritisSecondLabel = setElement("label", "apSritisSecondLabel");
    let apSritisBracket1 = setElement("label", "apSritisBracket1");
    let apSritisBracket2 = setElement("label", "apSritisBracket2");
    apSritisLabel.innerText = "D(f)=";
    apSritisSecondLabel.innerText = ")=";
    apSritisBracket1.innerText = "[";
    apSritisBracket2.innerText = "]";
    let input = setElement("input", "apibrezimoSritis");
    let functionNameInput = setElement("input", "functionNameInput");
    input.style.type = "text";
    input.maxLength = "20";
    functionNameInput.style.type = "text";
    functionNameInput.maxLength = "1";
    functionNameInput.style.width = "10px";
    if (isExample) 
    {
        input.setAttribute("readonly", true);
        functionNameInput.setAttribute("readonly", true);
    }
    for (let i = 0; i < circlesAmount; i++) appendChilds(overlay, [lines[i], localCircles[i], intervalLabels[i], circleLabels[i]]);
    appendChilds(document.getElementById("apibrezimoSritiesContainer"), [apSritisLabel, functionNameInput, apSritisSecondLabel, apSritisBracket1, input, apSritisBracket2]);
    disableNotNeededElements(isExample);
}
function setElement(whichElement, id, className)
{
    let element = document.createElement(whichElement);
    element.id = id;
    element.className = className;
    return element;
}
function appendChilds(appendTo, childs = [])
{
    for (let i = 0; i < childs.length; i++) appendTo.appendChild(childs[i]);
}