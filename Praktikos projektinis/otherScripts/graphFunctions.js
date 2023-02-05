function disableNotNeededElements()
{
    if (currentGraph.currentLevel > 1)
    {
        document.getElementById("apSritisBracket1").style.display = "none";
        document.getElementById("apSritisBracket2").style.display = "none";
    }
    if (currentGraph.currentLevel > 2)
    {
        document.getElementById("changeStartX").style.visibility = "visible";
        document.getElementById("changeEndX").style.visibility = "visible";
    }
    if (currentGraph.currentLevel > 3)
    {
        let button = document.getElementById("negInfButton");
        if (button)
        {
            document.getElementById("negInfButton").style.visibility = "visible";
            document.getElementById("posInfButton").style.visibility = "visible";
        }
    }
    if (currentGraph.currentLevel < 4)
    {
        let button = document.getElementById("negInfButton");
        if (button) // If it is real level or example level.
        {
            document.getElementById("answerButton").innerText = "Patvirtinti atsakymą";
            document.getElementById("answerButton").onclick = checkIfCorrect;
            document.getElementById("ats").innerText = "";
        }
        document.getElementById("negInf").style.display = "none";
        document.getElementById("posInf").style.display = "none";
    }
    if (currentGraph.currentLevel > 4) document.getElementById("apSritisLabel").style.display = "none";
}
function generateAxis(axisId, startCircleId, endCircleId, startLineId, endLineId, lineClassName, whichAxis, endCirclePos, isExample)
{
    let axis = setElement("div", axisId);
    let startCircle = setElement("div", startCircleId, "circle");
    let endCircle = setElement("div", endCircleId, "circle");
    let plotNegInf = setElement("div", "plotNegInf");
    let plotPosInf = setElement("div", "plotPosInf");
    let startLine = setElement("div", startLineId, lineClassName);
    let endLine = setElement("div", endLineId, lineClassName);
    let overlay = document.getElementById("overlay");
    let container = document.getElementById("container");
    let negInf = setElement("div", "negInf", "circle");
    negInf.style.zIndex = 2;
    let posInf = setElement("div", "posInf", "circle");
    posInf.style.zIndex = 2;
    let apSritisLabel = setElement("label", "apSritisLabel");
    let apSritisBracket1 = setElement("label", "apSritisBracket1");
    let apSritisBracket2 = setElement("label", "apSritisBracket2");
    apSritisLabel.innerText = "D(f)=";
    apSritisBracket1.innerText = "[";
    apSritisBracket2.innerText = "]";
    let input = setElement("input", "apibrezimoSritis");
    input.type = "text";
    input.maxlength = "20";
    if (isExample) input.setAttribute("readonly", true);
    if (whichAxis == "X")
    {
        startCircle.style.left = '0px';
        endCircle.style.left = endCirclePos;
    }
    else
    {
        startCircle.style.top = '0px';
        endCircle.style.top = endCirclePos;
    }
    appendChilds(axis, [startCircle, endCircle]);
    appendChilds(overlay, [axis, startLine, endLine]);
    appendChilds(container, [negInf, posInf, plotNegInf, plotPosInf]);
    appendChilds(document.getElementById("apibrezimoSritiesContainer"), [apSritisLabel, apSritisBracket1, input, apSritisBracket2]);
    disableNotNeededElements();
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